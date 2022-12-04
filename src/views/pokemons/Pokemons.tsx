import React, { useEffect, useMemo, useState } from "react";
import { get } from "../../utils/api";

import GridItem, { CardFlexGrid } from "../../components/pokemonList/GridItem";

import { CustomButton } from "../../components/CustomButton";
import { BasePokemonItemType, PokemonItemType } from "../../utils/pokemonTypes";
import { PokemonModal } from "../PokemonModal/PokemonModal";

export type FavoritePokemonItemType = {
    name: string;
    url: string;
    image: string;
};

export const Homepage = (): JSX.Element => {
    const [pokemons, setPokemons] = useState<BasePokemonItemType[]>([]);
    const [isModalShown, setIsModalShown] = useState(false);
    const [selectedPokemon, setSelectedPokemon] =
        useState<PokemonItemType | null>(null);
    const [selectedPokemonSpecies, setSelectedPokemonSpecies] = useState(null);
    const [selectedPokemonEvolutions, setSelectedPokemonEvolutions] =
        useState(null);
    const [loading, setLoading] = useState(false);

    const [favorites, setFavorites] = useState<FavoritePokemonItemType[]>([]);

    console.log("favorites", favorites);

    const handleFavoriteClick = () => {
        console.log("handleFavoriteClick" + favorites);

        if (selectedPokemon) {
            const favoriteList = JSON.parse(
                localStorage.getItem("favorites") || "[]"
            );
            const index = favoriteList.findIndex(
                (favorite: BasePokemonItemType) =>
                    favorite.name === selectedPokemon.name
            );
            if (index === -1) {
                favoriteList.push({
                    name: selectedPokemon.name,
                    url:
                        process.env.REACT_APP_API_URL +
                        "/pokemon/" +
                        selectedPokemon.id,
                    image: selectedPokemon.sprites.front_default,
                });
            } else {
                favoriteList.splice(index, 1);
            }
            localStorage.setItem("favorites", JSON.stringify(favoriteList));
            setFavorites(favoriteList);
        }
    };

    useMemo(() => {
        // Fetch all pokemon at once (there are only 1145 entries in the API af of today)
        // this might not be the best solution for a real world application, but this is required
        // since the API doesn't provide a way to fetch all pokemon with a common property (e.g. color)
        setLoading(true);
        get(process.env.REACT_APP_API_URL + "/pokemon?limit=2000").then(
            (response) => {
                response.json().then(function (data) {
                    setPokemons(data.results);
                });
            }
        );
    }, []);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(favorites);
    }, []);

    const getPokemonEvolutions = (url: string) => {
        get(url).then((response) => {
            response.json().then(function (data) {
                setSelectedPokemonEvolutions(data);
            });
        });
    };

    const getPokemonSpecies = (pokemon: PokemonItemType) => {
        get(pokemon.species.url).then((response) => {
            response.json().then(function (data) {
                console.log(data);
                getPokemonEvolutions(data.evolution_chain.url);
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
                selectedPokemonEvolutions={selectedPokemonEvolutions}
                handleFavoriteClick={handleFavoriteClick}
                isModalShown={isModalShown}
                onModalClose={onModalClose}
                isFavorite={favorites.some(
                    (favorite: FavoritePokemonItemType) =>
                        favorite.name === selectedPokemon?.name
                )}
            />
            <h2>Favorites</h2>
            <CardFlexGrid style={{ justifyContent: "flex-start" }}>
                {favorites.map((favorite) => (
                    <GridItem
                        key={favorite.name}
                        pokemon={favorite}
                        image={favorite.image}
                        action={() => openPokemon(favorite)}
                    />
                ))}
            </CardFlexGrid>
            <h2>Pokemon List</h2>
            <CardFlexGrid>
                {pokemons.map((pokemon) => (
                    <GridItem
                        key={pokemon.name}
                        pokemon={pokemon}
                        action={() => openPokemon(pokemon)}
                    />
                ))}
            </CardFlexGrid>
        </div>
    );
};
