import axios from "axios";

// const API_KEY = '6eac78c03d5f4707a6cf512760486f20';
const API_KEY = '100db88380484f9aa4305d014bb06a99';
// const API_KEY = '94aad3b0f5724fbf837650256d548bbc';
// const API_KEY = '87d85a44e2d4456a825191c18cd5ea31';
// const API_KEY = 'fa9c7a65231c410a951dc199d7fadd2e';
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

const getNewsBySourceId = (params) => {
    const {sources} = params;
    return new Promise((resolve, reject) => {
        axios.get(`${URL}/top-headlines?${sources}&apiKey=${API_KEY}`)
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

const sortNewsBy = (params, sort) => {
    const {id} = params;
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
    let [search, country, category, source] = searchData;

    let tempUrl = "";
    let mainParam = "";

    if(search !== "" && source === ""){
        /* when there is a search parameter the source parameter is ignored */
        if(category === "" && country === ""){
            /* The category param is not currently supported on the /everything endpoint. */
            /* The country param is not currently supported on the /everything endpoint. */
            mainParam = `everything${search}`;
        }else {
            mainParam = `top-headlines${search}`;
        }
    }else if(source !== ""){
        if( search !== ""){
            mainParam = `top-headlines${search}`;
        }else{
            mainParam = `top-headlines${source}`;
        }
    }else {
        mainParam = "top-headlines";
    }

    //the "Sources" parameter is not compatible with the "Countries" and "Categories" parameters"
    if(source === ""){
        tempUrl += country !== "" ? country : "";
        tempUrl += category !== "" ? category : "";
    }

    const searchURL = `${URL}/${mainParam}${tempUrl}&apiKey=${API_KEY}`.replace(" ", "%20");

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