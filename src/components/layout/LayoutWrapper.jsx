import React,{Component} from "react";
import { Layout } from 'antd';
import HeaderDefault from "./header/HeaderDefault";
import FooterDefault from "./footer/FooterDefault";
const { Content } = Layout;

/* Styles */

const LayoutWrapper = (ChildComponent) =>
    class Layout extends Component {
        render() {
            return (
                <div className="App">
                    <Layout>
                        <HeaderDefault/>
                        <Layout>
                            <Content>
                                <ChildComponent  {...this.props} />
                            </Content>
                        </Layout>
                        <FooterDefault/>
                    </Layout>
                </div>
            )
        }
    }

export default LayoutWrapper;