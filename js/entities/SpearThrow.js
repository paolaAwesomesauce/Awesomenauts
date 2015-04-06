game.SpearThrow = me.Entity.extend({
	init: function(x, y, settings, facing){
		this._super(me.Entity, "init", [x, y, {
			image: "spear",
			width: 48,
			height: 48,
			spritewidth: "48",
			spriteheight: "48",
			getShape: function(){
				return(new me.Rect(0, 0 , 48, 48)).toPolygon();
			}
		}]);

		// sets health of player starting at 10
		this.health = game.data.enemyCreepHealth; 
		// always keeps the enemy player updated
		this.alwaysUpdate = true;
		this.attack = game.data.ability3*3;
		// sets were player is located 
		this.body.setVelocity(8, 0);

		// sets type of player
		this.type = "spear";

		this.facing = facing;
	},

	update: function(delta){
		if (this.facing === "left") {
		// makes creeps move 
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		}else{
			// makes creeps move 
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		// checks of creep is colliding with player
		me.collison.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;

	},

	collideHandler: function(response){
		if (response.b.type === 'EnemyBase' || response.b.type==='EnemyCreep') {
				// makes the player base call its loseHealth function and passes at a damge of 1
				response.b.loseHealth(this.attack);

				me.game.world.removeChild(this);
			}
})