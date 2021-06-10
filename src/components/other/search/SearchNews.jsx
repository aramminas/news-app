import {useState} from "react";
import {useDispatch} from "react-redux";

/* actions */
import {search_news} from "../../../store/actions/newsAction";

/* components */
import Search  from "antd/es/input/Search";
import history from "../../../history/history";

/* style */
import "./SearchNews.scss";

/* constants */
import data from "../../../constants";
const {searchType} = data;
const limit = 4;
const offset = 0;

const SearchNews = () => {
    const dispatch = useDispatch();
    const [width, setWidth] = useState('');

    const searchUpdated = (val) => {
        const searchP = `?${searchType}=${val}`
        dispatch(search_news(offset, limit, searchP));
        history.push(`/search/?q=${val}`);
    }

    const resizeInput = (type) => {
        setWidth(type);
    }

    return (
        <span className={`search-content ${width}`}>
            <Search onSearch={(val) => searchUpdated(val)}
                    onFocus={() => resizeInput('focus')}
                    onBlur={() => resizeInput('')}
            />
        </span>
    );
}

export default SearchNews;