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

/* 7️⃣ AI Assistant System Logic */
const onboardingOverlay = document.getElementById('onboarding-overlay');
const onboardingText = document.getElementById('onboarding-text');
const nextBtn = document.getElementById('onboarding-next');
const skipBtn = document.getElementById('onboarding-skip');
const helperBtn = document.getElementById('ai-assistant-helper');
const charPika = document.getElementById('char-pika');
const charEevee = document.getElementById('char-eevee');

let currentStep = 0;
let isTyping = false;

const onboardingSteps = [
    {
        speaker: 'pika',
        text: "Pika-pika! [POKÉ-AI SYSTEM INITIALIZED] Welcome, Trainer! I am System A-1, your primary networking assistant. I've scanned the network and found many opportunities for you!",
        target: null
    },
    {
        speaker: 'eevee',
        text: "And I am System A-2! I'll be handling your adaptability and growth protocols. Together, we'll make sure you become the top-tier Trainer in the professional world!",
        target: null
    },
    {
        speaker: 'pika',
        text: "Accessing Navigation Module... Use this uplink to explore different sectors like your Trainer Card and the Battle Gyms. Stay connected!",
        target: "header"
    },
    {
        speaker: 'eevee',
        text: "Scanning Trainer Status... This Snapshot displays your current influence level. Keep track of your views and connections here.",
        target: ".trainer-snapshot"
    },
    {
        speaker: 'pika',
        text: "Opening Feed Channel... This is where you transmit your achievements and research to other Trainers in the network.",
        target: ".post-creator"
    },
    {
        speaker: 'eevee',
        text: "Analyzing External Clusters... Check these sectors for specialized Groups and Newsletters to optimize your knowledge base.",
        target: ".left-sidebar .sidebar-box:nth-child(2)"
    },
    {
        speaker: 'pika',
        text: "Monitoring Market Trends... The right-side interface highlights career surges and hiring signals. Don't miss out, Trainer!",
        target: ".right-sidebar"
    },
    {
        speaker: 'eevee',
        text: "All systems go! We'll remain in your system as your AI assistants. You can summon us anytime via the helper icon in the corner!",
        target: null
    }
];

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        onboardingText.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        isTyping = true;
        setTimeout(() => {
            typeWriter(text, i + 1, fnCallback);
        }, 30);
    } else if (typeof fnCallback == 'function') {
        isTyping = false;
        setTimeout(fnCallback, 700);
    }
}

function updateOnboarding() {
    if (isTyping) return;

    // Remove previous highlights
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));

    const step = onboardingSteps[currentStep];

    // Update active speaker
    charPika.classList.remove('active-speaker');
    charEevee.classList.remove('active-speaker');
    if (step.speaker === 'pika') charPika.classList.add('active-speaker');
    else charEevee.classList.add('active-speaker');

    // Run Typewriter
    typeWriter(step.text, 0);

    if (step.target) {
        const targetEl = document.querySelector(step.target);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.classList.add('tutorial-highlight');
        }
    }

    if (currentStep === onboardingSteps.length - 1) {
        nextBtn.innerHTML = 'Complete Protocol <i class="fas fa-check"></i>';
    } else {
        nextBtn.innerHTML = 'Next Module <i class="fas fa-arrow-right"></i>';
    }
}

function startOnboarding() {
    onboardingOverlay.classList.add('active');
    document.body.classList.add('tutorial-active');
    currentStep = 0;
    updateOnboarding();
}

nextBtn.addEventListener('click', () => {
    if (isTyping) return;
    currentStep++;
    if (currentStep < onboardingSteps.length) {
        updateOnboarding();
    } else {
        endOnboarding();
    }
});

skipBtn.addEventListener('click', endOnboarding);
helperBtn.addEventListener('click', startOnboarding);

function endOnboarding() {
    onboardingOverlay.classList.remove('active');
    document.body.classList.remove('tutorial-active');
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    localStorage.setItem('onboardingCompleted', 'true');
}

// Initial session check
window.addEventListener('load', () => {
    if (!localStorage.getItem('onboardingCompleted')) {
        setTimeout(startOnboarding, 1500);
    }
});

// Cursor animation CSS
const style = document.createElement('style');
style.textContent = `
    .cursor {
        animation: blink 0.7s infinite;
        color: #00f2ff;
        font-weight: bold;
        margin-left: 2px;
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

