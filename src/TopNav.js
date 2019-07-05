import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, Scheduling, Profile } from './components';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';

function TopNav() {
	return (
		<Router>
			<Navbar bg="primary" variant="dark" className="justify-content-between">
				<Navbar.Brand href="/home">Home</Navbar.Brand>
				<Nav>
					<Nav.Link href="/scheduling">
						<FontAwesomeIcon icon={faBars} />
						&nbsp; Scheduling
					</Nav.Link>
				</Nav>

				<Nav className="mr-2">
					<Nav.Link href="/profile">
						<FontAwesomeIcon icon={faUser} />
						&nbsp; Hello, user
					</Nav.Link>
				</Nav>
			</Navbar>
			<Route path="/home" component={Home} />
			<Route path="/scheduling" component={Scheduling} />
			<Route path="/profile" component={Profile} />
		</Router>
	);
}

export default TopNav;
