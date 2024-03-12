import Todo from 'components/Todo'
import Container, { Wrapper } from 'components/container/container'
import useSWR from 'swr';
import { todoFetch } from 'services/fetch';
import { TodoBase } from 'types/todo';
import { useRecoilState } from 'recoil';
import { filterState, todoState } from 'recoil/todo/atoms';
import { useEffect, useState } from 'react';
import FilterComponent, { Filter } from 'components/FilterComponent';



function Home() {
    const initalTodo: TodoBase = { _id: '', title: '', description: '', deadline: new Date(), createAt: new Date(), favorite: false };
    
    const [todoList, setTodoList] = useRecoilState(todoState);
    const [filter, setFilter] = useRecoilState(filterState);

    const { data } = useSWR("api/tasks", () => todoFetch(filter), {
        refreshInterval: 10 * 1000, suspense: true
    });

    useEffect(() => {
        setTodoList(data.response);
    }, [data]);

    return (
        <Container>
            <Wrapper>
                <Todo insertMode={true} {...initalTodo} />
            </Wrapper>
            <Wrapper>
                {filter.map((f, index) => <FilterComponent key={`filter_${index}`} {...f} />)}
            </Wrapper>
            <Wrapper>
                {todoList.map(todo => <Todo key={todo._id} {...todo} />)}
            </Wrapper>
        </Container>
    )
}

export default Home
