"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationCalculate = void 0;
const pickQuery = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
const paginationCalculate = ({ limit, page, }) => {
    console.log(Number(limit) || 1);
    let glimit = Number(limit) || 5;
    let gpage = Number(page) || 1;
    let skip = (gpage - 1) * glimit;
    return {
        limit: glimit,
        page: gpage,
        skip,
    };
};
exports.paginationCalculate = paginationCalculate;
exports.default = pickQuery;
