import React = require("react");
export default class Page {
    path: string;
    label: string;
    component: React.FunctionComponent|React.ComponentClass;
    props: Object[];

    constructor(path:string, label:string, component:React.FunctionComponent|React.ComponentClass, props:Object[] = []) {
        this.path = path;
        this.label = label;
        this.component = component;
        this.props = props;
    }
}