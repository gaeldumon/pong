/*
* Objet "filet de terrain"
* Dessine une simple ligne au milieu du terrain (sous forme de rectangle).
* J'ai trouvé ça neammoins plus propre de creer un objet exprés. Il n'y aura
* jamais plus d'un seul filet donc pas de constructeur.
*/

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