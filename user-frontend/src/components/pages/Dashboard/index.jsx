import React, { useEffect, useState } from 'react';
import { Layout, Menu, Switch, Card, Space, PageHeader, Form, Input, List, Avatar } from 'antd';
import './dash.css';
import { io } from 'socket.io-client';
const { Header, Content, Footer } = Layout;
function DashboardPage() {
	const [ form ] = Form.useForm();
	const [ formLayout, setFormLayout ] = useState('verticle');
	const [ socketStatus, setSocketStatus ] = useState(false);
	const [ switchDisabled, setSwitchDisabled ] = useState(false);
	const [ socketId, setSocketId ] = useState(null);

	const [ rtfRelay, setRtfRelay ] = useState([]);

	let socket;

	async function handleSocketConnection() {
		setSocketStatus(true);
		setSwitchDisabled(true);
		setTimeout(async () => {
			if (socketStatus === false) {
				socket = await io('http://localhost:3005');
				socket.emit('client:init');
				socket.on('client:ack', () => {
					console.log(socket.id);
					setSocketId(socket.id);
					handleSocketFunctions();
				});
			} else {
			}
		}, 1000);
	}

	const handleSocketFunctions = () => {
		socket.on('client:data:relay', (data) => {
			const { id, state } = data;
			addToState(id, state);
		});
	};

	function addToState(id, state) {
		var data = { id, state };
		setRtfRelay((rtfRelay) => [ data, ...rtfRelay ]);
		console.log(data, rtfRelay);
	}

	return (
		<div>
			<Layout className="layout">
				<Header>
					<div className="logo" />
					<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]}>
						<Menu.Item key="1">Map</Menu.Item>
						<Menu.Item key="2">Dashboard</Menu.Item>
						<Menu.Item key="3">nav 3</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<div
						className="site-layout-content"
						style={{
							minHeight: '85vh',
							background: '#f0f0f0',
							padding: '30px',
							borderRadius: '20px'
						}}
					>
						<PageHeader
							className="site-page-header"
							title="< - User Dashboard - >"
							subTitle={
								<span>
									Welcome to the user Dashbaord. <br /> You can turn on if you want to subscribe to
									real time notifications from the ground sensors. By Default it will be on page
									refresh
								</span>
							}
						/>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							<div style={{ display: 'flex', flex: '0.5', flexWrap: 'wrap' }}>
								<div style={{ padding: '10px' }}>
									<Card title="User Details" style={{ width: 300 }}>
										<Form layout={formLayout} form={form} initialValues={{ layout: 'verticle' }}>
											<Form.Item label="Username">
												<Input placeholder="Username" disabled />
											</Form.Item>
											<Form.Item label="Email">
												<Input placeholder="Your Email" disabled />
											</Form.Item>
										</Form>
									</Card>
								</div>
								<div style={{ padding: '10px' }}>
									<Card title="Subscribe to realtime feed" style={{ width: 300 }}>
										Turn On / Off: <Space />{' '}
										<Switch onClick={handleSocketConnection} disabled={switchDisabled} />
										<h1>Status: {socketStatus === false ? <h1>OFF</h1> : <h1>ACTIVE</h1>}</h1>
										<p>
											Socket ID: <Space />{' '}
											{socketStatus === false ? <h1>NOT CONNECTED</h1> : <h1>{socketId}</h1>}
										</p>
									</Card>
								</div>
							</div>
							<div style={{ flex: '0.5', maxHeight: '50vh', overflow: 'auto' }}>
								<List
									itemLayout="horizontal"
									dataSource={rtfRelay}
									renderItem={(item) => (
										<List.Item>
											<List.Item.Meta
												avatar={
													<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
												}
												title={<a href="https://ant.design">{item.id}</a>}
												description={item.state}
											/>
										</List.Item>
									)}
								/>
							</div>
						</div>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>SheronSuditha | Smart Park</Footer>
			</Layout>
		</div>
	);
}

export default DashboardPage;
