// this class creates enemy player on the playscreen; spritewidth and spriteheight sets size of player.
game.EnemyCreep = me.Entity.extend({
// sets properties of enemy player 
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return(new me.Rect(0, 0 ,32, 64)).toPolygon();
			}
		}]);

		// sets health of player starting at 10
		this.health = game.data.enemyCreepHealth; 
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
		this.type = "EnemyCreep";

		// sets the animation of enemy player 
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	// makes player lose health
	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	update: function(){
		// makes player die
		if (this.health <= 0) {
			me.game.world.removeChild(this);
		}
		// Timer set to check collisons refreshes every single time
		this.now = new Date().getTime();

		// makes creeps move 
		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		// checks of creep is colliding with player
		me.collison.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;

	},

	collideHandler: function(response){
		if (response.b.type === 'PlayerBase') {
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
				response.b.loseHealth(game.data.enemyCreepAttack);
			}
		}
		else if (response.b.type === 'PlayerBase') {
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
				response.b.loseHealth(game.data.enemyCreepAttack); 
			}
		}
	}
	

});