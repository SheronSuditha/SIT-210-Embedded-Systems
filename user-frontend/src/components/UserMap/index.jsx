import { LightningBoltIcon } from '@heroicons/react/outline';
import { TileLayer, Marker, Popup, useMapEvent, MapContainer } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import L, { Icon } from 'leaflet';
import boltSvg from '../../components/icons/sensor.png';
import redico from '../../components/icons/red.png';
import greenico from '../../components/icons/green.png';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { getGroundSensors } from '../../utils/api/worker';
import { useSelector } from 'react-redux';
let DefaultIcon = L.icon({
	iconUrl: boltSvg,
	iconSize: [ 15, 15 ]
});

let RedIcon = L.icon({
	iconUrl: redico,
	iconSize: [ 15, 15 ]
});

let GreenIcon = L.icon({
	iconUrl: greenico,
	iconSize: [ 15, 15 ]
});

L.Marker.prototype.options.icon = DefaultIcon;

function UserMap() {
	const [ groundSensors, setGroundSensors ] = useState([]);
	const socketState = useSelector((state) => state.realtime.socketData);
	var _sensors;
	useEffect(() => {
		fetchSensors();
		return () => {};
	}, []);

	async function fetchSensors() {
		const sensors_ = await getGroundSensors();
		console.log('FETCHING SENSORS');
		_sensors = await sensors_.sensors;
		setGroundSensors(_sensors);
	}

	useEffect(
		() => {
			if (socketState == null) return;
			socketState.on('client:data:updatemap:relay', (data) => {
				handleUpdates(data);
			});

			return () => {};
		},
		[ socketState ]
	);

	async function handleUpdates(data) {
		console.log(data.data.data);
		setGroundSensors(data.data.data);
	}

	return (
		<div>
			<MapContainer
				center={[ -37.8153381, 144.9615947 ]}
				zoom="20"
				scrollWheelZoom={false}
				style={{ minHeight: '80vh' }}
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
				{groundSensors.map(
					(gSensor) =>
						gSensor.status === 'Present' ? (
							<Marker key={gSensor._id} position={[ gSensor.lat, gSensor.lon ]} icon={RedIcon}>
								<Popup>
									<span>Bay ID: {gSensor.bay_id}</span> <br />
									<span>Status: {gSensor.status}</span>
								</Popup>
							</Marker>
						) : (
							<Marker key={gSensor._id} position={[ gSensor.lat, gSensor.lon ]} icon={GreenIcon}>
								<Popup>
									<span>Bay ID: {gSensor.bay_id}</span> <br />
									<span>Status: {gSensor.status}</span>
								</Popup>
							</Marker>
						)
				)}
			</MapContainer>
		</div>
	);
}

export default UserMap;
