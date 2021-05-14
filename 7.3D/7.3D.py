import serial
import RPi.GPIO as GPIO
from time import sleep


led_pin = 21            
GPIO.setmode(GPIO.BCM)          
GPIO.setup(led_pin, GPIO.OUT)   
pwm = GPIO.PWM(led_pin, 100)   
pwm.start(0)                  


ser = serial.Serial('/dev/ttyACM0',9600)
s = [0]
while True:
	read_serial=ser.readline()
	string_serial = read_serial.decode('utf-8').split(' ')
	#s[0] = str(int (ser.readline(),16))
	#print(s[0])
	#print("test", int(string_serial[1]) if int(string_serial[1]) < 100 else int(string_serial[1]))
	print("rounded",int(string_serial[1]) if int(string_serial[1]) < 100 else 80)
	#pwm.ChangeDutyCycle(int(round((int(string_serial[1])*100)/1082, 0)))
	pwm.ChangeDutyCycle(int(string_serial[1]) if int(string_serial[1]) < 100 else 80)
	
	print(string_serial[1])