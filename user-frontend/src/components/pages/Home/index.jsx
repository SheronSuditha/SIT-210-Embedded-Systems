import React from 'react';
import UserMap from '../../../components/UserMap';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

function Homepage() {
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
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>User Map View</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-content">
						<UserMap />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>SheronSuditha | Smart Park</Footer>
			</Layout>
		</div>
	);
}

export default Homepage;
