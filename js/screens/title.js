game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

		// binds 'eneter' key
		me.input.bindKey(me.input.KEY.ENTER, "start");

		// put the word awesomenauts! on title screeen 
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Arial", 46, "white");
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Awesomenuts!", 450, 130);
				this.font.draw(renderer.getContext(), "Press ENTER to play!", 250, 530);
			}

			})));

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){

			// enters the stae in which we can acctually play the game
			if (action === "start") {
				me.state.change(me.state.PLAY);
			}
		});

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */

	 // unbinds the enter key so when we press it wont send us to the beginning thing
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER); // TODO
		me.event.unsubscribe(this.handler);
	}
});
