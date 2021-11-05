import React = require('react');
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from './Page';

const GetAllComponents = () : Page[] => {
    var pages: Page[] = [];
    const requiredComponents = require.context(`../../../src/Components`, true, /js$/);
    requiredComponents.keys().forEach((filename: string) => {
        const componentConfig = requiredComponents(filename);
        const componentName: string = filename
            .replace(/^\.\//, '')
            .replace(/\.\w+$/, '')
            .replace(/js|jsx/, '');
        const CompTag = componentConfig.default
        const path: string = filename
            .replace(/\./, '')
            .toLowerCase();

        pages.push(
            new Page(
                path,
                componentName,
                CompTag
            )
        );
        
    });

    return pages;
}

export default function GetAllRoutes() : JSX.Element {
    var allComponents: Page[] = GetAllComponents();
    
    var compElements: JSX.Element[] = []
    allComponents.forEach(page => {
        compElements.push(React.createElement(Route, {path: page.path, element: page.component}, null))
    })
    let routesElement = React.createElement(Routes, null, compElements)
    return React.createElement(BrowserRouter, null, routesElement);
}
