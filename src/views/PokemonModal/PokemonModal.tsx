import React, { useEffect } from "react";

import { FaStar, FaTimes } from "react-icons/fa";
import Modal from "../../components/modal/Modal";
import { BasePokemonItemType, PokemonItemType } from "../../utils/pokemonTypes";
import {
    ModalSection,
    ModalSectionTitle,
    ModalSectionItem,
} from "../../components/modal/components";
import { formatText } from "../../utils/text";
import PokemonTypeTagComponent from "../../components/Types";

const getPokemonIdFromUrl = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
};

type PokemonModalType = {
    isModalShown: boolean;
    onModalClose: () => void;
    selectedPokemon: PokemonItemType | null;
    selectedPokemonSpecies: any | null;
    selectedPokemonEvolutions: any | null;
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

    useEffect(() => {
        if (selectedPokemonEvolutions) {
            const chain = selectedPokemonEvolutions?.chain;

            const evolutionList: { name: string; id: string }[] = [];
            evolutionList.push({
                name: chain?.species.name,
                id: getPokemonIdFromUrl(chain?.species.url),
            });
            if (chain.evolves_to.length > 0) {
                chain.evolves_to.forEach((evolution: any) => {
                    evolutionList.push({
                        name: evolution.species.name,
                        id: getPokemonIdFromUrl(evolution.species.url),
                    });
                    if (evolution.evolves_to.length > 0) {
                        evolution.evolves_to.forEach((evolution: any) => {
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

    const onClose = () => {
        onModalClose();
        setEvolutions([]);
    };

    return (
        <Modal
            title={`${selectedPokemon?.name}`}
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
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        flexGrow: 4,
                        flex: "1 0 70%",
                    }}
                >
                    <ModalSection>
                        <ModalSectionTitle>Description</ModalSectionTitle>
                        <ModalSectionItem>
                            {
                                selectedPokemonSpecies?.flavor_text_entries[0]
                                    .flavor_text
                            }
                        </ModalSectionItem>
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
                            border: "2px solid gray",
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
                                Baby
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
                            <div>Height: {selectedPokemon?.height}</div>
                            <div>Weight: {selectedPokemon?.weight}</div>
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
                                justifyContent: "space-between",
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
                                justifyContent: "space-between",
                            }}
                        >
                            {selectedPokemonSpecies?.varieties.map(
                                (variety: any) => (
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
            }
        />
    );
};
