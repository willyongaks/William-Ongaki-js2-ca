export function getExistingFavs() {
    const favs = localStorage.getItem("favourites");
    // console.log(favs)

    if (!favs) {
        return []
    } else {
        return JSON.parse(favs);
    }
}

