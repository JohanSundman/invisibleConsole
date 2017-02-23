
// A test console
function testConsole(str){
	console.log("text received: " + str);
	
	// Color example
	for(var i = 0; i < colors.length; i++){
		if(colors[i] == str){
			target.style.backgroundColor = colors[i];
		}
	}
}

var colors = ["blue", "red","yellow", "purple", "orange", "green", "black", "white", "pink", "magenta"];

// Assign a console to the target div
var target = document.getElementById("target");
var console1 = new Console(testConsole, [target], true);