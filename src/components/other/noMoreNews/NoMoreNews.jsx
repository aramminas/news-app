import { FrownOutlined } from '@ant-design/icons';

import "./NoMoreNews.scss";

const NoMoreNews = () => {
    return (
        <div className="no-more-new">
            <FrownOutlined />
            <span>There is no more news...</span>
        </div>
    );
}

export default NoMoreNews;