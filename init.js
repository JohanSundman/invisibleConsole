// Assign the target div and the console to it
var target = document.getElementById("target");
var console1 = new Console(function(str){
	// Command function
	console.log("text received: " + str);
	var command = str.split(' ')[0];
	var instruction = str.replace(command, "").trim();
	if(command == "color"){
		target.style.backgroundColor = instruction;
	}
}, 2000, true, target, false);