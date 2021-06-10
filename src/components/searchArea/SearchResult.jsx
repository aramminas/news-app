import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Col, Row, Select, message} from "antd";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import {useLocation} from "react-router-dom";

/* actions */
import {add_filtered_news, add_filtered_sorted_news, search_news, clear_view_news} from "../../store/actions/newsAction";

/* components */
import SearchResultItems from "./SearchResultItems";
/* constants */
import data from "../../constants";
import {makeGetParam} from "../../helpers/helpers";
const {searchType, countryType, categoryType, sourceType} = data;
const { Option } = Select;

const limit = 4;
const offset = 0;

const SearchResult = () => {
    const dispatch = useDispatch();
    const {news, show} = useSelector(state => state.news);
    const {search} = useLocation();

    useEffect(() => {
        const sources = new URLSearchParams(search).get(sourceType);

        if(news.length === 0 && (sources !== null && sources !== '')){
            dispatch(add_filtered_news({sources: `${sourceType}=${sources}`}, offset, limit));
        }else {
            if(search === ""){
                dispatch(clear_view_news(true));
            }else{
                const searchP = new URLSearchParams(search).get(searchType);
                const country = new URLSearchParams(search).get(countryType);
                const category = new URLSearchParams(search).get(categoryType);

                let searchParam = "";
                let currentURL = "";

                const sourceParam = sources ? makeGetParam(sources, sourceType, currentURL) : "";
                currentURL += sourceParam;

                /* while searching for a source , the term parameter is ignored because they are incompatible */
                if(sourceParam === ""){
                    currentURL += searchParam = searchP ? `?q=${searchP}` : "";
                }

                const countryParam = country ? makeGetParam(country, countryType, currentURL) : "";
                currentURL += countryParam;

                const categoryParam = category ? makeGetParam(category, categoryType, currentURL) : "";

                const searchData = [
                    offset, limit, searchParam,
                    countryParam, categoryParam, sourceParam,
                ];
                dispatch(search_news(...searchData));
            }
        }
    }, []);

    const onHandleSort = (sort) => {
        dispatch(add_filtered_sorted_news(show, sort));
        message.info(`Sorted by ${sort}`);
    };

    return (
        <Row>
            <Col span={24} className="sort-action-block">
                <div>
                    <span className="sort-title">Sort by:</span>
                    <Select className="sort-select" defaultValue="up" bordered={false} onChange={onHandleSort}>
                        <Option value="up">Published date <CaretUpOutlined /></Option>
                        <Option value="down">Published date <CaretDownOutlined /></Option>
                    </Select>
                </div>
            </Col>
            <Col span={24}>
                <SearchResultItems limit={limit} />
            </Col>
        </Row>
    );
}

export default SearchResult;