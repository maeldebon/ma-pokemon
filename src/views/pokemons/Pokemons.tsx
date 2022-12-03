import React, { useEffect, useState } from "react";
import { get } from "../../utils/api";

import GridItem, { CardFlexGrid } from "../../components/pokemonList/GridItem";

import { CustomButton } from "../../components/CustomButton";
import { BasePokemonItemType, PokemonItemType } from "../../utils/pokemonTypes";
import { PokemonModal } from "../PokemonModal/PokemonModal";

export const Homepage = (): JSX.Element => {
    const [pokemons, setPokemons] = useState<BasePokemonItemType[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [isModalShown, setIsModalShown] = useState(false);
    const [selectedPokemon, setSelectedPokemon] =
        useState<PokemonItemType | null>(null);
    const [selectedPokemonSpecies, setSelectedPokemonSpecies] = useState(null);

    useEffect(() => {
        // Fetch the 200 pokemons
        get(process.env.REACT_APP_API_URL + "/pokemon?limit=200").then(
            (response) => {
                response.json().then(function (data) {
                    setPokemons(data.results);
                    setNextPage(data.next);
                });
            }
        );
    }, []);

    const getPokemonSpecies = (pokemon: PokemonItemType) => {
        get(pokemon.species.url).then((response) => {
            response.json().then(function (data) {
                console.log(data);
                setSelectedPokemonSpecies(data);
            });
        });
    };

    const loadFullPokemon = (pokemon: BasePokemonItemType) => {
        get(pokemon.url).then((response) => {
            response.json().then(function (data) {
                console.log(data);
                getPokemonSpecies(data);
                setSelectedPokemon(data);
                setIsModalShown(true);
            });
        });
    };

    const loadMore = () => {
        if (nextPage) {
            get(nextPage).then((response) => {
                response.json().then(function (data) {
                    setPokemons([...pokemons, ...data.results]);
                    setNextPage(data.next);
                });
            });
        }
    };

    const openPokemon = (pokemon: BasePokemonItemType) => {
        loadFullPokemon(pokemon);
        setIsModalShown(true);
    };

    const onModalClose = () => {
        setIsModalShown(false);
        setSelectedPokemon(null);
    };

    return (
        <div>
            <PokemonModal
                selectedPokemon={selectedPokemon}
                selectedPokemonSpecies={selectedPokemonSpecies}
                isModalShown={isModalShown}
                onModalClose={onModalClose}
            />
            <h1
                style={{
                    padding: "6px",
                }}
            >
                Pokedex
            </h1>
            <CardFlexGrid>
                {pokemons.map((pokemon) => (
                    <GridItem
                        key={pokemon.name}
                        pokemon={pokemon}
                        action={() => openPokemon(pokemon)}
                    />
                ))}
            </CardFlexGrid>

            <CustomButton onClick={loadMore}>Load more</CustomButton>
        </div>
    );
};
