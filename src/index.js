import React from 'react';
import ReactDOM from 'react-dom/client';
import QuoteMachine from './QuoteMachine';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <h1 className="page-title">Random Quote Machine</h1>
        <QuoteMachine />
    </div>
)