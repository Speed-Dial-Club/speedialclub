/* ==========================================================
   SPEED DIAL CLUB
   INVOICE GENERATOR
========================================================== */

"use strict";

const INVOICE_WIDTH = 794;
const INVOICE_HEIGHT = 1123;


/* ==========================================================
   ELEMENTS
========================================================== */

const formPage = document.getElementById("formPage");
const previewPage = document.getElementById("previewPage");
const invoiceForm = document.getElementById("invoiceForm");
const invoiceItem = document.getElementById("invoiceItem");
const invoicePaper = document.getElementById("invoicePaper");
const invoiceScaleWrapper = document.getElementById("invoiceScaleWrapper");
const invoiceViewport = document.getElementById("invoiceViewport");
const generateBtn = document.getElementById("generateBtn");
const editBtn = document.getElementById("editBtn");
const editBtnTop = document.getElementById("editBtnTop");
const downloadBtn = document.getElementById("downloadBtn");
const downloadBtnTop = document.getElementById("downloadBtnTop");


/* ==========================================================
   DATE INPUT
========================================================== */

const invoiceDate = document.getElementById("invoiceDate");
const invoiceDateDisplay = document.getElementById("invoiceDateDisplay");

function formatDisplayDate(dateString) {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function setToday() {
    if (!invoiceDate) return;

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const value = `${year}-${month}-${day}`;

    invoiceDate.value = value;

    if (invoiceDateDisplay) {
        invoiceDateDisplay.value = formatDisplayDate(value);
    }
}

setToday();

if (invoiceDate) {
    invoiceDate.addEventListener("change", () => {

        if (invoiceDateDisplay) {
            invoiceDateDisplay.value =
                formatDisplayDate(invoiceDate.value);
        }

        clearError(invoiceDate);
    });
}

if (invoiceDateDisplay) {
    invoiceDateDisplay.addEventListener("click", () => {

        if (typeof invoiceDate.showPicker === "function") {
            invoiceDate.showPicker();
        } else {
            invoiceDate.click();
        }

    });
}


/* ==========================================================
   RANDOM INVOICE NUMBER
========================================================== */

function generateInvoiceNumber() {

    const number = Math.floor(
        100000 + Math.random() * 900000
    );

    return `SDC-${number}`;
}


/* ==========================================================
   MONEY
========================================================== */

function formatMoney(value) {

    return Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 0
    });
}


/* ==========================================================
   DATE FOR INVOICE
========================================================== */

function formatDate(dateString) {

    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}


/* ==========================================================
   ERROR HANDLING
========================================================== */

function showError(field, message) {

    field.classList.add("input-error");

    const wrapper = field.closest(".input-group");

    if (!wrapper) return;

    const error = wrapper.querySelector(".error-message");

    if (!error) return;

    error.textContent = message;
    error.classList.add("show");
}

function clearError(field) {

    field.classList.remove("input-error");

    const wrapper = field.closest(".input-group");

    if (!wrapper) return;

    const error = wrapper.querySelector(".error-message");

    if (!error) return;

    error.textContent = "";
    error.classList.remove("show");
}


/* ==========================================================
   VALIDATION
========================================================== */

