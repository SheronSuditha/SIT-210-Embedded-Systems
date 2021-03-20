#include <Arduino.h>
#define LED D0 // Led in NodeMCU at pin GPIO16 (D0).

void setup()
{
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}
void loop()
{
  String morse = ".........-.----......--....-.....-";

  for (char letter : morse)
  {
    Serial.write(letter);
    if (letter == '.')
    {
      digitalWrite(LED, HIGH);
      delay(100);
      digitalWrite(LED, LOW);
      delay(500);
    }
    else if (letter = '-')
    {
      digitalWrite(LED, HIGH);
      delay(2000);
      digitalWrite(LED, LOW);
      delay(500);
    }
  }
}