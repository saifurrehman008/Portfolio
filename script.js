// ========================================
// PORTFOLIO JAVASCRIPT
// ========================================


// Page load animation
document.addEventListener("DOMContentLoaded", () => {

    // Elements that we want to animate
    const elements = document.querySelectorAll(
        "section, .service-card, .portfolio-card"
    );

    // Add reveal class
    elements.forEach((element) => {
        element.classList.add("reveal");
    });


    // Scroll animation
    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );


    // Observe all elements
    elements.forEach((element) => {
        observer.observe(element);
    });


    // Current year automatically
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("contactFormStatus");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const values = new FormData(contactForm);
            const subject = String(values.get("subject") || "Portfolio inquiry");
            const body = [
                `Name: ${values.get("name")}`,
                `Email: ${values.get("email")}`,
                `Phone: ${values.get("phone")}`,
                "",
                String(values.get("message") || "")
            ].join("\n");

            formStatus.textContent = "Your email app will open with your message ready to send.";
            formStatus.hidden = false;
            window.location.href = `mailto:saifiubian2k25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

});


// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector("nav");

    if (window.scrollY > 50) {

        navbar.classList.add("navbar-scrolled");

    } else {

        navbar.classList.remove("navbar-scrolled");

    }

});
// ========================================
// PORTFOLIO FILTER
// ========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active from all buttons
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active to clicked button
        button.classList.add("active");

        // Get selected category
        const filter = button.getAttribute("data-filter");

        // Show / hide portfolio items
        portfolioItems.forEach((item) => {

            if (filter === "all" || item.classList.contains(filter)) {

                item.style.display = "block";

                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                }, 50);

            } else {

                item.style.opacity = "0";
                item.style.transform = "scale(0.9)";

                setTimeout(() => {
                    item.style.display = "none";
                }, 300);

            }

        });

    });

});
