var editor, activeTutorial, tutorialIndex; // to do make this not a global lolz
var tutorials = [{
    name: 'Bare Minimum',
    help_text:"The bare minimum of code needed to start an Arduino sketch.",
    url: "http://arduino.cc/en/Tutorial/BareMinimum",
    init:'',
    code:"void setup() {\n  // put your setup code here, to run once:\n\n}\n\nvoid loop() {\n  // put your main code here, to run repeatedly: \n  \n}\n",
    text: ["<p>The first thing any Arduino script needs is the void setup() method. This method gets called as your sketch (.ino file) begins to run. It is only called once, so it makes sense to put initialization data in here (for example, open a connection with the computer).</p>",
	   "<p>To begin, write the following:<code>void setup(){\n}</code></p>",
	   "<p>It makes sense that the setup has a return type of void -- it's the first thing that's run, so what's there to save the return value?</p>",
	   "<p>The next main component you need is the void loop() method. This method is run continuously after your setup method is called. Whether you're checking the status of a button, or for unread emails in your inbox, the bulk of the logic will go in here.</p>",
	   "<p>The last bit of code to write:<code>void loop(){\n}</code></p>",
	   "<p>That's it! Here you have the majority of the skeleton of an Arduino file. In future tutorials, we'll go more into depth on how you can really expand the usage of these two functions.</p>"]
}, {
    name: 'Blink',
    url: "http://arduino.cc/en/Tutorial/Blink",
    help_text: "Turn an LED on and off.",
    text: ["<p>As in the previous tutorial, we need to make our skeleton. Include the setup and loop methods. It's usually a good idea to start off with this empty skeleton, before even tackling the problem.</p>",
	   "<p>After creating a skeleton, it makes sense that we should analyze the problem -- Let's make an Arduino sketch that blinks an LED on for one second, then blinks it off for another second, and then repeats. There already seems to be an implicit structure. We do something, and we repeat. Luckily, the void loop takes care of the repeating nature and we can just put our logic inside of it.</p>",
	   "<p>First off, let's take on the setup method. Since we're communicating with a digital pin, we need to let the Arduino know that. It makes sense that this sort of initialization process happens only once, and the setup method fits that need perfect.</p>",
	   "<p>We're going to communicate with the onboard LED on this one (pin 13), so you can put the following in void setup to let the Arduino know that we intend to use this pin for output.<code>pinMode(13, OUTPUT);</code></p>",
	   "<p>Now, we can move onto the loop. The idea is to tell the Arduino to turn the LED on, wait a bit, turn it off, and wait a bit again. This can be achieved with the following:<code>digitalWrite(13, HIGH);\ndelay(1000);\ndigitalWrite(13, LOW);\ndelay(1000);</code></p>",
	   "<p>The digitalWrite function tells the Arduino to set the state of a pin. In this case, HIGH applies a positive voltage, and LOW grounds the pin. Additionally, delay tells the Arduino to wait and do nothing in milliseconds.</p>",
	   "<p>It really is as straight forward as that. It's intuitive when you consider the pins as things you can directly control and when you become familiar with the structure you can apply to your code.</p>"],
    init:'',
    code: "/*\n  Blink\n  Turns on an LED on for one second, then off for one second, repeatedly.\n \n  This example code is in the public domain.\n */\n \n// Pin 13 has an LED connected on most Arduino boards.\n// give it a name:\nint led = 13;\n\n// the setup routine runs once when you press reset:\nvoid setup() {                \n  // initialize the digital pin as an output.\n  pinMode(led, OUTPUT);     \n}\n\n// the loop routine runs over and over again forever:\nvoid loop() {\n  digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)\n  delay(1000);               // wait for a second\n  digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW\n  delay(1000);               // wait for a second\n}\n"
}, {
    name: "DigitalReadSerial",
    url: "http://arduino.cc/en/Tutorial/DigitalReadSerial",
    help_text:"Read a switch, print the state out to the Arduino Serial Monitor.",
    text: ["<p>We loaded the code into the editor for you. See how it runs and experiment with your own edits.</p>"],
    code: "\n/*\n  DigitalReadSerial\n Reads a digital input on pin 2, prints the result to the serial monitor \n \n This example code is in the public domain.\n */\n\n// digital pin 2 has a pushbutton attached to it. Give it a name:\nint pushButton = 2;\n\n// the setup routine runs once when you press reset:\nvoid setup() {\n  // initialize serial communication at 9600 bits per second:\n  Serial.begin(9600);\n  // make the pushbutton's pin an input:\n  pinMode(pushButton, INPUT);\n}\n\n// the loop routine runs over and over again forever:\nvoid loop() {\n  // read the input pin:\n  int buttonState = digitalRead(pushButton);\n  // print out the state of the button:\n  Serial.println(buttonState);\n  delay(1);        // delay in between reads for stability\n}\n"
}, {
    name: "AnalogReadSerial",
    url: "http://arduino.cc/en/Tutorial/AnalogReadSerial",
    help_text: "Read a potentiometer, print its state out to the Arduino Serial Monitor.",
    text: ["<p>We loaded the code into the editor for you. See how it runs and experiment with your own edits.</p>"],
    code: "\n/*\n  AnalogReadSerial\n  Reads an analog input on pin 0, prints the result to the serial monitor.\n  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.\n \n This example code is in the public domain.\n */\n\n// the setup routine runs once when you press reset:\nvoid setup() {\n  // initialize serial communication at 9600 bits per second:\n  Serial.begin(9600);\n}\n\n// the loop routine runs over and over again forever:\nvoid loop() {\n  // read the input on analog pin 0:\n  int sensorValue = analogRead(A0);\n  // print out the value you read:\n  Serial.println(sensorValue);\n  delay(1);        // delay in between reads for stability\n}\n"
}, {
    name: "Fading", url: "http://arduino.cc/en/Tutorial/Fade", help_text: "Demonstrates the use of analog output to fade an LED.", text: ["<p>We loaded the code into the editor for you. See how it runs and experiment with your own edits.</p>"], code: "\n/*\n Fade\n \n This example shows how to fade an LED on pin 9\n using the analogWrite() function.\n \n This example code is in the public domain.\n */\n\nint led = 9;           // the pin that the LED is attached to\nint brightness = 0;    // how bright the LED is\nint fadeAmount = 5;    // how many points to fade the LED by\n\n// the setup routine runs once when you press reset:\nvoid setup()  { \n  // declare pin 9 to be an output:\n  pinMode(led, OUTPUT);\n} \n\n// the loop routine runs over and over again forever:\nvoid loop()  { \n  // set the brightness of pin 9:\n  analogWrite(led, brightness);    \n\n  // change the brightness for next time through the loop:\n  brightness = brightness + fadeAmount;\n\n  // reverse the direction of the fading at the ends of the fade: \n  if (brightness == 0 || brightness == 255) {\n    fadeAmount = -fadeAmount ; \n  }     \n  // wait for 30 milliseconds to see the dimming effect    \n  delay(30);                            \n}\n"
}, {name: "Analog Read Voltage", help_text:"Reads an analog input and prints the voltage to the serial monitor", text: ["<p>We loaded the code into the editor for you. See how it runs and experiment with your own edits.</p>"], code: "/*\n  ReadAnalogVoltage\n  Reads an analog input on pin 0, converts it to voltage, and prints the result to the serial monitor.\n  Attach the center pin of a potentiometer to pin A0, and the outside pins to +5V and ground.\n \n This example code is in the public domain.\n */\n\n// the setup routine runs once when you press reset:\nvoid setup() {\n  // initialize serial communication at 9600 bits per second:\n  Serial.begin(9600);\n}\n\n// the loop routine runs over and over again forever:\nvoid loop() {\n  // read the input on analog pin 0:\n  int sensorValue = analogRead(A0);\n  // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):\n  float voltage = sensorValue * (5.0 / 1023.0);\n  // print out the value you read:\n  Serial.println(voltage);\n}\n"
   }];

