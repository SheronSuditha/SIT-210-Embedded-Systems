const initalState = {
    isEnabled: false,
    socketId: null,
    socketData: null
}

const dataRelayInitialState = []

export function handleRealtimeSocket(state = initalState, { type, payload }) {
    switch (type) {
        case 'INIT_RT_SOCKET':
            return state = {
                isEnabled: payload.isEnabled,
                socketId: payload.socketId,
                socketData: payload.socketData
            }
            break;
        default:
            return state;
    }
}

export function handleRealtimeDatRelay(state = dataRelayInitialState, { type, payload }) {
    switch (type) {
        case 'UPDATE_RT_DATA_RELAY':
            var data = { sensorId: payload.sensorId, photosensor: payload.photosensor, ultrasonic: payload.ultrasonic, time: new Date().toLocaleString() }
            return [data]
            break;
        default:
            return state;
    }
}


