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
        var path = filename
            .replace(/\.js|\.jsx/, '')
            .replace('.', '')
            .toLowerCase()

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

export default function PageRouter() : JSX.Element {
    var allComponents: Page[] = GetAllComponents();
    
    var compElements: JSX.Element[] = []
    allComponents.forEach(page => {
        let comp: React.FunctionComponent|React.ComponentClass = page.component;
        compElements.push(React.createElement(Route, {path: page.path, key: page.label, element: React.createElement(comp)}, null))
    })
    let routesElement = React.createElement(Routes, null, compElements)
    return React.createElement(BrowserRouter, null, routesElement);
}
