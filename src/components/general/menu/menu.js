export function initMenu() {
    const menuToggles = document.querySelectorAll('[data-toggle="menu"]');
    const menuDropdown = document.querySelector('[data-dropdown="menu"]');
    if (!menuToggles.length || !menuDropdown) return;

    const body = document.body;

    const closeDropdown = () => {
        menuToggles.forEach((btn) => btn.classList.remove("is-active"));
        menuDropdown.classList.remove("is-open");
        body.classList.remove("is-fixed")
    };

    const toggleDropdown = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isActive = menuDropdown.classList.toggle("is-open");
        menuToggles.forEach((btn) => btn.classList.toggle("is-active", isActive));
        body.classList.toggle("is-fixed", isActive);
    };

    menuToggles.forEach((btn) => {
        btn.addEventListener("click", toggleDropdown);
    });

    document.addEventListener("click", (event) => {
        if ([...menuToggles].some((btn) => btn.contains(event.target)) || menuDropdown.contains(event.target)) return;
        closeDropdown();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeDropdown();
    });
}
