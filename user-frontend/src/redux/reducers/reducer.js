import { combineReducers } from 'redux'
import { handleRealtimeSocket, handleRealtimeDatRelay } from './reducer-realtime'

const reducers = combineReducers({
    realtime: handleRealtimeSocket,
    sensordata: handleRealtimeDatRelay,
})

export default reducers;