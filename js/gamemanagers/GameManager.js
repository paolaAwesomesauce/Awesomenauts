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

			// for testing purposes only
			me.save.exp2 = 4;
	}
});

game.SpendGold = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastBuy = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
		this.buying = false;
	},

	update: function(){
		this.now = new Date().getTime();

		if (me..input.isKeyPressed("buy") && this.now-this.lastBuy >=1000) {
			this.lastBuy = this.now;
			if (!this.buying) {
				this.startBuying();
			}
			else{
				this.stopBullying();
			}
		}

		this.checkBuyKeys();

		return true;
	},

	startBuying: function(){
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.buySscren = new me.Sprite(game.data.pausedPos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.player.body.setVelocity(0, 0);
		me.state.pause(me.state.PLAY);
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText();
	},

	setBuyText: function(){
		// allows us to be able to have a buy screen thingy so we can spend our gold
		game.data.buytext = new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PRESS F1-F6  TO BUY, B TO EXIT, Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level:  " + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Health " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health:  " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: " + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y);
			}

			}));

		me.game.world.addChild(game.data.buytext, 35);

	},

	stopBuying: function(){
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		me.game.world.removeChild(game.data.buyscreen);
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);

		me.game.world.removeChild(game.data.buytext);
	},

	checkBuyKeys: function(){
		if (me.input.isKeyPressed("F1")) {
			if (this.checkCoast(1)) {
				this.makePurchase(1);
			}
		}else if (me.input.isKeyPressed("F2")) {
			if (this.checkCoast(2)) {
				this.makePurchase(2);
			}
		}else if (me.input.isKeyPressed("F3")) {
			if (this.checkCoast(3)) {
				this.makePurchase(3);
			}
		}else if (me.input.isKeyPressed("F4")) {
			if (this.checkCoast(4)) {
				this.makePurchase(4);
			}
		}else if (me.input.isKeyPressed("F5")) {
			if (this.checkCoast(5)) {
				this.makePurchase(5);
			}
		}else if (me.input.isKeyPressed("F6")) {
			if (this.checkCoast(6)) {
				this.makePurchase(6);
			}
		}
	},

	checkCoast: function(skill1){
		if (skill1===1 && (game.data.gold >= ((game.data.skill1+1)*10))) {
			return true;
		}else if (skill2===1 && (game.data.gold >= ((game.data.skill2+1)*10))) {
			return true;
		}else if (skill3===1 && (game.data.gold >= ((game.data.skill3+1)*10))) {
			return true;
		}else if (skill4===1 && (game.data.gold >= ((game.data.ability1+1)*10))) {
			return true;
		}else if (skill5===1 && (game.data.gold >= ((game.data.ability2+1)*10))) {
			return true;
		}else if (skill6===1 && (game.data.gold >= ((game.data.ability3 +1)*10))) {
			return true;
		}else{
			return false;
		}
	},

	makePurchase: function(skill1){
		if (skill === 1) {
			game.data.gold -= ((game.data.skill1 + 1)*10);
			game.data.skill1 += 1;
			game.data.playerAttack += 1;
		}else if (skill === 2) {
			game.data.gold -= ((game.data.skill2 + 1)*10);
			game.data.skill2 += 1;
		}else if (skill === 3) {
			game.data.gold -= ((game.data.skill3 + 1)*10);
			game.data.skill3 += 1;
		}else if (skill === 4) {
			game.data.gold -= ((game.data.ability1 + 1)*10);
			game.data.skill4 += 1;
		}else if (skill === 5) {
			game.data.gold -= ((game.data.ability2 + 1)*10);
			game.data.skill5 += 1;
		}else if (skill === 6) {
			game.data.gold -= ((game.data.ability3 + 1)*10);
			game.data.skill6 += 1;
		}
	}
});