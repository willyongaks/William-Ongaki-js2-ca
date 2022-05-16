export function createMenu(){

    const { pathname } = document.location;

    console.log(pathname)








    const container = document.querySelector(".menu");




    container.innerHTML = `
                            <div class="main_navigation">
                             <a href="/" class="${pathname === "/" ? "active" : ""}">Home</a>
                            <a href="/favs.html" class="${pathname === "/favs.html" ? "active" : ""}">Favourites</a>
                            </div>`;
};