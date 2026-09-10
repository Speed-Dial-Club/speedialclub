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
   DATE INPUT
========================================================== */

const invoiceDate =
    document.getElementById("invoiceDate");

const invoiceDateDisplay =
    document.getElementById("invoiceDateDisplay");


function formatDisplayDate(dateString){

    if (!dateString){
        return "";
    }

    const date =
        new Date(
            `${dateString}T00:00:00`
        );

    return date.toLocaleDateString(
        "en-IN",
        {
            day:"2-digit",
            month:"short",
            year:"numeric"
        }
    );
}


function setToday(){

    if (!invoiceDate){
        return;
    }

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    const value =
        `${year}-${month}-${day}`;

    invoiceDate.value =
        value;

    if (invoiceDateDisplay){

        invoiceDateDisplay.value =
            formatDisplayDate(value);

    }
}


setToday();


if (invoiceDate){

    invoiceDate.addEventListener(
        "change",
        () => {

            if (invoiceDateDisplay){

                invoiceDateDisplay.value =
                    formatDisplayDate(
                        invoiceDate.value
                    );

            }

            clearError(invoiceDate);

        }
    );

}


if (invoiceDateDisplay){

    invoiceDateDisplay.addEventListener(
        "click",
        () => {

            if (
                typeof invoiceDate.showPicker ===
                "function"
            ){

                invoiceDate.showPicker();

            }else{

                invoiceDate.click();

            }

        }
    );

}


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
   MONEY
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
   DATE FOR INVOICE
========================================================== */

function formatDate(dateString){

    if (!dateString){
        return "";
    }

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
   ERROR HANDLING
========================================================== */

function showError(
    field,
    message
){

    field.classList.add(
        "input-error"
    );

    const wrapper =
        field.closest(
            ".input-group"
        );

    if (!wrapper){
        return;
    }

    const error =
        wrapper.querySelector(
            ".error-message"
        );

    if (!error){
        return;
    }

    error.textContent =
        message;

    error.classList.add(
        "show"
    );
}


function clearError(field){

    field.classList.remove(
        "input-error"
    );

    const wrapper =
        field.closest(
            ".input-group"
        );

    if (!wrapper){
        return;
    }

    const error =
        wrapper.querySelector(
            ".error-message"
        );

    if (!error){
        return;
    }

    error.textContent = "";

    error.classList.remove(
        "show"
    );
}


/* ==========================================================
   VALIDATION
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

            if (
                !/^[6-9]\d{9}$/.test(value)
            ){

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

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    value
                )
            ){

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


function validateForm(){

    let valid = true;

    const fields =
        invoiceForm.querySelectorAll(
            "input:not([type='hidden']), select, textarea"
        );


    fields.forEach(field => {

        /*
           The visible date display field is not
           itself the actual form field.
        */

        if (
            field.id ===
            "invoiceDateDisplay"
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
   INPUT NORMALISATION
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

function getFormData(){

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

function populatePreview(data){

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

/*
   IMPORTANT:

   There is ONLY ONE scaling function.

   The live invoice is always reset before
   calculating its scale.

   This prevents the scaling state from carrying
   over after Download / Edit / Generate.
*/

function scaleInvoicePreview(){

    if (
        previewPage.classList.contains(
            "hidden"
        )
    ){

        return;

    }


    /*
       Always start from the original invoice
       dimensions.
    */

    invoicePaper.style.transform =
        "none";


    invoiceScaleWrapper.style.width =
        `${INVOICE_WIDTH}px`;

    invoiceScaleWrapper.style.height =
        `${INVOICE_HEIGHT}px`;


    /*
       Force the browser to recalculate the
       visible viewport before measuring it.
    */

    const viewportWidth =
        invoiceViewport.clientWidth;


    if (!viewportWidth){
        return;
    }


    /*
       On desktop, use the natural invoice size.
       On mobile/tablet, scale it to fit.
    */

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

function showPreview(){

    /*
       Reset any stale state from a previous
       preview.
    */

    invoicePaper.style.transform =
        "none";


    invoiceScaleWrapper.style.width =
        `${INVOICE_WIDTH}px`;

    invoiceScaleWrapper.style.height =
        `${INVOICE_HEIGHT}px`;


    /*
       Show the preview FIRST.

       This is critical because a hidden element
       cannot be measured reliably.
    */

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


    /*
       Wait until Safari has actually laid out
       the visible preview.
    */

    requestAnimationFrame(
        () => {

            requestAnimationFrame(
                () => {

                    scaleInvoicePreview();

                }
            );

        }
    );

}


/* ==========================================================
   GENERATE INVOICE
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

function editDetails(){

    /*
       Completely reset the preview before
       hiding it.

       This means no scaled transform can
       survive into the next generation.
    */

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
   PDF GENERATION
========================================================== */

/*
   IMPORTANT:

   We NEVER resize or transform the live invoice
   while creating the PDF.

   Instead, we clone it.

   This is the permanent fix for the iPhone bug.
*/

async function downloadInvoice(){

    if (
        typeof html2canvas ===
        "undefined" ||
        typeof window.jspdf ===
        "undefined"
    ){

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


    try{

        /*
           Create an isolated copy of the invoice.
        */

        pdfClone =
            invoicePaper.cloneNode(
                true
            );


        /*
           The clone lives outside the visible
           page and is always rendered at the
           original 794 × 1123 dimensions.
        */

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


        /*
           Give the browser time to paint the
           isolated clone before capturing it.
        */

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
                    scale:3,

                    useCORS:true,

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

                    logging:false
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


    }catch(error){

        console.error(
            "PDF generation failed:",
            error
        );


        alert(
            "We couldn't generate the PDF. Please try again."
        );


    }finally{

        /*
           Remove ONLY the temporary PDF clone.

           The actual visible invoice has never
           been touched.
        */

        if (
            pdfClone &&
            pdfClone.parentNode
        ){

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


        /*
           Recalculate the visible invoice anyway.

           This handles Safari viewport changes
           caused by its browser UI.
        */

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


function handleViewportChange(){

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


if (window.visualViewport){

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
        ){

            scaleInvoicePreview();

        }

    }
);
