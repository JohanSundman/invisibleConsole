

// A test console
function testConsole(str){
	console.log(str);
	
	for(var i = 0; i < colors.length; i++){
		console.log("loopin throught.." + i);
		if(colors[i] == str){
			//target.style.backgroundColor = colors[i];
			console.log("match");
			//console1.reset();
		}
	}

	if(str == "test"){
		console.log("RECIEVED TEST");
	}
}

var colors = ["blue", "red","yellow", "purple", "orange", "green", "black", "white", "pink", "magenta"];

// Assign a console to the target div
var target = document.getElementById("target");
var console1 = new Console(testConsole, [target], true);