import { baseUrl } from "./settings/api.js";
import { createMenu } from "./components/createMenu.js";
import { getExistingFavs } from "./utils/favFunctions.js";
import { displayMessage } from "./components/displayMessage.js";


createMenu();

const itemsUrl = baseUrl + "articles";

const favourites = getExistingFavs();




(async function() {
    const container = document.querySelector(".product_container");
    const search = document.querySelector(".search");


    try{
        const response = await fetch(itemsUrl);
        let results = await response.json();

        // console.log(results);




        function renderHtml() {

            container.innerHTML = "";

            results.forEach(function (result) {
                
                

                let cssClass = "btn"

                const doesObjectExist = favourites.find(function (fav) {
                    console.log(fav)
                    return parseInt(fav.id) === results.id
                });

                // console.log(doesObjectExist)

                if (doesObjectExist) {
                    cssClass = "filled"
                }
                

                container.innerHTML += `<div class="items_display">
                                            <div class="title">${result.title}</div>
                                            <div class="summary">${result.summary}</div>
                                            <div class="author">${result.author}</div>
                                            <button class="${cssClass}" data-id="${result.id}" data-author="${result.author}" data-title="${result.title}" data-summary="${result.summary}">Add to favourites</button>
                                            </div>`
            });



        }
        renderHtml();


        search.onkeyup = function (event) {
            // console.log(event)

            const searchValue = event.target.value.trim().toLowerCase();

            const fileredresults = results.filter(function (result) {
                if (result.author.toLowerCase().startsWith(searchValue)) {
                    return true;
                }
            })

            console.log(results);

            results = fileredresults;
            renderHtml();
        }


    }
    catch (error) {
        console.log(error)
        displayMessage();
    }

    //
    //
    //
    // Toggle button item in and out of localstorage

    const addButton = document.querySelectorAll(".items_display button");

    // console.log(addButton)

    addButton.forEach(btn => {
       
        btn.addEventListener("click", handleClick);
    });

    function handleClick(event) {
        
        this.classList.toggle("btn");
        this.classList.toggle("filled");
        this.innerHTML = "Remove";

        const id = this.dataset.id;
        const author = this.dataset.author;
        const title = this.dataset.title;
        const summery = this.dataset.summary;

        
        const currentFavs = getExistingFavs();

        

        const productExist = currentFavs.find(function (fav) {
            return fav.id === id;
        })

        if (!productExist) {
            const product = { id: id, author: author, title:title, summary: summery };
            currentFavs.push(product);
            saveFavourites(currentFavs);
        } else {
            const newFavs = currentFavs.filter(fav => fav.id !== id);
            saveFavourites(newFavs);
        }


    }
    

    function saveFavourites(favs) {
        localStorage.setItem("favourites", JSON.stringify(favs))
    }

})();







