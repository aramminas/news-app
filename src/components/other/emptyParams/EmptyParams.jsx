import {Link} from "react-router-dom";
import { Empty, Button } from "antd";

const styles = {
    marginTop: 150,
};

const EmptyParams = () => {
    return (
        <Empty
            bordered="true"
            image="/assets/images/empty.svg"
            imageStyle={{
                height: 60,
            }}
            description={
                <span>
                    Empty parameters <Link to="/">Back to sources</Link>
                </span>
            }
            style={styles}
        >
            <Link to="/">
                <Button type="primary">Sources</Button>
            </Link>
        </Empty>
    );
}

export default EmptyParams;