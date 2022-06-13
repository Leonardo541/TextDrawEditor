
function ListBoxUI(parent, setting)
{
	EntityUI.call(this, parent, "select", setting);
}

ListBoxUI.prototype = Object.create(EntityUI.prototype);

ListBoxUI.prototype.appendOption = function(text)
{
	return new EntityUI(this, "option", {innerText: text});
}
