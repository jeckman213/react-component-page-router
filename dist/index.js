"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllRoutes = void 0;
var fs = require("fs");
var proc = require("process");
var path = require("path");
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var GetAllComponents = function (basePath) {
    var components = [];
    fs.readdirSync(basePath).forEach(function (item) {
        // Ignore files/directories that start with _
        if (item.startsWith('_'))
            return;
        // The item to parse
        var itemPath;
        itemPath = path.join(basePath, item);
        // Get STATS on item
        var stats;
        try {
            stats = fs.lstatSync(itemPath);
        }
        catch (e) {
            if (e.code !== 'ENOENT') {
                console.log("Unknown error occurred: " + e.code);
            }
            return;
        }
        // Item is FILE
        if (stats.isFile()) {
            components.push(require(itemPath).default);
        }
        // Item is DIRECTORY
        else if (stats.isDirectory()) {
            components = __spreadArray(__spreadArray([], components, true), GetAllComponents(itemPath), true);
        }
    });
    return components;
};
var GetAllRoutes = function (componentDirectory) {
    if (componentDirectory === void 0) { componentDirectory = "Components"; }
    var allComponents = GetAllComponents(path.join(proc.cwd(), componentDirectory));
    var compElements = [];
    allComponents.forEach(function (comp) {
        compElements.push(React.createElement(react_router_dom_1.Route, { path: "/", element: comp }, null));
    });
    return React.createElement(react_router_dom_1.Routes, null, compElements);
};
exports.GetAllRoutes = GetAllRoutes;
// var allComponents: Function[] = GetAllComponents();
// console.log(allComponents);
// allComponents.forEach(comp => {
//     console.log(comp())
// })
