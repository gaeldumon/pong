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