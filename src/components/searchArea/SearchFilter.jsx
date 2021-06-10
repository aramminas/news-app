import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link, useLocation} from "react-router-dom";
/* antd components */
import {Button, Checkbox, Col, Divider, Form, Input, Row} from "antd";
import {UndoOutlined, ArrowLeftOutlined} from "@ant-design/icons";

/* actions */
import {search_news, clear_view_news} from "../../store/actions/newsAction";
import {get_sources} from "../../store/actions/sourcesAction";

/* constants */
import data from "../../constants";
import history from "../../history/history";
import {makeGetParam} from "../../helpers/helpers";
const {countries, categories, searchType, countryType, categoryType , sourceType} = data;

const layout = {
    wrapperCol: {
        span: 24,
    },
};

const width = { width: '100%' };

/* constants */
const limit = 4;
const offset = 0;

const SearchFilter = () => {
    const {search: params} = useLocation();
    const dispatch = useDispatch();
    const {sources} = useSelector(state => state.sources);
    const [searchText, setSearchText] = useState("");
    const [countriesList, setCountriesList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [sourcesList, setSourcesList] = useState([]);


    useEffect(_ => {
        if(sources.length === 0){
            dispatch(get_sources());
        }

        /* when a mounting component, we check the URL parameters and adding default values */
        const searchP = new URLSearchParams(params).get(searchType);
        const countryP = new URLSearchParams(params).get(countryType);
        const categoryP = new URLSearchParams(params).get(categoryType);
        const sourcesP = new URLSearchParams(params).get(sourceType);
        const initSearch = searchP ? searchP.split(',') : "";
        setSearchText(initSearch);

        const initCountries = getSelectedParams(countryP) || [];
        setCountriesList(initCountries);

        const initCategories = getSelectedParams(categoryP) || [];
        setCategoriesList(initCategories);

        const initSources = getSelectedParams(sourcesP) || [];
        setSourcesList(initSources);
    }, []);

    const onFinish = ({search}) => {
        let currentURL = "";
        const searchParam = search !== null && search !== "" ? `?q=${search}` : "";
        currentURL += searchParam;
        const countryParam = makeGetParam(countriesList, countryType, currentURL) || "";
        currentURL += countryParam;
        const categoryParam = makeGetParam(categoriesList, categoryType, currentURL) || "";
        currentURL += categoryParam;

        /* while searching for a term, the source parameter is ignored because they are incompatible */
        const searchParamsData = [searchParam, countryParam, categoryParam , ""];
        dispatch(search_news(offset, limit, ...searchParamsData));

        setSearchText(search);
        setSourcesList([]);

        history.push(`/search/${currentURL}`);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const clearFilters = () => {
        setSearchText('');
        setCountriesList([]);
        setCategoriesList([]);
        setSourcesList([]);
        dispatch(clear_view_news(true));
        history.push(`/search`);
    }

    const onChange = (checkedValues, type = "") => {
        switch(type) {
            case countryType:
                //the 'Countries' parameter is not compatible with the 'Sources' parameter
                setCountriesList(_ => {
                    searchNewsUpdate([...checkedValues], type);
                    return [...checkedValues];
                });
                setSourcesList([]);
                break;
            case categoryType:
                //the 'Categories' parameter is not compatible with the 'Sources' parameter
                setCategoriesList(_ => {
                    searchNewsUpdate([...checkedValues], type);
                    return [...checkedValues];
                });
                setSourcesList([]);
                break;
            case sourceType:
                //the "Sources" parameter is not compatible with the "Countries" and "Categories" parameters"
                setSourcesList(_ => {
                    searchNewsUpdate([...checkedValues], type);
                    return [...checkedValues];
                });
                setCountriesList([]);
                setCategoriesList([]);
                break;
            default:
        }
    }

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        if(value === ""){
            onFinish({search: value});
        }
    }

    const searchNewsUpdate = (data, type) => {
        let searchParam = "";
        let currentURL = "";

        const sourceParam = type === sourceType ? makeGetParam(data, sourceType, currentURL)
                                                : makeGetParam(sourcesList, sourceType, currentURL);
        currentURL += sourceParam;
        /* while searching for a source , the term parameter is ignored because they are incompatible */
        if(sourceParam === ""){
            currentURL += searchParam = searchText ? `?q=${searchText}` : "";
        }

        const countryParam = type === countryType ? makeGetParam(data, countryType, currentURL)
                                                  : makeGetParam(countriesList, countryType, currentURL);
        currentURL += countryParam;

        const categoryParam = type === categoryType ? makeGetParam(data, categoryType, currentURL)
                                                    : makeGetParam(categoriesList, categoryType, currentURL);
        currentURL += categoryParam;

        const searchData = [offset, limit, searchParam, countryParam, categoryParam, sourceParam];
        dispatch(search_news(...searchData));
        history.push(`/search/${currentURL}`);
    }

    const getSelectedParams = (text) => {
        if(text && text !== ""){
            return text.split(",");
        }
        return false;
    }

    return (
        <Row>
            <Col span={24}>
                <div className="action-buttons-block">
                    <Button type="dashed" onClick={clearFilters}><UndoOutlined /> Clear</Button>
                    <Button type="dashed"><Link to="/"><ArrowLeftOutlined /> Back to sources</Link></Button>
                </div>
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
                        <Input placeholder="Search..." value={searchText} onChange={(e) => onSearchChange(e)}
                               allowClear={true}
                        />
                    </Form.Item>
                    { sourcesList.length === 0 &&
                        <>
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
                        </>
                    }
                    { (countriesList.length === 0 && categoriesList.length === 0) &&
                        <>
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
                        </>
                    }
                </Form>
            </Col>
        </Row>
    );
}

export default SearchFilter;