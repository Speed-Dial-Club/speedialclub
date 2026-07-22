const CONFIG = {

    API: {

        URL: "https://script.google.com/macros/s/AKfycbzLSv1pGkyUyTVxvM_fuQ5LKYx53B8KFOF0H7nMElFsbAbcq8jsHcfLo7Ak1bGJjHGh8g/exec",

        ACTIONS: {
            GET_CAMPAIGNS: "campaigns",
            SUBMIT_PAYOUT: "submitPayout"
        }

    },

    UPLOAD: {

        MAX_FILE_SIZE: 10 * 1024 * 1024,

        MAX_UPLOAD_MB: 10,

        ALLOWED_FILE_TYPES: [
            "application/pdf"
        ]

    }

};
