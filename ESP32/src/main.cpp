#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <DHT.h>

// ---------------- WIFI ---------------- //
const char* SSID = "POCO M2 Pro";
const char* PASS = "12345678";
// String serverName = "https://shrouded-meadow-04832.herokuapp.com/api/sensors";
String serverName = "http://192.168.43.172:8000/api/northernlight/";

// ------------------- FUNCTION PROTOTYPES ---------------//
void __read_dht_data();
void __post_data();

//------------------ DHT CONFIG ------------------ //
#define DHTTYPE DHT11
#define DHT_PIN 32
#define DHT_PERIOD 3000
DHT dht(DHT_PIN, DHTTYPE);
float temperature = 0.0;
float humidity = 0.0;

// ----------------- JSON CONFIG ---------------//
  StaticJsonDocument<200> jsonData;

// --------------- TIMER CONFIG --------------//
unsigned long currentTimeMillis = 0;

void setup() {
  Serial.begin(115200);
  //------------- WIFI CONNECT ----------------//
  WiFi.begin(SSID, PASS);
  Serial.println("CONNECTING ...");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("IP ADDRESS ->> ");
  Serial.println(WiFi.localIP());

  // ------------- DHT ------------//
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
  jsonData["hum"] = random(40, 100);
  jsonData["temp"] = random(40, 100);
  jsonData["light"] = random(40, 100);
  __post_data();
}

// ------------------ POST DATA ----------------- //
void __post_data() {
  if(WiFi.status()== WL_CONNECTED){
    String jsonString;
    serializeJson(jsonData, jsonString);
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(jsonString);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("------- DATA SENT SUCCESSFULLY ------ ");
      Serial.println(response);
    } else {
      Serial.print("ERROR SENDING DATA. ERROR CODE : ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
  else {
    Serial.println("WiFi DISCONNECTED");
  }
}