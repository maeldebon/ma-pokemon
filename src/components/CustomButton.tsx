import styled from "styled-components";

export const CustomButton = styled.button`
    background-color: #fff;
    margin: 10px;
    border: 1px solid #000;
    border-radius: 4px;
    color: #000;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    padding: 8px 16px;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #000;
        color: #fff;
    }
`;
