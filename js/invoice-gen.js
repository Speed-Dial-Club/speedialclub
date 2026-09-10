/* ==========================================================
   SPEED DIAL CLUB
   INVOICE GENERATOR
========================================================== */

"use strict";


/* ==========================================================
   CONSTANTS
========================================================== */

const INVOICE_WIDTH = 794;
const INVOICE_HEIGHT = 1123;


/* ==========================================================
   ELEMENTS
========================================================== */

const formPage =
    document.getElementById("formPage");

const previewPage =
    document.getElementById("previewPage");

const invoiceForm =
    document.getElementById("invoiceForm");

const invoiceItem =
    document.getElementById("invoiceItem");

const customItemWrapper =
    document.getElementById("customItemWrapper");

const customItem =
    document.getElementById("customItem");

const invoicePaper =
    document.getElementById("invoicePaper");

const invoiceScaleWrapper =
    document.getElementById("invoiceScaleWrapper");

const invoiceViewport =
    document.getElementById("invoiceViewport");

const generateBtn =
    document.getElementById("generateBtn");

const editBtn =
    document.getElementById("editBtn");

const editBtnTop =
    document.getElementById("editBtnTop");

const downloadBtn =
    document.getElementById("downloadBtn");

const downloadBtnTop =
    document.getElementById("downloadBtnTop");


/* ==========================================================
   INITIALISE DATE
========================================================== */

function setToday(){

    const dateInput =
        document.getElementById("invoiceDate");

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    dateInput.value =
        `${year}-${month}-${day}`;
}

setToday();


/* ==========================================================
   RANDOM INVOICE NUMBER
========================================================== */

function generateInvoiceNumber(){

    const number =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return `SDC-${number}`;
}


/* ==========================================================
   FORMAT MONEY
========================================================== */

function formatMoney(value){

    return Number(value).toLocaleString(
        "en-IN",
        {
            maximumFractionDigits:0
        }
    );
}


/* ==========================================================
   FORMAT DATE
========================================================== */

function formatDate(dateString){

    if (!dateString)
        return "";

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    return date.toLocaleDateString(
        "en-IN",
        {
            day:"2-digit",
            month:"2-digit",
            year:"numeric"
        }
    );
}


/* ==========================================================
   SHOW / CLEAR ERROR
========================================================== */

function showError(field, message){

    field.classList.add("input-error");

    const wrapper =
        field.closest(".input-group");

    if (!wrapper)
        return;

    const error =
        wrapper.querySelector(".error-message");

    if (!error)
        return;

    error.textContent =
        message;

    error.classList.add("show");
}


function clearError(field){

    field.classList.remove("input-error");

    const wrapper =
        field.closest(".input-group");

    if (!wrapper)
        return;

    const error =
        wrapper.querySelector(".error-message");

    if (!error)
        return;

    error.textContent = "";

    error.classList.remove("show");
}


/* ==========================================================
   VALIDATION HELPERS
========================================================== */

function validateRequired(
    field,
    message
){

    if (!field.value.trim()){

        showError(
            field,
            message
        );

        return false;
    }

    clearError(field);

    return true;
}


/* ==========================================================
   FIELD VALIDATION
========================================================== */

