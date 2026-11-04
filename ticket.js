// Retrieve Registration Information
const fullname = sessionStorage.getItem("fullname");
const email = sessionStorage.getItem("email");
const github = sessionStorage.getItem("github");
const avatar = sessionStorage.getItem("avatar");

// Check if Registration Information Exists
if (!fullname || !email || !github || !avatar) {
    window.location.replace("index.html");
} 
else {

    // Display Registration Information
    document.getElementById("ticket-name").textContent = fullname;
    document.getElementById("ticket-email").textContent = email;

    document.getElementById("ticket-fullname").textContent = fullname;
    document.getElementById("ticket-github").textContent = github;

    // Display Uploaded Avatar
    const avatarImage = document.getElementById("ticket-avatar");
    avatarImage.src = avatar;
    avatarImage.alt = "Photo of " + fullname;

    // Display Ticket Number
    document.getElementById("ticket-number").textContent =
    sessionStorage.getItem("ticketNumber");
}





   