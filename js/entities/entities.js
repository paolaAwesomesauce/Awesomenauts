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

		// animation when standing
		this.renderable.addAnimation("idle", [78]);

		// animation when walking
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

		// animation that player starts with
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
		if (me.input.isKeyPressed("right")) {
			// adds to the position of my x by velocity define above in setVelocity() and multiplying it by me.timertick: makes the movemnt look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			
			this.flipX(true);
		}
		else{
			this.body.vel.x = 0;
		}

		if (this.body.vel.x !== 0) {
		// makes animation happend
			if (!this.renderable.isCurrentAnimation("walk")) {

				this.renderable.setCurrentAnimation("walk");
			}
		}
		else{
			this.renderable.setCurrentAnimation("idle");
		}
		// if dont update the player wont know what to do with code above
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	}

});

// this class creates our PlayerBaseEntity ,which is the tower, on the playscreen; 
game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);

		// says tower hasnt been destroyed
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBaseEntity";
	},

	update: function(){
	// if statement checks our health and it is less than 0 we r declared dead 

		if (this.health<=0) {
			this.broken = true;
		};

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	}
});


// this class creates our EnemyBaseEntity, which is our enemys tower, on the playscreen; 
game.EnemyBaseEntity = me.Entity.extend({
	init : function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);

		// says tower hasnt been destroyed
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";
	},

	update: function(){
	// if statement checks our is less than 0 and if we r declared dead 
		if (this.health<=0) {
			this.broken = true;
		};

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){
		
	}
});