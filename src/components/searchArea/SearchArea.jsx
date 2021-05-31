import { Row, Col} from 'antd';
/* components */
import LayoutWrapper from "../layout/LayoutWrapper";
import SearchFilter from "./SearchFilter";
import SearchResult from "./SearchResult";

/* styles */
import "./SearchArea.scss";

const SearchArea = () => {

    return (
        <div className="main-content search-area">
            <Row>
                <Col span={6} offset={1}>
                    <SearchFilter />
                </Col>
                <Col span={15} offset={1}>
                    <SearchResult />
                </Col>
            </Row>
        </div>
    );
}

export default LayoutWrapper(SearchArea);