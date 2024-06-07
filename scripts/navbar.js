const navToggle = document.getElementById("navToggle");
const nav = document.querySelector("nav");
const navIcon = document.querySelectorAll(".nav-icon")
const hamburger = document.getElementById("hamburger")


navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    navIcon.forEach(icon => {
        icon.classList.toggle("hidden");
    })
})


window.addEventListener("resize", () => {
    if (document.body.clientWidth > 720) {
        nav.classList.remove("open");
        navIcon.forEach(icon => {
            icon.classList.add("hidden");
        })
        hamburger.classList.remove("hidden")
    }
})