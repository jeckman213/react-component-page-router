import React = require('react');
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import RouterObject from './RouterObject';
import Page from './Page';

export function GetPages(): Page[] {
    var pages: Page[] = [];
    const requiredComponents = require.context(`../../../src/Components`, true, /js$|jsx$|tsx$/);
    requiredComponents.keys().forEach((filename: string) => {
        const componentConfig = requiredComponents(filename);
        const componentName: string|undefined = filename.replace(/.js$|.jsx$|.tsx$/, '').split('/').pop();
        const CompTag = componentConfig.default
        var path = filename
            .replace(/\.js|\.jsx/, '')
            .replace('.', '')
            .toLowerCase()

        pages.push(
            new Page(
                path,
                `${componentName}`,
                CompTag
            )
        );
        
    });

    return pages;
}

type PageRouterProps = {
    children: JSX.Element[]
}
export function PageRouter(props: PageRouterProps) : JSX.Element {
    return RouterObject({children: props.children});
}

export function PageLinks(): JSX.Element[] {
    var allPages: Page[] = GetPages();

    var linkElements: JSX.Element[] = [];
    allPages.forEach(page => {
        linkElements.push(
            React.createElement(Link, { to:page.path }, page.label)
        );
    });

    return linkElements;
}