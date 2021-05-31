import { Layout } from 'antd';
import Logo from "../../other/logo/Logo";
import SearchNews from "../../other/search/SearchNews";
/* styles */
import "./HeaderDefault.scss";

const { Header} = Layout;

const HeaderDefault = () => {
    return (
        <Header className="main-header">
            <Logo/>
            <SearchNews />
        </Header>
    );
}

export default HeaderDefault;