import lozad from "lozad";
import { initMenu } from "../components/general/menu/menu.js";
import { initCode } from "../components/general/code/code.js";

document.addEventListener("DOMContentLoaded", () => {
    // init lozad
    const observerLaze = lozad(".lazy", {
        rootMargin: "200px 200px",
        threshold: 0.1,
        enableAutoReload: true
    });
    observerLaze.observe();

    // init components
    initMenu();
    initCode();
});
