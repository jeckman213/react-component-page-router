"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLinks = exports.PageRouter = exports.GetPages = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var RouterObject_1 = require("./RouterObject");
var Page_1 = require("./Page");
function GetPages() {
    var pages = [];
    var requiredComponents = require.context("../../../src/Components", true, /js$|jsx$|tsx$/);
    requiredComponents.keys().forEach(function (filename) {
        var componentConfig = requiredComponents(filename);
        var componentName = filename.replace(/.js$|.jsx$|.tsx$/, '').split('/').pop();
        var CompTag = componentConfig.default;
        var path = filename
            .replace(/\.js|\.jsx/, '')
            .replace('.', '')
            .toLowerCase();
        pages.push(new Page_1.default(path, "" + componentName, CompTag));
    });
    return pages;
}
exports.GetPages = GetPages;
function PageRouter(props) {
    return (0, RouterObject_1.default)({ children: props.children });
}
exports.PageRouter = PageRouter;
function PageLinks() {
    var allPages = GetPages();
    var linkElements = [];
    allPages.forEach(function (page) {
        linkElements.push(React.createElement(react_router_dom_1.Link, { to: page.path }, page.label));
    });
    return linkElements;
}
exports.PageLinks = PageLinks;
