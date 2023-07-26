
function GuideGridDialogUI(parent, title, x, y, width, height, margin, padding, rows, columns, clickAccept, clickCancel)
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
	this.contentUI.appendLineBreak();
	this.contentUI.appendStaticText("Margin / Padding");
	this.contentUI.appendLineBreak();
	this.marginUI = new TextBoxUI(this.contentUI, {value: margin.toPlainString(), class: "textBoxLeft"});
	this.paddingUI = new TextBoxUI(this.contentUI, {value: padding.toPlainString(), class: "textBoxRight"});
	this.contentUI.appendLineBreak();
	this.contentUI.appendStaticText("Rows / Columns");
	this.contentUI.appendLineBreak();
	this.rowsUI = new TextBoxUI(this.contentUI, {value: rows.toString(), class: "textBoxLeft"});
	this.columnsUI = new TextBoxUI(this.contentUI, {value: columns.toString(), class: "textBoxRight"});
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Accept", click: () => { clickAccept(parseFloat(this.xUI.element.value), parseFloat(this.yUI.element.value), parseFloat(this.widthUI.element.value), parseFloat(this.heightUI.element.value), parseFloat(this.marginUI.element.value), parseFloat(this.paddingUI.element.value), parseInt(this.rowsUI.element.value), parseInt(this.columnsUI.element.value)); }});
	this.buttonCancelUI = new ButtonUI(this.buttonsUI, {innerText: "Cancel", click: () => { clickCancel(); }});
	
	this.element.style.width = "260px";
	this.element.style.minWidth = this.element.style.width;
	this.element.style.minHeight = this.element.clientHeight + "px";
	this.element.style.maxHeight = this.element.style.minHeight;
}

GuideGridDialogUI.prototype = Object.create(DialogUI.prototype);
