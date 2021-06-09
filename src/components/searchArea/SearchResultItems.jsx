import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import history from "../../history/history";
import {List, Space, Image} from 'antd';
import {FieldTimeOutlined, UserOutlined, LinkOutlined} from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from "react-moment";
import {Animated} from "react-animated-css";

/* actions */
import {add_next_view_part_news, add_single_news} from "../../store/actions/newsAction";

/* components */
import LoadMore from "../other/loadMore/LoadMore";
import NoMoreNews from "../other/noMoreNews/NoMoreNews";
import EmptyParams from "../other/emptyParams/EmptyParams";

/* constants */
import data from "../../constants";
const {defaultImage} = data;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

IconText.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.object.isRequired,
}

const SearchResultItems = ({limit}) => {
    const [offset, setOffset] = useState(limit);
    const [maxCount, setMaxCount] = useState(false);
    const {news, show, empty} = useSelector(state => state.news);
    const dispatch = useDispatch();

    const fetchMoreData = () => {

        setTimeout(() => {
            const length = news.length;
            const nextIndices = offset + limit;
            const nextNews = news.slice(offset, nextIndices);
            dispatch(add_next_view_part_news(nextNews));
            setOffset(nextIndices);

            if(offset >= length){
                setMaxCount(true);
            }
        }, 500);
    };

    const singleNews = (e, item) => {
        e.preventDefault();
        history.push(`/news/${item.source.id}/${item.author}`);
        dispatch(add_single_news(item));
    }

    /* empty parameters view */
    if (empty) {
        return (
            <EmptyParams />
        );
    }

    /* main component view */
    return (
        <InfiniteScroll
            dataLength={show.length}
            next={fetchMoreData}
            hasMore={true}
            loader={
                <>
                    { !maxCount ?
                        <LoadMore />
                        :
                        <NoMoreNews />
                    }
                </>
            }
        >
            <List
                className="search-result-items"
                itemLayout="vertical"
                size="large"
                dataSource={show}
                renderItem={ (item, index) => (
                    <Animated animationIn="slideInRight" animationInDuration={1000 + index * 100} isVisible={true}>
                        <List.Item
                            key={`${item.title}-${item.author}`}
                            actions={[
                                <IconText icon={UserOutlined} text={<>item.author</>} key="list-vertical" />,
                                <IconText icon={LinkOutlined} text={
                                    <a href={item.url}>{item.source.name}</a>
                                } key="list-vertical" />,
                                <IconText icon={FieldTimeOutlined} text={
                                    <Moment format="YYYY-MM-DD h:mm a">
                                        {item.publishedAt}
                                    </Moment>
                                } key="list-vertical" />,
                            ]}
                            extra={
                                <Image
                                    width={272}
                                    alt="news"
                                    src={item.urlToImage ? item.urlToImage : defaultImage}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<a href={`/`} onClick={(e) => singleNews(e,item)}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    </Animated>
                )}
            />
        </InfiniteScroll>
    );
}

SearchResultItems.propTypes = {
    limit: PropTypes.number.isRequired
}

export default SearchResultItems;