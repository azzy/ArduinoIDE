var editor; // to do make this not a global lolz

$(document).ready(function() {
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
});

var uploadSketch = function() {
    var value = editor.getValue();
    value = value.replace(/(\r\n|\n|\r)/gm,'\n');
    // make sure that the value uploads with \n
};
