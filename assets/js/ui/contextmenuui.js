
function ContextMenuUI(parent, x, y)
{
	EntityUI.call(this, parent, "div", {class: "contextMenu", contextmenu: (e) => { e.preventDefault(); }});
	
	this.element.style.left = x + "px";
	this.element.style.top = y + "px";
}

ContextMenuUI.prototype = Object.create(EntityUI.prototype);

ContextMenuUI.prototype.appendItem = function(text, click)
{
	let setting;
	
	if(click === false)
	{
		setting = {innerText: text, class: "contextItem"};
	}
	else if(click)
	{
		setting = {innerText: text, class: "contextItem", click: () => { click(); this.remove(); }};
	}
	else
	{
		setting = {innerText: text, class: ["contextItem", "contextItemDisabled"]};
	}
	
	return new EntityUI(this, "div", setting);
};

ContextMenuUI.prototype.getSubMenuList = function(text, subMenuUI)
{
	let subMenuList = [];
	
	for(let i = 0; i < this.element.childNodes.length; i++)
	{
		let element = this.element.childNodes[i].querySelector(":scope > .contextMenu");
		
		if(element && element.entityUI)
			subMenuList.push(element.entityUI);
	}
	
	return subMenuList;
};

ContextMenuUI.prototype.updateSubMenuPosition = function()
{
	let subMenuList = this.getSubMenuList();
	let subMenuPosX = 0;
	let subMenuPosY = -(this.element.clientTop + this.element.firstChild.offsetTop);
	
	for(let i = 0; i < subMenuList.length; i++)
	{
		if(subMenuList[i].element.parentNode.clientWidth > subMenuPosX)
			subMenuPosX = subMenuList[i].element.parentNode.clientWidth;
	}
	
	for(let i = 0; i < subMenuList.length; i++)
	{
		subMenuList[i].element.style.left = subMenuPosX + "px";
		subMenuList[i].element.style.top = subMenuPosY + "px";
		subMenuList[i].updateSubMenuPosition();
	}
};

ContextMenuUI.prototype.remove = function()
{
	if(this.element.parentNode && this.element.parentNode.entityUI && this.element.parentNode.entityUI instanceof EntityUI)
	{
		let contextItemUI = this.element.parentNode.entityUI;
		
		if(contextItemUI.element.parentNode && contextItemUI.element.parentNode.entityUI && contextItemUI.element.parentNode.entityUI instanceof ContextMenuUI)
		{
			contextItemUI.element.parentNode.entityUI.remove();
			return;
		}
	}
	
	EntityUI.prototype.remove.call(this);
};

ContextMenuUI.prototype.isInBoundingClientRect = function(x, y)
{
	if(EntityUI.prototype.isInBoundingClientRect.call(this, x, y))
		return true;
	
	let subMenuList = this.getSubMenuList();
	
	for(let i = 0; i < subMenuList.length; i++)
	{
		if(EntityUI.prototype.isInBoundingClientRect.call(subMenuList[i], x, y))
			return true;
	}
	
	return false;
};
