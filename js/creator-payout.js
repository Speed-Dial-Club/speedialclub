/* ==========================================================
   DOM
========================================================== */

const form = document.getElementById("creatorPayoutForm");
const submitBtn = document.getElementById("submitBtn");

if (form) {
    initCreatorPayout();
}

/* ==========================================================
   INIT
========================================================== */

async function initCreatorPayout() {

    await loadCampaigns();

    bindEvents();

}

/* ==========================================================
   EVENTS
========================================================== */

function bindEvents() {

    form.addEventListener("submit", submitForm);

    document
        .getElementById("invoice")
        .addEventListener("change", handleFileSelection);

    const fields = form.querySelectorAll("input, select");

    fields.forEach(field => {

        field.addEventListener("input", () => validateField(field));

        field.addEventListener("blur", () => validateField(field));

    });

}
/* ==========================================================
   LOAD CAMPAIGNS
========================================================== */

async function loadCampaigns() {

    const dropdown = document.getElementById("campaign");

    dropdown.innerHTML = `
        <option value="">Loading Campaigns...</option>
    `;

    try {

        const response = await getCampaigns();

        dropdown.innerHTML = `
            <option value="">Select Campaign</option>
        `;

        const campaigns = response.campaigns || [];

        campaigns.forEach(campaign => {

            const option = document.createElement("option");

            option.value = campaign;
            option.textContent = campaign;

            dropdown.appendChild(option);

        });

    }

    catch (error) {

        console.error(error);

        dropdown.innerHTML = `
            <option value="">Unable to load campaigns</option>
        `;

    }

}

/* ==========================================================
   FILE SELECTION
========================================================== */

function handleFileSelection(e) {

    const file = e.target.files[0];

    if (!file) return;

    document.getElementById("selectedFile").innerHTML = `
        📄 ${file.name}<br>
        ${(file.size / 1024 / 1024).toFixed(2)} MB
    `;

}


function showError(field, message) {

    field.classList.add("input-error");

    const error = field.parentElement.querySelector(".error-message");

    error.textContent = message;

    error.classList.add("show");

}

function clearError(field) {

    field.classList.remove("input-error");

    const error = field.parentElement.querySelector(".error-message");

    error.textContent = "";

    error.classList.remove("show");

}

function validateField(field) {

    const value = field.value.trim();

    switch (field.id) {

        case "fullName":

            if (!value)
                return showError(field, "Full name is required.");

            break;

        case "phone":

            if (!/^[6-9]\d{9}$/.test(value))
                return showError(field, "Enter a valid mobile number.");

            break;

        case "email":

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                return showError(field, "Enter a valid email.");

            break;

        case "accountNumber":

            if (!value)
                return showError(field, "Account number is required.");

            break;

        case "ifsc":

            if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(value))
                return showError(field, "Invalid IFSC code.");

            break;

        case "branch":

            if (!value)
                return showError(field, "Branch is required.");

            break;

        case "pan":

            if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(value))
                return showError(field, "Invalid PAN number.");

            break;

        case "gst":

            if (
                value &&
                !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i.test(value)
            )
                return showError(field, "Invalid GST number.");

            break;

        case "campaign":

            if (!value)
                return showError(field, "Select a campaign.");

            break;

    }

    clearError(field);

    return true;

}

function validateForm() {

    let valid = true;

    form.querySelectorAll("input, select").forEach(field => {

        if (validateField(field) !== true)
            valid = false;

    });

    const file = document.getElementById("invoice").files[0];

    if (!file) {

        const upload = document.querySelector(".upload-box");

        upload.classList.add("input-error");

        upload.parentElement
            .querySelector(".error-message")
            .classList.add("show");

        upload.parentElement
            .querySelector(".error-message")
            .textContent = "Please upload your invoice.";

        valid = false;

    }

    return valid;

}

/* ==========================================================
   FILE TO BASE64
========================================================== */

function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}

/* ==========================================================
   GET FORM DATA
========================================================== */

async function getFormData() {

    const file = document.getElementById("invoice").files[0];

    return {

        name: document.getElementById("fullName").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        email: document.getElementById("email").value.trim(),

        accountNumber: document.getElementById("accountNumber").value.trim(),

        ifsc: document.getElementById("ifsc").value.trim().toUpperCase(),

        branch: document.getElementById("branch").value.trim(),

        pan: document.getElementById("pan").value.trim().toUpperCase(),

        gst: document.getElementById("gst").value.trim().toUpperCase(),

        campaign: document.getElementById("campaign").value,

        pdf: await fileToBase64(file),

        fileName: file.name

    };

}

/* ==========================================================
   SUBMIT
========================================================== */

async function submitForm(e) {

   e.preventDefault();

if (!validateForm())
    return;

    const file = document.getElementById("invoice").files[0];

    if (!file) {

        alert("Please upload your invoice.");

        return;

    }

    submitBtn.disabled = true;

    submitBtn.innerText = "Submitting...";

   try {

    const payload = await getFormData();

    await submitPayout(payload);

    form.reset();

    document.getElementById("selectedFile").innerHTML = "";

    window.location.hash = "#thank-you";

}

    catch (error) {

        console.error(error);

        alert(error.message || "Something went wrong.");

    }

    finally {

        submitBtn.disabled = false;

        submitBtn.innerText = "Submit Invoice";

    }

}
