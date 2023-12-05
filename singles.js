/**
 * Always add ?language=1 (english) to the end of the url
 * e.g. 
 * https://www.cardmarket.com/en/Magic/Cards/Vampiric-Tutor?language=1
 * https://www.cardmarket.com/en/Magic/Products/Singles/Dominaria-Remastered-Extras/Vampiric-Tutor-V1
 */


/**
 * Get the language from the Cardmarket url
 * @returns {number} 1 for english, 2 for german, 3 for french, 4 for spanish, 5 for italian, 6 for simplified chinese, 7 for japanese, 8 for portuguese, 9 for russian, 10 for korean
 */
function getLanguage() {
    let params = new URLSearchParams(window.location.search);
    let language = params.get("language");
    // default to english
    if (!language || parseInt(language) < 1 || parseInt(language) > 10) {
        language = 1;
    }
    return language;
}

function getSellerCountry() {
    let params = new URLSearchParams(window.location.search);
    let sellerCountry = params.get("sellerCountry");
    // default to EU only, exclude Japan, Norway, UK and Switzerland
    if (!sellerCountry) {
        sellerCountry = "1,2,3,33,35,5,6,8,9,11,12,7,14,15,37,16,17,21,18,19,20,22,23,25,26,27,29,31,30,10,28";
    }
    return sellerCountry;
}

/**
 * Always add language filter to the end of the url
 */
function appendQueryParamsToUrl() {
    // require reload?
    let params = new URLSearchParams(window.location.search);

    let language = params.get("language");
    let sellerCountry = params.get("sellerCountry");

    if (!language || !sellerCountry) {
        params.set("language", getLanguage());
        params.set("sellerCountry", getSellerCountry());
        params.set("sellerReputation", 3); // min seller reputation 3 = Good

        // append query params to url
        let newUrl = window.location.href + "?" + params.toString();
        // replace url in history without reloading page
        window.history.replaceState({}, document.title, newUrl);
        // reload page
        window.location.reload();
    }
}

// run once on page load
appendQueryParamsToUrl();
