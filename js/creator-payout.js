/* ==========================================================
   DOM
========================================================== */

const form = document.getElementById("creatorPayoutForm");

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
        <option value="">
            Loading Campaigns...
        </option>
    `;

    try {

        const response = await getCampaigns();

        dropdown.innerHTML = `
            <option value="">
                Select Campaign
            </option>
        `;

        response.data.forEach(campaign => {

            const option = document.createElement("option");

            option.value = campaign;

            option.textContent = campaign;

            dropdown.appendChild(option);

        });

    }

    catch (error) {

        console.error(error);

        dropdown.innerHTML = `
            <option value="">
                Unable to load campaigns
            </option>
        `;

    }

}

/* ==========================================================
   FILE
========================================================== */

function handleFileSelection(event) {

    const file = event.target.files[0];

    if (!file) return;

    document.getElementById("selectedFile").innerHTML = `
        📄 ${file.name}<br>
        ${(file.size / 1024 / 1024).toFixed(2)} MB
    `;

}

/* ==========================================================
   SUBMIT
========================================================== */

async function submitForm(event) {

    event.preventDefault();

    alert("Submission wiring starts in the next commit.");

}
