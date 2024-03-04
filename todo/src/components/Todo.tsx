import React, { useState } from 'react'
import styled from 'styled-components'
import { TodoBase } from 'types/todo'
import { BoxFlex } from './container/container'
import { getDateString } from 'utils/date'
import { Typography } from './typography/typography'
import { useForm } from 'react-hook-form'


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
    const [mode, setMode] = useState<"read" | "write">("write");
    const isReadMode = mode === "read";

    const openToggleHandler = () => {
        setIsOpen(prev => !prev);
    }

    const modeChangeHandler = () => {
        setMode(prev => prev === "read" ? "write" : "read");
    }

    const onSubmitHandler = () => {

    }

    return (
        <TodoBox onSubmit={handleSubmit(onSubmitHandler)}>
            <TodoMain>
                {
                    isReadMode
                        ? <Typography>{title}</Typography>
                        : <TodoInput
                            defaultValue={title}
                            placeholder='할 일을 적어주세요'
                            {...register("title")}
                        />
                }
                <div>
                    {
                        isReadMode
                            ? <Typography>{getDateString(deadline)}</Typography>
                            : <TodoInput
                                type='date'
                                {...register("create_date")}
                            />
                    }
                    <button type='button' onClick={openToggleHandler}>t</button>
                    <button type='button' onClick={modeChangeHandler}>c</button>
                </div>
            </TodoMain>
            <TodoDetail $isOpen={isOpen}>
                <div>
                    {
                        isReadMode
                            ? <Typography>{description}</Typography>
                            : <TodoInput
                                defaultValue={description}
                                placeholder='자세한 내용을 적어주세요.'
                                {...register("description")}
                            />
                    }
                    <BoxFlex>
                        {getDateString(createAt)}
                        {
                            !isReadMode && <>
                                <button>submit</button>
                                <button>cancel</button>
                            </>
                        }
                    </BoxFlex>
                </div>
            </TodoDetail>
        </TodoBox>
    )
}

const TodoBox = styled.form`
    background: white;
`

const TodoMain = styled(BoxFlex)`
    box-shadow: 0 0 3px 5px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    justify-content: space-between;

    & > div {
        display: flex;
        align-items: baseline;
        gap: 4px;
    }
`

const TodoInput = styled.input`
`

const TodoDetail = styled.div<{ $isOpen: boolean }>`
    width: 100%;
    overflow: hidden;
    transition: .6s ease; /* max-height에만 transition 적용 */
    height: ${({ $isOpen }) => ($isOpen ? '240px' : '0')}; /* isOpen이 true일 때는 특정 높이, false일 때는 0 */
    box-sizing: border-box;

    & > div {
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }
`;

export default Todo
