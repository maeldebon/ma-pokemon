export type PokemonTypeType =
    | "grass"
    | "fire"
    | "water"
    | "bug"
    | "normal"
    | "poison"
    | "electric"
    | "ground"
    | "fairy"
    | "fighting"
    | "psychic"
    | "rock"
    | "ghost"
    | "ice"
    | "dragon"
    | "dark"
    | "steel"
    | "flying";

export type PokemonSpeciesType = {
    name: string;
    capture_rate: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    evolution_chain: {
        url: string;
    };
    varieties: {
        is_default: boolean;
        pokemon: {
            name: string;
            url: string;
        };
    }[];
};

export type PokemonEvolutionType = {
    chain: {
        species: {
            name: string;
            url: string;
        };
        evolves_to: {
            species: {
                name: string;
                url: string;
            };
            evolves_to: {
                species: {
                    name: string;
                    url: string;
                };
            }[];
        }[];
    };
};

export type BasePokemonItemType = {
    name: string;
    url: string;
};

export type PokemonItemType = {
    id: number;
    name: string;
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    is_default: boolean;
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    species: {
        name: string;
        url: string;
    };
    sprites: {
        front_default: string;
        front_shiny: string;
    };
    types: {
        slot: number;
        type: {
            name: PokemonTypeType;
            url: string;
        };
    }[];
    height: number;
    weight: number;
};

export enum PokemonTypeName {
    normal = "normal",
    fire = "fire",
    water = "water",
    electric = "electric",
    grass = "grass",
    ice = "ice",
    fighting = "fighting",
    poison = "poison",
    ground = "ground",
    flying = "flying",
    psychic = "psychic",
    bug = "bug",
    rock = "rock",
    ghost = "ghost",
    dragon = "dragon",
    dark = "dark",
    steel = "steel",
    fairy = "fairy",
}
