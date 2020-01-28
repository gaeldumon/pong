/**
* Small pong game (2 players)
* Lib : p5.js
**/

const net = {
	load: function() {
		this.x = width / 2;
		this.y = 0;
		this.w = 5;
		this.h = height;
		this.color = '#fb2eeb';
	},

	draw: function() {
		push();
		rectMode(CORNER);
		fill(this.color);
		rect(this.x, this.y, this.w, this.h);
		pop();
	}
}

/******************************************************************************/

function Pad(pSide) {
	this.load = function() {
		this.type = pSide;
		this.y = height / 2;
		this.color = '#06fdff';
		this.w = 10;
		this.h = 50;
		this.vy = 4;

		this.score = {
			value: 0,
			x: 0,
			y: 50,
			color: '#fb2eeb',
			size: 50
		};

		this.limits = {
			top: 0,
			bottom: height - this.h
		};

		if (this.type === 'left') {
			this.x = 100;
			this.score.x = 100;
			this.setControls(asciiCodeKeyboard['z'], asciiCodeKeyboard['s']);
		} else if (this.type === 'right') {
			this.x = width - 100;
			this.score.x = this.x;
			this.setControls(UP_ARROW, DOWN_ARROW);
		}
	}

	this.drawScore = function() {
		textAlign(CENTER);
		textSize(this.score.size);
		fill(this.score.color);
		text(this.score.value, this.score.x, this.score.y);
	}

	this.setControls = function(key1, key2) {
		this.controls = {
			up: key1, 
			down: key2
		};
	}

	this.moveUp = function() {
		this.y -= this.vy * (deltaTime/10);
	}

	this.moveDown = function() {
		this.y += this.vy * (deltaTime/10);
	}

	this.borderStop = function() {
		if (this.y <= this.limits.top) {
			this.y = this.limits.top;
		} else if (this.y >= this.limits.bottom) {
			this.y = this.limits.bottom;
		}
	}

	this.update = function() {
		if (keyIsDown(this.controls.up)) {
			this.moveUp();
		} else if (keyIsDown(this.controls.down)) {
			this.moveDown();
		}

		this.borderStop();
	}

	this.draw = function() {
		this.drawScore();

		push();
		fill(this.color);
		rect(this.x, this.y, this.w, this.h);
		pop();
	}
}

/******************************************************************************/

function Ball() {
	this.load = function() {
		this.x = width / 2;
		this.y = height / 2;
		this.radius = 6;
		this.color = '#fefe4e';
		this.vx = 6;
		this.vy = 6;
		this.direction = 1;
		this.limits = {
			top: 0 + this.radius,
			bottom: height - this.radius
		};
	}

	this.reset = function() {
		this.x = width/2;
		this.y = height/2;
	}

	this.borderBounce = function() {
		if (this.y <= this.limits.top) {

			this.y = this.limits.top;
			this.vy = 0 - this.vy;

		} else if (this.y >= this.limits.bottom) {

			this.y = this.limits.bottom;
			this.vy = 0 - this.vy;
		}
	}

	this.padCollide = function(pad) {
		let testX = this.x;
		let testY = this.y;

		if (this.x < pad.x) 
			testX = pad.x;
		else if (this.x > pad.x + pad.w)
			testX = pad.x + pad.w;

		if (this.y < pad.y)
			testY = pad.y;
		else if (this.y > pad.y + pad.h)
			testY = pad.y + pad.h;

		let distX = this.x - testX;
		let distY = this.y - testY;
		let distance = sqrt( (distX * distX) + (distY * distY) );

		if (distance <= this.radius) {
			return true;
		}

		return false;
	}

	this.serveRight = function() {
		this.direction = 1;
	}

	this.serveLeft = function() {
		this.direction = -1;
	}

	this.update = function(pads) {
		this.x += this.direction * (this.vx * (deltaTime/30));
		this.y += this.direction * (this.vy * (deltaTime/30));

		if (this.padCollide(pads.left)) {
			ball.x += 1;
			ball.vx = 0 - ball.vx;
		} else if (this.padCollide(pads.right)) {
			ball.x -= 1;
			ball.vx = 0 - ball.vx;
		}

		if (this.x >= width) {
			pads.left.score.value += 1;
			this.serveRight();
			this.reset();
		} else if (this.x <= 0) {
			pads.right.score.value += 1;
			this.serveLeft();
			this.reset();
		}

		this.borderBounce();
	}

	this.draw = function() {
		push();
		fill(this.color);
		circle(this.x, this.y, this.radius * 2);
		pop();
	}
}

const pad1 = new Pad('left');
const pad2 = new Pad('right');
const pads = {
	left: pad1, 
	right: pad2
};

const ball = new Ball();

class Game {
	load() {
		pads.left.load()
		pads.right.load();
		ball.load();
		net.load();
	}

	update() {
		pads.left.update();
		pads.right.update();
		ball.update(pads);
	}

	draw() {
		pads.left.draw();
		pads.right.draw();
		ball.draw();
		net.draw();
	}
}

const game = new Game();
let START = false;

function setup() {
	createCanvas(800, 400);
	background('#1b002a');
	noStroke();

	game.load();

	let button = createButton('Start');
	button.position(width/2-button.width/2+9, height/2);
	button.mousePressed(function() {
		START = true;
		removeElements();
	});
}

function draw() {
	background('#1b002a');

	if (START) game.update();

	game.draw();
}