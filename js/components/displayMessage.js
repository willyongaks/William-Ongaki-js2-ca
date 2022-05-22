export function displayMessage() {
    const element = document.querySelector(".product_container");

    element.innerHTML += ` <div class="message error">An error occured with please try later</div>`
}