import { createElement } from 'react';
import { Link } from 'react-router-dom';
import RouterObject from './RouterObject';
import Page from './Page';
import PageRouterProps from './types/PageRouterProps';

/**
 * Helper function to get all "Pages" in a given project
 * First checks for normal React src path for pages
 * If not there checks non-src base (nextjs) path
 * @returns List of type Page (see Page.ts for more info)
 */
export function GetPages(): Page[] {
    var pages: Page[] = [];

    var requiredComponents: __WebpackModuleApi.RequireContext;
    try {
        requiredComponents = require.context(`../../../src/pages`, true, /js$|jsx$|tsx$/);
    }
    catch (e) {
        try {
            requiredComponents = require.context(`../../../pages`, true, /js$|jsx$|tsx$/);
        }
        catch (e) {
            throw Error("Failed to get pages directory. Might be missing for src.\
            'pages' direction should be in one of two paths of react or nextjs project:\n\
            ~/src/pages || ~/pages");
        }
    }
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

/**
 * 
 * @param props All children of BrowserRouter element
 * @returns A Page Router JSX Element
 */
export function PageRouter(props: PageRouterProps) : JSX.Element {
    return RouterObject({children: props.children});
}

/**
 * Finds all pages that are in project and creates a list of Link elements from them
 * @returns List of JSX Elements that are of type Link from react-router-dom
 */
export function PageLinks(): JSX.Element[] {
    var allPages: Page[] = GetPages();

    var linkElements: JSX.Element[] = [];
    allPages.forEach(page => {
        linkElements.push(
            createElement(Link, { to:page.path }, page.label)
        );
    });

    return linkElements;
}