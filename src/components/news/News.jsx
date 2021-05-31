import {useSelector} from "react-redux";
import {Row, Col, Descriptions, Image} from 'antd';
import {ClockCircleOutlined, LinkOutlined, UserOutlined} from '@ant-design/icons';
import Moment from "react-moment";

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
                            <Image
                                width={'100%'}
                                alt="news"
                                src={single.urlToImage ? single.urlToImage : defaultImage}
                            />
                        </Col>
                        <Col span={16}>
                            <Descriptions
                                className="single-news"
                                title={single.title}
                            >
                                <Descriptions.Item label="Description" span={3}>{single.description}</Descriptions.Item>
                                <Descriptions.Item label="Content" span={3}>{single.content}</Descriptions.Item>
                                <Descriptions.Item span={3} className="single-news-info-block">
                                    <span className="single-time-line">
                                        <UserOutlined />
                                        <b><i>{single.author}</i></b>
                                    </span>
                                    <span className="single-time-line">
                                        <LinkOutlined />
                                        <a href={single.url}>{single.source?.name}</a>
                                    </span>
                                    <span className="single-time-line">
                                        <ClockCircleOutlined />
                                        <Moment format="YYYY-MM-DD h:mm a">
                                            {single.publishedAt}
                                        </Moment>
                                    </span>
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default LayoutWrapper(News);