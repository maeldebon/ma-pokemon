import React from "react";

import styled from "styled-components";
import { BasePokemonItemType } from "../../utils/types";

export const CardFlexGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -10px;
    padding: 10px;
`;

const Card = styled.div`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
    position: relative;
    margin: 10px;
    cursor: pointer;
    width: 128px;
    text-transform: capitalize;
    align-items: center;

    &:hover {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
`;

interface GridItemProps {
    pokemon: BasePokemonItemType;
    image?: string;
    action: () => void;
}

const GridItem = ({ pokemon, image, action }: GridItemProps) => {
    return (
        <Card onClick={action}>
            {image && <img src={image} alt={pokemon.name} />}
            {pokemon.name}
        </Card>
    );
};

export default GridItem;
