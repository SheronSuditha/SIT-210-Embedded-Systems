export const enableRealtimeSocket = (payload) => ({ type: "INIT_RT_SOCKET", payload }) //start socket conenction

export const startRealtimeScoket = (payload) => ({ type: "START_RT_SOCKET", payload }) // set socket connection

export const socketDataRelay = (payload) => ({ type: "UPDATE_RT_DATA_RELAY", payload }) // update dash on data reay