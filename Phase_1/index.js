/* ================================
   CONNECTIFY HOMEPAGE JavaScript
   ================================ */

/* 1️⃣ Highlight Active Navigation Link */
const navLinks = document.querySelectorAll("header nav ul li a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

/* 2️⃣ Smooth Scroll Animation for Buttons */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

/* 3️⃣ Floating Pokémon Hover Boost */
const pokemons = document.querySelectorAll(".pokemon");

pokemons.forEach(pokemon => {
    pokemon.addEventListener("mouseenter", () => {
        pokemon.style.transform = "scale(1.3)";
    });

    pokemon.addEventListener("mouseleave", () => {
        pokemon.style.transform = "scale(1)";
    });
});

/* 4️⃣ Sidebar Items Click Effect */
const sidebarItems = document.querySelectorAll(".sidebar-box ul li");

sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        alert("Feature coming soon!");
    });
});

/* 5️⃣ Add Animation When Sections Enter View (Fade–In) */
const allSections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

allSections.forEach(section => observer.observe(section));
