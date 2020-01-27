/**26/01/2020 : To fix => no collision with left pad !**/

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
			x: 100,
			y: 50,
			color: '#fb2eeb',
			size: 50
		};

		this.limits = {
			top: 0 + this.h/2,
			bottom: height - this.h/2
		};

		if (this.type === 'left') {
			this.x = 100;
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
		rectMode(CENTER);
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

	this.padCollide = function(pads) {
		for (const pad of pads) {

			if (this.y >= (pad.y - pad.h/2) && this.y <= (pad.y + pad.h/2)) {

				if (pad.type === 'right') {

					if (this.x >= (pad.x - pad.w/2 - this.radius) &&
						this.x < (pad.x + pad.w/2 - this.radius)) {

						this.x -= 1;
						this.vx = 0 - this.vx;
					}

				} else if (pad.type === 'left') {

					if (this.x <= (pad.x - pad.w/2 - this.radius) &&
						this.x > (pad.x - pad.w/2 + this.radius)) {

						this.x += 1;
						this.vx = 0 - this.vx;
					}
				}
			}
		}
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

		//Loop through pads given as parameter to detect collisions
		this.padCollide(pads);

		this.borderBounce();

		for (const pad of pads) {
			if (pad.type === 'left' && this.x >= width) {
				pad.score.value++;
				this.serveRight();
				this.reset();

			} else if (pad.type === 'right' && this.x <= 0) {
				pad.score.value++;
				this.serveLeft();
				this.reset();
			}
		}
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
const pads = [pad1, pad2];

const ball = new Ball();

function setup() {
	createCanvas(800, 400);
	background('#1b002a');
	noStroke();

	for (const pad of pads) {
		pad.load();
	}

	ball.load();

	net.load();
}

function draw() {
	background('#1b002a');

	for (const pad of pads) {
		pad.update();
		pad.draw();
	}

	ball.update(pads);
	ball.draw();

	net.draw();
}