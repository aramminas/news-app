import React from "react";
import { List, Avatar, Space, Image } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `What is Lorem Ipsum? ${i}`,
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        date: 'May 15, 2021'
    });
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const SearchResultItems = () => {
    return (
        <List
            className="search-result-items"
            itemLayout="vertical"
            size="large"
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <IconText icon={FieldTimeOutlined} text={item.date} key="list-vertical-star-o" />,
                    ]}
                    extra={
                        <Image
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
    );
}

export default SearchResultItems;