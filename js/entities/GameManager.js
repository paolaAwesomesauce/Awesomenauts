// makes player disapper when it runs out health 
// manages how much gold a plyer has 
// last class manages creeeps 
game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();
		
		return true;
	},

	goldTimerCheck: function(){
		// adds gold whenever we kill a creep
		if (Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >=1000)) {
			game.data.gold += 1;
			console.log("Current gold: " + game.data.gold);
		}

	},

	creepTimerCheck: function(){
		if (Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)) {
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0 , {});
			me.game.world.addChild(creepe, 5);

			var gloop = me.pool.pull("Player2", 200, 0 , {});
			me.game.world.addChild(gloop, 5);
		}

	}

});

game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;

	},

	update: function(){
		// resetS payer when it dies
		if (game.data.player) {
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}

		return true;
	}
});

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
	}
});