
function MultipleSelectionDialogUI(parent, title, x, y, width, height, clickAccept, clickCancel)
{
	DialogUI.call(this, parent, title);
	
	this.contentUI.appendStaticText("Position");
	this.contentUI.appendLineBreak();
	this.xUI = new TextBoxUI(this.contentUI, {value: x.toPlainString(), class: "textBoxLeft"});
	this.yUI = new TextBoxUI(this.contentUI, {value: y.toPlainString(), class: "textBoxRight"});
	this.contentUI.appendLineBreak();
	this.contentUI.appendStaticText("Size");
	this.contentUI.appendLineBreak();
	this.widthUI = new TextBoxUI(this.contentUI, {value: width.toPlainString(), class: "textBoxLeft"});
	this.heightUI = new TextBoxUI(this.contentUI, {value: height.toPlainString(), class: "textBoxRight"});
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Accept", click: () => { clickAccept(parseFloat(this.xUI.element.value), parseFloat(this.yUI.element.value), parseFloat(this.widthUI.element.value), parseFloat(this.heightUI.element.value)); }});
	this.buttonCancelUI = new ButtonUI(this.buttonsUI, {innerText: "Cancel", click: () => { clickCancel(); }});
	
	this.element.style.width = "260px";
	this.element.style.minWidth = this.element.style.width;
	this.element.style.minHeight = this.element.clientHeight + "px";
	this.element.style.maxHeight = this.element.style.minHeight;
}

MultipleSelectionDialogUI.prototype = Object.create(DialogUI.prototype);
