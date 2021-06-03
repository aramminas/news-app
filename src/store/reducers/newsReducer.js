import {ADD_FILTERED_NEWS, ADD_NEXT_VIEW_PART_NEWS, CLEAR_VIEW_NEWS, ADD_SINGLE_NEWS, SEARCH_NEWS} from "../constants";

const initState = {
    news: [],
    show: [],
    single: {},
};

const newsReducer = (state= initState, {type, payload}) => {
    switch (type) {
        case ADD_FILTERED_NEWS:
        case SEARCH_NEWS:
            return {
                ...state,
                news: [...payload],
            };
        case CLEAR_VIEW_NEWS:
            return {
                ...state,
                show: [],
            }
        case ADD_NEXT_VIEW_PART_NEWS:
            let mergeNewNews = [...state.show];
            mergeNewNews = mergeNewNews.concat([...payload]);
            return {
                ...state,
                show: [...mergeNewNews],
            };
        case ADD_SINGLE_NEWS:
            return {
                ...state,
                single: {...payload},
            };
        default:
            return state
    }
};

export default newsReducer;