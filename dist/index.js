"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var Page_1 = require("./Page");
var GetAllComponents = function () {
    var pages = [];
    var requiredComponents = require.context("../../../src/Components", true, /js$/);
    requiredComponents.keys().forEach(function (filename) {
        var componentConfig = requiredComponents(filename);
        var componentName = filename
            .replace(/^\.\//, '')
            .replace(/\.\w+$/, '')
            .replace(/js|jsx/, '');
        var CompTag = componentConfig.default;
        var path = filename
            .replace(/\.js|\.jsx/, '')
            .replace('.', '')
            .toLowerCase();
        pages.push(new Page_1.default(path, componentName, CompTag));
    });
    return pages;
};
function GetAllRoutes() {
    var allComponents = GetAllComponents();
    var compElements = [];
    allComponents.forEach(function (page) {
        var comp = page.component;
        compElements.push(React.createElement(react_router_dom_1.Route, { path: page.path, key: page.label, element: React.createElement(comp) }, null));
    });
    var routesElement = React.createElement(react_router_dom_1.Routes, null, compElements);
    return React.createElement(react_router_dom_1.BrowserRouter, null, routesElement);
}
exports.default = GetAllRoutes;
