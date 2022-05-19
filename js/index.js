import { baseUrl } from "./settings/api.js";
import { createMenu } from "./components/createMenu.js";


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
                                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                                        
                                            </div>`
           }) 
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



const addButton = document.querySelectorAll(".items_display .btn");
console.log(addButton)

numb.forEach(btn => {
    btn.addEventListener("click", handleClick);
});

function handleClick(event) {
    console.log(event)
}










