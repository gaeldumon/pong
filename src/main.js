const game = new Game();

function setup() {
	createCanvas(800, 400);
	background('#1b002a');
	noStroke();

	game.load();
}

function draw() {
	background('#1b002a');

	game.update();

	game.draw();
}