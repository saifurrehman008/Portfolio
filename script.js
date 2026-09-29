// ========================================
// PORTFOLIO JAVASCRIPT
// ========================================


// Page load animation
document.addEventListener("DOMContentLoaded", () => {

    // Deploy apps-script/Code.gs as a web app, then paste its /exec URL here.
    const GOOGLE_FORM_RELAY_URL = "https://script.google.com/macros/s/AKfycbyYedC9P7rLRTc6QsCphSJK_Ny74_hRFGoATTwfDTPoc25_wN752nEHrYuCFGECCaTi/exec";

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
    const responseFrame = document.querySelector('iframe[name="googleFormResponse"]');
    const submitButton = contactForm?.querySelector('button[type="submit"]');

    if (contactForm && formStatus && responseFrame && submitButton) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!GOOGLE_FORM_RELAY_URL.startsWith("https://script.google.com/macros/s/") || !GOOGLE_FORM_RELAY_URL.endsWith("/exec")) {
                formStatus.textContent = "The form needs its Google Apps Script deployment URL before it can send messages.";
                formStatus.classList.remove("text-green-400");
                formStatus.classList.add("text-red-400");
                formStatus.hidden = false;
                return;
            }

            contactForm.action = GOOGLE_FORM_RELAY_URL;
            formStatus.textContent = "Sending your message…";
            formStatus.classList.remove("text-red-400");
            formStatus.classList.add("text-green-400");
            formStatus.hidden = false;
            submitButton.disabled = true;
            contactForm.submit();
        });

        window.addEventListener("message", (event) => {
            if (event.source !== responseFrame.contentWindow || event.data?.type !== "portfolio-form-result") return;

            submitButton.disabled = false;
            formStatus.textContent = event.data.message;
            formStatus.classList.toggle("text-green-400", event.data.ok);
            formStatus.classList.toggle("text-red-400", !event.data.ok);

            if (event.data.ok) contactForm.reset();
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
