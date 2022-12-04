import styled from "styled-components";

export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 90%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    display: flex;
    align-items: center;
    margin-top: 30px;
`;

export const ModalBody = styled.div`
    color: black;
    padding: 12px;
`;

export const ModalContent = styled.div`
    z-index: 100;
    background: white;
    position: relative;
    margin: auto;
    border-radius: 5px;
    width: 70%;
    min-width: 350px;
`;

export const ModalSection = styled.div`
    margin: 0 16px;
    padding: 12px 0;
    display: flex;
    flex-direction: column;
`;

export const ModalSectionTitle = styled.span`
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 12px;
`;

export const ModalSectionItem = styled.div`
    display: flex;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    margin-bottom: 0;
    padding: 12px;
    border-radius: 0 0 5px 5px;
    background-color: #b2b2b2;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;
