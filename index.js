import React from 'react'
import  { createRoot }  from 'react-dom/client';
import App from './src/App.js'
import "./src/input.css"

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App></App>);