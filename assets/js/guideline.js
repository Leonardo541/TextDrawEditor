
function GuideLine(main, internalId, name, x, y, size, padding, style)
{
	this.main = main;
	this.internalId = internalId;
	
	this.textDrawItemUI = new EntityUI(null, "div", {class: "textDrawItem", onclick: (e) => { if(e.shiftKey) { main.adjacentAnyObject(this, e.ctrlKey); } else if(e.ctrlKey) { main.toggleAnyObject(this); } else { main.changeGuideLine(this); } }, contextmenu: (e) => { main.contextMenuGuideLine(this, e.clientX, e.clientY); e.preventDefault(); }});
	this.thumbnailUI = new EntityUI(this.textDrawItemUI, "img", { src: "./assets/images/icon-guide-line.png", width: "24", height: "24", draggable: false });
	this.nameUI = new EntityUI(this.textDrawItemUI, "span", {innerText: name});
	this.visibilityUI = new EntityUI(this.textDrawItemUI, "div", {class: "visibility", onclick: (e) => { main.visibilityAnyObject(this); e.stopPropagation(); }});
	
	this.name = name;
	this.x = x;
	this.y = y;
	this.size = size;
	this.padding = padding;
	this.style = style;
	
	this.visibility = true;
}

GuideLine.prototype.copyGuideLine = function(guideLine)
{
	guideLine.internalId = this.internalId;
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

GuideLine.prototype.setVisibility = function(visibility)
{
	this.visibility = visibility;
	this.visibilityUI.element.style.backgroundPositionY = visibility ? "0px" : "-24px";
};

GuideLine.prototype.getMyIndex = function(project)
{
	return project.guideLines.indexOf(this);
};

GuideLine.prototype.historyGuideLineCreate = function(project, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue")
	{
		project.removeGuideLine(this);
	}
	else if(funcname == "updateOldValue")
	{
		return [];
	}
	else if(funcname == "updateNewValue")
	{
		return [this.x, this.y, this.size, this.padding, this.style];
	}
};

GuideLine.prototype.historyGuideLineRemove = function(project, funcname, oldValue, newValue)
{
	if(funcname == "applyNewValue")
	{
		project.removeGuideLine(this);
	}
	else if(funcname == "updateOldValue")
	{
		return [this.name, this.x, this.y, this.size, this.padding, this.style, this.visibility, this.getMyIndex(project)];
	}
	else if(funcname == "updateNewValue")
	{
		return [];
	}
};

GuideLine.prototype.historyVisibility = function(project, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue" || funcname == "applyNewValue")
	{
		this.setVisibility(newValue);
	}
	else if(funcname == "updateOldValue" || funcname == "updateNewValue")
	{
		return this.visibility;
	}
};
