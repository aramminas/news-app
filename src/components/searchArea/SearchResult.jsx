import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Col, Row, Select, message} from "antd";
import {useParams} from "react-router-dom";

/* actions */
import {add_filtered_news, add_filtered_sorted_news} from "../../store/actions/newsAction";

/* components */
import SearchResultItems from "./SearchResultItems";

const { Option } = Select;

const limit = 4;
const offset = 0;

const SearchResult = () => {
    const dispatch = useDispatch();
    const {news} = useSelector(state => state.news);
    const { id } = useParams();

    useEffect(() => {
        if(news.length === 0){
            dispatch(add_filtered_news(id, offset, limit));
        }
    }, []);

    const onHandleSort = (sort) => {
        dispatch(add_filtered_sorted_news(id, offset, limit));
        message.info(`Sorted by ${sort}`);
    };

    return (
        <Row>
            <Col span={24} className="sort-action-block">
                <div>
                    <span className="sort-title">Sort by:</span>
                    <Select className="sort-select" defaultValue="Popularity" bordered={false} onChange={onHandleSort}>
                        <Option value="popularity">Popularity</Option>
                        <Option value="relevance">Relevance</Option>
                        <Option value="publishedAt">Published date</Option>
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