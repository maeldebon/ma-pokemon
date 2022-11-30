import { useEffect, useMemo, useState } from "react";
import { get } from "../../utils/api";

type Pokemon = {
    name: string;
    url: string;
};

export const Homepage = (): JSX.Element => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);

    useEffect(() => {
        get(process.env.REACT_APP_API_URL + "/pokemon").then((response) => {
            response.json().then(function (data) {
                setPokemons(data.results);
                setNextPage(data.next);
            });
        });
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

    console.log(pokemons);

    return (
        <div>
            <h1>Homepage</h1>
            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>
            <button onClick={loadMore}>Load more</button>
        </div>
    );
};
