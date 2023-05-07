
function ResizerUI(parent, minY)
{
	EntityUI.call(this, parent, "div", {class: "resizer", mousedown: (e) => { this.startResizing(e); }});
	
	this.resizing = false;
	this.resizingY = 0;
	
	this.minY = minY;
	
	this.appendStaticLine();
}

ResizerUI.prototype = Object.create(EntityUI.prototype);

ResizerUI.prototype.startResizing = function(e)
{
	main.overrideCursor(true);
	
	document.body.style.cursor = "row-resize";
	document.body.style.userSelect = "none";
	
	this.resizing = true;
	this.resizingY = (this.element.getBoundingClientRect().top - this.element.previousSibling.getBoundingClientRect().height) + this.element.getBoundingClientRect().height / 2;
};

ResizerUI.prototype.stopResizing = function(e)
{
	main.overrideCursor(false);
	
	document.body.style.cursor = "";
	document.body.style.userSelect = "";
	
	this.resizing = false;
	this.resizingY = 0;
};

ResizerUI.prototype.resize = function(y)
{
	if(y < this.minY)
	{
		y = this.minY;
	}
	
	this.element.previousSibling.style.height = y + "px";
};
