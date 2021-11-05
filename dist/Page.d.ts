/// <reference types="react" />
export default class Page {
    path: string;
    label: string;
    component: JSX.Element;
    props: Object[];
    constructor(path: string, label: string, component: JSX.Element, props?: Object[]);
}
