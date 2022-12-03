import React from "react";
import styled from "styled-components";

const PokemonStarterLabel = styled.span`
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: #ff0000;
`;

export const PokemonStarterLabelComponent = () => {
    return <PokemonStarterLabel>Starter</PokemonStarterLabel>;
};
