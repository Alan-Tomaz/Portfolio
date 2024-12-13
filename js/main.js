/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Evita o comportamento padrão do link
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth' // Ativa o scroll suavizado
            });
        }
    });
});

/* ADD HEADER BORDER  */
function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* CHANGE THEME */
const themeButton = document.querySelector("#theme-button");

function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeButton.classList.remove("uil-moon");
        themeButton.classList.add("uil-sun")
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        themeButton.classList.add("uil-moon");
        themeButton.classList.remove("uil-sun")
    }
}

/* Check if has some user theme preference */
let selectedTheme = localStorage.getItem('selected-theme')

// Detecta o tema do navegador
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Aplica o tema inicial
/* Try to put the preferenced theme, if not can, choose the navigator theme */
applyTheme(selectedTheme != null ? selectedTheme : prefersDarkScheme.matches ? "dark" : "light");

// Adiciona um listener para alterações no tema do sistema
prefersDarkScheme.addEventListener("change", (e) => {
    applyTheme(e.matches ? "dark" : "light");
});

themeButton.addEventListener("click", () => {
    if (themeButton.classList.contains("uil-moon")) {
        themeButton.classList.remove("uil-moon");
        themeButton.classList.add("uil-sun")
        selectedTheme = "dark";
        localStorage.setItem('selected-theme', selectedTheme)
        applyTheme(selectedTheme)
    } else {
        themeButton.classList.add("uil-moon");
        themeButton.classList.remove("uil-sun")
        selectedTheme = "light";
        localStorage.setItem('selected-theme', selectedTheme)
        applyTheme(selectedTheme)
    }
})

/* CHANGE PAGE LANGUAGE */
const changeLanguage = (language) => {
    const basePath = window.location.pathname.split("/").slice(0, -2).join("/");
    switch (language) {
        case 'pt-br':
            window.location.href = `${basePath}/pt/index.html`;
            break;
        case 'en-us':
            window.location.href = `${basePath}/en/index.html`;
            break;
        default:
            window.location.href = `${basePath}/en/index.html`;
            break
    }
}

/* SHOW LANGUAGE POPUP */
const popupArrow = document.querySelector("#popup-activation__arrow");
const popupBox = document.querySelector("#popup-trigger");
const popup = document.querySelector("#change-language__popup");
let isPopupOpen = false;
let popupTimeout;

/* OPEN POPUP */
function showPopup() {
    popupArrow.classList.add("popup-activation__arrow--activate")
    popup.classList.remove('popup-hidden');
    popup.classList.add('popup-visible');
    /* Clear Time Out */
    clearTimeout(popupTimeout)
    isPopupOpen = true;
    popupBox.removeEventListener('click', showPopup);
    popupBox.addEventListener('click', hidePopup);
}

/* HIDE POPUP */
function hidePopup() {
    popupArrow.classList.remove("popup-activation__arrow--activate")
    popup.classList.remove('popup-visible');
    isPopupOpen = false;
    popupBox.removeEventListener('click', hidePopup);
    popupBox.addEventListener('click', showPopup);
    popupTimeout = setTimeout(() => {
        popup.classList.add('popup-hidden');
        popupTimeout = null;
    }, 500); // Tempo deve corresponder à duração do transition no CSS
}

/* ARIR POPUP */
popupBox.addEventListener('click', showPopup);


// Fechar o popup ao clicar fora dele
document.addEventListener('click', (event) => {
    console.log(event.target)
    // if not be the popupbox element or your childs, the popup is closed
    if (isPopupOpen && !popupBox.contains(event.target)) {
        hidePopup();
    }
});

/* SHOW SCROLL UP */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll-up');
    else scrollUp.classList.remove('show-scroll-up')
}
window.addEventListener('scroll', scrollUp)

/* MODAL */
/* OPEN SERVICES MODAL */
const modal = document.querySelector("#modal");
const modalFrontend = document.querySelector("#modal-frontend");
const modalBackend = document.querySelector("#modal-backend");

let isModalOpen = false;
let modalTimeout;

function openModal(option) {
    modal.classList.remove('modal-hidden');
    modal.classList.add('active-modal');
    /* Clear Time Out */
    clearTimeout(modalTimeout)
    isPopupOpen = true;

    switch (option) {
        case 0:
            modalBackend.classList.add('modal-hidden');
            break;
        case 1:
            modalFrontend.classList.add('modal-hidden');
            break;
    }
}

/* CLOSE SERVICES MODAL */
function closeModal() {
    modal.classList.remove('active-modal');
    isModalOpen = false;
    modalTimeout = setTimeout(() => {
        modalFrontend.classList.remove('modal-hidden');
        modalBackend.classList.remove('modal-hidden');
    }, 300);
}