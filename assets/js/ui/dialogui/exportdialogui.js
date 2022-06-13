
function ExportDialogUI(parent, title, clickAccept, clickCancel)
{
	DialogUI.call(this, parent, title);
	
	this.contentUI.appendStaticText("Callback");
	this.contentUI.appendLineBreak();
	this.callbackUI = new ListBoxUI(this.contentUI, {change: (e) => { this.changeOption(clickAccept); }});
	this.callbackUI.appendOption("OnGameModeInit");
	this.callbackUI.appendOption("OnFilterScriptInit");
	this.contentUI.appendLineBreak();
	this.contentUI.appendStaticText("Output");
	this.contentUI.appendLineBreak();
	this.outputUI = new ListBoxUI(this.contentUI, {change: (e) => { this.changeOption(clickAccept); }});
	this.outputUI.appendOption("Save output to a file");
	this.outputUI.appendOption("View output as text");
	this.contentUI.appendStaticLine();
	this.viewOutputUI = null;
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Accept", click: () => { clickAccept(this.callbackUI.element.selectedIndex, this.outputUI.element.selectedIndex, true); }});
	this.buttonCancelUI = new ButtonUI(this.buttonsUI, {innerText: "Cancel", click: () => { clickCancel(); }});
}

ExportDialogUI.prototype = Object.create(DialogUI.prototype);

ExportDialogUI.prototype.changeOption = function(clickAccept)
{
	let oldWidth = this.element.offsetWidth;
	let oldHeight = this.element.offsetHeight;
	
	let callback = this.callbackUI.element.selectedIndex;
	let output = this.outputUI.element.selectedIndex;
	
	if(output == 0)
	{
		if(this.viewOutputUI)
		{
			if(this.viewOutputUI.element.nextSibling && this.viewOutputUI.element.nextSibling.entityUI)
				this.viewOutputUI.element.nextSibling.entityUI.remove();
			
			this.viewOutputUI.remove();
			this.viewOutputUI = null;
		}
	}
	else
	{
		if(!this.viewOutputUI)
		{
			this.viewOutputUI = new EntityUI(this.contentUI, "textarea", {});
			this.contentUI.appendStaticLine();
		}
		
		clickAccept(callback, output, false);
	}
	
	let newWidth = this.element.offsetWidth;
	let newHeight = this.element.offsetHeight;
	
	if(oldWidth != newWidth || oldHeight != newHeight)
		this.move(this.element.offsetLeft + (oldWidth - newWidth) / 2, this.element.offsetTop + (oldHeight - newHeight) / 2);
};
