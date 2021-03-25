#include <Arduino.h>
#include <ArduinoJson.h>
#include <DHT.h>

// ------------------- FUNCTION PROTOTYPES ---------------//
void __read_dht_data();

//------------------ DHT CONFIG ------------------ //
#define DHTTYPE DHT11
#define DHT_PIN 32
#define DHT_PERIOD 2000
DHT dht(DHT_PIN, DHTTYPE);
float temperature = 0.0;
float humidity = 0.0;

// ----------------- JSON CONFIG ---------------//
  StaticJsonDocument<200> jsonData;

// --------------- TIMER CONFIG --------------//
unsigned long currentTimeMillis = 0;

void setup() {
  Serial.begin(115200);
  Serial.print("Initializing DHT sensor ... ");
  dht.begin();
  Serial.println("OK");
}

void loop() {
  // ---------------- DHT ROUTINE ----------------//
   if (millis() > currentTimeMillis + DHT_PERIOD) {
     __read_dht_data();
     currentTimeMillis = millis();
   }
}

// --------------- READ DHT DATA -------------- //
void __read_dht_data() {
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();
  jsonData["humidity"] = humidity;
  jsonData["temperature"] = temperature;
  serializeJson(jsonData, Serial);
  Serial.println();
}