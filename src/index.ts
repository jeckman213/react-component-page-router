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
        // Split up path by '/' for component path and name
        var splitPath: string[]|undefined = filename.replace(/.js$|.jsx$|.tsx$/, '').split('/');

        // We ignore anything that start with '_' i.e. _index.js, _test.ts, /_somepath/something.js, etc.
        if (splitPath.some(s => s.startsWith('_'))) return;
        
        // Component name default to file name without extension
        var componentName: string|undefined = splitPath[splitPath?.length - 1].replace('/', '');

        // Component path default to path after 'pages' folder
        var componentPath: string = filename
                .replace(/\.js|\.jsx/, '')
                .replace('.', '')
                .toLowerCase()
        
        // Component name is index
        // then component is base path of folder/directory
        // similiar to nextjs routing
        if (componentName === "index") {
            componentPath = componentPath.replace('/index', '');
            componentName = splitPath[splitPath?.length - 2];
        }

        // Import actual component react element
        const componentConfig = requiredComponents(filename);
        const componentTag = componentConfig.default

        // Create page
        pages.push(
            new Page(
                componentPath as string,
                componentName as string,
                componentTag
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
    // return RouterObject({children: props.children});
    return createElement(RouterObject, {children: props.children});
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