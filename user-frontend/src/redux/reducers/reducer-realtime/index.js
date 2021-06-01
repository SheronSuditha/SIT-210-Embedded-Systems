const initalState = {
    isEnabled: false,
    socketId: null,
}

const dataRelayInitialState = [{
    sensorId: null,
    photosensor: null,
    ultrasonic: null,
    time: null
}]

export function handleRealtimeSocket(state = initalState, { type, payload }) {
    switch (type) {
        case 'INIT_RT_SOCKET':
            return state = {
                isEnabled: payload.isEnabled,
                socketId: payload.socketId
            }
            break;
        default:
            return state;
    }
}

export function handleRealtimeDatRelay(state = dataRelayInitialState, { type, payload }) {
    switch (type) {
        case 'UPDATE_RT_DATA_RELAY':
            return state = [...state, {
                sensorId: payload.sensorId,
                photosensor: payload.photosensor,
                ultrasonic: payload.ultrasonic,
                time: new Date().toLocaleString()
            }]
            break;
        default:
            return state;
    }
}


