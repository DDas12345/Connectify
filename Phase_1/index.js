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

/* 6️⃣ Mobile Menu Toggle */
const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

if (menuIcon && navMenu) {
    menuIcon.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        // Change icon between bars and times
        const icon = menuIcon.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });
}

/* 7️⃣ Onboarding Tutorial Logic */
const onboardingOverlay = document.getElementById('onboarding-overlay');
const onboardingText = document.getElementById('onboarding-text');
const nextBtn = document.getElementById('onboarding-next');
const skipBtn = document.getElementById('onboarding-skip');

let currentStep = 0;

const onboardingSteps = [
    {
        text: "Pika-pika! Welcome to PokéLink, Trainer! I'm Pikachu, and this is Eevee. We'll help you navigate your new professional journey!",
        target: null
    },
    {
        text: "First, use the navigation menu to explore different areas like your Profile and the Battle Gyms!",
        target: "header"
    },
    {
        text: "This is your Trainer Snapshot. It shows your basic info and how many other Trainers have viewed your profile!",
        target: ".trainer-snapshot"
    },
    {
        text: "In the main Feed, you can share your catches, battle victories, and research with the community!",
        target: ".post-creator"
    },
    {
        text: "Here you can find specialized Groups for developers and mentors, and stay updated with the latest Newsletters.",
        target: ".left-sidebar .sidebar-box:nth-child(2)"
    },
    {
        text: "Keep an eye on Market News and Hiring opportunities on the right side to grow your career!",
        target: ".right-sidebar"
    },
    {
        text: "You're all set! Go forth and become the very best Trainer in the professional world! Pika!",
        target: null
    }
];

function updateOnboarding() {
    // Remove previous highlights
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
    });

    const step = onboardingSteps[currentStep];
    onboardingText.textContent = step.text;

    if (step.target) {
        const targetEl = document.querySelector(step.target);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.classList.add('tutorial-highlight');
            onboardingOverlay.style.background = 'rgba(0, 0, 0, 0.4)'; // Dimmer when highlighting
        }
    } else {
        onboardingOverlay.style.background = 'rgba(0, 0, 0, 0.75)';
    }

    if (currentStep === onboardingSteps.length - 1) {
        nextBtn.innerHTML = 'Finish <i class="fas fa-check"></i>';
    } else {
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    }
}

function startOnboarding() {
    if (!localStorage.getItem('onboardingCompleted')) {
        onboardingOverlay.classList.add('active');
        document.body.classList.add('tutorial-active');
        updateOnboarding();
    }
}

nextBtn.addEventListener('click', () => {
    currentStep++;
    if (currentStep < onboardingSteps.length) {
        // Animate the text change
        onboardingText.style.opacity = '0';
        setTimeout(() => {
            updateOnboarding();
            onboardingText.style.opacity = '1';
        }, 300);
    } else {
        endOnboarding();
    }
});

skipBtn.addEventListener('click', endOnboarding);

function endOnboarding() {
    onboardingOverlay.classList.remove('active');
    document.body.classList.remove('tutorial-active');
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
    });
    localStorage.setItem('onboardingCompleted', 'true');
}

// Start tutorial on load
window.addEventListener('load', () => {
    setTimeout(startOnboarding, 1000); // Small delay for effect
});

// Add CSS for text fade transition
const style = document.createElement('style');
style.textContent = `
    #onboarding-text {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

