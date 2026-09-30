/* ==========================================================
   DOM
========================================================== */

const form = document.getElementById("creatorPayoutForm");
const submitBtn = document.getElementById("submitBtn");
let lastCreatorLookupPhone = "";
let creatorLookupRunning = false;

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
   const phoneField =
    document.getElementById("phone");

phoneField.addEventListener(
    "input",
    handlePhoneLookup
);

}

/* ==========================================================
LookUp
========================================================== */

async function handlePhoneLookup() {

    const phoneField =
        document.getElementById("phone");

    const phone =
        phoneField.value.trim();

    // Only start lookup once 10 digits are entered
    if (!/^[6-9]\d{9}$/.test(phone)) {
        return;
    }

    // Don't check the same number twice
    if (
        phone === lastCreatorLookupPhone ||
        creatorLookupRunning
    ) 
    {
        return;
    }

    lastCreatorLookupPhone = phone;
    creatorLookupRunning = true;

    // Freeze everything except phone
    setFormLocked(true);

    // Show checking popup
    const popup =
        showCreatorPopup(
            "🔍 Hold on",
            "We're checking if you exist in our system already."
        );


    try {

        const creator =
            await findCreatorByPhone(phone);


        /*
          EXISTING CREATOR
        */

        if (
            creator &&
            creator.found
        ) {

            // Replace name with saved name
            document.getElementById("fullName").value =
                creator.name || "";

            document.getElementById("email").value =
                creator.email || "";

            document.getElementById("accountNumber").value =
                creator.accountNumber || "";

            document.getElementById("ifsc").value =
                creator.ifsc || "";

            document.getElementById("branch").value =
                creator.branch || "";

            document.getElementById("pan").value =
                creator.pan || "";

            document.getElementById("gst").value =
                creator.gst || "";

            popup.update(
                "Existing Creator Found ✅",
                "Your banking details have been filled in for you!"
            );
        }


        /*
          NEW CREATOR
        */
        else {
            popup.update(
                "You are a New Creator 👋",
                "Please proceed to submit your banking details"
            );
        }
        // Keep message visible for 2 seconds
        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );
        popup.remove();

    } 
    catch (error) {
        console.error(
            "Creator lookup failed:",
            error
        );

        popup.update(
            "Something went wrong",
            "Please continue by entering your details manually."
        );

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );
        popup.remove();
    }

    // Unlock the form
    setFormLocked(false);
    creatorLookupRunning = false;
}

function setFormLocked(locked) {

    const fields =
        form.querySelectorAll(
            "input, select, textarea, button"
        );

    fields.forEach(field => {

        // Keep phone editable
        if (field.id === "phone") {
            return;
        }
        field.disabled = locked;
    });
}

function showCreatorPopup(title, message) {

    const popup =
        document.createElement("div");

    popup.className =
        "creator-lookup-popup";

    popup.innerHTML = `
        <div class="creator-lookup-popup-inner">

            <strong class="creator-lookup-title">
                ${title}
            </strong>

            <span class="creator-lookup-message">
                ${message}
            </span>

        </div>
    `;

    document.body.appendChild(popup);

    return {

        update(newTitle, newMessage) {
            const titleElement =
                popup.querySelector(
                    ".creator-lookup-title"
                );
            const messageElement =
                popup.querySelector(
                    ".creator-lookup-message"
                );

            titleElement.textContent =
                newTitle;
            messageElement.textContent =
                newMessage;
        },

        remove() {
            popup.remove();
        }
    };
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
          
          case "invoiceAmount":

    if (
        !value ||
        isNaN(value) ||
        Number(value) <= 0
    )
        return showError(
            field,
            "Enter a valid invoice amount."
        );

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

       amount: document.getElementById("invoiceAmount").value.trim(),

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

    window.location.href = "thank-you.html";

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
