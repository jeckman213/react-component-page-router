"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var _1 = require(".");
function RouterObject(props) {
    var routes = (0, _1.GetPages)().map(function (page) {
        var comp = page.component;
        return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: page.path, element: React.createElement(comp) }, void 0));
    });
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [props.children, (0, jsx_runtime_1.jsx)(react_router_dom_1.Routes, { children: routes }, void 0)] }, void 0));
}
exports.default = RouterObject;
