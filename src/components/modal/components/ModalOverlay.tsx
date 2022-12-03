import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1040;
    background-color: rgba(0, 0, 0, 0.7);
    transition-duration: 10s;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
