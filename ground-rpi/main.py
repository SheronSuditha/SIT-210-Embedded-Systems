import socketio
import serial
import RPi.GPIO as GPIO
import time
import os

import serial
socket = socketio.Client()

sensor_id_ = "1019"
constant_ultrasonic_value = 10;
constant_photosensor_value = 20;


def handle_data_process(ultrasonic_value, photosensor_value):
    if int(ultrasonic_value) > constant_ultrasonic_value:
        print("US:AVAIL")
        ultrasonic_value = "Available"
    else:
        print("US:UNAVAIL")
        ultrasonic_value = "Occupied"

    if int(photosensor_value) > constant_photosensor_value:
        print("PS:AVAIL")
        photosensor_value = "Available"
    else:
        print("PS:UNAVAIL")
        photosensor_value = "Occupied"
    return {"ultrasonic": ultrasonic_value, "photosensor": photosensor_value}


def connect_to_socket():
    try:
        print("[SENSOR-CLIENT] trying to connect...")
        socket.connect(os.environ.get('SOCKETURI'))
        print("[SENSOR-CLIENT] connected to web relay server")
    except ConnectionError:
        print("[SENSOR-CLIENT] Unable to connect. Trying to reconnect...")
        connect_to_socket()
    except:
        print("[SENSOR-CLIENT] fatal error... Unable to connect. Relay server might be offline.\nRetrying...")
        connect_to_socket()


# send events from sensor-client
def send_init_event():
    socket.emit('sensor:init')


@socket.on('sensor:ack')
def got_ack_event():
    print('[SOCKET-RELAY-RESP] Got acknowledgement from relay server.')


# default socket.io event struct
@socket.on('connect')
def on_connect():
    print("[SENSOR-CLIENT] Connected to socket relay server")
    send_init_event()


@socket.on('disconnect')
def on_disconnect():
    print("[SENSOR-CLIENT] Disconnected from socket relay server. Awaiting for a ping back.")
    
serial_instance = serial.Serial('/dev/ttyACM1', 9600, timeout=1)

@socket.on('sensor:req:data')
def send_sensor_data():
    try:
        parsed_serial = data_from_serial.decode('utf-8').split(" ")
        print(parsed_serial)
        ultrasonic_values = parsed_serial[2]
        photosensor_values = parsed_serial[4].strip()
        data_result = handle_data_process(ultrasonic_values, photosensor_values)
        sensor_id = sensor_id_
        print(data_result)
        socket.emit('sensor:res:data', {"sensor_id": sensor_id, "data_result": data_result})   
    except: 
        # nothing
        print()



connect_to_socket()
while True:
    data_from_serial = serial_instance.readline()
    
socket.wait()
