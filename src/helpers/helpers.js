export const makeGetParam = (data, type, current) => {
    let symbol = current === "" ? "?" : "&";
    let param = `${symbol}${type}=`;
    let val = typeof(data) === "string" ? data : data.join(',');

    if(data.length > 0){
        return param + val;
    }
    return "";
}