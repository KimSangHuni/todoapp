import Todo from 'components/Todo'
import Container, { Wrapper } from 'components/container/container'
import React from 'react'
import { TodoBase } from 'types/todo'

function Home() {

    const testData:TodoBase = {
        idx: 1,
        title: "Lorem Ipsum",
        createAt: new Date(),
        deadline: new Date("2024-04-30")
    }

    return (
        <Container>
            <Wrapper>
                <Todo {...testData} />
            </Wrapper>
        </Container>
    )
}


export default Home
