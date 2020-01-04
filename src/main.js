function ScoreBoard() {
	const board = {}

	board.load = function(px) {
		board.x = px;
		board.y = 50;
		board.color = '#fb2eeb';
		board.size = 50;
		board.score = 0;
	}

	board.draw = function() {
		push();
		textAlign(CENTER);
		textSize(board.size);
		fill(board.color);
		text(board.score, board.x, board.y);
		pop();
	}

	return board;
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

function Pad(pSide) {
	const pad = {};

	pad.load = function(px) {
		pad.x = px;
		pad.y = height / 2;
		pad.color = '#06fdff';
		pad.w = 10;
		pad.h = 50;
		pad.vy = 3;
	}

	pad.setControls = function(key1, key2) {
		pad.controls = {
			up: key1, 
			down: key2
		};
	}

	pad.update = function() {
		if (keyIsDown(pad.controls.up)) {
			pad.y -= pad.vy * (deltaTime/10);
		} else if (keyIsDown(pad.controls.down)) {
			pad.y += pad.vy * (deltaTime/10);
		}

		bottomBorderStop(pad, height - pad.h/2);
		topBorderStop(pad, pad.h/2);
	}

	pad.draw = function() {
		push();
		rectMode(CENTER);
		fill(pad.color);
		rect(pad.x, pad.y, pad.w, pad.h);
		pop();
	}

	return pad;
}

function Ball() {
	const ball = {};

	ball.load = function() {
		ball.x = width / 2;
		ball.y = height / 2;
		ball.radius = 6;
		ball.color = '#fefe4e';
		ball.vx = 3;
		ball.vy = 3;
		ball.isOut = false;
		ball.direction = 1;
	}

	ball.reset = function() {
		ball.x = width / 2;
		ball.y = height / 2;
	}

	ball.update = function(scoreBoardLeft, scoreBoardRight, padLeft, padRight) {
		ball.x += ball.direction * (ball.vx * (deltaTime/30));
		//ball.y += ball.direction * (ball.vy * (deltaTime/30));

		bottomBorderBounce(ball, height - ball.radius);
		topBorderBounce(ball, ball.radius);

		if (ball.x > width) {
			scoreBoardLeft.score++;
			ball.direction = 1;
			ball.reset();

		} else if (ball.x < 0) {
			scoreBoardRight.score++;
			ball.direction = -1;
			ball.reset();
		}

		if (ball.x > (padRight.x - padRight.w/2 - ball.radius)) {
			ball.vx = 0 - ball.vx;
		} else if (ball.x < (padLeft.x  + padLeft.w/2 + ball.radius)) {
			ball.vx = 0 - ball.vx;
		}
	}

	ball.draw = function() {
		push();
		fill(ball.color);
		circle(ball.x, ball.y, ball.radius*2);
		pop();
	}

	return ball;
}

let scoreBoard1 = ScoreBoard();
let scoreBoard2 = ScoreBoard();
const ball = Ball();
const pad1 = Pad();
const pad2 = Pad();

function setup() {
	createCanvas(800, 400);
	background('#1b002a');
	noStroke();

	scoreBoard1.load(40);
	scoreBoard2.load(width - 40);

	ball.load();

	pad1.load(100);
	pad1.setControls(asciiCodeKeyboard['z'], asciiCodeKeyboard['s']);

	pad2.load(width - 100);
	pad2.setControls(UP_ARROW, DOWN_ARROW);

	net.load();
}

function draw() {
	background('#1b002a');

	scoreBoard1.draw();
	scoreBoard2.draw();

	ball.update(scoreBoard1, scoreBoard2, pad1, pad2);

	pad1.update();
	pad2.update();

	ball.draw()
	pad1.draw();
	pad2.draw();
	net.draw();
}