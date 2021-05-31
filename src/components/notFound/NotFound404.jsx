import {Link} from 'react-router-dom';
import { Result, Button } from 'antd';

import "./NotFound.scss";

const NotFound404 = () => {
    return (
        <section className="not-found-ant">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
            />
        </section>
    );
}

export default NotFound404;