function validateField(field) {

    const value = field.value.trim();

    switch (field.id) {

        case "invoiceDate":

            if (!value) {
                showError(
                    field,
                    "Invoice date is required."
                );
                return false;
            }

            break;


        case "invoiceItem":

            if (!value) {
                showError(
                    field,
                    "Please select an item."
                );
                return false;
            }

            break;


        case "unitPrice": {

            const amount = Number(value);

            if (
                !value ||
                !Number.isFinite(amount) ||
                amount <= 0
            ) {
                showError(
                    field,
                    "Enter a valid amount greater than ₹0."
                );
                return false;
            }

            break;
        }


        case "quantity": {

            const quantity = Number(value);

            if (
                !value ||
                !Number.isInteger(quantity) ||
                quantity <= 0
            ) {
                showError(
                    field,
                    "Quantity must be a whole number greater than 0."
                );
                return false;
            }

            break;
        }


        case "creatorName":

            if (!value) {
                showError(
                    field,
                    "Your name is required."
                );
                return false;
            }

            break;


        case "creatorAddress":

            if (!value) {
                showError(
                    field,
                    "Your address is required."
                );
                return false;
            }

            break;


        case "creatorPhone":

            if (!value) {
                showError(
                    field,
                    "Mobile number is required."
                );
                return false;
            }

            if (!/^[6-9]\d{9}$/.test(value)) {
                showError(
                    field,
                    "Enter a valid 10-digit Indian mobile number."
                );
                return false;
            }

            break;


        case "creatorEmail":

            if (!value) {
                showError(
                    field,
                    "Email address is required."
                );
                return false;
            }

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ) {
                showError(
                    field,
                    "Enter a valid email address."
                );
                return false;
            }

            break;


        case "bankName":

            if (!value) {
                showError(
                    field,
                    "Bank name is required."
                );
                return false;
            }

            break;


        case "accountName":

            if (!value) {
                showError(
                    field,
                    "Account name is required."
                );
                return false;
            }

            break;


        case "accountNumber":

            if (!/^\d{9,18}$/.test(value)) {
                showError(
                    field,
                    "Account number must contain 9–18 digits."
                );
                return false;
            }

            break;


        case "ifsc":

            if (
                !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
                    value.toUpperCase()
                )
            ) {
                showError(
                    field,
                    "Enter a valid IFSC code."
                );
                return false;
            }

            break;


        case "accountType":

            if (!value) {
                showError(
                    field,
                    "Please select the account type."
                );
                return false;
            }

            break;


        case "pan":

            if (
                !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
                    value.toUpperCase()
                )
            ) {
                showError(
                    field,
                    "Enter a valid PAN number."
                );
                return false;
            }

            break;
    }

    clearError(field);

    return true;
}


function validateForm() {

    let valid = true;

    const fields =
        invoiceForm.querySelectorAll(
            "input:not([type='hidden']), select, textarea"
        );

    fields.forEach(field => {

        if (field.id === "invoiceDateDisplay") {
            return;
        }

        if (!validateField(field)) {
            valid = false;
        }

    });

    return valid;
}


/* ==========================================================
   INPUT NORMALISATION
========================================================== */

document
    .getElementById("ifsc")
    .addEventListener("input", event => {

        event.target.value =
            event.target.value
                .toUpperCase()
                .replace(/\s/g, "");

    });


document
    .getElementById("pan")
    .addEventListener("input", event => {

        event.target.value =
            event.target.value
                .toUpperCase()
                .replace(/\s/g, "");

    });


document
    .getElementById("accountNumber")
    .addEventListener("input", event => {

        event.target.value =
            event.target.value
                .replace(/\D/g, "");

    });


document
    .getElementById("creatorPhone")
    .addEventListener("input", event => {

        event.target.value =
            event.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

    });


/* ==========================================================
   CREATOR LOOKUP
========================================================== */

let lastCreatorLookupPhone = "";
let creatorLookupRunning = false;


function injectCreatorLookupStyles() {

    if (
        document.getElementById(
            "creatorLookupStyles"
        )
    ) {
        return;
    }

    const style = document.createElement("style");

    style.id = "creatorLookupStyles";

    style.textContent = `

        .creator-lookup-popup {
            position: fixed;
            inset: 0;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background: rgba(0,0,0,0.35);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
        }

        .creator-lookup-popup-inner {
            width: min(92vw, 460px);
            padding: 28px 26px;
            border-radius: 20px;
            background: #ffffff;
            box-shadow: 0 20px 60px rgba(0,0,0,0.25);
            text-align: center;
            font-family:
                -apple-system,
                BlinkMacSystemFont,
                "SF Pro Display",
                Helvetica,
                Arial,
                sans-serif;
        }

        .creator-lookup-title {
            display: block;
            margin-bottom: 8px;
            color: #111111;
            font-size: 20px;
            line-height: 1.25;
            font-weight: 700;
        }

        .creator-lookup-message {
            display: block;
            color: #6b7280;
            font-size: 15px;
            line-height: 1.45;
            font-weight: 500;
        }

        .invoice-lookup-locked {
            cursor: wait !important;
        }

    `;

    document.head.appendChild(style);
}


function setInvoiceFormLocked(locked) {

    const fields =
        invoiceForm.querySelectorAll(
            "input, select, textarea, button"
        );

    fields.forEach(field => {
        field.disabled = locked;
    });

    document.body.classList.toggle(
        "invoice-lookup-locked",
        locked
    );
}


