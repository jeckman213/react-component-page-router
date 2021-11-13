# React Component Page Router

A simple & lightweight module to tie together all your React pages.

## Description

Simple module/lib that sets up react-router-dom paths & components for your React project.
Looks through file structure ~/src/pages and imports all default components from js,jsx,tsx files.

## Getting Started

Install with: `npm i react-component-page-router`

1. Create `pages` directory in `~/src/` or `~/` of React project & add all complete pages.
2. Add PageRouter component to index.js or App.js of React project.

```javascript
import { PageRouter } from "react-component-page-router";
ReactDOM.render(
  <React.StrictMode>
    <PageRouter>
      <App />
    </PageRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

3. Get all page react-router-dom Link elements for navigation

```javascript
import { PageLinks } from "react-component-page-router";
function Nav() {
  const links = PageLinks().map((link) => <div>{link}</div>);

  return <div>{links}</div>;
}
export default Nav;
```

##### Notes:

* Pages will be routed to their relative paths to 'pages' directory (including sub-paths/directories).

  ex. `~/src/pages/Home.js` --> `https://hostname.com/home`

  ex. `~/src/pages/Dashboard/settings.js` --> `https://hostname.com/dashboard/settings`

* Files with name `index` will be routed to directory path

  ex. `~/src/pages/Auth/Login/index.js` --> `https://hostname.com/auth/login`

* Files & directories starting with `_` will be ignored and treated as private

  ex. `~/src/pages/_partials/navigation.js` --> ignored
  ex. `~/src/pages/Dashboard/_graph.js` --> ignored

## Help

If error throw about `~/src/pages` make sure you have created the `pages` directory in the correct place.

`~/` should be wherever your project's `node_modules` are located.

## Author(s)

##### Jonathan Eckman- [Github](https://github.com/jeckman213) - [Email](mailto:jeckman213@gmail.com?subject=Comment:react-component-page-router)

First real open source code. Open for comments and suggestions :)

Idea loosely based off of nextjs routing but logic and framework is completely different
