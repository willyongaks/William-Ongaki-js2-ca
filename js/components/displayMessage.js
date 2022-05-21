export function displayMessage() {
    const element = document.querySelector(".menu_container");

    element.innerHTML = ` <div class="message error">Check that you have filled in the correct information/The required fields below</div>`
}