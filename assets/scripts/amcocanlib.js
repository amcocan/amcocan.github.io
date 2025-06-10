// Property of amcocan
//
// This will be a library of functions I will often use.
// Not all the functions found here will be in use for every project.
//
// Here is a list of all the functions activly in use for this project.
//
// Active Functions:
// - Dark Mode Toggle
// - Parallax Scroll Effect 
// - Scroll To Top Effect
// - Smooth Scroll Effect
// - Dynamic Year Update
// - Site Click Reload
// - Pending Content Alert
// - Email Obfuscation Script
// - Custom Console Logger

// ======= Dark Mode Toggle =======
// This script toggles between light and dark themes based on user preference or system settings. It uses localStorage to remember the user's choice and applies the appropriate theme on page load. It also provides a toggle button to switch between themes manually.
// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    
    // Theme Variables
    const sunIcon = document.querySelector(".sun");
    const moonIcon = document.querySelector(".moon");
    const toggleButtons = document.querySelectorAll(".theme-toggle");
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Function to log the current theme state to the console
    const themeLogger = () => {
        // Clear the console
        console.clear();
        // Log all values of the theme variable to the console
        const logging = [
            {Variable: 'userTheme', Value: localStorage.getItem("theme")},
            {Variable: 'systemTheme', Value: window.matchMedia("(prefers-color-scheme: dark)").matches},
            {Variable: 'currentTheme', Value: document.documentElement.getAttribute("data-theme")},
            {Variable: 'toggleButtonState', Value: Array.from(toggleButtons).map(btn => btn.classList.contains("hidden") ? "hidden" : "visible").join(", ")},
            {Variable: 'sunIconState', Value: sunIcon.classList.contains("hidden") ? "hidden" : "visible"},
            {Variable: 'moonIconState', Value: moonIcon.classList.contains("hidden") ? "hidden" : "visible"},
        ];
        // Log Title
        console.log("%cTheme Variables & Values", "font-size: 20px; font-weight: bold; color: lightblue;");
        // Log the current theme state to the console
        console.table(logging);
    };

    // Function to toggle the theme based on the current data-theme attribute
    const toggleCases = (theme) => {
        switch (theme) {
            case "light":
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("theme", "light");
                moonIcon.classList.remove("hidden");
                sunIcon.classList.add("hidden");
                break;
            case "dark":
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                sunIcon.classList.remove("hidden");
                moonIcon.classList.add("hidden");
                break;
            default:
                document.documentElement.setAttribute("data-theme", systemTheme ? "dark" : "light");
                break;
        }
    };

    // Initialize theme based on user preference or system setting
    const initTheme = () => {
        toggleButtons.forEach(btn => btn.classList.remove("hidden"));

        // If user has a theme set in local storage, use that or use the system preference
        if (userTheme) {
            toggleCases(userTheme);
        } else {
            toggleCases(systemTheme ? "dark" : "light");
        }
        // Log the current theme state to the console
        themeLogger();
    };

    // Manual theme toggle function
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        toggleCases(currentTheme === "dark" ? "light" : "dark");
        // Log the current theme state to the console
        themeLogger();
    };

    // Call toggleTheme on click event for all toggle buttons
    toggleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            toggleTheme();
        });
    });

    // Initialize theme
    initTheme();

});

// ======= End of Dark Mode Toggle =======

// ======= Parallax Scroll Effect =======
// This script creates a parallax scrolling effect on elements with the class "parallax". 
// It adjusts the background position of these elements based on the scroll position of the window.
// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Select all elements with the class "parallax".
    const parallaxElements = document.querySelectorAll(".parallax");
    
    // Parallax Scroll Effect function
    const parallaxScroll = () => {
        parallaxElements.forEach((element) => {
            const speed = element.getAttribute("data-speed") || 0.5;
            const offset = window.scrollY * speed;
            element.style.backgroundPositionY = `${offset}px`;
        });
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", parallaxScroll);
});

// ======= End of Parallax Scroll Effect =======

// ======= Scroll To Top Effect =======
// This script creates a "Scroll to Top" button that appears when the user scrolls down the page. When clicked, it smoothly scrolls the user back to the top of the page. The button is hidden when the user is at the top of the page.
// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    const scrollToTop = document.getElementById('scroll-to-top');
    // Scroll to top logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            scrollToTop.classList.remove('hidden');
        } else {
            scrollToTop.classList.add('hidden');
        }
    });
    // Scroll to top button click event
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ======= End of Scroll To Top Effect =======

// ======= Smooth Scroll Effect =======
// This script enables smooth scrolling for anchor links on the page. When an anchor link is clicked, the page will scroll smoothly to the target section instead of jumping directly to it.
// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Select all anchor links with a hash in the href attribute
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    // Smooth scroll logic
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = link.getAttribute('href'); // Get the target section ID
            const targetSection = document.querySelector(targetId); // Select the target section

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target section smoothly
            }
        });
    });
});

// ======= End of Smooth Scroll Effect =======

// ======= Dynamic Year Update =======
// This script updates the text content of the element with the ID 'current-year' to the current year. Used to keep the copyright year up to date automatically.
// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ======= End of Dynamic Year Update =======

// ======= Site Click Reload =======
// This script adds a click event listener to the element with the ID 'site-title'. When the site title is clicked, it checks if a global function 'amcocanSiteTitleReload' exists. If the function exists, it is called. This allows for custom reload or refresh logic when the site title is clicked.
document.addEventListener('DOMContentLoaded', () => {
    const siteReload = document.getElementById('site-reload');
    if (siteReload) {
        siteReload.addEventListener('click', () => {
            window.location.reload();
        });
    }
});

// ======= End of Site Click Reload =======

// ======= Pending Content Alert =======
// This script adds a click event listener to all elements with IDs starting with 'pending-content'. When clicked, it alerts the user that the content is not yet available.
document.addEventListener('DOMContentLoaded', () => {
    const pendingContents = document.querySelectorAll('[id^="pending-content"]');
    pendingContents.forEach(pendingContent => {
        pendingContent.addEventListener('click', () => {
            alert('This content is not yet available. Please check back later.');
        });
    });
});

// ======= End of Pending Content Alert =======

// ======= Email Obfuscation Script =======
// This script obfuscates email addresses to prevent spam bots from harvesting them. It uses Base64 encoding to encode the email address and decodes it on page load to set the mailto link.
document.addEventListener('DOMContentLoaded', () => {
    const encodedEmail = "bWVAYW1jb2Nhbi5vbmxpbmU=";
    const emailLinks = document.querySelectorAll('[id^="emailLink"]');

    emailLinks.forEach(emailLink => {

        try {
            // Decode the Base64 string to get the original email
            const decodedEmail = atob(encodedEmail);
            // Set the href attribute for the mailto link
            emailLink.href = 'mailto:' + decodedEmail;
            // Only set the visible text if the email link does not contain an SVG element
            if (!emailLink.querySelector('svg')) {
                emailLink.textContent = decodedEmail;
            }
        } catch (e) {
            // Error handling if decoding fails (e.g., malformed Base64 string)
            console.error("Failed to decode email address:", e);
            emailLink.textContent = "Error displaying email. Please try again later.";
            emailLink.removeAttribute('href');
        }
    });
});

// ======= End of Email Obfuscation Script =======