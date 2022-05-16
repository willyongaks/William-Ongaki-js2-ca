import { baseUrl } from "./settings/api.js";
import { createMenu } from "./components/createMenu.js";


createMenu();

const itemsUrl = baseUrl + "articles";



(async function() {
    const container = document.querySelector(".product_container");

    try{
        const response = await fetch(itemsUrl);
        const results = await response.json();

        console.log(results);

        container.innerHTML = "";

        results.forEach(function(result) {
            container.innerHTML += `<div class="items_display">
                                            <div class="title">${result.title}</div>
                                            <div class="summary">${result.summary}</div>
                                            <div class="author">${result.author}</div>
                                            <button>Add to favourites</button>
                                            </div>`
        })
    }
    catch(error){
        console.log(error)
    }

})();