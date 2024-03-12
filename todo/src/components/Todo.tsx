import React, { useState } from 'react'
import styled from 'styled-components'
import { TodoBase } from 'types/todo'
import { BoxFlex } from './container/container'
import { getDateString } from 'utils/date'
import { Typography } from './typography/typography'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    FiEdit2,
    FiChevronUp,
    FiStar,
    FiTrash2
} from "react-icons/fi";
import { deleteTodoFetch, insertTodoFetch, updateTodoFetch } from 'services/fetch'
import { useRecoilState } from 'recoil'
import { todoState } from 'recoil/todo/atoms'
import { color } from 'styles/color'

interface TodoProps extends TodoBase {
    insertMode?: boolean
}

function Todo({
    _id,
    title,
    description,
    createAt,
    deadline,
    favorite,
    insertMode = false
}: TodoProps) {

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: { errors }
    } = useForm<TodoBase>({
        defaultValues: {
            _id,
            title,
            description,
            createAt,
            deadline
        }
    });

    const [todoList, setTodoList] = useRecoilState(todoState);

    const [param, setParam] = useState<TodoBase>({ _id, title, description, createAt, deadline, favorite });
    const [isOpen, setIsOpen] = useState<boolean>(insertMode);

    const [mode, setMode] = useState<"read" | "write">(insertMode ? "write" : "read");
    const isReadMode: boolean = mode === "read";

    const starToggleHandler = async () => {
        const context: TodoBase = { ...getValues(), favorite: !param.favorite };
        await updateTodoFetch(context);

        setParam(prev => ({ ...prev, favorite: !prev.favorite }));
    }

    const openToggleHandler = () => {
        if (isReadMode) {
            setIsOpen(prev => !prev);
        }
    }

    const modeChangeHandler = () => {
        setMode("write");
        if (!isOpen) openToggleHandler();
    }

    const insertHandler: SubmitHandler<TodoBase> = async (data) => {
        await insertTodoFetch(data);
        setTodoList(prev => [data, ...prev]);
        reset(param);
    }

    const deleteHandler = async () => {
        await deleteTodoFetch(_id);
        const deleted = todoList.filter(todo => todo._id !== _id);
        setTodoList(deleted);
    }

    const onCancelHandler = () => {
        setMode("read");
        reset();
    }

    const onSubmitHandler: SubmitHandler<TodoBase> = async (data) => {
        await updateTodoFetch(data);
        setParam(data);
        setMode("read");
        reset(data);
    }

    return (
        <TodoBox onSubmit={handleSubmit(insertMode ? insertHandler : onSubmitHandler)}>
            <TodoMain>
                <div>
                    {
                        !insertMode &&
                        <button type='button' onClick={starToggleHandler}>
                            <FiStar fill={param.favorite ? color.favorite : "#fff"} color={param.favorite ? color.favorite : color.text} size={16} />
                        </button>
                    }
                    <div>
                        {
                            isReadMode
                            ? <Typography>{param.title}</Typography>
                            : <TodoInput placeholder='할 일을 적어주세요' {...register("title", {
                                required: "제목은 필수입력입니다.",
                            })} />
                        }
                        {errors.title && <Typography size='sm'>{errors.title.message}</Typography>}
                    </div>
                </div>

                <div>
                    <div>
                        {
                            isReadMode
                                ? <Typography>{getDateString(param.deadline)}</Typography>
                                : <TodoInput
                                    type='date'
                                    {...register("deadline", {
                                        required: "마감일은 필수입력입니다.",
                                    })}
                                    onChange={(e) => { setValue("deadline", e.target.value) }}
                                />


                        }
                        {errors.title && <Typography size='sm'>{errors.deadline?.message}</Typography>}
                    </div>
                    {
                    !insertMode && isReadMode && 
                        <button type='button' onClick={modeChangeHandler}>
                            <FiEdit2 size={16} color={color.text} />
                        </button>
                    }
                    {
                        !insertMode && !isReadMode && 
                        <button type='button' onClick={deleteHandler}>
                            <FiTrash2 size={16} color={color.text} />
                        </button>
                    }
                    <button type='button' onClick={openToggleHandler} className={`arrow ${isOpen ? "open" : ""}`}>
                        <FiChevronUp size={18} color={color.text} />
                    </button>
                </div>
            </TodoMain>
            <TodoDetail $isOpen={isOpen}>
                <div>
                    {
                        isReadMode
                            ? <Typography>{param.description ?? "no data"}</Typography>
                            : <TodoInput
                                placeholder='자세한 내용을 적어주세요.'
                                {...register("description")}
                            />
                    }
                    <BoxFlex className='submit-box'>
                        <Typography size='sm'>작성일: {getDateString(param.createAt)}</Typography>
                        {
                            !isReadMode &&
                            <span>
                                <button className='submit' type="submit">{insertMode ? "등록" : "수정"}</button>
                                {!insertMode && <button className='cancel' type="button" onClick={onCancelHandler}>취소</button>}
                            </span>
                        }
                    </BoxFlex>
                </div>
            </TodoDetail>
        </TodoBox>
    )
}

const TodoBox = styled.form`
    background: rgba(255, 255, 255, 0.71);
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(15.5px);
    -webkit-backdrop-filter: blur(15.5px);
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 0 12px;

    & button {
        background: none;
        display: flex;
        padding: 0;
        margin: 0;
        border: 0;
        cursor: pointer;
    }

    & .arrow {
        transition: 0.2s;
        transform: rotate(-90deg);
        &.open { transform: rotate(-180deg); }
    }
`

const TodoMain = styled(BoxFlex)`
    padding: 12px;
    justify-content: space-between;

    & > div {
        display: flex;
        align-items: center;
        gap: 12px;
    }
`

const TodoInput = styled.input`
    padding: 12px;
    border: 0;
    border-radius: 8px;
    background: #F5F7F9;
    outline: none;
`


const TodoDetail = styled.div<{ $isOpen: boolean }>`
    width: 100%;
    overflow: hidden;
    transition: .4s ease;
    height: ${({ $isOpen }) => ($isOpen ? '100px' : '0')};
    box-sizing: border-box;
    border-top: 0.01px solid transparent;

    & > div {
        padding: 12px 6px 6px 6px;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        border-top: 0.5px solid #E2E2E2;
        gap: 12px;
    }

    & .submit-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;

        span {
            display: flex;
            gap: 6px;
        }

        & button {
            border-radius: 8px;
            padding: 4px 8px;

            &.submit {
                color: white;
                background: #202632fd;
                border: 1px solid #202632fd;
            }
    
            &.cancel {
                color: #EA5050;
                background: none;
                border: 1px solid #EA5050;
            }
        }
    }
`;

export default Todo
