const initialState = {
    sensors: [],
}

function handleSensorsRedux(state = initialState, { type, payload }) {
    switch (type) {
        case 'ADD_SENSORS_REDUX':
            return state = {
                sensors = payload.sensors
            }
            break;
        default:
            return state;
    }
}