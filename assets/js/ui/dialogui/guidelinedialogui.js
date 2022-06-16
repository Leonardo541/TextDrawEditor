
function GuideLineDialogUI(parent, title, x, y, size, padding, style, clickAccept, clickCancel)
{
	DialogUI.call(this, parent, title);
	
	this.contentUI.appendStaticText("Position");
	this.contentUI.appendLineBreak();
	this.xUI = new TextBoxUI(this.contentUI, {value: x.toPlainString(), class: "textBoxLeft"});
	this.yUI = new TextBoxUI(this.contentUI, {value: y.toPlainString(), class: "textBoxRight"});
	this.contentUI.appendLineBreak();
	this.contentUI.appendStaticText("Size");
	this.contentUI.appendLineBreak();
	this.sizeUI = new TextBoxUI(this.contentUI, {value: size.toPlainString()});
	this.contentUI.appendLineBreak();
	this.contentUI.appendStaticText("Padding");
	this.contentUI.appendLineBreak();
	this.paddingUI = new TextBoxUI(this.contentUI, {value: padding.toPlainString()});
	this.contentUI.appendLineBreak();
	this.contentUI.appendStaticText("Style");
	this.contentUI.appendLineBreak();
	this.styleUI = new ListBoxUI(this.contentUI, {});
	this.styleUI.appendOption("Horizontal");
	this.styleUI.appendOption("Vertical");
	this.styleUI.element.selectedIndex = style;
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Accept", click: () => { clickAccept(parseFloat(this.xUI.element.value), parseFloat(this.yUI.element.value), parseFloat(this.sizeUI.element.value), parseFloat(this.paddingUI.element.value), this.styleUI.element.selectedIndex); }});
	this.buttonCancelUI = new ButtonUI(this.buttonsUI, {innerText: "Cancel", click: () => { clickCancel(); }});
}

GuideLineDialogUI.prototype = Object.create(DialogUI.prototype);
