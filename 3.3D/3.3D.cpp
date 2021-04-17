#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ArduinoJson.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;

#define USE_SERIAL Serial
int LED = 5;

void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
    switch (type)
    {
    case sIOtype_DISCONNECT:
        USE_SERIAL.printf("[IOc] Disconnected!\n");
        break;
    case sIOtype_CONNECT:
        USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

        // join default namespace (no auto join in Socket.IO V3)
        socketIO.send(sIOtype_CONNECT, "/");
        break;
    case sIOtype_EVENT:
    {
        USE_SERIAL.printf("[IOc] get event: %s\n", payload);
        StaticJsonDocument<200> doc;
        deserializeJson(doc, payload);
        const char *eventName = doc[0];
        String event = (String)eventName;
        USE_SERIAL.print(eventName);
        if (event == "Custom_Wave")
        {
            for (int counter = 0; counter <= 10; counter++)
            {
                digitalWrite(LED, HIGH);
                delay(500);
                digitalWrite(LED, LOW);
                delay(500);
            }
        }
        else if (event == "Custom_Pat")
        {
            for (int counter = 0; counter <= 10; counter++)
            {
                digitalWrite(BUILTIN_LED, HIGH);
                delay(500);
                digitalWrite(BUILTIN_LED, LOW);
                delay(500);
            }
        }
    }
    break;
    case sIOtype_ACK:
        USE_SERIAL.printf("[IOc] get ack: %u\n", length);
        hexdump(payload, length);
        break;
    case sIOtype_ERROR:
        USE_SERIAL.printf("[IOc] get error: %u\n", length);
        hexdump(payload, length);
        break;
    case sIOtype_BINARY_EVENT:
        USE_SERIAL.printf("[IOc] get binary: %u\n", length);
        hexdump(payload, length);
        break;
    case sIOtype_BINARY_ACK:
        USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
        hexdump(payload, length);
        break;
    }
}

void setup()
{
    pinMode(BUILTIN_LED, OUTPUT); // Initialize the BUILTIN_LED pin as an output
    pinMode(LED, OUTPUT);
    // USE_SERIAL.begin(921600);
    USE_SERIAL.begin(115200);

    //Serial.setDebugOutput(true);
    USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for (uint8_t t = 4; t > 0; t--)
    {
        USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    // disable AP
    if (WiFi.getMode() & WIFI_AP)
    {
        WiFi.softAPdisconnect(true);
    }

    WiFiMulti.addAP("SSID", "PASS");

    //WiFi.disconnect();
    while (WiFiMulti.run() != WL_CONNECTED)
    {
        delay(100);
    }

    String ip = WiFi.localIP().toString();
    USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

    socketIO.begin("SERVER IP", 2000, "/socket.io/?EIO=4", "");
    for (int counter = 0; counter <= 4; counter++)
    {
        digitalWrite(LED, HIGH);
        delay(1000);
        digitalWrite(LED, LOW);
        delay(500);
    }
    socketIO.onEvent(socketIOEvent);
}

unsigned long messageTimestamp = 0;
#define PHOTOSENSOR A0

void loop()
{
    socketIO.loop();

    uint64_t now = millis();

    if (now - messageTimestamp > 2000)
    {
        messageTimestamp = now;
        DynamicJsonDocument doc(1024);
        JsonArray array = doc.to<JsonArray>();
        array.add("ping");
        String output;
        serializeJson(doc, output);
        socketIO.sendEVENT(output);
        USE_SERIAL.println(output);
    }
}