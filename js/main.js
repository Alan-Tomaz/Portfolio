/* ============= MENU SHOW AND HIDDEN ================  */
const navMenu = document.getElementById('nav-menu'),
    navToogle = document.getElementById('nav-toogle'),
    navClose = document.getElementById('nav-close');

/* ===== MENU SHOW ======  */
// Validate if constant exists
if (navToogle) {
    navToogle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

/* ===== MENU HIDDEN ======  */
// Validate if constant exists
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

/* ===== REMOVE MENU MOBILE ======  */
const navLink = document.querySelectorAll('.nav-link')

function linkAction() {
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ============= SKILLS ================  */
const skillsContent = document.getElementsByClassName("skills-content"),
    skillsHeader = document.querySelectorAll(".skills-header");

function toogleSkills() {
    let itemClass = this.parentNode.className;

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills-content skills-close"
    }

    if (itemClass === 'skills-content skills-close') {
        this.parentNode.className = "skills-content skills-open";
    }
}
skillsHeader.forEach((el) => {
    el.addEventListener("click", toogleSkills);
})

/* ============= QUALIFICATION TABS ================  */
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification-active')
        })
        target.classList.add("qualification-active");

        tabs.forEach(tab => {
            tab.classList.remove("qualification-active");
        })
        tab.classList.add("qualification-active");
    })
})

/* ============= SERVICES MODAL ================  */
const modalViews = document.querySelectorAll(".services-modal"),
    modalBtns = document.querySelectorAll(".services-button"),
    modalCloses = document.querySelectorAll(".services-modal-close");

let modal = function (modalClick) {
    modalViews[modalClick].classList.add("active-modal");
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener("click", () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove("active-modal");
        })
    })
})