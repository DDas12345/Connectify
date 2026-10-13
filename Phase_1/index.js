/* ================================
   CONNECTIFY HOMEPAGE JavaScript
   ================================ */

const navLinks = document.querySelectorAll("header nav ul li a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

const pokemons = document.querySelectorAll(".pokemon");
pokemons.forEach(pokemon => {
    pokemon.addEventListener("mouseenter", () => {
        pokemon.style.transform = "scale(1.3)";
    });

    pokemon.addEventListener("mouseleave", () => {
        pokemon.style.transform = "scale(1)";
    });
});

function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2200);
}

const sidebarItems = document.querySelectorAll(".sidebar-box ul li");
sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
        const text = item.textContent.trim();
        showToast(`${text} is ready for the next update.`);
    });
});

const allSections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

allSections.forEach(section => observer.observe(section));

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

if (menuIcon && navMenu) {
    menuIcon.addEventListener("click", () => {
        navMenu.classList.toggle("active");
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

const feedSearch = document.getElementById("feed-search");
const filterButtons = document.querySelectorAll(".filter-pill");
const feedPosts = document.querySelectorAll(".feed-post");

function applyFeedFilters() {
    const query = (feedSearch?.value || "").toLowerCase().trim();
    const activeFilter = document.querySelector(".filter-pill.active")?.dataset.filter || "all";

    feedPosts.forEach(post => {
        const text = post.textContent.toLowerCase();
        const matchesSearch = !query || text.includes(query);
        const matchesFilter = activeFilter === "all" || post.dataset.topic === activeFilter;
        post.classList.toggle("hidden", !(matchesSearch && matchesFilter));
    });
}

if (feedSearch) {
    feedSearch.addEventListener("input", applyFeedFilters);
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        applyFeedFilters();
    });
});

const composerInput = document.getElementById("composer-input");
const composerCounter = document.getElementById("composer-counter");
const createPostBtn = document.querySelector(".create-post-btn");
const publishBtn = document.querySelector(".publish-btn");

if (composerInput && composerCounter) {
    composerInput.addEventListener("input", () => {
        composerCounter.textContent = `${composerInput.value.length} / 260`;
    });
}

if (createPostBtn && composerInput) {
    createPostBtn.addEventListener("click", () => {
        composerInput.focus();
        composerInput.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

if (publishBtn && composerInput && composerCounter) {
    publishBtn.addEventListener("click", () => {
        const message = composerInput.value.trim();
        if (!message) {
            showToast("Write a trainer update before publishing.");
            composerInput.focus();
            return;
        }

        const feed = document.getElementById("feed-posts");
        const newPost = document.createElement("article");
        newPost.className = "feed-post";
        newPost.dataset.topic = "mentor";
        newPost.innerHTML = `
            <div class="post-header">
                <img src="https://i.pinimg.com/736x/fa/71/70/fa717003033a844eb6aa4970fc2acbcd.jpg" class="post-avatar" alt="You">
                <div class="post-meta">
                    <h4>Debanshika Das <span class="badge"><i class="fas fa-certificate"></i> Verified</span></h4>
                    <p>Trainer Update | Proud progress</p>
                </div>
                <i class="fas fa-ellipsis-h more"></i>
            </div>
            <div class="post-content">
                <p>${message}</p>
            </div>
            <div class="post-actions">
                <span class="like-button"><i class="far fa-heart"></i> <span class="like-count">0</span> Likes</span>
                <span><i class="far fa-comment"></i> 0 Comments</span>
                <span><i class="fas fa-share-alt"></i> Share</span>
            </div>
        `;

        feed.prepend(newPost);
        composerInput.value = "";
        composerCounter.textContent = "0 / 260";

        newPost.querySelector(".like-button").addEventListener("click", () => {
            newPost.querySelector(".like-button").classList.toggle("liked");
            const likeCount = newPost.querySelector(".like-count");
            let count = Number.parseInt(likeCount.textContent, 10) || 0;
            count += newPost.querySelector(".like-button").classList.contains("liked") ? 1 : -1;
            likeCount.textContent = count;
        });

        showToast("Your training update is live.");
    });
}

document.querySelectorAll(".like-button").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");
        const counter = button.querySelector(".like-count");
        if (!counter) return;

        const raw = counter.textContent.trim();
        const currentValue = raw.includes("k") ? parseFloat(raw) * 1000 : Number.parseFloat(raw) || 0;
        const adjusted = button.classList.contains("liked") ? currentValue + 1 : Math.max(currentValue - 1, 0);
        counter.textContent = adjusted >= 1000 ? `${(adjusted / 1000).toFixed(1)}k` : adjusted;
    });
});

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
    } else if (typeof fnCallback === 'function') {
        isTyping = false;
        setTimeout(fnCallback, 700);
    }
}

function updateOnboarding() {
    if (isTyping || !onboardingText || !charPika || !charEevee) return;

    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));

    const step = onboardingSteps[currentStep];

    charPika.classList.remove('active-speaker');
    charEevee.classList.remove('active-speaker');
    if (step.speaker === 'pika') charPika.classList.add('active-speaker');
    else charEevee.classList.add('active-speaker');

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
    if (!onboardingOverlay) return;
    onboardingOverlay.classList.add('active');
    document.body.classList.add('tutorial-active');
    currentStep = 0;
    updateOnboarding();
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (isTyping) return;
        currentStep++;
        if (currentStep < onboardingSteps.length) {
            updateOnboarding();
        } else {
            endOnboarding();
        }
    });
}

if (skipBtn) skipBtn.addEventListener('click', endOnboarding);
if (helperBtn) helperBtn.addEventListener('click', startOnboarding);

function endOnboarding() {
    if (!onboardingOverlay) return;
    onboardingOverlay.classList.remove('active');
    document.body.classList.remove('tutorial-active');
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
    localStorage.setItem('onboardingCompleted', 'true');
}

window.addEventListener('load', () => {
    if (!localStorage.getItem('onboardingCompleted')) {
        setTimeout(startOnboarding, 1500);
    }
});

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

