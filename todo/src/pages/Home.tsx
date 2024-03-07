import Todo from 'components/Todo'
import Container, { Wrapper } from 'components/container/container'
import useSWR from 'swr';
import { todoFetch } from 'services/fetch';

function Home() {
    const { data } = useSWR("api/tasks", todoFetch, { 
        suspense: true,
        refreshInterval:30000
    });
    
    return (
        <Container>
            <Wrapper>
                {data.response.map(todo => <Todo key={todo._id} {...todo} />)}
            </Wrapper>
        </Container>
    )
}


export default Home
