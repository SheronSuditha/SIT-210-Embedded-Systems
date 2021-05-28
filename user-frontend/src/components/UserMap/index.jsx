import { LightningBoltIcon } from '@heroicons/react/outline';
import { TileLayer, Marker, Popup, useMapEvent, MapContainer } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import L, { Icon } from 'leaflet';
import boltSvg from '../../components/icons/sensor.png';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { getGroundSensors } from '../../utils/api/worker';

let DefaultIcon = L.icon({
	iconUrl: boltSvg,
	iconSize: [ 15, 15 ]
});

L.Marker.prototype.options.icon = DefaultIcon;

function UserMap() {
	const [ groundSensors, setGroundSensors ] = useState([]);
	useEffect(() => {
		fetchSensors();
		return () => {};
	}, []);

	async function fetchSensors() {
		const sensors_ = await getGroundSensors();
		setGroundSensors(sensors_.sensors);
	}

	return (
		<div>
			<MapContainer
				center={[ 7.0801926, 79.8669923 ]}
				zoom="13"
				scrollWheelZoom={false}
				style={{ height: '100vh' }}
			>
				<TileLayer
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url={`${process.env.REACT_APP_MAPBOX}`}
				/>

				<Marker key={1} position={[ 7.0801952, 79.8658979 ]}>
					<Popup>
						<span>Sensor location 1</span>
					</Popup>
				</Marker>
				{groundSensors.map((gSensor) => (
					<Marker key={gSensor._id} position={[ gSensor.lat, gSensor.lon ]}>
						<Popup>
							<span>Sensor location 1</span>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default UserMap;
