function showDemoMessage(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

const validationForm = document.getElementById("validationForm");

validationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("validationName");
    const email = document.getElementById("validationEmail");

    name.classList.remove("is-valid", "is-invalid");
    email.classList.remove("is-valid", "is-invalid");

    if (name.checkValidity()) {
        name.classList.add("is-valid");
    } else {
        name.classList.add("is-invalid");
    }

    if (email.checkValidity()) {
        email.classList.add("is-valid");
    } else {
        email.classList.add("is-invalid");
    }
});

validationForm.addEventListener("reset", function () {
    validationForm.querySelectorAll(".form-control").forEach(function (input) {
        input.classList.remove("is-valid", "is-invalid");
    });
});

const registrationForm = document.getElementById("registrationForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const genderOptions = document.querySelectorAll('input[name="gender"]');
const genderFeedback = document.getElementById("genderFeedback");
const registrationMessage = document.getElementById("registrationMessage");

function checkPasswords() {
    if (confirmPassword.value === "") {
        confirmPassword.setCustomValidity("Please confirm your password.");
    } else if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity("Passwords do not match.");
    } else {
        confirmPassword.setCustomValidity("");
    }
}

password.addEventListener("input", checkPasswords);
confirmPassword.addEventListener("input", checkPasswords);

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    checkPasswords();

    const genderSelected = Array.from(genderOptions).some(function (option) {
        return option.checked;
    });

    genderFeedback.style.display = genderSelected ? "none" : "block";

    registrationForm.querySelectorAll("input.form-control, select.form-select").forEach(function (input) {
        input.classList.remove("is-valid", "is-invalid");

        if (input.checkValidity()) {
            input.classList.add("is-valid");
        } else {
            input.classList.add("is-invalid");
        }
    });

    genderOptions.forEach(function (option) {
        option.classList.remove("is-valid", "is-invalid");
        if (!genderSelected) {
            option.classList.add("is-invalid");
        }
    });

    if (registrationForm.checkValidity() && genderSelected) {
        registrationMessage.className = "alert alert-success";
        registrationMessage.textContent = "Registration form is valid. Demo only: no account was created.";
    } else {
        registrationMessage.className = "alert alert-danger";
        registrationMessage.textContent = "Please correct the highlighted fields and try again.";
    }
});

genderOptions.forEach(function (option) {
    option.addEventListener("change", function () {
        genderFeedback.style.display = "none";
        genderOptions.forEach(function (item) {
            item.classList.remove("is-invalid");
        });
    });
});

registrationForm.addEventListener("reset", function () {
    window.setTimeout(function () {
        registrationForm.querySelectorAll(".is-valid, .is-invalid").forEach(function (input) {
            input.classList.remove("is-valid", "is-invalid");
        });
        genderFeedback.style.display = "none";
        registrationMessage.className = "alert d-none";
        registrationMessage.textContent = "";
        confirmPassword.setCustomValidity("");
    }, 0);
});
