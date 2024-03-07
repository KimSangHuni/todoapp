import React from 'react'
import Todo from 'components/Todo'
import Container, { Wrapper } from 'components/container/container'
import { TodoBase } from 'types/todo'
import useSWR from 'swr';
import { todoFetch } from 'services/fetch';

function Home() {
    const { data } = useSWR("api/tasks", todoFetch, { suspense: true });
    console.log(data);
    return (
        <Container>
            <Wrapper>
                {data.response.map(todo => <Todo key={todo._id} {...todo} />)}
            </Wrapper>
        </Container>
    )
}


export default Home
