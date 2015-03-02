// this class creates player on the playscreen; spritewidth and spriteheight sets size of player.
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings){
		this.setSuper(x, y);
		this.setPlayerTimers();
		this.setAttributes();

		this.type = "PlayerEntity";

		this.setFlags();

		// screen follows player everywhere(x and y axis)
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.addAnimation();

		// animation that player starts with
		this.renderable.setCurrentAnimation("idle");
	},

	// has most of init function
	setSuper: function(x, y){
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
	},

	// Fuction holds all of our timers
	setPlayerTimers: function(){
		// variables that help us tell when the last attack on base happend 
		this.now = new Date().getTime();
		this.lastHit = this.now;

		// havent used this
		this.lastAttack = new Date().getTime(); 
	},

	// function holds things we editited from player
	setAttributes: function(){
		// sets health of player
		this.health = game.data.playerHealth;

		// sets were player is at 
		this.body.setVelocity(game.data.playerMoveSpeed, 20)

		this.attack = game.data.playerAttack;
	},

	// function hold different animations 
	addAnimation: function(){
		// animation when standing
		// renderable is class melonJS has made for animation 
		this.renderable.addAnimation("idle", [78]);

		// animation when walking
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

		//animation for when player is attacking
		this.renderable.addAnimation("attack", [65, 66, 67,68, 69, 70, 71, 72], 80);
	},

	setFlags: function(){
		//Keeps track of which direction your character is going
		this.facing = "right";

		this.dead = false;
		this.attacking = false;
	},

	update: function(delta){
		// keeps our timer up to date
		this.now = new Date().getTime();
		this.dead = this.checkIfDead();

		this.checkKeyPressesAndMove();

		this.setAnimation();

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	checkIfDead: function(){
		// kills the player 
		if (this.health <= 0) {
			return  true;
		}
		return false;
	},

	checkKeyPressesAndMove: function(){
		if (me.input.isKeyPressed("right")) {
			this.moveRight();
		}
		else if (me.input.isKeyPressed("left")){
			this.moveLeft();
		}
		else{
			this.body.vel.x = 0;
		}

		// if/else statment allows player to jump by checking if the space key is pressed and if player isnt already jumping or falling
		if (me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
			this.jump();
		}

		this.attacking = me.input.isKeyPressed("attack");

	},	

	moveRight: function(){
		this.facing = "left";
		// adds to the position of my x by velocity define above in setVelocity() and multiplying it by me.timertick: makes the movemnt look smooth
		this.body.vel.x += this.body.accel.x * me.timer.tick;
			
		this.flipX(true);
	},

	moveLeft: function(){
		this.facing = "left";
		// allows player to move left 
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		this.flipX(false);
	},	

	jump: function(){
		this.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
		me.audio.play("stomp");
	},	

	setAnimation: function(){
			// if/else stament adds animation for attack when attack key is pressed
		if (this.attacking) {
			//checks if animation has happen so it wont repeat again
			if (!this.renderable.isCurrentAnimation("attack")) {
				//Sets the current animation to attack and once that is over and goes back to idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				// Makes it so that the next time we start this sequence we begin from the first animation, not wherever we lfet off when we switched to another animation
				//this.renderable.setCurrentAnimationFrame();
				me.audio.play("jump");

			}
		}
		else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
		// makes animation happend
			if (!this.renderable.isCurrentAnimation("walk")) {

				this.renderable.setCurrentAnimation("walk");
			}
		}
		else if (!this.renderable.isCurrentAnimation("attack")){
			this.renderable.setCurrentAnimation("idle");
		}
	},
	// function makes player lose health
	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	collideHandler: function(response){
		if (response.b.type === 'EnemyBaseEntity') {
			this.collideWithEnemyBase(response);
		}
		else if (response.b.type === 'EnemyCreep') {
			this.collideWithEnemyCreep(response);
		}
	},

	collideWithEnemyBase: function(response){
		var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			//helps us not collided with the top, left, and right of the tower
			if (ydif<-40 && xdif<70 && xdif>-35) {
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			else if (xdif>-35 && this.facing==='right' && (xdif<0)) {
				this.body.vel.x = 0;
				// this.pos.x = this.pos.x -1;
			}
			else if (xdif<70 && this.facing==='left' && xdif>0) {
				this.body.vel.x = 0;
				// this.pos.x = this.pos.x +1;
			}

			// after 1000 miliseconds sets last hit to now and tower loses health
			if (this.renderable.isCurrentAnimation("attack")
				&& this.now-this.lastHit >= game.data.playerAttackTimer) {
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}
	},

	collideWithEnemyCreep: function(response){
		var xdif = this.pos.x - response.b.pos.x;
		var ydif = this.pos.y - response.b.pos.y;

		this.stopMovement(xdif);
		if(this.checkAttack(xdif, ydif)){
			this.hitCreep(response);
		}
	},

	stopMovement: function(xdif){
		if (xdif>0) {
				// this.pos.x = this.pos.x + 1;
				if (this.facing === "left") {
					this.body.vel.x = 0;
				}
			}
			else{
				// this.pos.x = this.pos.x - 1;
				if (this.facing === "right") {
					this.vel.x = 0;
				}
			}
	},

	checkAttack: function(xdif, ydif, response){
		if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer && (Math.abs(ydif) <= 40) && ((xdif>0) && this.facing === "left") || ((xdif<0) && this.facing === "right")) {
				this.lastHit = this.now;
				// code in function above will happen only if it is returned true 
				return true;
			}
			return false;
	},

	hitCreep: function(response){
		// if the creeps health is less than our attack code in if statement
				if (response.b.loseHealth  <= game.data.playerAttack) {
					// adds one gold per creep kill
					game.data.gold += 1;
				}

				response.b.loseHealth(game.data.playerAttack);
	}

});

