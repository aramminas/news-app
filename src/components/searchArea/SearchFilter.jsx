import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
/* antd components */
import {Button, Checkbox, Col, Divider, Form, Input, Row} from "antd";
import {UndoOutlined} from "@ant-design/icons";

/* actions */
import {search_news, clear_view_news} from "../../store/actions/newsAction";
import {get_sources} from "../../store/actions/sourcesAction";

/* constants */
import data from "../../constants";
import history from "../../history/history";
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
    const {category, country, id , q} = useParams();
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
        const initSearch = q && q !== "-" ? q.replace(`${searchType}=`, "") : "";
        setSearchText(initSearch);

        const initCountries = getSelectedParams(country, `${countryType}=`) || [];
        setCountriesList(initCountries);

        const initCategories = getSelectedParams(category, `${categoryType}=`) || [];
        setCategoriesList(initCategories);

        const initSources = getSelectedParams(id, `${sourceType}=`) || [];
        setSourcesList(initSources);
    }, []);

    const onFinish = ({search}) => {
        const countryParam = makeGetParam(countriesList, countryType) || "-";
        const categoryParam = makeGetParam(categoriesList, categoryType) || "-";
        const searchParam = search && search !== "-" ? `q=${search}` : "-";

        /* while searching for a term, the source parameter is ignored because they are incompatible */
        const searchParamsData = [searchParam, countryParam, categoryParam , "-"];
        dispatch(search_news(offset, limit, ...searchParamsData));

        setSearchText(search);
        setSourcesList([]);

        history.push(`/search/-/${searchParam}/${countryParam}/${categoryParam}`);
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
        history.push(`/search/-`);
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
        setSearchText(e.target.value);
    }

    const searchNewsUpdate = (data, type) => {

        const countryParam = type === countryType ? makeGetParam(data, countryType) || "-" : makeGetParam(countriesList, countryType) || "-";
        const sourceParam = type === sourceType ? makeGetParam(data, sourceType) || "-" : makeGetParam(sourcesList, sourceType) || "-";
        const categoryParam = type === categoryType ? makeGetParam(data, categoryType) || "" : makeGetParam(categoriesList, categoryType) || "";
        let searchParam = "-";
        /* while searching for a source , the term parameter is ignored because they are incompatible */
        if(sourceParam === "-"){
            searchParam = searchText ? `q=${searchText}` : "-";
        }
        const searchData = [
            offset, limit, "-",
            countryParam, categoryParam, sourceParam,
        ];
        dispatch(search_news(...searchData));
        history.push(`/search/${sourceParam}/${searchParam}/${countryParam}/${categoryParam}`);
    }

    const makeGetParam = (data, type) => {
        let param = `${type}=`;
        let val = data.join(',');

        if(data.length > 0){
            return param + val;
        }
        return "";
    }

    const getSelectedParams = (text, param) => {
        if(text && text.includes(param)){
            return text.replace(param, "").split(",");
        }
        return false;
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