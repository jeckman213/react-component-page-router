"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLinks = exports.PageRouter = exports.GetPages = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var RouterObject_1 = require("./RouterObject");
var Page_1 = require("./Page");
/**
 * Helper function to get all "Pages" in a given project
 * First checks for normal React src path for pages
 * If not there checks non-src base (nextjs) path
 * @returns List of type Page (see Page.ts for more info)
 */
function GetPages() {
    var pages = [];
    var requiredComponents;
    try {
        requiredComponents = require.context("../../../src/pages", true, /js$|jsx$|tsx$/);
    }
    catch (e) {
        try {
            requiredComponents = require.context("../../../pages", true, /js$|jsx$|tsx$/);
        }
        catch (e) {
            throw Error("Failed to get pages directory. Might be missing for src.\
            'pages' direction should be in one of two paths of react or nextjs project:\n\
            ~/src/pages || ~/pages");
        }
    }
    requiredComponents.keys().forEach(function (filename) {
        // Split up path by '/' for component path and name
        var splitPath = filename.replace(/.js$|.jsx$|.tsx$/, '').split('/');
        // We ignore anything that start with '_' i.e. _index.js, _test.ts, /_somepath/something.js, etc.
        if (splitPath.some(function (s) { return s.startsWith('_'); }))
            return;
        // Import actual component react element
        var componentConfig = requiredComponents(filename);
        var componentTag = componentConfig.default;
        // Component name default to file name without extension
        var componentName = splitPath[(splitPath === null || splitPath === void 0 ? void 0 : splitPath.length) - 1].replace('/', '');
        // Component path default to path after 'pages' folder
        var componentPath = filename
            .replace(/\.js|\.jsx/, '')
            .replace('.', '')
            .toLowerCase();
        // Component name is index
        // then component is base path of folder/directory
        // similiar to nextjs routing
        if (componentName === "index") {
            componentPath = componentPath.replace('/index', '');
            componentName = splitPath[(splitPath === null || splitPath === void 0 ? void 0 : splitPath.length) - 2];
            // For the case that this is index.js of pages directory a.k.a https://hostname.com/
            if (componentName === '' || componentName === '.') {
                componentName = componentConfig.default.name;
            }
        }
        // Create page
        pages.push(new Page_1.default(componentPath, componentName, componentTag));
    });
    return pages;
}
exports.GetPages = GetPages;
/**
 *
 * @param props All children of BrowserRouter element
 * @returns A Page Router JSX Element
 */
function PageRouter(props) {
    return (0, react_1.createElement)(RouterObject_1.default, { children: props.children });
}
exports.PageRouter = PageRouter;
/**
 * Finds all pages that are in project and creates a list of Link elements from them
 * @returns List of JSX Elements that are of type Link from react-router-dom
 */
function PageLinks() {
    var allPages = GetPages();
    var linkElements = [];
    allPages.forEach(function (page) {
        linkElements.push((0, react_1.createElement)(react_router_dom_1.Link, { to: page.path }, page.label));
    });
    return linkElements;
}
exports.PageLinks = PageLinks;
