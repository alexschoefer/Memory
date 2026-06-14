type Theme = "coding" | "gaming" | "projects" | "food";

let selectedTheme: Theme = "coding";

export function initSettings(): void {
    initThemeSelection();
    loadSavedTheme();
}

/* ---------------------------
   Preview Rendering
---------------------------- */

function setPreview(theme: Theme): void {
    const themeVisual = document.getElementById("theme_visual");

    if (!themeVisual) return;

    themeVisual.className = "settings__theme_visual";
    themeVisual.classList.add(`settings__theme_visual--${theme}`);
}

/* ---------------------------
   LocalStorage
---------------------------- */

function loadSavedTheme(): void {
    const savedTheme = localStorage.getItem("gameTheme");

    if (savedTheme && isTheme(savedTheme)) {
        selectedTheme = savedTheme;
    }

    setPreview(selectedTheme);
}

function handleThemeChange(theme: Theme): void {
    selectedTheme = theme;

    setPreview(theme);

    localStorage.setItem("gameTheme", theme);
}

/* ---------------------------
   Event Binding
---------------------------- */

function initThemeSelection(): void {
    const themeInputs = document.querySelectorAll<HTMLInputElement>(
        'input[name="theme"]'
    );

    themeInputs.forEach((input) => {
        const label = input.closest("label");

        if (!label) return;

        // Hover preview
        label.addEventListener("mouseenter", () => {
            const theme = input.dataset.theme;

            if (theme && isTheme(theme)) {
                setPreview(theme);
            }
        });

        // Back to selected theme
        label.addEventListener("mouseleave", () => {
            setPreview(selectedTheme);
        });

        // Selection change
        input.addEventListener("change", () => {
            const theme = input.dataset.theme;

            if (theme && isTheme(theme)) {
                handleThemeChange(theme);
            }
        });
    });
}

/* ---------------------------
   Type Guard
---------------------------- */

function isTheme(value: string): value is Theme {
    return (
        value === "coding" ||
        value === "gaming" ||
        value === "projects" ||
        value === "food"
    );
}