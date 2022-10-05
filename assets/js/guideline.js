
function GuideLine(main, name, x, y, size, padding, style)
{
	this.main = main;
	
	this.textDrawItemUI = new EntityUI(null, "div", {class: "textDrawItem", onclick: (e) => { if(e.shiftKey) { main.adjacentAnyObject(this, e.ctrlKey); } else if(e.ctrlKey) { main.toggleAnyObject(this); } else { main.changeGuideLine(this); } }, contextmenu: (e) => { main.contextMenuGuideLine(this, e.clientX, e.clientY); e.preventDefault(); }});
	this.thumbnailUI = new EntityUI(this.textDrawItemUI, "img", { src: "./assets/images/icon-guide-line.png", width: "24", height: "24", draggable: false });
	this.nameUI = new EntityUI(this.textDrawItemUI, "span", {innerText: name});
	
	this.name = name;
	this.x = x;
	this.y = y;
	this.size = size;
	this.padding = padding;
	this.style = style;
}

GuideLine.prototype.copyGuideLine = function(guideLine)
{
	guideLine.name = this.name;
	guideLine.x = this.x;
	guideLine.y = this.y;
	guideLine.size = this.size;
	guideLine.padding = this.padding;
	guideLine.style = this.style;
};

GuideLine.prototype.offsetRect = function(offsetX, offsetY)
{
	this.x += offsetX;
	this.y += offsetY;
};

GuideLine.prototype.setRectLeft = function(rectLeft)
{
	if(this.style == 0)
		this.size = this.getRectRight() - rectLeft;
	
	this.x = rectLeft;
};

GuideLine.prototype.setRectTop = function(rectTop)
{
	if(this.style == 1)
		this.size = this.getRectBottom() - rectTop;
	
	this.y = rectTop;
};

GuideLine.prototype.setRectRight = function(rectRight)
{
	if(this.style == 0)
		this.size = rectRight - this.x;
};

GuideLine.prototype.setRectBottom = function(rectBottom)
{
	if(this.style == 1)
		this.size = rectBottom - this.y;
};

GuideLine.prototype.getRectLeft = function()
{
	return this.x;
};

GuideLine.prototype.getRectTop = function()
{
	return this.y;
};

GuideLine.prototype.getRectRight = function()
{
	if(this.style == 0)
		return this.x + this.size;
	
	return this.x;
};

GuideLine.prototype.getRectBottom = function()
{
	if(this.style == 1)
		return this.y + this.size;
	
	return this.y;
};
