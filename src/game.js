const pad1 = new Pad('left');
const pad2 = new Pad('right');

const pads = {
	left: pad1, 
	right: pad2
};

const ball = new Ball();

class Game {
	preload() {
		ball.preload();
	}

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