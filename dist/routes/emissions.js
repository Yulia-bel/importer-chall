"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const csv = __importStar(require("fast-csv"));
const multer_1 = __importDefault(require("multer"));
const Emissions_1 = require("../models/Emissions");
const rowMap_1 = __importDefault(require("../helpers/rowMap"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const router = (0, express_1.Router)();
exports.router = router;
router.post('/', upload.single('emissions'), async (req, res) => {
    await Emissions_1.Emissions.deleteMany({});
    try {
        const csvFile = req.file;
        let stream = fs_1.default.createReadStream(csvFile.path);
        let csvStream = csv.parse({ skipLines: 1 })
            .on("data", function (data) {
            try {
                const row = (0, rowMap_1.default)(data);
                Emissions_1.Emissions.insertMany(row);
            }
            catch (err) {
                console.error(err);
            }
        })
            .on("end", function () {
            res.json({ successMessage: 'File saved' });
        });
        stream.pipe(csvStream);
    }
    catch (error) {
        res.json({ errorMessage: error });
    }
});
router.get('/', async (req, res) => {
    try {
        const filters = {};
        if (typeof req.query.country === 'string') {
            filters.country = req.query.country;
        }
        if (typeof req.query.sector === 'string') {
            filters.sector = req.query.sector;
        }
        if (typeof req.query.parentSector === 'string') {
            filters.parentSector = req.query.parentSector;
        }
        if (typeof req.query.year === 'string') {
            filters.year = req.query.year;
        }
        if (Array.isArray(req.query.year)) {
            filters.year = { $in: req.query.year };
        }
        const emissions = await Emissions_1.Emissions.find(filters);
        console.log(filters);
        res.json(emissions);
    }
    catch (error) {
        res.json({ errorMessage: error });
    }
});
//# sourceMappingURL=emissions.js.map