// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create hamburger button if it doesn't exist
    const navbar = document.querySelector('.navbar');
    if (!document.querySelector('.hamburger')) {
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;
        navbar.insertBefore(hamburger, navbar.firstChild.nextSibling);
    }

    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .hamburger {
                display: block;
                cursor: pointer;
            }

            .bar {
                display: block;
                width: 25px;
                height: 3px;
                margin: 5px auto;
                background-color: #333;
                transition: all 0.3s ease;
            }

            .hamburger.active .bar:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active .bar:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }

            .hamburger.active .bar:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }

            .nav-links {
                position: fixed;
                left: -100%;
                top: 70px;
                gap: 0;
                flex-direction: column;
                background-color: white;
                width: 100%;
                text-align: center;
                padding: 1rem 0;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                transition: 0.3s;
            }

            .nav-links.active {
                left: 0;
            }

            .nav-links li {
                margin: 1rem 0;
            }

            .navbar {
                padding: 1rem;
            }

            .logo h1 {
                font-size: 1.5rem;
            }
        }

        @media (min-width: 769px) {
            .hamburger {
                display: none;
            }

            .nav-links {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Make content responsive
    const mainContent = document.querySelector('main');
    if (mainContent) {
        const contentStyle = document.createElement('style');
        contentStyle.textContent = `
            @media (max-width: 768px) {
                .products-grid {
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                }

                .search-filter {
                    flex-direction: column;
                    align-items: center;
                }

                .search-filter input,
                .search-filter select {
                    width: 100%;
                    max-width: 300px;
                }

                .product-card {
                    margin: 1rem;
                }

                .contact-form {
                    padding: 1rem;
                }

                .info-grid {
                    grid-template-columns: 1fr;
                }

                .team-grid {
                    grid-template-columns: 1fr;
                }

                .achievements-grid {
                    grid-template-columns: 1fr;
                }
            }

            @media (max-width: 480px) {
                .hero-content h1 {
                    font-size: 2rem;
                }

                .hero-content p {
                    font-size: 1rem;
                }

                .product-card img {
                    height: 150px;
                }

                .footer-content {
                    grid-template-columns: 1fr;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(contentStyle);
    }
}); 