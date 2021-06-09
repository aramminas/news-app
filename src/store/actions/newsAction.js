import API from "../../api/Api";
import {ADD_FILTERED_NEWS, ADD_NEXT_VIEW_PART_NEWS, ADD_SINGLE_NEWS, CLEAR_VIEW_NEWS, SEARCH_NEWS} from "../constants";
import {message} from "antd";
import moment from "moment";

export const add_filtered_news = (params, offset, limit) => dispatch => {
    API.getNewsBySourceId(params).then(data => {
        dispatch({type: ADD_FILTERED_NEWS, payload : data});
        const nextNews = data.slice(offset, limit);
        dispatch({type: CLEAR_VIEW_NEWS, payload: true});
        dispatch({type: ADD_NEXT_VIEW_PART_NEWS, payload : [...nextNews]});
    }).catch(error => {
        if(error.error){
            error.error.forEach(err => {
                message.error(err);
            });
        }
    });
}

export const add_filtered_sorted_news = (data, sort) => dispatch => {
    const sortedData = data.sort((a,b) => {
        if(sort === "down"){
            return moment(new Date(b.publishedAt)).format('YYYYMMDDHHmmss') - moment(new Date(a.publishedAt)).format('YYYYMMDDHHmmss');
        }
        return moment(new Date(a.publishedAt)).format('YYYYMMDDHHmmss') - moment(new Date(b.publishedAt)).format('YYYYMMDDHHmmss');
    });
    dispatch({type: ADD_FILTERED_NEWS, payload : [...sortedData]});
}

export const search_news = (offset, limit, ...rest) => dispatch => {
    API.searchNews(rest).then(data => {
        dispatch({type: SEARCH_NEWS, payload : data});
        const nextNews = data.slice(offset, limit);
        dispatch({type: CLEAR_VIEW_NEWS, payload: true});
        dispatch({type: ADD_NEXT_VIEW_PART_NEWS, payload : [...nextNews]});
    }).catch(error => {
        if(error.error){
            error.error.forEach(err => {
                message.error(err);
            });
        }
    });
}

export const add_next_view_part_news = data => {
    return {
        type: ADD_NEXT_VIEW_PART_NEWS, payload : data
    }
}

export const clear_view_news = data => {
    return {
        type: CLEAR_VIEW_NEWS, payload : data
    }
}

export const add_single_news = data => {
    return {
        type: ADD_SINGLE_NEWS, payload : data
    }
}

export const add_filtered_sorted_news_old = (params, sort, offset, limit) => dispatch => {
    API.sortNewsBy(params, sort).then(data => {
        dispatch({type: ADD_FILTERED_NEWS, payload : data});
        const nextNews = data.slice(offset, limit);
        dispatch({type: CLEAR_VIEW_NEWS, payload: true});
        dispatch({type: ADD_NEXT_VIEW_PART_NEWS, payload : [...nextNews]});
    }).catch(error => {
        if(error.error){
            error.error.forEach(err => {
                message.error(err);
            });
        }
    });
}