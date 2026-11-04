// Form Elements
const form = document.getElementById("ticket-form");
const avatarInput = document.getElementById("avatar");
const nameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const githubInput = document.getElementById("github");

// Validation Rules
const MAX_SIZE = 500 * 1024;

// Display Error Messages
function showError(input, messageElement, message) {
    input.classList.add("invalid");
    messageElement.textContent = message;
}

// Clear Error Messages
function clearError(input, messageElement) {
    input.classList.remove("invalid");
    messageElement.textContent = "";
}

// Error Message Elements
const avatarMessage = document.getElementById("avatar_message");
const nameMessage = document.getElementById("fullname_message");
const emailMessage = document.getElementById("email_message");
const githubMessage = document.getElementById("github_message");

// Validate Full Name
function validateName() {
    const name = nameInput.value.trim();

    if (name === "") {
        showError(nameInput, nameMessage, "Please enter your full name.");
        return false;
    } else {
        clearError(nameInput, nameMessage);
        return true;
    }
}

// Validate Email Address
function validateEmail() {
    const email = emailInput.value.trim();

    if (email === "") {
        showError(emailInput, emailMessage, "Please enter your email address.");
        return false;
    } else if (!emailInput.checkValidity()) {
        showError(emailInput, emailMessage, "Please enter a valid email address.");
        return false;
    } else {
        clearError(emailInput, emailMessage);
        return true;
    }
}

// Validate GitHub Username
function validateGithub() {
    const github = githubInput.value.trim();

    if (github === "") {
        showError(githubInput, githubMessage, "Please enter your GitHub username.");
        return false;
    } else if (!github.startsWith("@") || github.length === 1) {
        showError(githubInput, githubMessage, "Your GitHub username must start with @.");
        return false;
    } else {
        clearError(githubInput, githubMessage);
        return true;
    }
}

// Validate Avatar
function validateAvatar() {
    const file = avatarInput.files[0];

    if (!file) {
        showError(avatarInput, avatarMessage, "Please upload your avatar.");
        return false;
    } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
        showError(avatarInput, avatarMessage, "Only JPG and PNG files are allowed.");
        return false;
    } else if (file.size >= MAX_SIZE) {
        showError(avatarInput, avatarMessage, "Your image must be smaller than 500KB.");
        return false;
    } else {
        clearError(avatarInput, avatarMessage);
        return true;
    }
}

// Handle Form Submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nameIsValid = validateName();
    const emailIsValid = validateEmail();
    const githubIsValid = validateGithub();
    const avatarIsValid = validateAvatar();

    if (nameIsValid && emailIsValid && githubIsValid && avatarIsValid) {

        const reader = new FileReader();

        reader.onload = function() {
            let ticketCount = Number(localStorage.getItem("ticketCount")) || 1608;
            ticketCount++;
            localStorage.setItem("ticketCount", ticketCount);
            sessionStorage.setItem("ticketNumber", "#" + String(ticketCount).padStart(5, "0"));
            sessionStorage.setItem("fullname", nameInput.value.trim());
            sessionStorage.setItem("email", emailInput.value.trim());
            sessionStorage.setItem("github", githubInput.value.trim());
            sessionStorage.setItem("avatar", reader.result);

            window.location.href = "ticket.html";
        };

        reader.readAsDataURL(avatarInput.files[0]);
    }
});