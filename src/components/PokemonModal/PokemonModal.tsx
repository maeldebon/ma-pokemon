import React, { useEffect } from "react";

import { FaStar, FaTimes } from "react-icons/fa";
import Modal from "../modal/Modal";
import {
    PokemonEvolutionType,
    PokemonItemType,
    PokemonSpeciesType,
} from "../../utils/types";
import {
    ModalSection,
    ModalSectionTitle,
    ModalSectionItem,
} from "../modal/components";
import { formatText } from "../../utils/formatText";
import PokemonTypeTagComponent from "../Types";

// This allows to get the ID of the pokemon from the URL in order to
// prevent a new API call to get the pokemon image
const getPokemonIdFromUrl = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
};

type PokemonModalType = {
    isModalShown: boolean;
    onModalClose: () => void;
    selectedPokemon: PokemonItemType | null;
    selectedPokemonSpecies: PokemonSpeciesType | null;
    selectedPokemonEvolutions: PokemonEvolutionType | null;
    handleFavoriteClick: () => void;
    isFavorite: boolean;
};

export const PokemonModal = ({
    selectedPokemon,
    selectedPokemonSpecies,
    selectedPokemonEvolutions,
    isModalShown,
    onModalClose,
    handleFavoriteClick,
    isFavorite,
}: PokemonModalType): JSX.Element => {
    const [evolutions, setEvolutions] = React.useState<
        { name: string; id: string }[]
    >([]);
    const [description, setDescription] = React.useState("");

    useEffect(() => {
        if (selectedPokemonEvolutions) {
            const chain = selectedPokemonEvolutions?.chain;

            const evolutionList: { name: string; id: string }[] = [];
            evolutionList.push({
                name: chain?.species.name,
                id: getPokemonIdFromUrl(chain?.species.url),
            });
            if (chain.evolves_to.length > 0) {
                chain.evolves_to.forEach((evolution) => {
                    evolutionList.push({
                        name: evolution.species.name,
                        id: getPokemonIdFromUrl(evolution.species.url),
                    });
                    if (evolution.evolves_to.length > 0) {
                        evolution.evolves_to.forEach((evolution) => {
                            evolutionList.push({
                                name: evolution.species.name,
                                id: getPokemonIdFromUrl(evolution.species.url),
                            });
                        });
                    }
                });
            }
            setEvolutions(evolutionList);
        }
    }, [selectedPokemonEvolutions]);

    useEffect(() => {
        if (selectedPokemonSpecies) {
            // Find a description in english
            const englishFlavorText =
                selectedPokemonSpecies.flavor_text_entries.find(
                    (flavorText) => flavorText.language.name === "en"
                );
            setDescription(
                englishFlavorText?.flavor_text || "No description found"
            );
        }
    }, [selectedPokemonSpecies]);

    // When closing the modal, we want to reset as much information as possible
    // to avoid having the previous pokemon information displayed while the new
    // one is loading
    const onClose = () => {
        onModalClose();
        setEvolutions([]);
        setDescription("");
    };

    return (
        <Modal
            title={`${selectedPokemon?.name || "Loading..."}`}
            isShown={isModalShown}
            onClose={onClose}
            leftActionComponent={
                <FaStar
                    onClick={handleFavoriteClick}
                    style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        color: isFavorite ? "gold" : "black",
                    }}
                />
            }
            rightActionComponent={
                <FaTimes
                    onClick={onClose}
                    style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        paddingRight: "1rem",
                    }}
                />
            }
            content={
                selectedPokemon ? (
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            flexGrow: 4,
                        }}
                    >
                        <ModalSection
                            style={{
                                flex: "1 0 60%",
                            }}
                        >
                            <ModalSectionItem>
                                Capture rate:{" "}
                                {selectedPokemonSpecies?.capture_rate}
                            </ModalSectionItem>
                            <ModalSectionTitle
                                style={{
                                    marginTop: "1rem",
                                }}
                            >
                                Description
                            </ModalSectionTitle>
                            <ModalSectionItem>{description}</ModalSectionItem>
                            <ModalSectionTitle
                                style={{
                                    marginTop: "1rem",
                                }}
                            >
                                Abilities
                            </ModalSectionTitle>
                            {selectedPokemon?.abilities.map((ability) => (
                                <ModalSectionItem key={ability.ability.name}>
                                    {formatText(ability.ability.name)}
                                </ModalSectionItem>
                            ))}
                        </ModalSection>
                        <ModalSection
                            style={{
                                border: "2px solid #b2b2b2",
                                padding: "1rem",
                                alignItems: "center",
                                flex: "1 0",
                            }}
                        >
                            {selectedPokemonSpecies?.is_legendary && (
                                <div
                                    style={{
                                        color: "gold",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Legendary
                                </div>
                            )}
                            {selectedPokemonSpecies?.is_mythical && (
                                <div
                                    style={{
                                        color: "purple",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Mythical
                                </div>
                            )}
                            <img
                                src={selectedPokemon?.sprites.front_default}
                                alt={selectedPokemon?.name}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                }}
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
                                id="stats"
                                style={{
                                    alignItems: "start",
                                    marginTop: "1.5rem",
                                }}
                            >
                                <div>
                                    Height: {selectedPokemon?.height / 10}cm
                                </div>
                                <div>
                                    Weight: {selectedPokemon?.weight / 10}kg
                                </div>
                                {selectedPokemon?.stats.map((stat) => (
                                    <div key={stat.stat.name}>
                                        <div
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {formatText(stat.stat.name)}:{" "}
                                            {stat.base_stat}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ModalSection>
                        <ModalSection>
                            <ModalSectionTitle
                                style={{
                                    marginTop: "1rem",
                                }}
                            >
                                Evolution chain
                            </ModalSectionTitle>
                            <ModalSectionItem
                                style={{
                                    flexWrap: "wrap",
                                    justifyContent: "flex-start",
                                }}
                            >
                                {evolutions?.map((evolution) => (
                                    <div
                                        key={evolution.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                                            alt={evolution.name}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                            }}
                                        />
                                        <div
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {evolution.name}
                                        </div>
                                    </div>
                                ))}
                            </ModalSectionItem>
                            <ModalSectionTitle
                                style={{
                                    marginTop: "1rem",
                                }}
                            >
                                {`Pokemon from the specie "${selectedPokemonSpecies?.name}"`}
                            </ModalSectionTitle>
                            <ModalSectionItem
                                style={{
                                    flexWrap: "wrap",
                                    justifyContent: "flex-start",
                                }}
                            >
                                {selectedPokemonSpecies?.varieties.map(
                                    (variety) => (
                                        <div
                                            key={variety.pokemon.name}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <img
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonIdFromUrl(
                                                    variety.pokemon.url
                                                )}.png`}
                                                alt={variety.pokemon.name}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                }}
                                            />
                                            <div
                                                style={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {variety.pokemon.name}
                                            </div>
                                        </div>
                                    )
                                )}
                            </ModalSectionItem>
                        </ModalSection>
                    </div>
                ) : (
                    "Loading..."
                )
            }
        />
    );
};
