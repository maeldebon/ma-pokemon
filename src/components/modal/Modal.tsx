import React from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

import {
    ModalBody,
    ModalButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalHeaderLeftAction,
    ModalHeaderRightAction,
    ModalHeaderTitle,
    ModalOverlay,
    ModalWrapper,
} from "./components";

interface ModalProps {
    isShown: boolean;
    title: string;
    onClose: () => void;
    content: React.ReactNode;
    leftActionComponent?: React.ReactNode;
}

const CloseIcon = styled(FaTimes)`
    curose: pointer;
    font-size: 1.5rem;
    padding-right: 1rem;
`;

export const Modal = ({
    isShown,
    title,
    leftActionComponent,
    content,
    onClose,
}: ModalProps) => {
    return isShown ? (
        <ModalOverlay>
            <ModalWrapper
                aria-modal
                aria-hidden="true"
                tabIndex={-1}
                role="dialog"
            >
                <ModalContent>
                    <ModalHeader>
                        <ModalHeaderLeftAction>
                            {leftActionComponent}
                        </ModalHeaderLeftAction>
                        <ModalHeaderTitle>{title}</ModalHeaderTitle>
                        <ModalHeaderRightAction>
                            <CloseIcon onClick={onClose} />
                        </ModalHeaderRightAction>
                    </ModalHeader>
                    <ModalBody>{content}</ModalBody>
                    <ModalFooter>
                        <ModalButton onClick={onClose}>Close</ModalButton>
                    </ModalFooter>
                </ModalContent>
            </ModalWrapper>
        </ModalOverlay>
    ) : (
        <></>
    );
};

export default Modal;
