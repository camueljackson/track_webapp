import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Scheduling, Profile, Client } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';

import { Menu } from 'antd';

const TopNav = () => {
	return (
		<Router>
			<Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between' }} theme="dark">
				<Menu.Item key="home">
					<a href="/">
						<FontAwesomeIcon icon={faBars} />
						&nbsp; Home
					</a>
				</Menu.Item>
				<Menu.Item key="scheduling">
					<a href="/scheduling">Scheduling</a>
				</Menu.Item>
				<Menu.Item key="profile">
					<a href="/profile">
						<FontAwesomeIcon icon={faUser} />
						&nbsp; Profile
					</a>
				</Menu.Item>
			</Menu>

			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/scheduling" component={Scheduling} exact />
				<Route path="/profile" component={Profile} />
				<Route path="/client/:id" component={Client} />
			</Switch>
		</Router>
	);
};

export default TopNav;
