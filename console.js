/*
	Console class
*/

function Console(callback, targets = [document], visible = false, duration = 1500){
	this.callback = callback;
	this.targets = targets;
	this.visible = visible;
	this.duration = duration;
	
	// Set the console window
	this.window = new ConsoleWindow(this.targets[0]);

	this.input = "";
	this.ENTER = 13;
	this.BACK = 8;

	// Create the events
	var self = this;
	var key, i;
	for(i = 0; i < targets.length; i++){
		// Set a tab index if there is none
		if(targets[i].tabIndex == -1){
			targets[i].tabIndex = 1;
		}
		
		// Set the typing event
		targets[i].addEventListener("keypress", function(e){
			key = e.which || e.keyCode || e.charCode;
			
			// Check for special keys
			if(key == self.ENTER){
				self.submit();
			}
			else{ // It's a normal key(probably)
				self.write(String.fromCharCode(key));
			}
		});
		
		// Set the erase event
		targets[i].addEventListener("keydown", function(e){
			key = e.which || e.keyCode;
			if(key == self.BACK){
				self.erase();
			}
		});
	
	}

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







function ConsoleWindow(parent = document.body){
	this.parent = parent;
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
		this.el.style.top = this.parent.offsetHeight / 2 - h / 2 + "px";
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