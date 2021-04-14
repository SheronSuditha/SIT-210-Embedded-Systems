from tkinter import *
import tkinter.font
import RPi.GPIO as GPIO
import time

# basic GPIO setup
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(10, GPIO.OUT)
# end of GPIO setup

GPIO.output(10, GPIO.LOW)

win = Tk()
win.title("LED TOGGLER")
myFont = tkinter.font.Font(family = 'Helvetica', size = 12, weight = "bold")



REDLED = 10
YELLOWLED = 10
GREENLED = 10
LED1 = False
LED2 = False
LED3 = False

# exit function
def exitGui():
    GPIO.cleanup()
    win.destroy()
# end of exit function

def turnOnRed():
    global REDLED, YELLOWLED, GREENLED, LED1, LED2, LED3

    if LED2==True:
        print("Turning off LED2")
        GPIO.output(YELLOWLED, GPIO.LOW)
        LED2=False
    if LED3==True:
        print("Turning off LED3")
        GPIO.output(GREENLED, GPIO.LOW)
        LED3=False
    else:
        for i in range(0,2): #blinks for 3 times
            GPIO.output(REDLED, GPIO.HIGH)
            time.sleep(1)
            GPIO.output(REDLED, GPIO.LOW)
            time.sleep(1)
            GPIO.output(REDLED, GPIO.HIGH)
        LED1 = True
        print("Turning on LED1")
        
    
def turnOnYellow():
    global REDLED, YELLOWLED, GREENLED, LED1, LED2, LED3
    if LED1==True:
        print("Turning off LED1")
        GPIO.output(REDLED, GPIO.LOW)
        LED1=False
    if LED3==True:
        print("Turning off LED3")
        GPIO.output(GREENLED, GPIO.LOW)
        LED3=False
    else:
        for i in range(0,3): #blinks for 4 times
            GPIO.output(YELLOWLED, GPIO.HIGH)
            time.sleep(1)
            GPIO.output(YELLOWLED, GPIO.LOW)
            time.sleep(1)
            GPIO.output(YELLOWLED, GPIO.HIGH)
        LED2 = True
        print("Turning on LED2")
    
def turnOnGreen():
    global REDLED, YELLOWLED, GREENLED, LED1, LED2, LED3
    if LED2==True:
        print("Turning off LED2")
        GPIO.output(YELLOWLED, GPIO.LOW)
        LED2=False
    if LED1==True:
        print("Turning off LED1")
        GPIO.output(REDLED, GPIO.LOW)
        LED1=False
    else:
        for i in range(0,4): #blink for 5 times
            GPIO.output(GREENLED, GPIO.HIGH)
            time.sleep(1)
            GPIO.output(GREENLED, GPIO.LOW)
            time.sleep(1)
            GPIO.output(GREENLED, GPIO.HIGH)
        LED3 = True
        print("Turning on LED3")
            

# added buttons
Radiobutton(win, text="Turn on Red", value="red", command= turnOnRed).pack()
Radiobutton(win, text="Turn on Yellow", value="yellow", command= turnOnYellow).pack()
Radiobutton(win, text="Turn on Green", value="green", command= turnOnGreen).pack()

exitButton = Button(win, text = 'Exit', font = myFont, command = exitGui, bg = 'yellow', height = 1, width = 10).pack()

win.protocol("WM_DELETE_WINDOW", exitGui) #clean exit
win.mainloop() # GUI driver
