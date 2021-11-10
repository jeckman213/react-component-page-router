/// <reference types="react" />
import Page from './Page';
export declare function GetPages(): Page[];
declare type PageRouterProps = {
    children: JSX.Element[];
};
export declare function PageRouter(props: PageRouterProps): JSX.Element;
export declare function PageLinks(): JSX.Element[];
export {};
