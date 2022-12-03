import React from "react";

import styled from "styled-components";
import { BasePokemonItemType } from "../../utils/pokemonTypes";

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

    &:hover {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
`;

interface GridItemProps {
    pokemon: BasePokemonItemType;
    action: () => void;
}

const GridItem = ({ pokemon, action }: GridItemProps) => {
    return (
        <Card id="pokemon-grid-item" onClick={action}>
            <div
                style={{
                    textTransform: "capitalize",
                }}
            >
                {pokemon.name}
            </div>
        </Card>
    );
};

export default GridItem;
