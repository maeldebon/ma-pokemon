import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Homepage } from "../../views/pokemons/Pokemons";

export function Router(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    );
}
