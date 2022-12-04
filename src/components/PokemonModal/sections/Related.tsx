import React from "react";
import { ModalSection, ModalSectionTitle } from "../../modal/components";
import { CustomImage, PokemonItemRow, PokemonRow } from "../components/Content";
import { CapitalizedText } from "../components/Text";
import { getPokemonIdFromUrl } from "../../../utils/functions";
import { PokemonSpeciesType } from "../../../utils/types";

export const RelatedSection = ({
    evolutions,
    selectedPokemonSpecies,
}: {
    evolutions: { name: string; id: string }[];
    selectedPokemonSpecies: PokemonSpeciesType | null;
}): JSX.Element => {
    return (
        <ModalSection>
            <ModalSectionTitle>Evolution chain</ModalSectionTitle>
            <PokemonRow>
                {evolutions?.map((evolution) => (
                    <PokemonItemRow key={evolution.name}>
                        <CustomImage
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                            alt={evolution.name}
                        />
                        <CapitalizedText>{evolution.name}</CapitalizedText>
                    </PokemonItemRow>
                ))}
            </PokemonRow>
            <ModalSectionTitle>
                {`Pokemon from the specie "${selectedPokemonSpecies?.name}"`}
            </ModalSectionTitle>
            <PokemonRow>
                {selectedPokemonSpecies?.varieties.map((variety) => (
                    <PokemonItemRow key={variety.pokemon.name}>
                        <CustomImage
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonIdFromUrl(
                                variety.pokemon.url
                            )}.png`}
                            alt={variety.pokemon.name}
                        />
                        <CapitalizedText>
                            {variety.pokemon.name}
                        </CapitalizedText>
                    </PokemonItemRow>
                ))}
            </PokemonRow>
        </ModalSection>
    );
};
