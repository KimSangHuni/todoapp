import React, { useState } from 'react'
import styled from 'styled-components'
import { TodoBase } from 'types/todo'
import { BoxFlex } from './container/container'
import { getDateString } from 'utils/date'
import { Typography } from './typography/typography'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
    FiEdit2,
    FiChevronUp,
    FiStar
} from "react-icons/fi";



function Todo({
    _id,
    title,
    description,
    createAt,
    deadline,
    favorite
}: TodoBase) {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors }
    } = useForm<TodoBase>({
        defaultValues: {
            _id,
            title,
            description,
            createAt,
            deadline: "2024-04-30",
        }
    });

    const [isFavorite, setIsFavorite] = useState<boolean>(favorite);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [mode, setMode] = useState<"read" | "write">("read");
    const isReadMode = mode === "read";

    const openToggleHandler = () => {
        setIsOpen(prev => !prev);
    }

    const starToggleHandler = () => {
        setIsFavorite(prev => !prev);
    }

    const modeChangeHandler = () => {
        setMode("write");
        if (!isOpen) openToggleHandler();
    }

    const onSubmitHandler: SubmitHandler<TodoBase> = (data) => {
        alert(data.title);
    }

    const onCancelHandler = () => {
        setMode("read");
        reset();
    }

    return (
        <TodoBox onSubmit={handleSubmit(onSubmitHandler)}>
            <TodoMain>
                <div>
                    <button type='button' onClick={starToggleHandler}>
                        <FiStar fill={isFavorite ? "#FFCD1C" : "#fff"} color={isFavorite ? "#FFCD1C" : "#aaa"} size={16} />
                    </button>
                    {
                        isReadMode
                            ? <Typography>{title}</Typography>
                            : <TodoInput
                                placeholder='할 일을 적어주세요'
                                {...register("title", {
                                    required: "제목은 필수입력입니다.",
                                })}
                            />
                    }
                    {errors.title && <Typography>{errors.title.message}</Typography>}
                </div>
                <div>
                    {
                        isReadMode
                            ? <Typography>{getDateString(deadline)}</Typography>
                            : <TodoInput
                                type='date'
                                {...register("deadline", {
                                    required: "마감일은 필수입력입니다.",
                                })}
                                onChange={(e) => { setValue("deadline", e.target.value) }}
                            />


                    }
                    {errors.title && <Typography>{errors.title.message}</Typography>}
                    <button type='button' onClick={modeChangeHandler}><FiEdit2 size={16} color={'#4E5968'} /></button>
                    <button type='button' onClick={openToggleHandler} className={`arrow ${isOpen ? "open" : ""}`}><FiChevronUp size={18} color={'#4E5968'} /></button>
                </div>
            </TodoMain>
            <TodoDetail $isOpen={isOpen}>
                <div>
                    {
                        isReadMode
                            ? <Typography>{description ?? "no data"}</Typography>
                            : <TodoInput
                                placeholder='자세한 내용을 적어주세요.'
                                {...register("description")}
                            />
                    }
                    <BoxFlex className='submit-box'>
                        <Typography size='sm'>작성일: {getDateString(createAt)}</Typography>
                        {
                            !isReadMode && <span>
                                <button className='submit' type="submit">수정</button>
                                <button className='cancel' type="button" onClick={onCancelHandler}>취소</button>
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
        &.open {
            transform: rotate(-180deg);
        }
    }
`

const TodoMain = styled(BoxFlex)`
    padding: 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(15.5px);
    -webkit-backdrop-filter: blur(15.5px);

    justify-content: space-between;
    border-radius: 16px;

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
