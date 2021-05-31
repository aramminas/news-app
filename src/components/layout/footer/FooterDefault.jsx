import { Layout } from 'antd';
import "./FooterDefault.scss";
const { Footer} = Layout;

const FooterDefault = () => {
    return (
        <Footer>
            <div className="text-center p-3 footer-box">
                © {(new Date()).getFullYear()}  Copyright:
                <a className="text-dark footer-link" href="/">
                    <img className="rotating" src="/assets/images/newspaper-grey.svg" alt="logo-img"/>
                    WebCompany.com
                </a>
            </div>
        </Footer>
    );
}

export default FooterDefault;