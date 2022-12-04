import React, { useEffect, useMemo, useState } from "react";
import { get } from "../../utils/api";

import GridItem, { CardFlexGrid } from "../../components/gridItem/GridItem";

import { BasePokemonItemType, PokemonItemType } from "../../utils/types";
import { PokemonModal } from "../../components/PokemonModal/PokemonModal";
import { CustomButton } from "../../components/CustomButton";
import { SectionTitle } from "../../components/SectionTitle";

export type FavoritePokemonItemType = {
    name: string;
    url: string;
    image: string;
};

export const Homepage = (): JSX.Element => {
    const [pokemons, setPokemons] = useState<BasePokemonItemType[]>([]);
    const [favorites, setFavorites] = useState<FavoritePokemonItemType[]>([]);

    const [selectedPokemon, setSelectedPokemon] =
        useState<PokemonItemType | null>(null);
    const [selectedPokemonSpecies, setSelectedPokemonSpecies] = useState(null);
    const [selectedPokemonEvolutions, setSelectedPokemonEvolutions] =
        useState(null);

    const [isModalShown, setIsModalShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState<string | null>(null);

    useMemo(() => {
        // Fetch all pokemon at once (there are only 1145 entries in the API af of today)
        // this might not be the best solution for a real world application, but this is required
        // since the API doesn't provide a way to fetch all pokemon with a common property (e.g. color)
        setLoading(true);
        get(process.env.REACT_APP_API_URL + "/pokemon?limit=100").then(
            (response) => {
                response.json().then(function (data) {
                    setPokemons(data.results);
                    setLoading(false);
                    setNextPage(data.next);
                });
            }
        );
    }, []);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(favorites);
    }, []);

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

    const handleFavoriteClick = () => {
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

    const getFullPokemon = (pokemon: BasePokemonItemType) => {
        get(pokemon.url).then((response) => {
            response.json().then(function (data) {
                getPokemonSpecies(data);
                setSelectedPokemon(data);
                setIsModalShown(true);
            });
        });
    };

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
                getPokemonEvolutions(data.evolution_chain.url);
                setSelectedPokemonSpecies(data);
            });
        });
    };

    const openPokemon = (pokemon: BasePokemonItemType) => {
        getFullPokemon(pokemon);
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
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <SectionTitle>Favorites</SectionTitle>
                    {!favorites.length ? (
                        <div
                            style={{
                                padding: "20px",
                            }}
                        >
                            {"You don't have any favorites yet."}
                        </div>
                    ) : (
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
                    )}

                    <SectionTitle>Pokemon List</SectionTitle>
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
                </>
            )}
        </div>
    );
};
