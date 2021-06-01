import { io } from 'socket.io-client'


let socket = null;

export async function connect_socket() {
    try {
        socket = io(process.env.REACT_APP_SOCKETURI);
        socket.emit('client:init');
    } catch (error) {
        console.log(error)
    }
}


/* MIDDLEWARE SECTION */
export const socketMiddleWare = store => next => action => {
    switch (action) {
        case 'START_RT_SOCKET':
            connect_socket();
            break;
    }

    next(action);

    //ack event from relay server
    socket.on('client:ack', () => {
        store.dispatch({
            type: "INIT_RT_SOCKET",
            payload: {
                isEnabled: true,
                socketId: socket.id
            }
        })
    })

    socket.on('client:data:relay', (data) => {
        const { id, ultrasonic_state, photosensor_state } = data;
        store.dispatch({
            type: "UPDATE_RT_DATA_RELAY",
            payload: {
                sensorId: id,
                photosenor: photosensor_state,
                ultrasonic: ultrasonic_state
            }
        })
    })



}


