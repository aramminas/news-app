import axios from "axios";

// const API_KEY = '6eac78c03d5f4707a6cf512760486f20';
const API_KEY = 'fa9c7a65231c410a951dc199d7fadd2e';
// const API_KEY = '94aad3b0f5724fbf837650256d548bbc';
const URL = 'https://newsapi.org/v2';

const getSources = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${URL}/sources?apiKey=${API_KEY}`)
            .then(function (response) {
                // handle success
                const { data } = response;
                if(data && data.sources && data.sources.length > 0){
                    resolve(data.sources);
                }else {
                    reject({error: ['An error occurred while getting data from the api!']});
                }
            })
            .catch(function (error) {
                // handle error
                if(error.response){
                    const {data , status} = error.response;
                    reject({ error: [
                            `Status Code: ${status}`,
                            data.message
                        ]});
                }
                if (!error.status) {
                    reject({ error: [error.message]});
                }
                console.log('error.response',error.response);
                console.log('error',error);
            });
    });
}

const getNewsBySourceId = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${URL}/top-headlines?sources=${id}&apiKey=${API_KEY}`)
            .then(function (response) {
                // handle success
                const { data } = response;
                if(data && data.articles && data.articles.length > 0){
                    resolve(data.articles);
                }else {
                    reject({error: ['An error occurred while getting data from the api!']});
                }
            })
            .catch(function (error) {
                // handle error
                const {data , status} = error.response;
                reject({ error: [
                        `Status Code: ${status}`,
                        data.message
                    ]});
                console.log('error.response',error.response);
                console.log('error',error);
            });
    });
}

const sortNewsBy = (id, sort) => {
    return new Promise((resolve, reject) => {
        axios.get(`${URL}/top-headlines?sources=${id}&sortBy=${sort}&apiKey=${API_KEY}`)
            .then(function (response) {
                // handle success
                const { data } = response;
                if(data && data.articles && data.articles.length > 0){
                    resolve(data.articles);
                }else {
                    reject({error: ['An error occurred while getting data from the api!']});
                }
            })
            .catch(function (error) {
                // handle error
                const {data , status} = error.response;
                reject({ error: [
                        `Status Code: ${status}`,
                        data.message
                    ]});
                console.log('error.response',error.response);
                console.log('error',error);
            });
    });
}

const searchNews = (searchData) => {
    let [search, country, category, source, language] = searchData;

    let tempUrl = "";
    const isEmpty = search !== "" || source !== "";

    // API limitation (We cannot mix the sources parameter with the country or category parameters.)
    if (source === ""){
        tempUrl += isEmpty && country !== "" ? `&${country}` : country;
        tempUrl += tempUrl !== "" && category !== "" ? `&${category}` : category !== "" && isEmpty ? `&${category}` : category;
    }

    tempUrl += tempUrl !== "" && language !== "" ? `&${language}` : language !== "" && isEmpty ?  `&${language}` : language;

    const mainParamStepOne = search !== "" ? `everything?q=${search}` : "top-headlines?";
    const mainParamStepTwo = source !== "" && search === "" ? `${mainParamStepOne}${source}` : "";
    const finalParam = mainParamStepTwo === "" ? mainParamStepOne : mainParamStepTwo;

    const searchURL = `${URL}/${finalParam}${tempUrl}&apiKey=${API_KEY}`;

    return new Promise((resolve, reject) => {
        axios.get(searchURL)
            .then(function (response) {
                // handle success
                const { data } = response;
                if(data && data.articles && data.articles.length > 0){
                    resolve(data.articles);
                }else {
                    reject({error: ['Nothing was found for this query!']});
                }
            })
            .catch(function (error) {
                // handle error
                if(error.response){
                    const {data , status} = error.response;
                    reject({ error: [
                            `Status Code: ${status}`,
                            data.message
                        ]});
                }
                if (!error.status) {
                    reject({ error: [error.message]});
                }
                console.log('error.response',error.response);
                console.log('error',error);
            });
    });
}

const API = {
    getSources,
    getNewsBySourceId,
    sortNewsBy,
    searchNews,
};

export default API;