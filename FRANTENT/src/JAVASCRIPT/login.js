// src/JAVASCRIPT/login.js
export function setupLogin() {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    if (!registerBtn || !loginBtn) {
        console.log("Buttons not found! Check your HTML IDs.");
        return;
    }
    console.log("in js file ")

    registerBtn.addEventListener("click", () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
        container.classList.remove("active");
    });
}
