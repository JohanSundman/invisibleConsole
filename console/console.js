/*
	Console class
*/

function Console(callback, duration = 2500, visible = true, target = document, topPercent = 30, outline = false){
	this.callback = callback;
	this.target = target;
	this.visible = visible;
	this.duration = duration;
	
	// Set the console window
	this.window = new ConsoleWindow(this.target, topPercent, outline);

	this.input = "";
	this.ENTER = 13; // Enter key code
	this.BACK = 8; // Backbutton key code

	// Set a tab index if there is none
	if(target.tabIndex == -1){
		target.tabIndex = 1;
	}
		
	// Set the typing event
	var self = this;
	target.addEventListener("keypress", function(e){
		var key = e.which || e.keyCode || e.charCode;
			
		// Check for special keys
		if(key == self.ENTER){
			self.submit();
		}
		else{ // It's a normal key(probably)
			self.write(String.fromCharCode(key));
		}
	});
		
	// Set the erase event
	target.addEventListener("keydown", function(e){
		var key = e.which || e.keyCode;
		if(key == self.BACK){
			self.erase();
		}
	});
	
	

	// Set a new timeout
	this.setTimeout = function(){
		this.timeout = setTimeout(function(){
			self.reset();
		}, this.duration);
	}

	// Erase
	this.erase = function(){
		this.input = this.input.substr(0, this.input.length - 1); // Remove 1 char from the string
		this.update();
	};

	// Write
	this.write = function(char){
		this.input += char;
		this.update();
	};

	// Done, finnished, KILL IT
	this.reset = function(){
		this.window.hide(true);
		this.input = "";
	}

	// Update it to the callback
	this.update = function(){
		if(this.visible){
			this.window.hide(false); // Show it in case it's hidden
			this.window.update(this.input); // Update the console window
		}
		clearTimeout(this.timeout);
		this.setTimeout(); // Will extend the timeout
	}

	// Update it to the callback
	this.submit = function(){
		this.callback(this.input); // Will send the input and the reset reference
		this.reset(); // Reset the console
	}
}







function ConsoleWindow(parent = document.body, topPercent = 30, outline = false){
	this.parent = parent;
	this.topPercent = topPercent;
	if(!outline){
		this.parent.classList.add("consoleTarget");
	}
	this.el = document.createElement("div");
	this.el.classList.add("consoleWindow");
	this.el.classList.add("consoleHide");

	/*	
	 *	Create a box and text element, the box
	 *	will have some css making it flash constatly like a typing box.
	 *	The box will be the the left of the text container.
	*/

	this.parent.appendChild(this.el);


	// Basic functionality
	this.update = function(txt){
		if(txt.length === 0){
			this.hide(true);
			return;
		}
		
		// Update the text and box position
		this.el.innerHTML = txt;
		var w = this.el.offsetWidth;
		var h = this.el.offsetHeight;
		
		// Calculate the position for the console window
		this.el.style.left = this.parent.offsetWidth / 2 - w / 2 + "px";
		this.el.style.top = (this.parent.offsetHeight / 100) * this.topPercent - h / 2 + "px";
	}
	// Hide/show the box
	this.hide = function(hide = true){
		if(hide){ // Hide
			this.el.classList.add("consoleHide");
		}
		else{ // Show
			this.el.classList.remove("consoleHide");
		}
	}
}