game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 561,
			height: 316,
			spritewidth: "561",
			spriteheight: "316",
			getShape: function(){
				return (new me.Rect(0, 0, 561, 316)).toPolygon();
			}
		}]);
		this.floating = true;
	}
})