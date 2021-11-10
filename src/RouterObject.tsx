
import React = require('react');
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { GetPages } from '.';

type RouterObjectProps = {
    children: JSX.Element[]
}
export default function RouterObject(props: RouterObjectProps) {
    const routes = GetPages().map(page => {
        let comp = page.component;
        return (<Route path={page.path} element={React.createElement(comp)} />);
    })
    return (
        <BrowserRouter>
            { props.children }
            <Routes>
                { routes }
            </Routes>
        </BrowserRouter>
    );
}