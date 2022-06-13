
function CreateDialogUI(parent, title, text, x, y, clickAccept, clickCancel)
{
	DialogUI.call(this, parent, title);
	
	this.contentUI.appendStaticText("Text");
	this.contentUI.appendLineBreak();
	this.textUI = new TextBoxUI(this.contentUI, {value: text});
	this.contentUI.appendLineBreak();
	this.contentUI.appendStaticText("Position");
	this.contentUI.appendLineBreak();
	this.xUI = new TextBoxUI(this.contentUI, {value: x.toPlainString(), class: "textBoxLeft"});
	this.yUI = new TextBoxUI(this.contentUI, {value: y.toPlainString(), class: "textBoxRight"});
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Accept", click: () => { clickAccept(this.textUI.element.value, parseFloat(this.xUI.element.value), parseFloat(this.yUI.element.value)); }});
	this.buttonCancelUI = new ButtonUI(this.buttonsUI, {innerText: "Cancel", click: () => { clickCancel(); }});
}

CreateDialogUI.prototype = Object.create(DialogUI.prototype);
