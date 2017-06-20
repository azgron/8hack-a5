import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './components/App';
import Categories from './components/categoriesList/categoriesList';
import CategoryData from './components/categoryData/categoryData';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const router = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Categories}/>
            <Route path="/:category" component={CategoryData}/>
        </Route>
    </Router>
);

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
