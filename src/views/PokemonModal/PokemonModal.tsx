import React from "react";

import { FaBookmark, FaTimes } from "react-icons/fa";
import Modal from "../../components/modal/Modal";
import { PokemonItemType } from "../../utils/pokemonTypes";
import {
    ModalSection,
    ModalSectionTitle,
    ModalSectionItem,
} from "../../components/modal/components";
import { formatText } from "../../utils/text";
import PokemonTypeTagComponent from "../../components/Types";

type PokemonModalType = {
    isModalShown: boolean;
    onModalClose: () => void;
    selectedPokemon: PokemonItemType | null;
    selectedPokemonSpecies: any | null;
};

export const PokemonModal = ({
    selectedPokemon,
    selectedPokemonSpecies,
    isModalShown,
    onModalClose,
}: PokemonModalType): JSX.Element => {
    return (
        <Modal
            title={`${selectedPokemon?.name}`}
            isShown={isModalShown}
            onClose={onModalClose}
            leftActionComponent={
                <FaBookmark
                    style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                    }}
                />
            }
            rightActionComponent={
                <FaTimes
                    onClick={onModalClose}
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
                        justifyContent: "space-between",
                    }}
                >
                    <ModalSection>
                        <ModalSectionTitle>Statistics</ModalSectionTitle>
                        {selectedPokemon?.stats.map((stat) => (
                            <ModalSectionItem key={stat.stat.name}>
                                <div
                                    style={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {formatText(stat.stat.name)}
                                </div>
                                <div>{stat.base_stat}</div>
                            </ModalSectionItem>
                        ))}
                    </ModalSection>
                    <ModalSection
                        style={{
                            border: "2px solid gray",
                            padding: "1rem",
                            alignItems: "center",
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
                </div>
            }
        />
    );
};

/*<div
                        style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}
                    >
                        <ModalSection
                            style={{
                                alignContent: "end",
                            }}
                        >
                            <ModalSectionTitle>Pictures</ModalSectionTitle>
                            <ModalSectionItem>
                                <img
                                    src={selectedPokemon?.sprites.front_default}
                                    alt="front"
                                />
                            </ModalSectionItem>
                            <ModalSectionItem>
                                <img
                                    src={selectedPokemon?.sprites.front_shiny}
                                    alt="front"
                                />
                            </ModalSectionItem>
                        </ModalSection>
                        <ModalSection>
                            <ModalSectionTitle>Types</ModalSectionTitle>
                            <div id="tags-wrapper" style={{ display: "flex" }}>
                                {selectedPokemon.types.map((type) => (
                                    <ModalSectionItem
                                        key={"type-" + type.type.name}
                                        style={{
                                            flex: "none",
                                            marginRight: "0.5rem",
                                        }}
                                    >
                                        <PokemonTypeTagComponent
                                            type={type.type.name}
                                        />
                                    </ModalSectionItem>
                                ))}
                            </div>
                        </ModalSection>
                        <ModalSection>
                            <ModalSectionTitle>Abilities</ModalSectionTitle>
                            {selectedPokemon.abilities.map((ability) => (
                                <ModalSectionItem
                                    key={"ability-" + ability.ability.name}
                                >
                                    {formatText(ability.ability.name)}
                                    {ability.is_hidden ? " (hidden)" : ""}
                                </ModalSectionItem>
                            ))}
                        </ModalSection>
                        <ModalSection>
                            <ModalSectionTitle>Statistics</ModalSectionTitle>
                            <ModalSectionItem>
                                Weight: {selectedPokemon.weight / 10} kg
                            </ModalSectionItem>
                            <ModalSectionItem>
                                Height: {selectedPokemon.height / 10}m
                            </ModalSectionItem>
                            {selectedPokemon.stats.map((stat) => (
                                <ModalSectionItem
                                    key={"stat-" + stat.stat.name}
                                >
                                    {formatText(stat.stat.name)}:{" "}
                                    {stat.base_stat}
                                </ModalSectionItem>
                            ))}
                        </ModalSection>
                        <ModalSection>
                            <ModalSectionTitle>Game versions</ModalSectionTitle>
                            {selectedPokemon.game_indices.map((game) => (
                                <ModalSectionItem
                                    key={"game-" + game.version.name}
                                    style={{
                                        display: "inline-block",
                                        marginRight: "10px",
                                    }}
                                >
                                    {formatText(game.version.name)}
                                </ModalSectionItem>
                            ))}
                        </ModalSection>
                                </div>*/
