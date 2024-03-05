import React, { useState } from 'react'
import styled from 'styled-components'
import { TodoBase } from 'types/todo'
import { BoxFlex } from './container/container'
import { getDateString } from 'utils/date'
import { Typography } from './typography/typography'
import { useForm } from 'react-hook-form'
import {
    FiEdit2,
    FiChevronUp,
    FiStar
} from "react-icons/fi";

function Todo({
    idx,
    title,
    description,
    createAt,
    deadline
}: TodoBase) {

    const {
        register,
        handleSubmit,
    } = useForm();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [mode, setMode] = useState<"read" | "write">("read");
    const isReadMode = mode === "read";

    const openToggleHandler = () => {
        setIsOpen(prev => !prev);
    }

    const modeChangeHandler = () => {
        setMode(prev => prev === "read" ? "write" : "read");
        if (!isOpen) openToggleHandler();
    }

    const onSubmitHandler = () => {

    }

    return (
        <TodoBox onSubmit={handleSubmit(onSubmitHandler)}>
            <TodoMain>
                <div>
                    <button type='button' onClick={modeChangeHandler}><FiStar color={'#4E5968'} size={16} /></button>
                    {
                        isReadMode
                            ? <Typography>{title}</Typography>
                            : <TodoInput
                                defaultValue={title}
                                placeholder='할 일을 적어주세요'
                                {...register("title")}
                            />
                    }
                </div>
                <div>
                    {
                        isReadMode
                            ? <Typography>{getDateString(deadline)}</Typography>
                            : <TodoInput
                                type='date'
                                {...register("create_date")}
                            />
                    }
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
                                defaultValue={description}
                                placeholder='자세한 내용을 적어주세요.'
                                {...register("description")}
                            />
                    }
                    <BoxFlex className='submit-box'>
                        <Typography>작성일: {getDateString(createAt)}</Typography>
                        {
                            !isReadMode && <>
                                <button>수정</button>
                                <button>취소</button>
                            </>
                        }
                    </BoxFlex>
                </div>
            </TodoDetail>
        </TodoBox>
    )
}

const TodoBox = styled.form`

    background: rgba(255, 255, 255, 0.71);
    border-radius: 16px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(15.5px);
    -webkit-backdrop-filter: blur(15.5px);
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 16px;

    & button {
        background: none;
        display: flex;
        padding: 0;
        margin: 0;
        border: 0;
    }

    & .arrow {
        transition: 0.2s;
        transform: rotate(0deg);
        &.open {
            transform: rotate(-180deg);
        }
    }
`

const TodoMain = styled(BoxFlex)`

    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15.5px);
    -webkit-backdrop-filter: blur(15.5px);
    border: 1px solid rgba(255, 255, 255, 1);

    padding: 1rem;
    justify-content: space-between;
    border-radius: 16px;

    & > div {
        display: flex;
        align-items: center;
        gap: 8px;
    }
`

const TodoInput = styled.input`
    padding: 8px 0;
    border: 0;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.4);
    outline: none;
`


const TodoDetail = styled.div<{ $isOpen: boolean }>`
    width: 100%;
    overflow: hidden;
    transition: .6s ease;
    height: ${({ $isOpen }) => ($isOpen ? '100px' : '0')};
    box-sizing: border-box;

    & > div {
        padding: 1rem;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
    }

    & .submit-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
    }
`;

export default Todo
