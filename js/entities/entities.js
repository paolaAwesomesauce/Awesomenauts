// TODO
game.PlayerEntity.extend({
	init: function(x, y, settings){
		this_super(me.Entity, 'init', [x, y],
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function(){
				return(new me.Rect(0,0,64,64)).yoPolygon();	
			}
		}])
	},

	update: function(){

	}

})