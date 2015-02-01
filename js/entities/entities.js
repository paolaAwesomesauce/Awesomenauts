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

		//Keeps track of which direction your character is going
		this.facing = "right";

		// screen follows player everywhere(x and y axis)
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		// animation when standing
		// renderable is class melonJS has made for animation 
		this.renderable.addAnimation("idle", [78]);

		// animation when walking
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

		//animation for when player is attacking
		this.renderable.addAnimation("attack", [65, 66, 67,68, 69, 70, 71, 72], 80);

		// animation that player starts with
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
		if (me.input.isKeyPressed("right")) {
			this.facing = "left";
			// adds to the position of my x by velocity define above in setVelocity() and multiplying it by me.timertick: makes the movemnt look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			
			this.flipX(true);
		}
		else if (me.input.isKeyPressed("left")){
			this.facing = "left";
			// allows player to move left 
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(false);
		}
		else{
			this.body.vel.x = 0;
		}

		// if/else statment allows player to jump by checking if the space key is pressed and if player isnt already jumping or falling
		if (me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
			this.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		};

		// if/else stament adds animation for attack when attack key is pressed
		if (me.input.isKeyPressed("attack")) {
			//checks if animation has happen so it wont repeat again
			if (!this.renderable.isCurrentAnimation("attack")) {
				//Sets the current animation to attack and once that is over and goes back to idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				// Makes it so that the next time we start this sequence we begin from the first animation, not wherever we lfet off when we switched to another animation
				//this.renderable.setCurrentAnimationFrame();
			}
		}
		else if (this.body.vel.x !== 0) {
		// makes animation happend
			if (!this.renderable.isCurrentAnimation("walk")) {

				this.renderable.setCurrentAnimation("walk");
			}
		}
		else{
			this.renderable.setCurrentAnimation("idle");
		}
		if (me.input.isKeyPressed("attack")) {
			//checks if animation has happen so it wont repeat again
			if (!this.renderable.isCurrentAnimation("attack")) {
				//Sets the current animation to attack and once that is over and goes back to idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				// Makes it so that the next time we start this sequence we begin from the first animation, not wherever we lfet off when we switched to another animation
				this.renderable.setCurrentAnimationFrame();
			}
		}

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		// if dont update the player wont know what to do with code above
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	collideHandler: function(response){
		if (response.b.type === 'EnemyBaseEntity') {
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			//helps us not collided with the top, left, and right of the tower
			if (ydif<-40 && xdif<70 && xdif>-35) {
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			else if (xdif>-35 && this.facing==='right' && (xdif<0)) {
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}
			else if (xdif<70 && this.facing==='left' && xdif>0) {
				this.body.vel.x = 0;
				this.pos.x = this.pos.x +1;
			}
		};
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
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);

		// says tower hasnt been destroyed
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "PlayerBaseEntity";

		// animation for when tower has full health
		this.renderable.addAnimation("idle", [0]);

		//animation when tower is broken
		this.renderable.addAnimation("broken", [1]);

		// animation tower starts with
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
	// if statement checks our health and it is less than 0 we r declared dead 

		if (this.health<=0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
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
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);

		// says tower hasnt been destroyed
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";

		// animation for when tower has full health
		this.renderable.addAnimation("idle", [0]);

		//animation when tower is broken
		this.renderable.addAnimation("broken", [1]);

		// animation tower starts with
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
	// if statement checks our is less than 0 and if we r declared dead 
		if (this.health<=0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		};

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){
		
	}
});