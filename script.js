const form = document.getElementById("applicationForm");

// Regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;
const pinPattern = /^[0-9]{6}$/;

// Helper
function setError(id, message) {
    document.getElementById(id + "Error").innerText = message;
    document.getElementById(id).classList.add("error-border");
}

function setSuccess(id) {
    document.getElementById(id + "Error").innerText = "";
    document.getElementById(id).classList.remove("error-border");
    document.getElementById(id).classList.add("valid-border");
}

// Validation functions
function validateField(id, condition, message) {
    if (!condition) {
        setError(id, message);
        return false;
    } else {
        setSuccess(id);
        return true;
    }
}

// Real-time listeners
["firstName","lastName","city","state"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        validateField(id, document.getElementById(id).value.trim() !== "", "This field is required");
    });
});

document.getElementById("email").addEventListener("input", () => {
    validateField("email",
        emailPattern.test(email.value),
        "Enter valid email (example@domain.com)");
});

document.getElementById("phone").addEventListener("input", () => {
    validateField("phone",
        phonePattern.test(phone.value),
        "Enter valid 10-digit mobile number");
});

document.getElementById("pincode").addEventListener("input", () => {
    validateField("pincode",
        pinPattern.test(pincode.value),
        "Enter valid 6-digit PIN code");
});

document.getElementById("course").addEventListener("change", () => {
    validateField("course",
        course.value !== "",
        "Please select a course");
});

// Submit
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const isValid =
        validateField("firstName", firstName.value.trim() !== "", "Required") &&
        validateField("lastName", lastName.value.trim() !== "", "Required") &&
        validateField("email", emailPattern.test(email.value), "Invalid Email") &&
        validateField("phone", phonePattern.test(phone.value), "Invalid Phone") &&
        validateField("city", city.value.trim() !== "", "Required") &&
        validateField("state", state.value.trim() !== "", "Required") &&
        validateField("pincode", pinPattern.test(pincode.value), "Invalid PIN") &&
        validateField("course", course.value !== "", "Select course");

    if (isValid) {
        alert("✅ Application Submitted Successfully!");
        form.reset();
    } else {
        alert("❌ Please fix errors before submitting");
    }
});
