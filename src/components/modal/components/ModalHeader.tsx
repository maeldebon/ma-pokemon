import styled from "styled-components";

export const ModalHeader = styled.div`
    display: flex;
    border-radius: 5px;
    background-color: #b2b2b2;
    color: black;
    padding: 16px;
    font-weight: 700;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px 5px 0 0;
`;

export const ModalHeaderTitle = styled.div`
    justify-content: center;
    margin: auto;
    text-transform: capitalize;
`;

export const ModalHeaderRightAction = styled.div`
    justify-content: end;
`;

export const ModalHeaderLeftAction = styled.div`
    justify-content: start;
`;
