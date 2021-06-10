import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Card, Empty, Row, Col} from "antd";
import { LinkOutlined } from '@ant-design/icons';
import InfiniteScroll from "react-infinite-scroll-component";
import {Animated} from "react-animated-css";

/* actions */
import {get_sources, add_next_view_part_sources} from "../../store/actions/sourcesAction";

/* components */
import LayoutWrapper from "../layout/LayoutWrapper";
import LoadMore from "../other/loadMore/LoadMore";
import NoMoreSources from "../other/noMoreSources/NoMoreSources";

/* styles */
import "./Home.scss";

/* constants */
import data from "../../constants";
const {countries, categories, languages, sourceType} = data;

const limit = 9;
const initOffset = 0;

const Home = () => {
    const dispatch = useDispatch();
    const [offset, setOffset] = useState(limit);
    const [maxCount, setMaxCount] = useState(false);
    const {sources, show} = useSelector(state => state.sources);


    useEffect(() => {
        dispatch(get_sources(initOffset, limit));
        setOffset(limit);
    },[]);

    const fetchMoreData = () => {
        if(maxCount) return true;

        setTimeout(() => {
            const length = sources.length;
            const nextIndices = offset + limit;
            const nextSources = sources.slice(offset, nextIndices);

            dispatch(add_next_view_part_sources(nextSources));
            setOffset(nextIndices);
            if(offset >= length){
                setMaxCount(true);
            }
        }, 1500);
    };

    const NewsBlockJSX = () => {
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
                            <NoMoreSources />
                        }
                    </>
                }
            >
                <Row id="news-card">
                    { show.map(source => (
                        <Col span={8} key={source.id}>
                            <Card
                                title={<span><Link to={`/search/?${sourceType}=${source.id}`}>{source.name}</Link></span>}
                                actions={[
                                    <span>{categories[source.category]}</span>,
                                    <span>{languages[source.language]}</span>,
                                    <span>{countries[source.country]}</span>,
                                ]}
                                hoverable
                            >
                                <p>{source.description}</p>
                                <p><a href={source.url} className="sourceButton">Source <LinkOutlined /></a></p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </InfiniteScroll>
        );
    }

    return (
        <div className="site-card-wrapper">
             <div className="site-card-wrapper main-content">
                 <Row>
                     <Col span={24}>
                         <Animated animationIn="pulse" animationInDuration={2000} isVisible={true}>
                             <h1>Sources</h1>
                         </Animated>
                     </Col>
                 </Row>
                 { show.length > 0 ?
                     <NewsBlockJSX/>
                     :
                     <Row id="news-card">
                         <Col span={24}>
                             <div className="empty-result">
                                 <Empty description={'Sources not found!'} />
                             </div>
                         </Col>
                     </Row>
                 }
             </div>
        </div>
    );
}

export default LayoutWrapper(Home);
