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
