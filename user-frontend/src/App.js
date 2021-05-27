import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css';
import { LightningBoltIcon } from '@heroicons/react/outline'

import { TileLayer, Marker, Popup, useMapEvent, MapContainer } from 'react-leaflet'
import { useEffect, useRef } from 'react';
import L from 'leaflet'

const iconPerson = new L.Icon({
	iconUrl: require('../src/components/icons/bolt.svg'),
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(60, 75),

});


function App() {
	return (
		<div>
			<MapContainer
				center={[7.0916508, 79.8570011]}
				zoom="13"
				scrollWheelZoom={false}
				style={{ height: "100vh" }}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker key={1} position={[7.0804165, 79.8680488]} icon={iconPerson}>
					<Popup>
						<span>A pretty CSS3 popup. <br /> Easily customizable.</span>
					</Popup>
				</Marker>

			</MapContainer>
		</div>
	)
}

export default App;
