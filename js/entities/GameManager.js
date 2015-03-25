// makes player either win or lose 
game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		// decides when game is over 
		this.gameOver = false;
	},

	update: function(){
		if (game.data.win === true && !this.gameOver) {
			this.gameOver(true);
		}
		else if (game.data.win === false && !this.gameOver) {
			this.gameOver(false);
		}

		return true;
	},

	gameOver: function(win){
		if (win) {
			game.data.exp += 10;
		}
		else{
			game.data.exp += 1;
		}
			// decides when game is over 
			this.gameOver = false;
			// saves current game variable
			me.save.exp = game.data.exp;

			// for testing purposes only
			me.save.exp2 = 4;
	}
});

