import axios from "axios";

const API_KEY = '6eac78c03d5f4707a6cf512760486f20';

const getSources = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://newsapi.org/v2/sources?apiKey=' + API_KEY)
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

const getNewsBySourceId = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=${API_KEY}`)
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
        axios.get(`https://newsapi.org/v2/top-headlines?sources=${id}&sortBy=${sort}&apiKey=${API_KEY}`)
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

const API = {
    getSources,
    getNewsBySourceId,
    sortNewsBy,
};

export default API;


// sources category
//GET https://newsapi.org/v2/sources?category=business&apiKey=API_KEY

// sources country
// GET https://newsapi.org/v2/sources?country=us&apiKey=API_KEY

// sources language
// GET https://newsapi.org/v2/sources?language=en&apiKey=API_KEY

// multi select
// GET https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=API_KEY