function validateField(field){

    const value =
        field.value.trim();


    switch(field.id){

        case "invoiceDate":

            if (!value){

                showError(
                    field,
                    "Invoice date is required."
                );

                return false;
            }

            break;


        case "invoiceItem":

            if (!value){

                showError(
                    field,
                    "Please select an item."
                );

                return false;
            }

            break;


        case "customItem":

            if (
                invoiceItem.value === "Other" &&
                !value
            ){

                showError(
                    field,
                    "Please enter the item description."
                );

                return false;
            }

            break;


        case "unitPrice":{

            const amount =
                Number(value);

            if (
                !value ||
                !Number.isFinite(amount) ||
                amount <= 0
            ){

                showError(
                    field,
                    "Enter a valid amount greater than ₹0."
                );

                return false;
            }

            break;
        }


        case "quantity":{

            const quantity =
                Number(value);

            if (
                !value ||
                !Number.isInteger(quantity) ||
                quantity <= 0
            ){

                showError(
                    field,
                    "Quantity must be a whole number greater than 0."
                );

                return false;
            }

            break;
        }


        case "creatorName":

            if (!value){

                showError(
                    field,
                    "Your name is required."
                );

                return false;
            }

            break;


        case "creatorAddress":

            if (!value){

                showError(
                    field,
                    "Your address is required."
                );

                return false;
            }

            break;


        case "creatorPhone":

    if (!value){

        showError(
            field,
            "Mobile number is required."
        );

        return false;
    }

    if (!/^[6-9]\d{9}$/.test(value)){

        showError(
            field,
            "Enter a valid 10-digit Indian mobile number."
        );

        return false;
    }

    break;


        case "creatorEmail":

    if (!value){

        showError(
            field,
            "Email address is required."
        );

        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){

        showError(
            field,
            "Enter a valid email address."
        );

        return false;
    }

    break;


        case "bankName":

            if (!value){

                showError(
                    field,
                    "Bank name is required."
                );

                return false;
            }

            break;


        case "accountName":

            if (!value){

                showError(
                    field,
                    "Account name is required."
                );

                return false;
            }

            break;


        case "accountNumber":

            if (
                !/^\d{9,18}$/.test(value)
            ){

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
            ){

                showError(
                    field,
                    "Enter a valid IFSC code."
                );

                return false;
            }

            break;


        case "accountType":

            if (!value){

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
            ){

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


/* ==========================================================
   VALIDATE ENTIRE FORM
========================================================== */

function validateForm(){

    let valid = true;


    const fields =
        invoiceForm.querySelectorAll(
            "input:not([type='hidden']), select, textarea"
        );


    fields.forEach(field => {

        if (
            field.id === "customItem" &&
            invoiceItem.value !== "Other"
        ){
            return;
        }

        if (
            !validateField(field)
        ){
            valid = false;
        }

    });


    return valid;
}


/* ==========================================================
   CUSTOM ITEM DROPDOWN
========================================================== */

invoiceItem.addEventListener(
    "change",
    () => {

        if (
            invoiceItem.value === "Other"
        ){

            customItemWrapper
                .classList.remove("hidden");

            customItem.focus();

        }else{

            customItemWrapper
                .classList.add("hidden");

            customItem.value = "";

            clearError(customItem);

        }

    }
);


/* ==========================================================
   NORMALISE INPUT
========================================================== */

document
    .getElementById("ifsc")
    .addEventListener(
        "input",
        event => {

            event.target.value =
                event.target.value
                    .toUpperCase()
                    .replace(/\s/g, "");

        }
    );


document
    .getElementById("pan")
    .addEventListener(
        "input",
        event => {

            event.target.value =
                event.target.value
                    .toUpperCase()
                    .replace(/\s/g, "");

        }
    );


document
    .getElementById("accountNumber")
    .addEventListener(
        "input",
        event => {

            event.target.value =
                event.target.value
                    .replace(/\D/g, "");

        }
    );


document
    .getElementById("creatorPhone")
    .addEventListener(
        "input",
        event => {

            event.target.value =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0,10);

        }
    );


/* ==========================================================
   CLEAR ERRORS WHEN USER TYPES
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
   GET FORM DATA
========================================================== */

function getFormData(){

    const item =
        invoiceItem.value === "Other"
            ? customItem.value.trim()
            : invoiceItem.value;


    return {

        invoiceNumber:
            generateInvoiceNumber(),

        invoiceDate:
            document
                .getElementById("invoiceDate")
                .value,

        item,

        unitPrice:
            Number(
                document
                    .getElementById("unitPrice")
                    .value
            ),

        quantity:
            Number(
                document
                    .getElementById("quantity")
                    .value
            ),

        creatorName:
            document
                .getElementById("creatorName")
                .value
                .trim(),

        creatorAddress:
            document
                .getElementById("creatorAddress")
                .value
                .trim(),

        creatorPhone:
            document
                .getElementById("creatorPhone")
                .value
                .trim(),

        creatorEmail:
            document
                .getElementById("creatorEmail")
                .value
                .trim(),

        bankName:
            document
                .getElementById("bankName")
                .value
                .trim(),

        accountName:
            document
                .getElementById("accountName")
                .value
                .trim(),

        accountNumber:
            document
                .getElementById("accountNumber")
                .value
                .trim(),

        ifsc:
            document
                .getElementById("ifsc")
                .value
                .trim()
                .toUpperCase(),

        accountType:
            document
                .getElementById("accountType")
                .value,

        pan:
            document
                .getElementById("pan")
                .value
                .trim()
                .toUpperCase()

    };

}


/* ==========================================================
   POPULATE PREVIEW
========================================================== */

function populatePreview(data){

    const total =
        data.unitPrice *
        data.quantity;


    document
        .getElementById("previewInvoiceNumber")
        .textContent =
        data.invoiceNumber;


    document
        .getElementById("previewInvoiceDate")
        .textContent =
        formatDate(data.invoiceDate);


    document
        .getElementById("previewItem")
        .textContent =
        data.item;


    document
        .getElementById("previewUnitPrice")
        .textContent =
        formatMoney(data.unitPrice);


    document
        .getElementById("previewQuantity")
        .textContent =
        data.quantity;


    document
        .getElementById("previewAmount")
        .textContent =
        formatMoney(total);


    document
        .getElementById("previewTotal")
        .textContent =
        formatMoney(total);


    document
        .getElementById("previewBank")
        .textContent =
        data.bankName;


    document
        .getElementById("previewAccountName")
        .textContent =
        data.accountName;


    document
        .getElementById("previewAccountNumber")
        .textContent =
        data.accountNumber;


    document
        .getElementById("previewIfsc")
        .textContent =
        data.ifsc;


    document
        .getElementById("previewAccountType")
        .textContent =
        data.accountType;


    document
        .getElementById("previewPan")
        .textContent =
        data.pan;


    document
        .getElementById("previewCreatorName")
        .textContent =
        data.creatorName;


    document
        .getElementById("previewCreatorAddress")
        .textContent =
        data.creatorAddress;


    document
        .getElementById("previewCreatorPhone")
        .textContent =
        data.creatorPhone || "—";


    document
        .getElementById("previewCreatorEmail")
        .textContent =
        data.creatorEmail || "—";

}


/* ==========================================================
   MOBILE PREVIEW SCALING
========================================================== */

/*
   The invoice itself is always 794 × 1123.

   On desktop:
       scale = 1

   On mobile:
       scale = available width / 794

   This means the actual invoice layout never changes.
   It simply becomes smaller as one complete A4 sheet.
*/

function scaleInvoicePreview(){

    if (
        previewPage.classList.contains("hidden")
    ){
        return;
    }


    const availableWidth =
        Math.min(
            window.innerWidth,
            invoiceViewport.clientWidth
        );


    const horizontalPadding =
        window.innerWidth <= 700
            ? 0
            : 20;


    const targetWidth =
        Math.min(
            INVOICE_WIDTH,
            availableWidth - horizontalPadding
        );


    const scale =
        Math.min(
            1,
            targetWidth / INVOICE_WIDTH
        );


    invoicePaper.style.transform =
        `scale(${scale})`;


    invoiceScaleWrapper.style.width =
        `${INVOICE_WIDTH * scale}px`;


    invoiceScaleWrapper.style.height =
        `${INVOICE_HEIGHT * scale}px`;

}


/* ==========================================================
   RESIZE HANDLING
========================================================== */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);

        resizeTimer =
            setTimeout(
                scaleInvoicePreview,
                50
            );

    }
);