function showCreatorPopup(title, message) {

    const popup = document.createElement("div");

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


async function handleCreatorPhoneLookup() {

    const phoneField =
        document.getElementById(
            "creatorPhone"
        );

    const phone =
        phoneField.value.trim();


    if (!/^[6-9]\d{9}$/.test(phone)) {

        if (
            phone !==
            lastCreatorLookupPhone
        ) {
            lastCreatorLookupPhone = "";
        }

        return;
    }


    if (
        phone ===
        lastCreatorLookupPhone ||
        creatorLookupRunning
    ) {
        return;
    }


    lastCreatorLookupPhone =
        phone;

    creatorLookupRunning =
        true;


    setInvoiceFormLocked(true);


    const popup =
        showCreatorPopup(
            "🔍 Hold on",
            "We're checking if you exist in our system already."
        );


    try {

        if (
            typeof findCreatorByPhone !==
            "function"
        ) {
            throw new Error(
                "Creator lookup service is unavailable."
            );
        }


        const creator =
            await findCreatorByPhone(
                phone
            );


        if (
            creator &&
            creator.found
        ) {

            /*
               Existing creator:
               Automatically fill ONLY:

               Name
               Email
               Account Number
               IFSC
               PAN

               Bank
               Account Name
               Account Type

               remain manual/editable.
            */

            document
                .getElementById(
                    "creatorName"
                )
                .value =
                creator.name || "";


            document
                .getElementById(
                    "creatorEmail"
                )
                .value =
                creator.email || "";


            document
                .getElementById(
                    "accountNumber"
                )
                .value =
                creator.accountNumber || "";


            document
                .getElementById(
                    "ifsc"
                )
                .value =
                creator.ifsc || "";


            document
                .getElementById(
                    "pan"
                )
                .value =
                creator.pan || "";


            /*
               Re-run normalisation because
               these values were inserted
               programmatically.
            */

            document
                .getElementById(
                    "ifsc"
                )
                .value =
                document
                    .getElementById(
                        "ifsc"
                    )
                    .value
                    .toUpperCase()
                    .replace(/\s/g, "");


            document
                .getElementById(
                    "pan"
                )
                .value =
                document
                    .getElementById(
                        "pan"
                    )
                    .value
                    .toUpperCase()
                    .replace(/\s/g, "");


            popup.update(
                "Existing Creator Found ✅",
                "Your banking details have been filled in for you!"
            );


        } else {

            popup.update(
                "You are a New Creator 👋",
                "Please proceed to enter your banking details."
            );

        }


        /*
           Keep the popup visible for 2 seconds.
        */

        await new Promise(resolve =>
            setTimeout(
                resolve,
                2000
            )
        );


        popup.remove();


    } catch (error) {

        console.error(
            "Creator lookup failed:",
            error
        );


        popup.update(
            "Something went wrong",
            "Please continue by entering your banking details manually."
        );


        await new Promise(resolve =>
            setTimeout(
                resolve,
                2000
            )
        );


        popup.remove();


    } finally {

        setInvoiceFormLocked(false);

        creatorLookupRunning =
            false;

    }

}


injectCreatorLookupStyles();


document
    .getElementById("creatorPhone")
    .addEventListener(
        "input",
        handleCreatorPhoneLookup
    );


/* ==========================================================
   CLEAR ERRORS AS USER TYPES
========================================================== */

invoiceForm
    .querySelectorAll(
        "input, select, textarea"
    )
    .forEach(field => {

        field.addEventListener(
            "input",
            () => {
                clearError(field);
            }
        );

        field.addEventListener(
            "change",
            () => {
                clearError(field);
            }
        );

    });


/* ==========================================================
   FORM DATA
========================================================== */

function getFormData() {

    return {

        invoiceNumber:
            generateInvoiceNumber(),

        invoiceDate:
            document
                .getElementById(
                    "invoiceDate"
                )
                .value,

        item:
            invoiceItem.value,

        unitPrice:
            Number(
                document
                    .getElementById(
                        "unitPrice"
                    )
                    .value
            ),

        quantity:
            Number(
                document
                    .getElementById(
                        "quantity"
                    )
                    .value
            ),

        creatorName:
            document
                .getElementById(
                    "creatorName"
                )
                .value
                .trim(),

        creatorAddress:
            document
                .getElementById(
                    "creatorAddress"
                )
                .value
                .trim(),

        creatorPhone:
            document
                .getElementById(
                    "creatorPhone"
                )
                .value
                .trim(),

        creatorEmail:
            document
                .getElementById(
                    "creatorEmail"
                )
                .value
                .trim(),

        bankName:
            document
                .getElementById(
                    "bankName"
                )
                .value
                .trim(),

        accountName:
            document
                .getElementById(
                    "accountName"
                )
                .value
                .trim(),

        accountNumber:
            document
                .getElementById(
                    "accountNumber"
                )
                .value
                .trim(),

        ifsc:
            document
                .getElementById(
                    "ifsc"
                )
                .value
                .trim()
                .toUpperCase(),

        accountType:
            document
                .getElementById(
                    "accountType"
                )
                .value,

        pan:
            document
                .getElementById(
                    "pan"
                )
                .value
                .trim()
                .toUpperCase()

    };

}


/* ==========================================================
   POPULATE PREVIEW
========================================================== */

function populatePreview(data) {

    const total =
        data.unitPrice *
        data.quantity;


    document
        .getElementById(
            "previewInvoiceNumber"
        )
        .textContent =
        data.invoiceNumber;


    document
        .getElementById(
            "previewInvoiceDate"
        )
        .textContent =
        formatDate(
            data.invoiceDate
        );


    document
        .getElementById(
            "previewItem"
        )
        .textContent =
        data.item;


    document
        .getElementById(
            "previewUnitPrice"
        )
        .textContent =
        formatMoney(
            data.unitPrice
        );


    document
        .getElementById(
            "previewQuantity"
        )
        .textContent =
        data.quantity;


    document
        .getElementById(
            "previewAmount"
        )
        .textContent =
        formatMoney(
            total
        );


    document
        .getElementById(
            "previewTotal"
        )
        .textContent =
        formatMoney(
            total
        );


    document
        .getElementById(
            "previewBank"
        )
        .textContent =
        data.bankName;


    document
        .getElementById(
            "previewAccountName"
        )
        .textContent =
        data.accountName;


    document
        .getElementById(
            "previewAccountNumber"
        )
        .textContent =
        data.accountNumber;


    document
        .getElementById(
            "previewIfsc"
        )
        .textContent =
        data.ifsc;


    document
        .getElementById(
            "previewAccountType"
        )
        .textContent =
        data.accountType;


    document
        .getElementById(
            "previewPan"
        )
        .textContent =
        data.pan;


    document
        .getElementById(
            "previewCreatorName"
        )
        .textContent =
        data.creatorName;


    document
        .getElementById(
            "previewCreatorAddress"
        )
        .textContent =
        data.creatorAddress;


    document
        .getElementById(
            "previewCreatorPhone"
        )
        .textContent =
        data.creatorPhone;


    document
        .getElementById(
            "previewCreatorEmail"
        )
        .textContent =
        data.creatorEmail;

}


/* ==========================================================
   PERMANENT MOBILE PREVIEW SCALING
========================================================== */

function scaleInvoicePreview() {

    if (
        previewPage.classList.contains(
            "hidden"
        )
    ) {
        return;
    }


    invoicePaper.style.transform =
        "none";


    invoiceScaleWrapper.style.width =
        `${INVOICE_WIDTH}px`;

    invoiceScaleWrapper.style.height =
        `${INVOICE_HEIGHT}px`;


    const viewportWidth =
        invoiceViewport.clientWidth;


    if (!viewportWidth) {
        return;
    }


    const availableWidth =
        Math.max(
            viewportWidth - 24,
            280
        );


    const scale =
        Math.min(
            1,
            availableWidth /
            INVOICE_WIDTH
        );


    invoicePaper.style.transform =
        `scale(${scale})`;


    invoiceScaleWrapper.style.width =
        `${INVOICE_WIDTH * scale}px`;

    invoiceScaleWrapper.style.height =
        `${INVOICE_HEIGHT * scale}px`;

}


/* ==========================================================
   OPEN PREVIEW
========================================================== */

function showPreview() {

    invoicePaper.style.transform =
        "none";


    invoiceScaleWrapper.style.width =
        `${INVOICE_WIDTH}px`;

    invoiceScaleWrapper.style.height =
        `${INVOICE_HEIGHT}px`;


    formPage.classList.add(
        "hidden"
    );

    previewPage.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            scaleInvoicePreview();

        });

    });

}


