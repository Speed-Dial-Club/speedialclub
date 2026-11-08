
/* SPEED DIAL CLUB | COPY GENERATOR */

const SDC_COPY_API = "https://script.google.com/macros/s/AKfycbzLSv1pGkyUyTVxvM_fuQ5LKYx53B8KFOF0H7nMElFsbAbcq8jsHcfLo7Ak1bGJjHGh8g/exec";

const form = document.getElementById("sdc-copy-form");
const generateButton = document.getElementById("sdc-generate-button");
const loading = document.getElementById("sdc-copy-loading");
const loadingMessage = document.getElementById("sdc-loading-message");
const errorBox = document.getElementById("sdc-copy-error");
const resultBox = document.getElementById("sdc-copy-result");
const generatedCopy = document.getElementById("sdc-generated-copy");
const copyButton = document.getElementById("sdc-copy-button");
const copyButtonLabel = document.getElementById("sdc-copy-button-label");

let currentCopy = "";

function normalisePhone(value) {
  let digits = String(value).replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return digits;
}

function jsonpLookup(phone) {
  return new Promise((resolve, reject) => {
    const callbackName =
      "sdcCallback_" + Date.now() + "_" +
      Math.floor(Math.random() * 100000);

    const script = document.createElement("script");
    let timeout;

    function cleanup() {
      delete window[callbackName];
      script.remove();
      clearTimeout(timeout);
    }

    window[callbackName] = response => {
      cleanup();
      resolve(response);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Unable to connect to Speed Dial Club. Please try again."));
    };

    timeout = setTimeout(() => {
      cleanup();
      reject(new Error("The request took too long. Please try again."));
    }, 20000);

    const url = new URL(SDC_COPY_API);
    url.searchParams.set("action", "creatorCopy");
    url.searchParams.set("phone", phone);
    url.searchParams.set("callback", callbackName);

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  const name = document.getElementById("sdc-creator-name").value.trim();
  const phone = normalisePhone(
    document.getElementById("sdc-creator-phone").value
  );

  errorBox.hidden = true;
  resultBox.hidden = true;
  currentCopy = "";

  if (!name) {
    showError("Please enter your name.");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    showError("Please enter a valid 10-digit Indian mobile number.");
    return;
  }

  if (!SDC_COPY_API.startsWith("https://script.google.com/")) {
    showError("The Copy Generator is not configured yet.");
    return;
  }

  generateButton.disabled = true;
  loading.hidden = false;

  try {
    loadingMessage.textContent = "Checking your details...";
    const request = jsonpLookup(phone);

    await delay(900);
    loadingMessage.textContent = "Generating your personalised copy...";

    const response = await request;

    await delay(800);

    if (!response.success) {
      showError(response.message || "We couldn't find your copy.");
      return;
    }

    currentCopy = response.data.copy;
    generatedCopy.textContent = currentCopy;
    resultBox.hidden = false;

    resultBox.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  } catch (error) {
    showError(error.message || "Something went wrong. Please try again.");
  } finally {
    loading.hidden = true;
    generateButton.disabled = false;
  }
});

copyButton.addEventListener("click", async () => {
  if (!currentCopy) return;

  try {
    await navigator.clipboard.writeText(currentCopy);

    copyButtonLabel.textContent = "Copied Successfully ✓";

    setTimeout(() => {
      copyButtonLabel.textContent = "Copy to Clipboard";
    }, 2200);

  } catch (error) {
    copyButtonLabel.textContent = "Please select and copy the text manually.";
  }
});
