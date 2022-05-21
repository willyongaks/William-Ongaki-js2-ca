import { baseUrl } from "./settings/api.js";
import { createMenu } from "./components/createMenu.js";
import { getExistingFavs } from "./utils/favFunctions.js";


createMenu();

const itemsUrl = baseUrl + "articles";




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


            container.innerHTML += `<div class="items_display">
                                            <div class="title">${result.title}</div>
                                            <div class="summary">${result.summary}</div>
                                            <div class="author">${result.author}</div>
                                            <button class="btn" data-id="${result.id}" data-author="${result.author}">Add to favourites</button>
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

            // console.log(fileredresults);

            results = fileredresults;
            renderHtml();
        }


    }
    catch (error) {
        console.log(error)
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
        // console.log(event)

        this.classList.toggle("btn");
        this.classList.toggle("filled");

        const id = this.dataset.id;
        const author = this.dataset.author;

        
        const currentFavs = getExistingFavs();

        

        const productExist = currentFavs.find(function (fav) {
            return fav.id === id;
        })

        if (!productExist) {
            const product = { id: id, author: author };
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







