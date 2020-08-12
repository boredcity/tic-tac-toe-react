import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, AppFin } from './components/App/App';

let showFin;
// showFin = true; // uncomment to see final version (with broken scoring)

ReactDOM.render(
    <React.StrictMode>
        {showFin
            ? <AppFin />
            : <App/>
        }
    </React.StrictMode>,
    document.getElementById('root')
);
