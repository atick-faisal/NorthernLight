#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <DHT.h>

// ---------------- WIFI ---------------- //
const char* SSID = "Harbinger";
const char* PASS = "qwerty12345";
String statusRoute = "http://192.168.0.100:8000/api/status/";
String devicesRoute = "http://192.168.0.100:8000/api/devices/";
#define POST_INTERVAL 10000
#define GET_INTERVAL 3000

// ------------------- FUNCTION PROTOTYPES ---------------//
void __read_dht_data();
void __get_data();
void __post_data();

//------------------ DHT CONFIG ------------------ //
#define DHTTYPE DHT11
#define DHT_PIN 32
DHT dht(DHT_PIN, DHTTYPE);
float temperature = 0.0;
float humidity = 0.0;

// ----------------- JSON CONFIG ---------------//
StaticJsonDocument<200> jsonData;

// --------------- TIMER CONFIG --------------//
unsigned long postTimeMillis = 0;
unsigned long getTimeMillis = 0;

void setup() {
  Serial.begin(115200);
  //-------------- PIN CONFIG ---------------//
  pinMode(LED_BUILTIN, OUTPUT);
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
  // ---------------- GET ROUTINE ----------------//
   if (millis() > getTimeMillis + GET_INTERVAL) {
     __get_data();
     getTimeMillis = millis();
   }
  // ---------------- POST ROUTINE ----------------//
   if (millis() > postTimeMillis + POST_INTERVAL) {
     __read_dht_data();
     __post_data();
     postTimeMillis = millis();
   }
}

// --------------- READ DHT DATA -------------- //
void __read_dht_data() {
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();
  jsonData["hum"] = random(40, 100);
  jsonData["temp"] = random(40, 100);
  jsonData["light"] = random(40, 100);
}

// ------------------ POST DATA ----------------- //
void __post_data() {
  if(WiFi.status()== WL_CONNECTED){
    String jsonString;
    serializeJson(jsonData, jsonString);
    HTTPClient http;
    http.begin(statusRoute);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(jsonString);
    if (httpResponseCode > 0) {
      // String response = http.getString();
      Serial.println("[ POST ] DATA SENT SUCCESSFULLY ... ");
      // Serial.println(response);
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

// ------------------ GET DATA ----------------- //
void __get_data() {
  if(WiFi.status()== WL_CONNECTED){
    StaticJsonDocument<200> devices;
    HTTPClient http;
    http.begin(devicesRoute);
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) {
      String response = http.getString();
      deserializeJson(devices, response);
      JsonArray devicesArray = devices.as<JsonArray>();
      for (JsonObject device: devicesArray) {
        if (device["port"] == 1) {
          digitalWrite(LED_BUILTIN, device["state"]);
        }
      }
      Serial.println("[ GET ] DATA RECEIVED SUCCESSFULLY ... ");
    } else {
      Serial.print("ERROR RECEIVING DATA. ERROR CODE : ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
  else {
    Serial.println("WiFi DISCONNECTED");
  }
}