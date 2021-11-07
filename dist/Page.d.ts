import React = require("react");
export default class Page {
    path: string;
    label: string;
    component: React.FunctionComponent | React.ComponentClass;
    props: Object[];
    constructor(path: string, label: string, component: React.FunctionComponent | React.ComponentClass, props?: Object[]);
}
