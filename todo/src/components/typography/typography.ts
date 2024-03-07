import styled from "styled-components";

enum FontSize {
    sm=12,
    md=14,
    lg=16
}


function getFontSize(size?:keyof typeof FontSize) {
    return size ? FontSize[size] : FontSize.md;
}

export const Typography = styled.div<{size?:keyof typeof FontSize}>`
    color: #4E5968;
    font-size: ${({size}) => getFontSize(size)}px;
    padding: 8px 0;
`