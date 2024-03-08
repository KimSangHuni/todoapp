import Todo from 'components/Todo'
import Container, { Wrapper } from 'components/container/container'
import useSWR from 'swr';
import { todoFetch } from 'services/fetch';
import { TodoBase } from 'types/todo';
import { useRecoilState } from 'recoil';
import { todoState } from 'recoil/todo/atoms';
import { useEffect } from 'react';

function Home() {
    const initalTodo:TodoBase = { _id: '', title: '', description: '', deadline: new Date(), createAt: new Date(), favorite:false };

    const { data } = useSWR("api/tasks", todoFetch, { 
        suspense: true,  refreshInterval: 10 * 1000
    });
    
    const [todoList, setTodoList] = useRecoilState(todoState);
    
    useEffect(() => {
        setTodoList(data.response);
    }, [data]);

    return (
        <Container>
            <Wrapper>
                <Todo insertMode={true} {...initalTodo} />
            </Wrapper>
            <Wrapper>
                {todoList.map(todo => <Todo key={todo._id} {...todo} />)}
            </Wrapper>
        </Container>
    )
}

export default Home
