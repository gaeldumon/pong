function ScoreBoard() {
	this.load = function(px) {
		this.x = px;
		this.y = 50;
		this.color = '#fb2eeb';
		this.size = 50;
		this.score = 0;
	}

	this.draw = function() {
		push();
		textAlign(CENTER);
		textSize(this.size);
		fill(this.color);
		text(this.score, this.x, this.y);
		pop();
	}
}

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

function Pad() {

	this.load = function(pSide) {

		this.type = pSide;

		if (this.type === 'left')
			this.x = 100;
		else if (this.type === 'right')
			this.x = width - 100;

		this.y = height / 2;
		this.color = '#06fdff';
		this.w = 10;
		this.h = 50;
		this.vy = 4;
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

	this.bottomBorderStop = function() {
		if (this.y >= height - this.h/2) {
			this.y = height - this.h/2;
		} 
	}

	this.topBorderStop = function() {
		if (this.y <= this.h/2) {
			this.y = this.h/2;
		} 
	}

	this.update = function() {
		if (keyIsDown(this.controls.up))
			this.moveUp();
		else if (keyIsDown(this.controls.down))
			this.moveDown();

		this.bottomBorderStop();
		this.topBorderStop();
	}

	this.draw = function() {
		push();
		rectMode(CENTER);
		fill(this.color);
		rect(this.x, this.y, this.w, this.h);
		pop();
	}
}

function Ball() {

	this.load = function() {
		this.x = width / 2;
		this.y = height / 2;
		this.radius = 6;
		this.color = '#fefe4e';
		this.vx = 6;
		this.vy = 6;
		this.speed = 6;
		this.direction = 1;
	}

	this.reset = function() {
		this.x = width/2;
		this.y = height/2;
	}

	this.faster = function() {
		//this.speed++;
	}

	this.bottomBorderBounce = function() {
		if (this.y >= height - this.radius) {
			this.y = height - this.radius;
			this.vy = 0 - this.vy;
		} 
	}

	this.topBorderBounce = function() {
		if (this.y <= this.radius) {
			this.y = this.radius;
			this.vy = 0 - this.vy;
		} 
	}

	this.rightPadCollide = function(pad) { 
		if (this.x >= (pad.x - pad.w/2 - this.radius) &&
			/*Checking if this is on the FRONT side of the pad and not behind*/
			this.x < (pad.x + pad.w/2 - this.radius) &&
			this.y >= (pad.y - pad.h/2) &&
			this.y <= (pad.y + pad.h/2)) {

			this.faster();
			/*Repositioning the this a bit (outside pad) to avoid some bug*/
			this.x -= 1;
			this.vx = 0 - this.vx;
		}
	}

	this.leftPadCollide = function(pad) {
		if (this.x <= (pad.x + pad.w/2 + this.radius) &&
			/*Checking if this is on the FRONT side of the pad and not behind*/
			this.x > (pad.x - pad.w/2 + this.radius) &&
			this.y >= (pad.y - pad.h/2) &&
			this.y <= (pad.y + pad.h/2)) {

			this.faster();
			/*Repositioning the this a bit (outside pad) to avoid some bug*/
			this.x += 1;
			this.vx = 0 - this.vx;
		}
	}

	this.serveRight = function() {
		this.direction = 1;
	}

	this.serveLeft = function() {
		this.direction = -1;
	}

	this.update = function(scoreBoardLeft, scoreBoardRight, padLeft, padRight) {
		this.x += this.direction * (this.vx * (deltaTime/30));
		this.y += this.direction * (this.vy * (deltaTime/30));

		this.rightPadCollide(padRight);
		this.leftPadCollide(padLeft);

		this.bottomBorderBounce();
		this.topBorderBounce();

		if (this.x > width) {
			scoreBoardLeft.score++;
			this.serveRight();
			this.reset();

		} else if (this.x < 0) {
			scoreBoardRight.score++;
			this.serveLeft();
			this.reset();
		}
	}

	this.draw = function() {
		push();
		fill(this.color);
		circle(this.x, this.y, this.radius*2);
		pop();
	}
}

let scoreBoard1 = new ScoreBoard();
let scoreBoard2 = new ScoreBoard();

const ball = new Ball();
const pad1 = new Pad();
const pad2 = new Pad();

function setup() {
	createCanvas(800, 400);
	background('#1b002a');
	noStroke();

	/*Loading left score board at 40px on the X axis*/
	scoreBoard1.load(40);
	/*Loading right score board at 760px on the X axis*/
	scoreBoard2.load(width - 40);

	ball.load();

	/*Loading left pad at 100px (cf. pad object) on the X axis*/
	pad1.load('left');
	/*Left pad is controlled with the z and s keyboard keys*/
	pad1.setControls(asciiCodeKeyboard['z'], asciiCodeKeyboard['s']);

	/*Loading right pad at 700px (cf. pad object) on the X axis*/
	pad2.load('right');
	/*Right pad is controlled with the up and down arrow*/
	pad2.setControls(UP_ARROW, DOWN_ARROW);

	/*Loading the net, offering a graphic separation of the game screen*/
	net.load();
}

function draw() {
	background('#1b002a');

	ball.update(scoreBoard1, scoreBoard2, pad1, pad2);
	pad1.update();
	pad2.update();

	scoreBoard1.draw();
	scoreBoard2.draw();
	net.draw();
	ball.draw()
	pad1.draw();
	pad2.draw();
}