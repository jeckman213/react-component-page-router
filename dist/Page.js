"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Page = /** @class */ (function () {
    function Page(path, label, component, props) {
        if (props === void 0) { props = []; }
        this.path = path;
        this.label = label;
        this.component = component;
        this.props = props;
    }
    return Page;
}());
exports.default = Page;
