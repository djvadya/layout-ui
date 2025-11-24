import lozad from "lozad";
import { initMenu } from "../../components/general/menu/menu.js";
import { initCode } from "../../components/general/code/code.js";

// init lozad
const observerLaze = lozad(".lazy", {
    rootMargin: "200px 200px",
    threshold: 0.1,
    enableAutoReload: true,
});
observerLaze.observe();

// init components
document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initCode();
});
