import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkedAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'antd';

class ListScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sites: undefined,
		};
	}

	componentDidMount() {
		this.callClients();
	}

	async callClients() {
		try {
			const getSites = await fetch(
				`https://tracktik-frontend-challenge-jwidtarfww.now.sh/sites?_sort=title&_order=asc`,
				{
					method: 'GET',
				}
			);
			this.setState({ sites: await getSites.json() });
		} catch (err) {
			console.log(err);
		}
	}

	displayClients() {
		const { sites } = this.state;
		if (sites) {
			console.log(sites[0]);

			const columns = [
				{
					dataIndex: 'images',
					key: 'images',
					width: 150,
					render: item => (
						<img
							style={{
								borderRadius: '50%',
								height: 120,
								width: 120,
							}}
							src={item[0]}
						/>
					),
				},
				{
					title: (
						<div>
							<FontAwesomeIcon icon={faUserShield} /> &nbsp;Site Name
						</div>
					),
					dataIndex: 'title',
					key: 'title',
					width: 250,
					sorter: (a, b) =>
						a.title < b.title
							? 1
							: a.title === b.title
							? a.address.country < b.address.country
								? 1
								: -1
							: -1,
					render: item => <h2>{item}</h2>,
				},
				{
					title: (
						<div>
							<FontAwesomeIcon icon={faMapMarkedAlt} /> &nbsp;Address
						</div>
					),
					dataIndex: 'address',
					key: 'address',
					width: 250,
					render: item => {
						return item.zipCode;
					},
					sorter: (a, b) => a.address.zipCode - b.address.zipCode,
				},
				{
					title: (
						<div>
							<FontAwesomeIcon icon={faEnvelope} />
							&nbsp;Main Contact
						</div>
					),
					dataIndex: 'main_contact',
					key: 'main_contact',
					width: 250,
				},
			];

			return <Table columns={columns} dataSource={sites} rowKey={item => item.id} />;

			// return (
			// 	<div>
			// 		{sites.map(item => {
			// 			return (
			// 				<NavLink
			// 					to={`/client/${item.id}`}
			// 					style={{ color: 'black', textDecoration: 'none' }}
			// 					key={item.id}
			// 				>
			// 					{/* <Card style={{ margin: 15, textAlign: 'left', cursor: 'pointer' }}>
			// 						<Card.Header as="h5">{item.title}</Card.Header>
			// 						<Card.Body>
			// 							<div
			// 								style={{
			// 									display: 'flex',
			// 									flexDirection: 'row ',
			// 									padding: 10,
			// 								}}
			// 							>
			// 								<div>
			// 									<img
			// 										style={{
			// 											borderRadius: '50%',
			// 											height: 220,
			// 											width: 220,
			// 											marginRight: 50,
			// 										}}
			// 										src={item.images[0]}
			// 										alt={item.title}
			// 									/>
			// 								</div>
			// 								<div style={{ paddingLeft: 20, textAlign: 'left' }}>
			// 									<strong>Business Address:</strong>
			// 									<br />
			// 									<FontAwesomeIcon icon={faMapMarkedAlt} />
			// 									&nbsp;&nbsp;
			// 									{`${item.address.street}, ${item.address.city}, ${
			// 										item.address.state
			// 									}, ${item.address.country} ${item.address.zipCode}`}
			// 									<br />
			// 									<hr />
			// 									<strong>Contact:</strong>
			// 									<br />
			// 									{`${item.contacts.main.firstName} ${item.contacts.main.lastName} (${
			// 										item.contacts.main.jobTitle
			// 									}) `}
			// 									<br />
			// 									<FontAwesomeIcon icon={faPhone} />
			// 									&nbsp;&nbsp;
			// 									{item.contacts.main.phoneNumber}
			// 									<br />
			// 									<FontAwesomeIcon icon={faEnvelope} />
			// 									&nbsp;&nbsp;
			// 									{item.contacts.main.email}
			// 								</div>
			// 							</div>
			// 						</Card.Body>
			// 					</Card> */}

			// 					<Table columns={columns} dataSource={data} />
			// 				</NavLink>
			// 			);
			// 		})}
			// 	</div>
			// );
		}
	}

	render() {
		return <div>{this.displayClients()}</div>;
	}
}

export default ListScreen;
