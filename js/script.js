/* 1. LOCAL STORAGE SETTINGS */

const SETTINGS_KEY = "inkImagineSettings";

const DEFAULT_SETTINGS = {
    theme: "light"
};

function loadSettings() {
    try {
        const savedSettings = localStorage.getItem(SETTINGS_KEY);
        if (savedSettings === null) {
            return { ...DEFAULT_SETTINGS };
        }
        const parsedSettings = JSON.parse(savedSettings);
        
        if (
            parsedSettings === null ||
            typeof parsedSettings !== "object" ||
            !["light", "dark"].includes(parsedSettings.theme)
        ) {
            return { ...DEFAULT_SETTINGS };
        }
        return {
            theme: parsedSettings.theme
        };
    } catch (error) {

        return { ...DEFAULT_SETTINGS };

    }

}

let settings = loadSettings();
function applyTheme() {
    document.documentElement.dataset.theme = settings.theme;
}
applyTheme();
function saveSettings() {

     try {
        localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(settings)
        );
    } catch (error) {
        console.error("Unable to save settings:", error);
    }

}
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-toggle");
    const navigation = document.getElementById("site-nav");
    menuButton.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("is-open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });
    navigation.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("is-open");

            menuButton.setAttribute("aria-expanded", "false");
        });
    });
    const themeButton = document.getElementById("theme-toggle");
    function updateThemeButton() {
        if (settings.theme === "dark") {
            themeButton.textContent = "ꕤLight themeꕤ";
        } else {
            themeButton.textContent = "⭐︎Dark theme⭐︎";
        }
    }
    updateThemeButton();
    themeButton.addEventListener("click", function () {

        // Change the current theme
        if (settings.theme === "light") {

            settings.theme = "dark";

        } else {

            settings.theme = "light";

        }

        applyTheme();

        saveSettings();

        updateThemeButton();

    });



   
    const artworks = [

        {
            title: "Dragonfruit in Human Form ⋆˙⟡ ♡",
            description: "A digital portrait of a dragonfruit personified.",
            image: "assets/Dragonfruit.PNG"

        },
        {
            title: "Unique Hairstyle ⋆˙⟡ ♡",
            description: "A project exploring unique hair designs.",
            image: "assets/Cute.png"
        },
        {
            title: "Children's Style Illustration ⋆˙⟡ ♡",
            description: "An illustration made in a children's style.",
            image: "assets/childrenstyle.png"
        },
       
    ];

    const gallery = document.getElementById("skills-list");
    gallery.innerHTML = artworks.map(function (artwork) {
    return `
        <article class="skill-card">
            <img src="${artwork.image}" alt="${artwork.title}">
            <h3>${artwork.title}</h3>
            <p>${artwork.description}</p>
        </article>
    `;
     }).join("");


    const form = document.getElementById("contact-form");

    const nameInput = document.getElementById("name");

    const emailInput = document.getElementById("email");

    const messageInput = document.getElementById("message");

    const formStatus = document.getElementById("form-status");

    function showError(input, errorId, message) {

        document.getElementById(errorId).textContent = message;

        input.setAttribute(
            "aria-invalid",
            message ? "true" : "false"
        );
    }
    function clearErrors() {
        showError(nameInput, "name-error", "");
        showError(emailInput, "email-error", "");
        showError(messageInput, "message-error", "");
        formStatus.textContent = "";
    }
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();
        let isValid = true;
        if (nameInput.value.trim() === "") {
            showError(
                nameInput,
                "name-error",
                "Please enter your name! (╥﹏╥)"
            );
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === "") {
            showError(
                emailInput,
                "email-error",
                "Please enter your email address! (╥﹏╥)"
            );
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(
                emailInput,
                "email-error",
                "Please enter a valid email address! (╥﹏╥)"
            );
            isValid = false;
        }


        if (messageInput.value.trim() === "") {

            showError(
                messageInput,
                "message-error",
                "Please enter your commission details! (╥﹏╥)"
            );
            isValid = false;
        }

        if (isValid === false) {
            formStatus.textContent =
                "Please correct the errors above! (˶ ｰ̀ ⤙ｰ́ ˶)";
            return;
        }
        formStatus.textContent =
            " ˗ˋˏ ♡ ˎˊ˗ Your inquiry has passed validation! Thank you!!!!  ˗ˋˏ ♡ ˎˊ˗";
        form.reset();
    });

    [nameInput, emailInput, messageInput].forEach(function (input) {
        input.addEventListener("input", function () {
            const errorId = input.id + "-error";
            showError(input, errorId, "");
        });
    });

});