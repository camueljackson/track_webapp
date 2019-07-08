import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopNav from './TopNav.js';
import 'antd/dist/antd.css';

function App() {
	return (
		<BrowserRouter>
			<TopNav />
		</BrowserRouter>
	);
}

export default App;