game.Player2 = me.Entity.extend({
// sets properties of enemy player 
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "Player2",
			width: 100,
			height: 85,
			spritewidth: "100",
			spriteheight: "85",
			getShape: function(){
				return(new me.Rect(0, 0 ,100, 85)).toPolygon();
			}
		}]);

		// sets health of player starting at 10
		this.health = 10; 
		// always keeps the enemy player updated
		this.alwaysUpdate = true;

		// this.attacking lets us know if thge enemy is currently attacking
		this.attacking = false;

		// keeps track of when our creep last attacked anything
		this.lastAttacking = new Date().getTime();

		// keeps track of the ;ast time our creep hit anything
		this.lastHit = new Date().getTime();

		// timer
		this.new = new Date().getTime();

		// sets were player is located 
		this.body.setVelocity(3, 20);

		// sets type of player
		this.type = "Player2";

		// sets the animation of enemy player 
		this.renderable.addAnimation("walk", [0, 1, 2, 3, 4], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	update: function(delta){
		// Timer set to check collisons refreshes every single time
		this.now = new Date().getTime();

		// makes creeps move 
		this.body.vel.x += this.body.accel.x * me.timer.tick;

		// checks of creep is colliding with player
		//me.collison.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;

	},

	collideHandler: function(response){
		if (response.b.type === 'EnemyBase') {
			this.attacking = true;
			// this.lastAttacking = this.now;
			this.body.vel.x = 0;
			// keeps creep moving to the right to maintain its position
			this.pos.x = this.pos.x + 1;
			// checks that it has been at least 1 second since this creep hit a base
			if ((this.now-this.lastHit >= 1000)) {
				// updates the lasthit timer
				this.lastHit = this.now;
				// makes the player base call its loseHealth function and passes at a damge of 1
				response.b.loseHealth(1);
			}
		}
		else if (response.b.type === 'EnemyCreep') {
			var xdif = this.pos.x - response.b.pos.x;

			this.attacking = true;

			// this.lastAttacking = this.now;

			if (xdif>0) {
			// Kepps moving the creep to the right to maintain its position
				this.pos.x = this.pos.x + 1;
				this.body.vel.x = 0;
			}
			// checks that it has been less then 1 second since it hit somehting
			if ((this.now-this.lastHit >= 1000) && xdif>0) {
				// updates the last hit time
				this.lastHit = this.now;
				// makes the player call its lose health function and passes it as a damage of one 
				response.b.loseHealth(1); 
			}
		}
	}
	

});


