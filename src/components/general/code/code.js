/**
 * Code Block component with copy to clipboard functionality
 */

export function initCode() {
    const copyButtons = document.querySelectorAll("[data-code-copy]");

    copyButtons.forEach((button) => {
        button.addEventListener("click", async function () {
            const codeBlock = this.closest(".code");
            const codeElement = codeBlock.querySelector("code");
            const codeText = codeElement.textContent;

            try {
                await navigator.clipboard.writeText(codeText);

                // Add copied state
                this.classList.add("copied");

                // Remove copied state after 2 seconds
                setTimeout(() => {
                    this.classList.remove("copied");
                }, 2000);
            } catch (err) {
                console.error("Failed to copy code:", err);
            }
        });
    });
}
