
function TextBoxUI(parent, setting)
{
	EntityUI.call(this, parent, "input", setting);
	
	if(setting.type === undefined)
		this.element.type = "text";
}

TextBoxUI.prototype = Object.create(EntityUI.prototype);
