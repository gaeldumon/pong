function debug() {
	console.log("**************DEBUG********************");
	console.log('game.screen -> ' + game.screen.width + ' / ' + game.screen.height);
	console.log('game.stage -> ' + game.stage.width + ' / ' + game.stage.height);
	console.log('game.view -> ' + game.view.width + ' / ' + game.view.height);
	console.log('ball -> ' + ball.x + ' / ' + ball.y);
	console.log("***************************************");
}

function bottomBorderBounce(obj, limit) {
	if (obj.y >= limit) {
		obj.y = limit;
		obj.vy = 0 - obj.vy;
	} 
}

function topBorderBounce(obj, limit) {
	if (obj.y <= limit) {
		obj.y = limit;
		obj.vy = 0 - obj.vy;
	} 
}

function bottomBorderStop(obj, limit) {
	if (obj.y >= limit) {
		obj.y = limit;
	}
}

function topBorderStop(obj, limit) {
	if (obj.y <= limit) {
		obj.y = limit;
	}
}

function keyboard(keyCode) {
	let key = {};

	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;

	//The downHandler
	key.downHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isUp && key.press) {
				key.press();
			}
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	//The upHandler
	key.upHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isDown && key.release) {
				key.release();
			}
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

	//Attach event listeners
	window.addEventListener("keydown", key.downHandler.bind(key), false);
	window.addEventListener("keyup", key.upHandler.bind(key), false);

	//Return the key object
	return key;
}

let asciiCodeKeyboard = {
	'upArrow': 38,
	'rightArrow': 39,
	'downArrow': 40,
	'leftArrow': 37,
	'space': 32,
	'a': 65, 
	'b': 66,
	'c': 67,
	'd': 68,
	'e': 69,
	'f': 70,
	'g': 71,
	'h': 72,
	'i': 73,
	'j': 74,
	'k': 75,
	'l': 76,
	'm': 77,
	'n': 78,
	'o': 79,
	'p': 80,
	'q': 81,
	'r': 82,
	's': 83,
	't': 84,
	'u': 85,
	'v': 86,
	'w': 87,
	'x': 88,
	'y': 89,
	'z': 90
};