from smbus import SMBus
import random
import time
 
addr = 0x8 # bus address
bus = SMBus(1) # indicates /dev/ic2-1
 
numb = 1

def writeDataToArduino(value):
    byteValue = StringToBytes(value)
    bus.write_i2c_block_data(addr, 0x00, byteValue)
    return -1


def StringToBytes(val):
    retVal = []
    for c in val:
        retVal.append(ord(c))
    return retVal



while True:
    genValue = random.randint(0,99) 
    print("Sending over to I2C: ", genValue)
    sensorData = "Sensor Value: " + str(genValue)
    writeDataToArduino(sensorData)
    time.sleep(1)    