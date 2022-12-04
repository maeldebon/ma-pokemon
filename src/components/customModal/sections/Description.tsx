import React from "react";
import { formatText } from "../../../utils/formatText";
import { PokemonItemType, PokemonSpeciesType } from "../../../utils/types";
import {
    ModalSection,
    ModalSectionItem,
    ModalSectionTitle,
} from "../../modal/components";

export const Description = ({
    description,
    selectedPokemonSpecies,
    selectedPokemon,
}: {
    description: string;
    selectedPokemonSpecies: PokemonSpeciesType | null;
    selectedPokemon: PokemonItemType | null;
}): JSX.Element => {
    return (
        <ModalSection
            style={{
                flex: "1 0 60%",
            }}
        >
            <ModalSectionItem>
                Capture rate: {selectedPokemonSpecies?.capture_rate}
            </ModalSectionItem>
            <ModalSectionTitle>Description</ModalSectionTitle>
            <ModalSectionItem>{description}</ModalSectionItem>
            <ModalSectionTitle>Abilities</ModalSectionTitle>
            {selectedPokemon?.abilities.map((ability) => (
                <ModalSectionItem key={ability.ability.name}>
                    {formatText(ability.ability.name)}
                </ModalSectionItem>
            ))}
        </ModalSection>
    );
};
