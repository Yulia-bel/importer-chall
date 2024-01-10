"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const headersArray_1 = __importDefault(require("./headersArray"));
const rowMapper = function (dataArray) {
    const [country, sector, parentSector, ...yearsData] = dataArray;
    const row = yearsData.map((yearValue, index) => {
        const emission = {
            country: country,
            sector: sector,
            parentSector: parentSector,
            year: headersArray_1.default[index + 3],
            value: yearValue
        };
        return emission;
    });
    return row;
};
exports.default = rowMapper;
//# sourceMappingURL=rowMap.js.map