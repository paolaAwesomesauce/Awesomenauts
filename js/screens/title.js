game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

		// put the word awesomenauts! on title screeen 
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Arial", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},

			newGame: function(){
				// me.input.releasePointerEvent('poniterdown', this);
				// me.input.releasePointerEvent('poniterdown', game.data.option2);
				me.state.change(me.state.NEW);
			}

			})));

		// put the word awesomenauts! on title screeen 
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				this.font = new me.Font("Arial", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},

			newGame: function(){
				// me.input.releasePointerEvent('poniterdown', this);
				// me.input.releasePointerEvent('poniterdown', game.data.option2);
				me.state.change(me.state.LOAD);
			}

			})));


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */

	 // unbinds the enter key so when we press it wont send us to the beginning thing
	onDestroyEvent: function() {

	}
});