/* ==========================================================
   GENERATE INVOICE
========================================================== */

invoiceForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!validateForm()) {

            const firstError =
                invoiceForm.querySelector(
                    ".input-error"
                );


            if (firstError) {

                firstError.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                setTimeout(
                    () => {
                        firstError.focus();
                    },
                    300
                );

            }

            return;
        }


        const data =
            getFormData();


        populatePreview(data);

        showPreview();

    }
);


/* ==========================================================
   EDIT DETAILS
========================================================== */

function editDetails() {

    invoicePaper.style.transform =
        "none";


    invoiceScaleWrapper.style.width =
        `${INVOICE_WIDTH}px`;

    invoiceScaleWrapper.style.height =
        `${INVOICE_HEIGHT}px`;


    previewPage.classList.add(
        "hidden"
    );

    formPage.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


editBtn.addEventListener(
    "click",
    editDetails
);


editBtnTop.addEventListener(
    "click",
    editDetails
);


/* ==========================================================
   PDF GENERATION
========================================================== */

async function downloadInvoice() {

    if (
        typeof html2canvas ===
        "undefined" ||
        typeof window.jspdf ===
        "undefined"
    ) {

        alert(
            "PDF generator is still loading. Please try again."
        );

        return;
    }


    const buttons = [
        downloadBtn,
        downloadBtnTop
    ];


    buttons.forEach(
        button => {

            button.disabled =
                true;

            button.textContent =
                "Preparing PDF…";

        }
    );


    let pdfClone = null;


    try {

        pdfClone =
            invoicePaper.cloneNode(
                true
            );


        pdfClone.style.position =
            "fixed";

        pdfClone.style.left =
            "-10000px";

        pdfClone.style.top =
            "0";

        pdfClone.style.width =
            `${INVOICE_WIDTH}px`;

        pdfClone.style.height =
            `${INVOICE_HEIGHT}px`;

        pdfClone.style.transform =
            "none";

        pdfClone.style.transformOrigin =
            "top left";

        pdfClone.style.margin =
            "0";

        pdfClone.style.zIndex =
            "-9999";


        document.body.appendChild(
            pdfClone
        );


        await new Promise(
            resolve =>
                requestAnimationFrame(
                    () =>
                        requestAnimationFrame(
                            resolve
                        )
                )
        );


        const canvas =
            await html2canvas(
                pdfClone,
                {
                    scale: 3,

                    useCORS: true,

                    backgroundColor:
                        "#ffffff",

                    width:
                        INVOICE_WIDTH,

                    height:
                        INVOICE_HEIGHT,

                    windowWidth:
                        INVOICE_WIDTH,

                    windowHeight:
                        INVOICE_HEIGHT,

                    logging: false
                }
            );


        const {
            jsPDF
        } =
            window.jspdf;


        const pdf =
            new jsPDF({
                orientation:
                    "portrait",

                unit:
                    "mm",

                format:
                    "a4",

                compress:
                    true
            });


        const imageData =
            canvas.toDataURL(
                "image/jpeg",
                0.96
            );


        pdf.addImage(
            imageData,
            "JPEG",
            0,
            0,
            210,
            297,
            undefined,
            "FAST"
        );


        const invoiceNumber =
            document
                .getElementById(
                    "previewInvoiceNumber"
                )
                .textContent
                .trim();


        pdf.save(
            `${invoiceNumber}.pdf`
        );


    } catch (error) {

        console.error(
            "PDF generation failed:",
            error
        );


        alert(
            "We couldn't generate the PDF. Please try again."
        );


    } finally {

        if (
            pdfClone &&
            pdfClone.parentNode
        ) {

            pdfClone.parentNode.removeChild(
                pdfClone
            );

        }


        buttons.forEach(
            button => {

                button.disabled =
                    false;

                button.textContent =
                    button === downloadBtn
                        ? "Download Invoice PDF ↓"
                        : "Download PDF";

            }
        );


        requestAnimationFrame(
            scaleInvoicePreview
        );

    }

}


/* ==========================================================
   DOWNLOAD BUTTONS
========================================================== */

downloadBtn.addEventListener(
    "click",
    downloadInvoice
);

downloadBtnTop.addEventListener(
    "click",
    downloadInvoice
);


/* ==========================================================
   RESPONSIVE VIEWPORT CHANGES
========================================================== */

let resizeTimer = null;


function handleViewportChange() {

    clearTimeout(
        resizeTimer
    );


    resizeTimer =
        setTimeout(
            () => {
                scaleInvoicePreview();
            },
            100
        );

}


window.addEventListener(
    "resize",
    handleViewportChange
);


if (window.visualViewport) {

    window.visualViewport.addEventListener(
        "resize",
        handleViewportChange
    );

}


/* ==========================================================
   ORIENTATION CHANGE
========================================================== */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(
            scaleInvoicePreview,
            250
        );

    }
);


/* ==========================================================
   PAGE LOAD
========================================================== */

window.addEventListener(
    "load",
    () => {

        if (
            !previewPage.classList.contains(
                "hidden"
            )
        ) {

            scaleInvoicePreview();

        }

    }
);
