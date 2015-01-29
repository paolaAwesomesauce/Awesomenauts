game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		//loads level01 on playscreen. Uses lower case letters first and then uppercase.
		me.levelDirector.loadLevel("level01");

		//loads player
		var player = me.pool.pull("player", 0, 420, {});

		me.game.world.addChild(player, 5);

		//allows right arrow key to be used to make player move 
		me.input.bindKey(me.input.KEY.RIGHT, "right");

		// binds left arrow key so player can move left
		me.input.bindKey(me.input.KEY.LEFT, "left");

		//binds space key so player can jump up
		me.input.bindKey(me.input.KEY.SPACE, "jump");

		// binds the 'a' key to allow player to attack
		me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
