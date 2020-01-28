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