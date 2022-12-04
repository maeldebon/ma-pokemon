import React, { useEffect } from "react";

import { FaStar } from "react-icons/fa";
import Modal from "../modal/Modal";
import {
    PokemonEvolutionType,
    PokemonItemType,
    PokemonSpeciesType,
} from "../../utils/types";
import { PokemonModalContent } from "./components/Content";
import { RelatedSection } from "./sections/Related";
import { getPokemonIdFromUrl } from "../../utils/functions";
import { Description } from "./sections/Description";
import { Header } from "./sections/Header";

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
            content={
                selectedPokemon ? (
                    <PokemonModalContent>
                        <Description
                            description={description}
                            selectedPokemonSpecies={selectedPokemonSpecies}
                            selectedPokemon={selectedPokemon}
                        />

                        <Header
                            selectedPokemon={selectedPokemon}
                            selectedPokemonSpecies={selectedPokemonSpecies}
                        />

                        <RelatedSection
                            evolutions={evolutions}
                            selectedPokemonSpecies={selectedPokemonSpecies}
                        />
                    </PokemonModalContent>
                ) : (
                    "Loading..."
                )
            }
        />
    );
};
