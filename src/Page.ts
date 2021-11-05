export default class Page {
    path: string;
    label: string;
    component: JSX.Element;
    props: Object[];

    constructor(path:string, label:string, component: JSX.Element, props:Object[] = []) {
        this.path = path;
        this.label = label;
        this.component = component;
        this.props = props;
    }
}