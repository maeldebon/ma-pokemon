import styled from "styled-components";
import { ModalSection, ModalSectionItem } from "../../modal/components";

export const CustomImage = styled.img`
    width: 100px;
    height: 100px;
`;

export const PokemonItemRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const PokemonHeader = styled(ModalSection)`
    border: 2px solid #b2b2b2;
    padding: 1rem;
    align-items: center;
    flex: 1 0;
`;

export const PokemonRow = styled(ModalSectionItem)`
    flex-wrap: wrap;
    justify-content: flex-start;
`;

export const PokemonModalContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-grow: 4;
`;