/* ==========================================================
   SHOW PREVIEW
========================================================== */

invoiceForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!validateForm()){

            const firstError =
                invoiceForm.querySelector(
                    ".input-error"
                );

            if (firstError){

                firstError.scrollIntoView({
                    behavior:"smooth",
                    block:"center"
                });

                setTimeout(
                    () => firstError.focus(),
                    300
                );

            }

            return;
        }


        const data =
            getFormData();


        populatePreview(data);


        formPage.classList.add(
            "hidden"
        );

        previewPage.classList.remove(
            "hidden"
        );


        window.scrollTo({
            top:0,
            behavior:"instant"
        });


        requestAnimationFrame(
            () => {

                scaleInvoicePreview();

            }
        );

    }
);


/* ==========================================================
   EDIT DETAILS
========================================================== */

function editDetails(){

    previewPage.classList.add(
        "hidden"
    );

    formPage.classList.remove(
        "hidden"
    );

    window.scrollTo({
        top:0,
        behavior:"instant"
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
   PDF DOWNLOAD
========================================================== */

async function downloadInvoice(){

    if (
        typeof html2canvas === "undefined" ||
        typeof window.jspdf === "undefined"
    ){

        alert(
            "PDF generator is still loading. Please try again."
        );

        return;
    }


    const originalText =
        downloadBtn.textContent;


    downloadBtn.disabled =
        true;

    downloadBtn.textContent =
        "Preparing PDF…";


    downloadBtnTop.disabled =
        true;

    downloadBtnTop.textContent =
        "Preparing PDF…";


    try{

        /*
           Temporarily remove the mobile scale.

           This is critical.

           The preview can be tiny on a phone,
           but the PDF must always render from
           the original 794 × 1123 invoice.
        */

        invoicePaper.style.transform =
            "none";


        invoiceScaleWrapper.style.width =
            `${INVOICE_WIDTH}px`;

        invoiceScaleWrapper.style.height =
            `${INVOICE_HEIGHT}px`;


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
                invoicePaper,
                {
                    scale:3,
                    useCORS:true,
                    backgroundColor:"#ffffff",
                    width:INVOICE_WIDTH,
                    height:INVOICE_HEIGHT,
                    windowWidth:INVOICE_WIDTH,
                    windowHeight:INVOICE_HEIGHT,
                    logging:false
                }
            );


        const {
            jsPDF
        } = window.jspdf;


        const pdf =
            new jsPDF({
                orientation:"portrait",
                unit:"mm",
                format:"a4",
                compress:true
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


    }catch(error){

        console.error(
            "PDF generation failed:",
            error
        );

        alert(
            "We couldn't generate the PDF. Please try again."
        );


    }finally{

        scaleInvoicePreview();


        downloadBtn.disabled =
            false;

        downloadBtn.textContent =
            originalText;


        downloadBtnTop.disabled =
            false;

        downloadBtnTop.textContent =
            "Download PDF";

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
   MOBILE INVOICE SCALING
========================================================== */

function scaleInvoicePreview(){

    const wrapper = document.querySelector(
        ".invoice-scale-wrapper"
    );

    if (!wrapper) return;

    const viewport = document.querySelector(
        ".invoice-viewport"
    );

    if (!viewport) return;

    const invoiceWidth = 794;

    const availableWidth =
        viewport.clientWidth;

    let scale =
        availableWidth / invoiceWidth;

    /*
       Never enlarge the invoice beyond its natural
       desktop size.
    */
    scale = Math.min(scale, 1);

    /*
       Keep a tiny safety margin so Safari doesn't
       create fractional-pixel overflow.
    */
    scale = Math.max(scale - 0.005, 0.1);

    wrapper.style.setProperty(
        "--invoice-scale",
        scale
    );
}


/*
   Run after the page has rendered.
*/
window.addEventListener(
    "load",
    scaleInvoicePreview
);


/*
   Recalculate when the device rotates
   or the viewport changes.
*/
window.addEventListener(
    "resize",
    scaleInvoicePreview
);


/*
   iOS Safari can change the visual viewport
   after the browser UI appears/disappears.
*/
if (window.visualViewport){

    window.visualViewport.addEventListener(
        "resize",
        scaleInvoicePreview
    );

}
