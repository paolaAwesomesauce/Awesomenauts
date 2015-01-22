// this class creates player on the playscreen; spritewidth and spriteheight sets size of player.
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function(){
				// height and width size of rectangle where player is located
				return(new me.Rect(0,0,64,64)).toPolygon();	
			}
		}]);

		// sets were player is at 
		this.body.setVelocity(5, 20);
	},

	update: function(delta){
		if (me.input.isKeyPressed("right")) {
			// adds to the position of my x by velocity define above in setVelocity() and multiplying it by me.timertick: makes the movemnt look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		else{
			this.body.vel.x = 0;
		}

		// if dont update the player wont know what to do with code above
		this.body.update(delta);
		return true;
	}

});