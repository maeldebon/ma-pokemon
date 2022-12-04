import React from "react";
import styled from "styled-components";
import { PokemonTypeName, PokemonTypeType } from "../utils/types";

const POKEMON_TYPE_COLORS: Record<PokemonTypeName, string> = {
    [PokemonTypeName.normal]: "#A8A878",
    [PokemonTypeName.fire]: "#F08030",
    [PokemonTypeName.water]: "#6890F0",
    [PokemonTypeName.electric]: "#F8D030",
    [PokemonTypeName.grass]: "#78C850",
    [PokemonTypeName.ice]: "#98D8D8",
    [PokemonTypeName.fighting]: "#C03028",
    [PokemonTypeName.poison]: "#A040A0",
    [PokemonTypeName.ground]: "#E0C068",
    [PokemonTypeName.flying]: "#A890F0",
    [PokemonTypeName.psychic]: "#F85888",
    [PokemonTypeName.bug]: "#A8B820",
    [PokemonTypeName.rock]: "#B8A038",
    [PokemonTypeName.ghost]: "#705898",
    [PokemonTypeName.dragon]: "#7038F8",
    [PokemonTypeName.dark]: "#705848",
    [PokemonTypeName.steel]: "#B8B8D0",
    [PokemonTypeName.fairy]: "#EE99AC",
};

const PokemonTypeTag = styled.div`
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
`;

interface PokemonTypeTagComponentProps {
    type: PokemonTypeType;
}

const PokemonTypeTagComponent = ({ type }: PokemonTypeTagComponentProps) => {
    const backgroundColor =
        POKEMON_TYPE_COLORS[type as keyof typeof PokemonTypeName] || "#A8A878";
    return (
        <PokemonTypeTag
            style={{
                backgroundColor: backgroundColor,
            }}
        >
            {type}
        </PokemonTypeTag>
    );
};

export default PokemonTypeTagComponent;
