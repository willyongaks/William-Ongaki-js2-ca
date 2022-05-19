import { createMenu } from "./components/createMenu.js";
import { getFavourites } from "./utils/favFunctions.js";

createMenu();

const favourites = getFavourites();

const container = document.querySelector(".product_container");

favourites.forEach(favourite => {
    container.innerHTML += `
    <h1>whaaaaatttt</h1>
    <div class="items_display">
                            <div class="title">${favourite.title}</div>
                            <div class="summary">${favourite.summary}</div>
                            <div class="author">${favourite.author}</div>
                            <button class="filled">Add to favourites</button>
                            </div>`
                        
});

