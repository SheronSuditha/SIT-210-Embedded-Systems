from tkinter import *
import tkinter.font
import RPi.GPIO as GPIO
import time

# basic gpio setup
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(10, GPIO.OUT)


window = Tk()
window.title("Welcome to MorseCode Blinker")
window.geometry('300x200')
lbl = Label(window, text="Blink Morse Code", font=("Arial Bold", 25))
lbl.grid(column=0, row=0)

eng_to_morse = {
    'a' : '.-', 'b' : '-...', 'c' : '-.-.', 'd' : '-..', 'e' : '.', 'f' : '..-.', 'g' : '--.', 'h' : '....', 'i' : '..', 'j' : '.---', 'k' : '-.-', 'l' : '.-..', 'm' : '--', 'n' : '-.', 'o' : '---', 'p' : '.--.', 'q' : '--.-', 'r' : '.-.', 's' : '...', 't' : '-', 'u' : '..-', 'v' : '...-', 'w' : '.--', 'x' : '-..-', 'y' : '-.--', 'z' : '--..', '.' : '.-.-.-', '?' : '..--..', ',' : '--..--', ' ' : '/'
}
morseText = StringVar()

def limitmorsetext(*args):
    value = morseText.get()
    if len(value) > 12: morseText.set(value[:12])
    print(len(value))


morseText.trace('w', limitmorsetext)

txt = Entry(window,width=20, textvariable=morseText)
txt.grid(column=0, row=1)
txt.focus()

LED = 10

def submitbtncliced():
    word = morseText.get().lower()
    length = len(word)

    for i in word:
        if i not in eng_to_morse:
            break;
        else:
            morse_final = eng_to_morse[i]
            handleLight(morse_final)


def handleLight(morse_final):
    for i in morse_final:
        if i == '.':
            print(i)
            GPIO.output(LED, GPIO.HIGH)
            time.sleep(1)
            GPIO.output(LED, GPIO.LOW)
            time.sleep(0.5)
        else:
            if i == '-':
                print(i)
                GPIO.output(LED, GPIO.HIGH)
                time.sleep(3)
                GPIO.output(LED, GPIO.LOW)
                time.sleep(0.5)


submitBtn = Button(window, width=20, text="Submit", command=submitbtncliced)
submitBtn.grid(column=0, row=2)


window.mainloop()