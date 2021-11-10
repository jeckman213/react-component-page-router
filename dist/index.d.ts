/// <reference types="react" />
import Page from './Page';
import PageRouterProps from './types/PageRouterProps';
/**
 * Helper function to get all "Pages" in a given project
 * First checks for normal React src path for pages
 * If not there checks non-src base (nextjs) path
 * @returns List of type Page (see Page.ts for more info)
 */
export declare function GetPages(): Page[];
/**
 *
 * @param props All children of BrowserRouter element
 * @returns A Page Router JSX Element
 */
export declare function PageRouter(props: PageRouterProps): JSX.Element;
/**
 * Finds all pages that are in project and creates a list of Link elements from them
 * @returns List of JSX Elements that are of type Link from react-router-dom
 */
export declare function PageLinks(): JSX.Element[];
