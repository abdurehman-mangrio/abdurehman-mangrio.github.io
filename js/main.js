// AOS Initialization
AOS.init({
    duration: 1000,
    once: true,
    offset: 50,
    easing: 'ease-out-cubic'
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 1200);
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    
    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// Canvas Background Effect
function initCanvasBackground() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('bg-canvas');
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.5 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha})`; // Primary color glow
            ctx.fill();
        });
        
        // Connect particles
        for(let i = 0; i < particles.length; i++) {
            for(let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if(dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 - dist/1500})`; // Secondary color
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(draw);
    }
    draw();
}
initCanvasBackground();

// Featured Projects on Homepage
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
        projectsGrid.innerHTML += `
        <div class="project-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="project-image">
                <img src="${p.image}" alt="${p.title}" class="project-img-display">
            </div>
            <div class="project-info">
                <span class="project-category">${p.category}</span>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-tech">
                    ${p.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="project-details.html?id=${p.id}" class="project-link">View Details <i class="fas fa-arrow-right"></i></a>
                    ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        </div>
        `;
    });

    // Slider Movement Logic
    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollInterval;

    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            if (!isDown) {
                projectsGrid.scrollLeft += 1;
                if (projectsGrid.scrollLeft >= (projectsGrid.scrollWidth - projectsGrid.clientWidth)) {
                    projectsGrid.scrollLeft = 0;
                }
            }
        }, 30);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    projectsGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        projectsGrid.classList.add('active');
        startX = e.pageX - projectsGrid.offsetLeft;
        scrollLeft = projectsGrid.scrollLeft;
        stopAutoScroll();
    });

    projectsGrid.addEventListener('mouseleave', () => {
        isDown = false;
        projectsGrid.classList.remove('active');
        startAutoScroll();
    });

    projectsGrid.addEventListener('mouseup', () => {
        isDown = false;
        projectsGrid.classList.remove('active');
        startAutoScroll();
    });

    projectsGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectsGrid.offsetLeft;
        const walk = (x - startX) * 2;
        projectsGrid.scrollLeft = scrollLeft - walk;
    });

    projectsGrid.addEventListener('mouseenter', stopAutoScroll);
    
    // Initialize auto-scroll
    startAutoScroll();
}

// Testimonials
const testimonials = [
    { name: "Ahmed Raza", initials: "AR", color: "#0ea5e9", position: "Tech Lead, Dubai", content: "Abdul Rehman delivered an outstanding MERN application ahead of schedule. The code quality and modern UI elements exceeded our expectations.", rating: 5 },
    { name: "Sana Mirza", initials: "SM", color: "#8b5cf6", position: "Product Manager, Karachi", content: "Very professional and highly skilled. The cybersecurity assessment provided critical insights that helped secure our platform effectively.", rating: 5 },
    { name: "Usman Khan", initials: "UK", color: "#10b981", position: "Startup Founder, Islamabad", content: "Great communication and a true problem solver. Abdul's full-stack expertise helped us launch our MVP flawlessly on schedule.", rating: 5 },
    { name: "Fatima Siddiqui", initials: "FS", color: "#f59e0b", position: "CEO, TechVault PK", content: "Exceptional work on our e-commerce platform. The performance optimizations alone boosted our conversion rate by 40%. Highly recommended!", rating: 5 }
];

const testimonialsContainer = document.getElementById('testimonials');
if (testimonialsContainer) {
    testimonialsContainer.innerHTML = testimonials.map((t, index) => `
        <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <i class="fas fa-quote-left"></i>
            <p>"${t.content}"</p>
            <div class="testimonial-author">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,${t.color},${t.color}aa);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;color:#fff;flex-shrink:0;font-family:'Space Grotesk',sans-serif;">${t.initials}</div>
                    <div>
                        <strong>${t.name}</strong><br>
                        <small>${t.position}</small>
                    </div>
                </div>
                <div class="rating">${'★'.repeat(t.rating)}</div>
            </div>
        </div>
    `).join('');
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Number Counter Animation
const counters = document.querySelectorAll('.counter-value');
const speed = 200; // The lower the slower

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '').replace('%', '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (counter.getAttribute('data-suffix') || '');
            }
        };
        updateCount();
    });
};

const observerOptions = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.hero-stats');
const factsSection = document.querySelector('.facts-grid');

if (statsSection) {
    observer.observe(statsSection);
}
if (factsSection) {
    observer.observe(factsSection);
}

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
if (typedTextSpan) {
    const textArray = ["Full-Stack Developer", "SOC Analyst", "MERN Specialist", "Cyber Expert"];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    setTimeout(type, newTextDelay + 250);
}

// 3D Tilt Initialization
const initTilt = () => {
    if (typeof VanillaTilt !== 'undefined') {
        const elements = document.querySelectorAll(".project-card, .service-card, .expertise-card, .fact-card, .blog-card, .timeline-content, .contact-info-card, .cert-card, .tool-item, .testimonial-card");
        if (elements.length > 0) {
            VanillaTilt.init(elements, {
                max: 12,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                perspective: 1000,
            });
        }
    }
};

// Initialize on load and after dynamic content
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initTilt, 500); // Small delay to ensure elements are rendered
    
    // 3D TagCloud Sphere Initialization
    const sphereContainer = document.getElementById('skill-sphere');
    if (sphereContainer && typeof TagCloud !== 'undefined') {
        const skills = [
            'React.js', 'Node.js', 'MongoDB', 'Express.js',
            'Cybersecurity', 'VAPT', 'Python', 'Kali Linux',
            'Android', 'Kotlin', 'Firebase', 'Java',
            'HTML5', 'CSS3', 'JavaScript', 'Git', 'REST API'
        ];
        const calculateRadius = () => {
            const width = window.innerWidth;
            if (width < 480) return 130;
            if (width < 768) return 150;
            return 180;
        };

        TagCloud('#skill-sphere', skills, {
            radius: calculateRadius(),
            maxSpeed: 'normal',
            initSpeed: 'normal',
            direction: 135,
            keep: true
        });
    }

    // Back to Top Button Injection
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll Progress Indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.id = 'scroll-progress';
    document.body.prepend(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
        scrollProgress.style.width = scrolled;
    });

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.btn-primary, .btn-outline, .submit-btn');
    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', function(e) {
            const position = magnet.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        magnet.addEventListener('mouseout', function(e) {
            magnet.style.transform = 'translate(0px, 0px)';
        });
    });

    // Custom Smooth Cursor Logic
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Click Ripple Wave Effect
        document.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 800);
        });
    }
});

// Since projects page renders dynamically, we can also hook into that if needed.

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            if(icon) icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            if(icon) icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
}

// ── Auto Lazy-Load all images ────────────────────────────────────
document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// ── PWA Service Worker Registration ────────────────────────────────────
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
            console.log('SW Registration failed: ', err);
        });
    });
}