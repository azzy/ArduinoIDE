var editor; // to do make this not a global lolz
var tutorials = [{name: 'Bare Minimum', help_text:"The bare minimum of code needed to start an Arduino sketch.", url: "http://arduino.cc/en/Tutorial/BareMinimum", code:"void setup() {\n  // put your setup code here, to run once:\n\n}\n\nvoid loop() {\n  // put your main code here, to run repeatedly: \n  \n}\n",
}, {name: 'Blink', url: "http://arduino.cc/en/Tutorial/Blink", help_text: "Turn an LED on and off.", code: "/*\n  Blink\n  Turns on an LED on for one second, then off for one second, repeatedly.\n \n  This example code is in the public domain.\n */\n \n// Pin 13 has an LED connected on most Arduino boards.\n// give it a name:\nint led = 13;\n\n// the setup routine runs once when you press reset:\nvoid setup() {                \n  // initialize the digital pin as an output.\n  pinMode(led, OUTPUT);     \n}\n\n// the loop routine runs over and over again forever:\nvoid loop() {\n  digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)\n  delay(1000);               // wait for a second\n  digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW\n  delay(1000);               // wait for a second\n}\n"
}, {name: "DigitalReadSerial", url: "http://arduino.cc/en/Tutorial/DigitalReadSerial", help_text:"Read a switch, print the state out to the Arduino Serial Monitor.", code: "\n/*\n  DigitalReadSerial\n Reads a digital input on pin 2, prints the result to the serial monitor \n \n This example code is in the public domain.\n */\n\n// digital pin 2 has a pushbutton attached to it. Give it a name:\nint pushButton = 2;\n\n// the setup routine runs once when you press reset:\nvoid setup() {\n  // initialize serial communication at 9600 bits per second:\n  Serial.begin(9600);\n  // make the pushbutton's pin an input:\n  pinMode(pushButton, INPUT);\n}\n\n// the loop routine runs over and over again forever:\nvoid loop() {\n  // read the input pin:\n  int buttonState = digitalRead(pushButton);\n  // print out the state of the button:\n  Serial.println(buttonState);\n  delay(1);        // delay in between reads for stability\n}\n"
}, {name: "AnalogReadSerial", url: "http://arduino.cc/en/Tutorial/AnalogReadSerial", help_text: "Read a potentiometer, print its state out to the Arduino Serial Monitor.", code: "\n/*\n  AnalogReadSerial\n  Reads an analog input on pin 0, prints the result to the serial monitor.\n  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.\n \n This example code is in the public domain.\n */\n\n// the setup routine runs once when you press reset:\nvoid setup() {\n  // initialize serial communication at 9600 bits per second:\n  Serial.begin(9600);\n}\n\n// the loop routine runs over and over again forever:\nvoid loop() {\n  // read the input on analog pin 0:\n  int sensorValue = analogRead(A0);\n  // print out the value you read:\n  Serial.println(sensorValue);\n  delay(1);        // delay in between reads for stability\n}\n"
}, {
    name: "Fading", url: "http://arduino.cc/en/Tutorial/Fade", help_text: "Demonstrates the use of analog output to fade an LED.", code: "\n/*\n Fade\n \n This example shows how to fade an LED on pin 9\n using the analogWrite() function.\n \n This example code is in the public domain.\n */\n\nint led = 9;           // the pin that the LED is attached to\nint brightness = 0;    // how bright the LED is\nint fadeAmount = 5;    // how many points to fade the LED by\n\n// the setup routine runs once when you press reset:\nvoid setup()  { \n  // declare pin 9 to be an output:\n  pinMode(led, OUTPUT);\n} \n\n// the loop routine runs over and over again forever:\nvoid loop()  { \n  // set the brightness of pin 9:\n  analogWrite(led, brightness);    \n\n  // change the brightness for next time through the loop:\n  brightness = brightness + fadeAmount;\n\n  // reverse the direction of the fading at the ends of the fade: \n  if (brightness == 0 || brightness == 255) {\n    fadeAmount = -fadeAmount ; \n  }     \n  // wait for 30 milliseconds to see the dimming effect    \n  delay(30);                            \n}\n"
}, {name: "Analog Read Voltage", help_text:"Reads an analog input and prints the voltage to the serial monitor", code: "/*\n  ReadAnalogVoltage\n  Reads an analog input on pin 0, converts it to voltage, and prints the result to the serial monitor.\n  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.\n \n This example code is in the public domain.\n */\n\n// the setup routine runs once when you press reset:\nvoid setup() {\n  // initialize serial communication at 9600 bits per second:\n  Serial.begin(9600);\n}\n\n// the loop routine runs over and over again forever:\nvoid loop() {\n  // read the input on analog pin 0:\n  int sensorValue = analogRead(A0);\n  // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):\n  float voltage = sensorValue * (5.0 / 1023.0);\n  // print out the value you read:\n  Serial.println(voltage);\n}\n"
   }];

$(document).ready(function() {
    /*// load in tutorials
    $.getJSON("arduino-ide/tutorials.json", function(data) {
	console.log('received tutorials', data);
    });
    */
    for (var i=0; i < tutorials.length; i++) {
	var tutorial = tutorials[i];
	$('.tutorials').append('<li><a href="' + tutorial.url + '" title="' +
			       tutorial.help_text + '">' + tutorial.name +
			       '</a></li>');
    };

    // set up editor
    var value = "\n/*\n  Blink\n  Turns on an LED on for one second, then off for one second, repeatedly.\n \n  This example code is in the public domain.\n */\n \n// Pin 13 has an LED connected on most Arduino boards.\n// give it a name:\nint led = 13;\n\n// the setup routine runs once when you press reset:\nvoid setup() {                \n  // initialize the digital pin as an output.\n  pinMode(led, OUTPUT);     \n}\n\n// the loop routine runs over and over again forever:\nvoid loop() {\n  digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)\n  delay(1000);               // wait for a second\n  digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW\n  delay(1000);               // wait for a second\n}\n"
    editor = CodeMirror($('.editor')[0], {
    value: value,
    lineNumbers: true,
    keyMap: 'sublime',
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    //theme: 'eclipse'
    });

    // set up roottree
    RootTree.init('10c4300dc9ca417686187f022f4639f3');
});

var setupEnvironment = function() {
    console.log('setup environment');
};

var uploadSketch = function() {
    var value = editor.getValue();
    value = value.replace(/(\r\n|\n|\r)/gm,'\n');
    console.log('upload sketch', value);
    // make sure that the value uploads with \n
    RootTree.run('upload_arduino', {args: value})
};
