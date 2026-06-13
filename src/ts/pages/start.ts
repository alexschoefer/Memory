/**
 * Function to initialize the start page. 
 * It checks if there is a current page and theme stored in localStorage and sets them accordingly. 
 * If not, it defaults to the start page and theme.
 * @returns 
 */
export function init() {
    let currentPage = localStorage.getItem("currentPage");
    let currentTheme = localStorage.getItem("currentTheme");

    if (currentPage && currentPage) {
        showCurrentPage(currentPage);
        setCurrentTheme(currentTheme!);
        return;
    }

    showCurrentPage("start-page");
    setCurrentTheme("start-theme");
}


/**
 * Function to show the current page. It toggles the "page--active" class on the page elements based on the provided id.
 * It also sets the data-theme attribute on the body and stores the current page in localStorage.
 * @param id 
 */
export function showCurrentPage(id: string) {
    const pages = document.querySelectorAll<HTMLElement>(".page");
    console.log(pages);

    pages.forEach((page) => {
        page.classList.toggle("page--active", page.id === id);
    });
    document.body.setAttribute("data-theme", id);
    localStorage.setItem("currentPage", id);
}


/**
 * Function to set the current theme. It sets the data-theme attribute on the body and stores the current theme in localStorage.
 * @param theme 
 */
export function setCurrentTheme(theme: string) {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("currentTheme", theme);
}