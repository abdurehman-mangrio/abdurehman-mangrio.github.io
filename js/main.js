// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP Register Plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Redesign
const cursor = document.getElementById('custom-cursor');
if (cursor) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    const interactive = document.querySelectorAll('a, button, .project-card, .service-card');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 3,
                backgroundColor: 'var(--secondary)',
                mixBlendMode: 'normal',
                duration: 0.3
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'var(--primary)',
                mixBlendMode: 'difference',
                duration: 0.3
            });
        });
    });
}

// Preloader with GSAP
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const tl = gsap.timeline();

    tl.to(".preloader-logo", {
        scale: 1.5,
        opacity: 0,
        duration: 1,
        ease: "power4.inOut"
    })
    .to(preloader, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut"
    }, "-=0.5")
    .from(".hero-title .highlight, .hero-title .typed-text", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out"
    }, "-=0.5")
    .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, "-=0.8")
    .from(".navbar", {
        y: -100,
        opacity: 0,
        duration: 0.8
    }, "-=1");
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    ScrollTrigger.create({
        start: 'top -50',
        onEnter: () => navbar.classList.add('scrolled'),
        onLeaveBack: () => navbar.classList.remove('scrolled'),
    });
}

// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
if (typedTextSpan) {
    const textArray = ["Full-Stack Developer", "SOC Analyst", "MERN Specialist", "Cyber Expert"];
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 1500);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 60);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, 500);
        }
    }
    setTimeout(type, 2000);
}

// Floating Badges Parallax
gsap.to(".badge-react", {
    y: -20,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "power1.inOut"
});
gsap.to(".badge-node", {
    y: 20,
    repeat: -1,
    yoyo: true,
    duration: 2.5,
    ease: "power1.inOut"
});
gsap.to(".badge-security", {
    y: -15,
    x: 10,
    repeat: -1,
    yoyo: true,
    duration: 3,
    ease: "power1.inOut"
});

// Section Reveal Animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section.querySelectorAll('.section-header > *'), {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
    });
});

// Projects Rendering & Interaction
const featuredProjects = [
    { 
        id: "react-weather", 
        title: "React Weather App", 
        category: "Web App", 
        description: "Real-time weather application providing current updates and forecasts using OpenWeather API.", 
        tech: ["React", "API", "CSS3", "JavaScript"], 
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1000",
        liveUrl: "https://react-weather-app-zeta-lime.vercel.app"
    },
    { 
        id: "coffee-web", 
        title: "Coffee Web Portal", 
        category: "Web Design", 
        description: "Premium responsive landing page for a coffee brand featuring glassmorphism and modern UI.", 
        tech: ["HTML5", "CSS3", "JavaScript", "AOS"], 
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000",
        liveUrl: "https://coffee-web-blond-beta.vercel.app"
    },
    { 
        id: "movie-search", 
        title: "Movie Search Engine", 
        category: "Web App", 
        description: "Dynamic movie database explorer allowing users to search and browse films via TMDB API.", 
        tech: ["React", "REST API", "Tailwind", "Vite"], 
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000",
        liveUrl: "https://movie-search-app-six-tawny.vercel.app"
    },
    { 
        id: "ai-quiz", 
        title: "AI Protected Quiz App", 
        category: "Security", 
        description: "AI-monitored quiz platform featuring advanced security protocols and real-time result tracking.", 
        tech: ["React", "Node.js", "AI", "Socket.io"], 
        image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1000",
        liveUrl: "https://ai-protected-quiz-app.vercel.app"
    }
];

const projectsGrid = document.querySelector('.projects-grid');
if (projectsGrid) {
    featuredProjects.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-image">
                <img src="${p.image}" alt="${p.title}" class="project-img-display">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="project-details.html?id=${p.id}" class="project-link-icon" title="View Details"><i class="fas fa-eye"></i></a>
                        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="project-link-icon" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-info">
                <span class="project-category">${p.category}</span>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-tech">
                    ${p.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);

        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            delay: index * 0.1
        });
    });
}

// Magnetic Elements
const magneticElements = document.querySelectorAll('.btn-primary, .btn-outline, .logo, .theme-toggle-btn');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
        
        if (isOpen) {
            gsap.from(".mobile-menu-links a", {
                x: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    });
}

// Skill Sphere (Existing TagCloud logic integrated)
const initSkillSphere = () => {
    const sphereContainer = document.getElementById('skill-sphere');
    if (sphereContainer && typeof TagCloud !== 'undefined') {
        const skills = [
            'React.js', 'Node.js', 'MongoDB', 'Express.js',
            'Cybersecurity', 'VAPT', 'Python', 'Kali Linux',
            'Android', 'Kotlin', 'Firebase', 'Java',
            'HTML5', 'CSS3', 'JavaScript', 'Git', 'REST API'
        ];
        const radius = window.innerWidth < 768 ? 150 : 200;
        TagCloud('#skill-sphere', skills, {
            radius: radius,
            maxSpeed: 'fast',
            initSpeed: 'normal',
            direction: 135,
            keep: true
        });
    }
};
initSkillSphere();

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        
        const icon = themeToggle.querySelector('i');
        if (next === 'light') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// VanillaTilt Initialization
const initTilt = () => {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
        });
    }
};
initTilt();

// Mobile Menu Logic
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        gsap.from(".mobile-menu-links a", {
            x: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out"
        });
    });
}

if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
}