import {ADD_SOURCES, ADD_NEXT_VIEW_PART_SOURCES, CLEAR_VIEW_SOURCES} from "../constants";

const initState = {
    sources: [],
    show: [],
};

const sourcesReducer = (state= initState, {type, payload}) => {
    switch (type) {
        case ADD_SOURCES:
            return {
                ...state,
                sources: payload,
            }
        case CLEAR_VIEW_SOURCES:
            return {
                ...state,
                show: [],
            }
        case ADD_NEXT_VIEW_PART_SOURCES:
            let mergeNewSources = [...state.show];
            mergeNewSources = mergeNewSources.concat([...payload]);
            return {
                ...state,
                show: [...mergeNewSources],
            };
         default:
            return state
    }
};

export default sourcesReducer;