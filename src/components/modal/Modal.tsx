import React from "react";

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
    rightActionComponent?: React.ReactNode;
}

export const Modal = ({
    isShown,
    title,
    leftActionComponent,
    rightActionComponent,
    content,
    onClose,
}: ModalProps) => {
    return isShown ? (
        <ModalOverlay>
            <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
                <ModalContent>
                    <ModalHeader>
                        <ModalHeaderLeftAction>
                            {leftActionComponent}
                        </ModalHeaderLeftAction>
                        <ModalHeaderTitle>{title}</ModalHeaderTitle>
                        <ModalHeaderRightAction>
                            {rightActionComponent}
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
