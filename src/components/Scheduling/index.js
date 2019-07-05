import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

class Scheduling extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sites: undefined,
			sortListAsc: true,
			pageID: 1,
		};
	}

	componentDidMount() {
		this.callClients();
	}

	async callClients() {
		try {
			const { pageID } = this.state;
			const getSites = await fetch(
				`https://tracktik-frontend-challenge-jwidtarfww.now.sh/sites?_sort=title&_order=asc&_page=${pageID}`,
				{
					method: 'GET',
				}
			);
			this.setState({ sites: await getSites.json() });
		} catch (err) {
			console.log(err);
		}
	}

	displaySites() {
		const { sites, sortListAsc } = this.state;
		if (sites) {
			console.log(sites[0]);
			if (sortListAsc)
				sites.sort((a, b) =>
					a.title < b.title ? 1 : a.title === b.title ? (a.address.country > b.address.country ? 1 : -1) : -1
				);
			if (!sortListAsc)
				sites.sort((a, b) =>
					a.title > b.title ? 1 : a.title === b.title ? (a.address.country < b.address.country ? 1 : -1) : -1
				);
			return (
				<div>
					{sites.map(item => {
						return (
							<div
								key={item.id}
								style={{
									display: 'flex',
									flexDirection: 'row ',
									borderLeft: '1px solid black',
									borderRight: '1px solid black',
									borderBottom: '1px solid black',
									padding: 10,
								}}
							>
								<div>
									<img
										style={{ borderRadius: '50%', height: 120, width: 120 }}
										src={item.images[0]}
										alt={item.title}
									/>
								</div>
								<div style={{ paddingLeft: 20, textAlign: 'left' }}>
									<h3>{item.title}</h3>
									<strong>Business Address:</strong>
									<br />
									{`${item.address.street}, ${item.address.city}, ${item.address.state}, ${
										item.address.country
									} ${item.address.zipCode}`}
									<br />
									<hr />
									<strong>Contact:</strong>
									<br />
									{`${item.contacts.main.firstName} ${item.contacts.main.lastName} (${
										item.contacts.main.jobTitle
									}) `}
									<br />
									<FontAwesomeIcon icon={faPhone} />
									&nbsp;&nbsp;
									{item.contacts.main.phoneNumber}
									<br />
									<FontAwesomeIcon icon={faEnvelope} />
									&nbsp;&nbsp;
									{item.contacts.main.email}
								</div>
							</div>
						);
					})}
				</div>
			);
		}
	}

	render() {
		const { sortListAsc } = this.state;
		return (
			<div>
				<div style={{ backgroundColor: '#007bff', color: 'white', border: '1px solid black' }}>
					<h1 style={{ marginRight: 50 }}>Sites</h1>
				</div>
				<div
					style={{ border: '1px solid red', cursor: 'pointer' }}
					onClick={() => this.setState({ sortListAsc: !sortListAsc })}
				>
					All Sites&nbsp;
					<FontAwesomeIcon icon={sortListAsc ? faCaretUp : faCaretDown} />
				</div>
				{this.displaySites()}
			</div>
		);
	}
}

export default Scheduling;
