/**
 * Performs a GET request to the Apps Script API.
 * @param {string} action
 * @returns {Promise<Object>}
 */
async function apiGet(action) {

    const response = await fetch(
        `${CONFIG.API.URL}?action=${encodeURIComponent(action)}`
    );

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Request failed.");
    }

    return result.data;

}


/**
 * Performs a POST request to the Apps Script API.
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function apiPost(payload) {
    const formData = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const response = await fetch(CONFIG.API.URL, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.message || "Request failed.");
    }
    return result.data;
}


/**
 * Fetch all active campaigns.
 * @returns {Promise<Object>}
 */
async function getCampaigns() {

    return await apiGet(
        CONFIG.API.ACTIONS.GET_CAMPAIGNS
    );

}


/**
 * Submit a creator payout.
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function submitPayout(payload) {

    return await apiPost({

        action: CONFIG.API.ACTIONS.SUBMIT_PAYOUT,

        ...payload

    });

}
