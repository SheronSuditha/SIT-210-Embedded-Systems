#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char *ssid = "SSID";
const char *password = "PASSWORD";

const char *serverName = "http://maker.ifttt.com/trigger/hook_triggered/with/key/API_KEY_HERE";
unsigned long lastTime = 0;
unsigned long timerDelay = 10000;

void setup()
{
    Serial.begin(115200);

    WiFi.begin(ssid, password);
    Serial.println("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());

    Serial.println("10 Second Delays added.");
}
#define PHOTOSENSOR A0

void loop()
{
    if ((millis() - lastTime) > timerDelay)
    {
        if (WiFi.status() == WL_CONNECTED)
        {
            int sensorData = analogRead(PHOTOSENSOR);

            if (sensorData > 1000)
            {
                HTTPClient http;
                http.begin(serverName);
                http.addHeader("Content-Type", "application/x-www-form-urlencoded");
                String httpRequestData = "value1=" + String(sensorData) + "&value2=" + String(1);
                int httpResponseCode = http.POST(httpRequestData);

                Serial.print("HTTP Response code: ");
                Serial.println(httpResponseCode);
                http.end();
            }
            if (sensorData < 500)
            {
                HTTPClient http;
                http.begin(serverName);
                http.addHeader("Content-Type", "application/x-www-form-urlencoded");
                String httpRequestData = "value1=" + String(sensorData) + "&value2=" + String(0);
                int httpResponseCode = http.POST(httpRequestData);

                Serial.print("HTTP Response code: ");
                Serial.println(httpResponseCode);
                http.end();
            }
        }
        else
        {
            Serial.println("WiFi Disconnected");
        }
        lastTime = millis();
    }
}