
function DrawableUI(parent, setting)
{
	EntityUI.call(this, parent, "canvas", setting);
	
	this.context = this.element.getContext("2d");
}

DrawableUI.prototype = Object.create(EntityUI.prototype);
