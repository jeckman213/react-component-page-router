import * as fs from 'fs';
import * as proc from 'process';
import * as path from 'path';
import React = require('react');
import { Routes, Route } from 'react-router-dom';

const GetAllComponents = (basePath: string) : JSX.Element[] => {
    var components: JSX.Element[] = [];
    fs.readdirSync(basePath).forEach(item => {
        // Ignore files/directories that start with _
        if (item.startsWith('_')) return;

        // The item to parse
        var itemPath: string;
        itemPath = path.join(basePath, item);

        // Get STATS on item
        var stats: fs.Stats;
        try {
            stats = fs.lstatSync(itemPath);
        }
        catch (e: any) {
            if (e.code !== 'ENOENT') {
                console.log(`Unknown error occurred: ${e.code}`);
            }
            return;
        }
        
        // Item is FILE
        if (stats.isFile()) {
            components.push(require(itemPath).default);
        }
        // Item is DIRECTORY
        else if (stats.isDirectory()) {
            components = [...components, ...GetAllComponents(itemPath)];
        }
    })

    return components;
}

export const GetAllRoutes = (componentDirectory = "Components") : JSX.Element => {
    var allComponents: JSX.Element[] = GetAllComponents(path.join(proc.cwd(), componentDirectory));
    
    var compElements: JSX.Element[] = []
    allComponents.forEach(comp => {
        compElements.push(React.createElement(Route, {path: "/", element: comp}, null))
    })

    return React.createElement(Routes, null, compElements);
}
