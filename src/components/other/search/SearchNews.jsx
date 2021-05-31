import {useState} from "react";
import Search  from "antd/es/input/Search";
import history from "../../../history/history";

/* style */
import "./SearchNews.scss";

const SearchNews = () => {
    const [width, setWidth] = useState('');

    const searchUpdated = (val) => {
        history.push(`/search/${val}`);
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