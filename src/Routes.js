import React, {Suspense} from "react";
import {Switch, Route} from "react-router-dom";
import Loader from "react-loader-spinner";
/* components */
import Home from "./components/home/Home";
import SearchArea from "./components/searchArea/SearchArea";
import News from "./components/news/News";
import NotFound404 from "./components/notFound/NotFound404";

export default function App() {
    return (
        <Suspense fallback={<div className={"main-loader"}><Loader  type="Oval" color="#000" height={100} width={100}/></div>}>
            <Switch>
                <Route exact={true} path="/">
                    <Home />
                </Route>
                <Route path="/search/:id?/:q?/:country?/:category?/:language?">
                    <SearchArea/>
                </Route>
                <Route path="/news/:source/:author">
                    <News/>
                </Route>
                <Route path="*">
                    <NotFound404 />
                </Route>
            </Switch>
        </Suspense>
    );
}