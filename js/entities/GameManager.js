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
	}
});