// This allows to get the ID of the pokemon from the URL in order to
// prevent a new API call to get the pokemon image
export const getPokemonIdFromUrl = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
};
