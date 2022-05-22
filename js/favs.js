import { createMenu } from "./components/createMenu.js";
import { getExistingFavs } from "./utils/favFunctions.js";

createMenu();

const favourites = getExistingFavs();

const container = document.querySelector(".product_container");

if (favourites.length === 0){
    container.innerHTML = "No favourites to display!"
}

favourites.forEach(favourite => {
    container.innerHTML += `
                            <div class="items_display">
                            <div class="title">${favourite.title}</div>
                            <div class="summary">${favourite.summary}</div>
                            <div class="author">${favourite.author}</div>
                            <button class="filled">Add to favourites</button>
                            </div>`
                        
});

function filledBtn(){
    const filledButton = document.querySelector(".filled");

    filledButton.innerHTML = "Remove"
}
filledBtn()



function deleteBtn() {
    const clearBtn = document.querySelector(".clear");

    clearBtn.addEventListener("click", handleClick);
}
deleteBtn()


function handleClick() {

    localStorage.clear()
    window.location.reload();
}
