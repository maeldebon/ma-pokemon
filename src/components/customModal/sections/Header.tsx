import React from "react";
import { CustomImage, PokemonHeader } from "../components/Content";
import { CapitalizedText, TextGold, TextPurple } from "../components/Text";
import { formatText } from "../../../utils/formatText";
import { PokemonItemType, PokemonSpeciesType } from "../../../utils/types";
import PokemonTypeTagComponent from "../../Types";

export const Header = ({
    selectedPokemon,
    selectedPokemonSpecies,
}: {
    selectedPokemon: PokemonItemType;
    selectedPokemonSpecies: PokemonSpeciesType | null;
}): JSX.Element => {
    return (
        selectedPokemon && (
            <PokemonHeader>
                {selectedPokemonSpecies?.is_legendary && (
                    <TextGold>Legendary</TextGold>
                )}
                {selectedPokemonSpecies?.is_mythical && (
                    <TextPurple>Mythical</TextPurple>
                )}
                <CustomImage
                    src={selectedPokemon?.sprites.front_default}
                    alt={selectedPokemon?.name}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {selectedPokemon?.types.map((type) => (
                        <PokemonTypeTagComponent
                            key={type.type.name}
                            type={type.type.name}
                        />
                    ))}
                </div>
                <div
                    style={{
                        alignItems: "start",
                        marginTop: "1.5rem",
                    }}
                >
                    <div>Height: {selectedPokemon.height / 10}cm</div>
                    <div>Weight: {selectedPokemon.weight / 10}kg</div>
                    {selectedPokemon?.stats.map((stat) => (
                        <div key={stat.stat.name}>
                            <CapitalizedText>
                                {formatText(stat.stat.name)}: {stat.base_stat}
                            </CapitalizedText>
                        </div>
                    ))}
                </div>
            </PokemonHeader>
        )
    );
};
