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
