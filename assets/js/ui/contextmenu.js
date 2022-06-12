
function ContextMenuUI(parent, x, y)
{
	EntityUI.call(this, parent, "div", {id: "contextMenu"});
	
	this.element.style.left = x + "px";
	this.element.style.top = y + "px";
}

ContextMenuUI.prototype = Object.create(EntityUI.prototype);

ContextMenuUI.prototype.appendItem = function(text, click)
{
	let setting;
	
	if(click)
	{
		setting = {innerText: text, class: "contextItem", click: () => { click(); this.remove(); }};
	}
	else
	{
		setting = {innerText: text, class: ["contextItem", "contextItemDisabled"]};
	}
	
	return new EntityUI(this, "div", setting);
}
