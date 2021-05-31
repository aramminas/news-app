import Loader from "react-loader-spinner";
import React from "react";

/* styles */
import "./LoadMore.scss";

const LoadMore = () => {
    return (
        <div className={"infinite-loader"}>
            <span>Loading</span>
            <Loader type="TailSpin" color="#111" height={60} width={60} />
        </div>
    );
}

export default LoadMore;