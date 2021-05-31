import API from "../../api/Api";
import {ADD_SOURCES, ADD_NEXT_VIEW_PART_SOURCES, CLEAR_VIEW_SOURCES} from "../constants";
import {message} from "antd";

export const get_sources = (offset = 0, limit = 0) => dispatch => {
    API.getSources().then(data => {
        dispatch({type: ADD_SOURCES, payload : data});
        if(limit !== 0){
            const nextSources = data.slice(offset, limit);
            dispatch({type: CLEAR_VIEW_SOURCES, payload: true});
            dispatch({type: ADD_NEXT_VIEW_PART_SOURCES, payload : [...nextSources]});
        }
    }).catch(error => {
        if(error.error){
            error.error.forEach(err => {
                message.error(err);
            });
        }
    });
};

export const add_next_view_part_sources = data => {
    return {
        type: ADD_NEXT_VIEW_PART_SOURCES, payload : data
    }
}

export const clear_view_sources = data => {
    return {
        type: CLEAR_VIEW_SOURCES, payload : data
    }
}