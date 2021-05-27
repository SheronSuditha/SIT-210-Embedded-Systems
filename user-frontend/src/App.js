import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css';
import { LightningBoltIcon } from '@heroicons/react/outline'

import { TileLayer, Marker, Popup, useMapEvent, MapContainer } from 'react-leaflet'
import { useEffect, useRef } from 'react';
import L, { Icon } from 'leaflet'
import boltSvg from './components/icons/sensor.png'
import "leaflet/dist/leaflet.css";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: boltSvg,
	iconSize: [15,15]
});

L.Marker.prototype.options.icon = DefaultIcon;

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
					url={process.env.MAPBOX}
				/>
				
				<Marker key={1} position={[13.0804165, 75.8680488]}>
					<Popup>
						<span>Sensor location 1</span>
					</Popup>
				</Marker>
				<Marker key={1} position={[17.0804165, 75.8680488]}>
					<Popup>
						<span>Sensor location 1</span>
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	)
}

export default App;
