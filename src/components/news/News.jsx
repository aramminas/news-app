import {useSelector} from "react-redux";
import {Row, Col, Descriptions, Image} from 'antd';
import {ClockCircleOutlined, LinkOutlined, UserOutlined} from '@ant-design/icons';
import Moment from "react-moment";
import {Animated} from "react-animated-css";

/* components */
import LayoutWrapper from "../layout/LayoutWrapper";

/* styles */
import "./News.scss";

/* constants */
import data from "../../constants";
import React from "react";
const {defaultImage} = data;

const News = () => {
    const {single} = useSelector(state => state.news);

    return (
        <div className="main-content">
            <Row className="single-news-section">
                <Col span={18} offset={3}>
                    <Row>
                        <Col span={8} className="single-news-image">
                            <Animated animationIn="slideInLeft" animationOut="rubberBand" animationInDuration={1000} isVisible={true}>
                                <Image
                                    width={'100%'}
                                    alt="news"
                                    src={single.urlToImage ? single.urlToImage : defaultImage}
                                />
                            </Animated>
                        </Col>
                        <Col span={16} className="single-news-box">
                            <Animated animationIn="slideInRight" animationOut="rubberBand" animationInDuration={1000} isVisible={true}>
                                <Descriptions
                                    className="single-news"
                                    title={
                                        single.title
                                    }
                                >
                                    <Descriptions.Item label="Description" span={3}>{single.description}</Descriptions.Item>
                                    <Descriptions.Item label="Content" span={3}>{single.content}</Descriptions.Item>
                                    <Descriptions.Item span={3} className="single-news-info-block">
                                        <Animated animationIn="bounceInLeft" animationInDuration={1500} isVisible={true}>
                                            <span className="single-time-line">
                                                <UserOutlined/>
                                                <b><i>{single.author}</i></b>
                                            </span>
                                        </Animated>
                                        <Animated animationIn="fadeInUpBig" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                                            <span className="single-time-line">
                                                <LinkOutlined />
                                                <a href={single.url}>{single.source?.name}</a>
                                            </span>
                                        </Animated>
                                        <Animated animationIn="bounceInRight" animationInDuration={1500} isVisible={true}>
                                            <span className="single-time-line">
                                                <ClockCircleOutlined />
                                                <Moment format="YYYY-MM-DD h:mm a">
                                                    {single.publishedAt}
                                                </Moment>
                                            </span>
                                        </Animated>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Animated>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default LayoutWrapper(News);