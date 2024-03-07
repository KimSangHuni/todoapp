import React from 'react'
import Todo from 'components/Todo'
import Container, { Wrapper } from 'components/container/container'
import { TodoBase } from 'types/todo'

function Home() {

    const testData:TodoBase = {
        idx: 1,
        title: "TODO 앱 만들기",
        description: "언제 다 만들지는 모르겠지만 최대한 빨리 만들어야겠다.",
        createAt: new Date(),
        deadline: new Date("2024-04-30")
    }

    return (
        <Container>
            <Wrapper>
                <Todo {...testData} />
                <Todo {...testData} />
                <Todo {...testData} />
            </Wrapper>
        </Container>
    )
}


export default Home
