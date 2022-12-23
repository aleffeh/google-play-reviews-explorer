const pkg = require("google-play-scraper");
const {reviews, sort} = pkg;
const getAllAppReviewsInPlayStore = async (packageName, sortType) => {

    const reviewList = [];

    let selectedSorting

    if(sortType === 3)
        selectedSorting = sort.RATING

    if(sortType === 2)
        selectedSorting = sort.NEWEST

    if (sortType === 1)
        selectedSorting = sort.HELPFULNESS

    let pagToken = null;

    const langDict = [{lang: "pt", country: "BR"}, {lang: "en", country: "US"}, {lang: "es", country: "ES"}, {lang: "fr", country: "FR"}, {lang: "de", country: "DE"}, {lang: "it", country: "IT"}, {lang: "ja", country: "JP"}, {lang: "ko", country: "KR"}, {lang: "nl", country: "NL"}, {lang: "pl", country: "PL"}, {lang: "ru", country: "RU"}, {lang: "sv", country: "SE"}, {lang: "tr", country: "TR"}, {lang: "zh", country: "CN"}, {lang: "zh", country: "TW"} ];

    for (const langItem in langDict) {
        pagToken = null

        let data_leak = [];

        try {

            console.log(`Buscando: ${packageName} -> ${langDict[langItem].lang} - ${langDict[langItem].country}`)

            let {data, nextPaginationToken} = await reviews({
                appId: packageName,
                paginate: true,
                sort: selectedSorting,
                lang: langDict[langItem].lang,
                country: langDict[langItem].country
            });

            reviewList.push(...data)
            pagToken = nextPaginationToken


            while (pagToken != null) {
                let {data, nextPaginationToken} = await reviews({
                    appId: packageName,
                    sort: selectedSorting,
                    paginate: true,
                    nextPaginationToken: pagToken,
                    lang: langDict[langItem].lang,
                    country: langDict[langItem].country,
                });

                data_leak = data
                reviewList.push(...data)
                pagToken = nextPaginationToken
            }
        } catch (error) {
            console.log(packageName)
            console.log(data_leak)
            console.log(pagToken)
            console.log(error)
            console.log(`Erro na lang: ${langDict[langItem].lang} - ${langDict[langItem].country}`)
        }
    }
    return reviewList
}

module.exports = getAllAppReviewsInPlayStore