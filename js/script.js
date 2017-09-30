document.addEventListener('DOMContentLoaded', (e) => {
    let mobileMenu = document.querySelector('.navigation__list');
    let sandwichButton = document.querySelector('.navigation__sandwich-control');

    if (sandwichButton && mobileMenu) {
        sandwichButton.addEventListener('click', (e) => {
            mobileMenu.classList.toggle('navigation__list--show');
        });
    }
});