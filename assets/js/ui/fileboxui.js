
function FileBoxUI(parent, setting)
{
	EntityUI.call(this, parent, "input", setting);
	
	if(setting.type === undefined)
		this.element.type = "file";
}

FileBoxUI.prototype = Object.create(EntityUI.prototype);
