import { baseUrl } from "./settings/api.js";
import { createMenu } from "./components/createMenu.js";
import { getFavourites } from "./utils/favFunctions.js"


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
                                            <button class="btn" data-id="${result.id}" data-name="${result.author}">Add to favourites</button>
                                            </div>`
            });

            const addButton = document.querySelectorAll(".items_display .btn");

            // console.log(addButton)

            addButton.forEach(btn => {
                btn.addEventListener("click", handleClick);
            });

            function handleClick(event) {
                console.log(event)

                this.classList.toggle("btn");
                this.classList.toggle("filled");

                const id = this.dataset.id;
                const name = this.dataset.name;

                const currentFavs = getFavourites();
                console.log(getFavourites)
                const productExist = currentFavs.find(function (fav) {
                    return fav.id === id;
                })


                if (!productExist) {
                    const product = { id: id, name: name };
                    currentFavs.push(product);
                    saveFavs(currentFavs);
                }else {
                    const newFav = currentFavs.filter(fav => fav.id !== id);
                    saveFavs(newFav)
                }


            }

            

            function saveFavs(favs) {
                localStorage.setItem("favaourites", JSON.stringify(favs));
            }

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
    catch(error){
        console.log(error)
    }


})();







