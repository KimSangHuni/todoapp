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

export const Box = styled.div`
    background: rgba(255, 255, 255, 0.71);
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(15.5px);
    -webkit-backdrop-filter: blur(15.5px);
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 0 12px;
`

export const BoxFlex = styled.div`
    display: flex;
    gap: 8px;
`

export const BoxGrid = styled.div`
    display: grid;
`

export default Container;