import API from "../../api/Api";
import {ADD_FILTERED_NEWS, ADD_NEXT_VIEW_PART_NEWS, ADD_SINGLE_NEWS, CLEAR_VIEW_NEWS} from "../constants";
import {message} from "antd";

export const add_filtered_news = (id, offset, limit) => dispatch => {
    API.getNewsBySourceId(id).then(data => {
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


export const add_filtered_sorted_news = (id, sort, offset, limit) => dispatch => {
    API.sortNewsBy(id, sort).then(data => {
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