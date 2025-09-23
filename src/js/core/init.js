import lozad from "lozad";

// init lozad
const observerLaze = lozad(".lazy", {
    rootMargin: "200px 200px",
    threshold: 0.1,
    enableAutoReload: true,
});
observerLaze.observe();
