import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Button, Checkbox, Col, Divider, Form, Input, Row} from "antd";
import {UndoOutlined} from "@ant-design/icons";

/* constants */
import data from "../../constants";
import {get_sources} from "../../store/actions/sourcesAction";
const {countries, categories, languages} = data;

const layout = {
    wrapperCol: {
        span: 24,
    },
};

const width = { width: '100%' };

const SearchFilter = () => {
    const dispatch = useDispatch();
    const {sources} = useSelector(state => state.sources);

    useEffect(_ => {
        if(sources.length === 0){
            dispatch(get_sources());
        }
    }, []);

    const onFinish = (values) => {
        console.log('Success: ?q=', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }


    return (
        <Row>
            <Col span={24}>
                <Button type="dashed"><UndoOutlined /> Clear</Button>
            </Col>
            <Col span={24} className="search-box">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="search"
                        rules={[
                            {
                                message: 'Please indicate what you are looking for...',
                            },
                        ]}
                    >
                        <Input placeholder="Search..." />
                    </Form.Item>
                    <Divider orientation="left" className="divider-title">Country</Divider>
                    <Form.Item>
                        <Checkbox.Group style={width} onChange={onChange}>
                            <Row>
                                { Object.keys(countries).map(key => (
                                    <Col span={8} key={key}>
                                        <Checkbox value={key}>{countries[key]}</Checkbox>
                                    </Col>
                                ))
                                }
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Divider orientation="left" className="divider-title">Category</Divider>
                    <Form.Item>
                        <Checkbox.Group style={width} onChange={onChange}>
                            <Row>
                                { Object.keys(categories).map(key => (
                                    <Col span={8} key={key}>
                                        <Checkbox value={key}>{categories[key]}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Divider orientation="left" className="divider-title">Source</Divider>
                    <Form.Item>
                        <Checkbox.Group style={width} onChange={onChange}>
                            <Row>
                                { sources.map(item => (
                                    <Col span={8} key={`${item.id}-${item.name}`}>
                                        <Checkbox value={item.id}>{item.name}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Divider orientation="left" className="divider-title">Language</Divider>
                    <Form.Item>
                        <Checkbox.Group style={width} onChange={onChange}>
                            <Row>
                                { Object.keys(languages).map(key => (
                                    <Col span={8} key={key}>
                                        <Checkbox value={key}>{languages[key]}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default SearchFilter;