$(document).ready(function() {
    /*// load in tutorials
    $.getJSON("arduino-ide/tutorials.json", function(data) {
	console.log('received tutorials', data);
    });
    */
    for (var i=0; i < tutorials.length; i++) {
	var tutorial = tutorials[i];
	tutorial.index = i;
	$('.tutorials').append('<li class="tutorial-' + i + '"><a href="#" onclick="goToTutorial(' + i +
			       ')">' + tutorial.name + '</a> <a href="' +
			       tutorial.url + '" title="' + tutorial.help_text
			       + '" target="_blank"><i class="fa fa-link"></i></a></li>');
    };

    // set up editor
    editor = CodeMirror($('.editor')[0], {
        lineNumbers: true,
    keyMap: 'sublime',
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    //theme: 'eclipse'
    });
    goToTutorial(0);

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

var goToTutorial = function(index) {
    if (index >= tutorials.length) {
	index = 0;
    }
    else if (index < 0) {
	index = tutorials.length-1;
    };
    for (var i=0; i<tutorials.length; i++) {
	var tutorial = tutorials[i];
	tutorial.active = false;
	$('.tutorial-' + i).removeClass('active');
    };
    var tutorial = tutorials[index];
    if (tutorial.init !== undefined)
	editor.setValue(tutorial.init)
    else
	editor.setValue(tutorial.code);
    tutorial.active = true;
    activeTutorial = tutorial;
    $('.tutorial-' + index).addClass('active');
    goToTutorialStep(0);
};

var goToTutorialStep = function(index) {
    tutorialIndex = index;
    var text = activeTutorial.text[index];
    $('.tutorial-text').html(text);
    if (index >= activeTutorial.text.length) {
	nextTutorial();
    }
    else if (index < 0) {
	prevTutorial();
    };
};

var nextTutorial = function() {
    goToTutorial(activeTutorial.index + 1);
};

var prevTutorial = function() {
    goToTutorial(activeTutorial.index - 1);
};

var nextStep = function() {
    var nextIndex = tutorialIndex+1;
    goToTutorialStep(nextIndex);
};

var prevStep = function() {
    var prevIndex = tutorialIndex-1;
    goToTutorialStep(prevIndex);
};

var revealCode = function() {
    var r = confirm("Are you sure you want to reveal the code? This will overwrite any custom code you've typed into the editor");
    if (r)
	editor.setValue(activeTutorial.code);
};
