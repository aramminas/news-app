import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Button, Checkbox, Col, Divider, Form, Input, Row} from "antd";
import {UndoOutlined} from "@ant-design/icons";

/* actions */
import {search_news} from "../../store/actions/newsAction";
import {get_sources} from "../../store/actions/sourcesAction";

/* constants */
import data from "../../constants";
import history from "../../history/history";
const {countries, categories, languages} = data;

const layout = {
    wrapperCol: {
        span: 24,
    },
};

const width = { width: '100%' };

/* constants */
const limit = 4;
const offset = 0;
const countryType = 'country';
const categoryType = 'category';
const sourceType = 'sources';
const languageType = 'language';

const SearchFilter = () => {
    const dispatch = useDispatch();
    const {sources} = useSelector(state => state.sources);
    const [searchText, setSearchText] = useState('');
    const [countriesList, setCountriesList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [sourcesList, setSourcesListList] = useState([]);
    const [languagesList, setLanguagesList] = useState([]);


    useEffect(_ => {
        if(sources.length === 0){
            dispatch(get_sources());
        }
    }, []);

    const onFinish = ({search}) => {
        dispatch(search_news(offset, limit, search));
        setSearchText(search);
        history.push(`/search/${search}`);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const clearFilters = () => {
        setSearchText('');
        setCountriesList([]);
        setCategoriesList([]);
        setSourcesListList([]);
        setLanguagesList([]);
    }

    const onChange = (checkedValues, type = "") => {
        switch(type) {
            case countryType:
                setCountriesList(_ => {
                    searchNewsUpdate([...checkedValues], type);
                    return [...checkedValues];
                });
                break;
            case categoryType:
                setCategoriesList(_ => {
                    searchNewsUpdate([...checkedValues], type);
                    return [...checkedValues];
                });
                break;
            case sourceType:
                setSourcesListList(_ => {
                    searchNewsUpdate([...checkedValues], type);
                    return [...checkedValues];
                });
                break;
            case languageType:
                setLanguagesList(_ => {
                    searchNewsUpdate([...checkedValues], type);
                    return [...checkedValues];
                });
                break;
            default:
        }
    }

    const searchNewsUpdate = (data, type) => {

        const countryParam = type === countryType ? makeGetParam(data, countryType) : makeGetParam(countriesList, countryType);
        const categoryParam = type === categoryType ? makeGetParam(data, categoryType) : makeGetParam(categoriesList, categoryType);
        const sourceParam = type === sourceType ? makeGetParam(data, sourceType) : makeGetParam(sourcesList, sourceType);
        const languageParam = type === languageType ? makeGetParam(data, languageType) : makeGetParam(languagesList, languageType);

        const searchData = [
            offset, limit, searchText,
            countryParam, categoryParam, sourceParam, languageParam,
        ];

        dispatch(search_news(...searchData));
    }

    const makeGetParam = (data, type) => {
        let param = `${type}=`;
        let val = data.join(',');

        if(data.length > 0){
            return param + val;
        }
        return "";
    }


    return (
        <Row>
            <Col span={24}>
                <Button type="dashed" onClick={clearFilters}><UndoOutlined /> Clear</Button>
            </Col>
            <Col span={24} className="search-box">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: false,
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
                        <Input placeholder="Search..."/>
                    </Form.Item>
                    <Divider orientation="left" className="divider-title">Country</Divider>
                    <Form.Item>
                        <Checkbox.Group style={width} onChange={(e) => onChange(e, countryType)}
                                        value={countriesList}
                        >
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
                        <Checkbox.Group style={width} onChange={(e) => onChange(e, categoryType)}
                                        value={categoriesList}
                        >
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
                        <Checkbox.Group style={width} onChange={(e) => onChange(e, sourceType)}
                                        value={sourcesList}
                        >
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
                        <Checkbox.Group style={width} onChange={(e) => onChange(e, languageType)}
                                        value={languagesList}
                        >
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