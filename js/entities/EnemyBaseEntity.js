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
		this.health = game.data.enemyBaseHealth;
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
			game.data.win =true;
			this.renderable.setCurrentAnimation("broken");
		};

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){
		
	},

	loseHealth: function(){
		this.health--;
	}
});