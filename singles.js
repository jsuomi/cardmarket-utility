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
    if(!language || parseInt(language) < 1 || parseInt(language) > 10) {
        language = 1;
    }
    return language;
}

/**
 * Always add language filter to the end of the url
 */
function appendLanguageToUrl() {
    let language = getLanguage();
    let url = window.location.href;
    let newUrl = url;
    let params = new URLSearchParams(window.location.search);
    let languageParam = params.get("language");
    if(!languageParam) {
        newUrl = url + "?language=" + language;
        window.location.href = newUrl;
    }
}

// run once on page load
appendLanguageToUrl();
