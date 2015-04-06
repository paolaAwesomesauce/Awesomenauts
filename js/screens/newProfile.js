game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10);
		document.getElemenyById("input").style.visibility = "visible";
		document.getElemenyById("register").style.visibility = "visible";

		me.input.unbindKey(me.input.KEY.B);
		me.input.unbindKey(me.input.KEY.Q);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.A);

		// put the word awesomenauts! on title screeen 
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				// settings of text
				this.font = new me.Font("Arial", 26, "white");
			},

			// coordinates and adds text 
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PICK A USERNAME AND A PASSWORD", this.pos.x, this.pos.y);
				
			}

			})));
			
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */

	 // unbinds the enter key so when we press it wont send us to the beginning thing
	onDestroyEvent: function() {
		document.getElemenyById("input").style.visibility = "hidden";
		document.getElemenyById("register").style.visibility = "hidden";
	}
});
