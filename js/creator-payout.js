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

    const payload = {

        fullName: document.getElementById("fullName").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        email: document.getElementById("email").value.trim(),

        accountNumber: document.getElementById("accountNumber").value.trim(),

        ifsc: document.getElementById("ifsc").value.trim().toUpperCase(),

        branch: document.getElementById("branch").value.trim(),

        pan: document.getElementById("pan").value.trim().toUpperCase(),

        gst: document.getElementById("gst").value.trim().toUpperCase(),

        campaign: document.getElementById("campaign").value,

        fileName: file.name,

        fileData: await fileToBase64(file)

    };

    return payload;

}

/* ==========================================================
   SUBMIT
========================================================== */

async function submitForm(e) {

    e.preventDefault();

    const file = document.getElementById("invoice").files[0];

    if (!file) {

        alert("Please upload your invoice.");

        return;

    }

    submitBtn.disabled = true;

    submitBtn.innerText = "Submitting...";

    try {

        const payload = await getFormData();

        const response = await submitPayout(payload);

        if (!response.success) {

            throw new Error(response.message);

        }

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
