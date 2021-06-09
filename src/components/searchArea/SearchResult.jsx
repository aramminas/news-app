import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Col, Row, Select, message} from "antd";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import {useParams} from "react-router-dom";

/* actions */
import {add_filtered_news, add_filtered_sorted_news, search_news, clear_view_news} from "../../store/actions/newsAction";

/* components */
import SearchResultItems from "./SearchResultItems";
/* constants */
import data from "../../constants";
const {searchType, countryType, categoryType} = data;
const { Option } = Select;

const limit = 4;
const offset = 0;

const SearchResult = () => {
    const dispatch = useDispatch();
    const {news, show} = useSelector(state => state.news);
    const params = useParams();

    useEffect(() => {
        if(news.length === 0 && (params.id !== "-" && params.id !== undefined)){
            dispatch(add_filtered_news(params, offset, limit));
        }else {
            const {category, country, id, q} = params;
            const searchP = q && q !== "-" && q.includes(searchType) ? q : q && !q.includes(searchType) && q !== "-" ? `${searchType}=${q}` : "";
            const countryP = country && country.includes(countryType) ? country : country && !country.includes(countryType) ? `${countryType}=${country}` : "";
            const categoryP = category && category.includes(categoryType) ? category : category && !category.includes(categoryType) ? `${categoryType}=${category}`: "";
            const sourceP = id ? `${id}` : "";
            const paramsData = [searchP, countryP, categoryP, sourceP];
            if(!searchP && !countryP && !categoryP && !sourceP){
                dispatch(clear_view_news(true));
            }else{
                dispatch(search_news(offset, limit, ...paramsData));
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