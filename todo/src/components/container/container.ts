import styled from "styled-components";

export const Container = styled.div`
    background: #F2F4F6;
    min-height: 100vh;
`

export const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    padding: 1rem;
    flex-direction: column;
    gap: 12px;
`

export const BoxFlex = styled.div`
    display: flex;
`

export const BoxGrid = styled.div`
    display: grid;
`

export default Container;