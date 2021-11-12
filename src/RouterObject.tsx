import { createElement } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { GetPages } from '.';
import PageRouterProps from './types/PageRouterProps';

export default function RouterObject(props: PageRouterProps) {
    // Create list of Route Elements
    const routes = GetPages().map(page => {
        let comp = page.component;
        return (<Route path={ page.path } element={ createElement(comp) } />);
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