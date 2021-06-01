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
export const socketMiddleWare = (store) => (next) => (action) => {
    console.log(action.type)
    switch (action.type) {
        case 'START_RT_SOCKET':
            console.log("RUNNING START RT")
            connect_socket();
            break;
    }

    next(action);

    if (socket === null) return;
    //ack event from relay server
    // socket.on('client:ack', () => {
    //     console.log("SOCKET ACK")
    //     store.dispatch({
    //         type: "INIT_RT_SOCKET",
    //         payload: {
    //             isEnabled: true,
    //             socketId: socket.id
    //         }
    //     })
    // })

    socket.on('client:data:relay', (data) => {
        console.log("RELAY")
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


