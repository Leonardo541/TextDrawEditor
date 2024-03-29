
function ExportDialogUI(parent, title, exportType, clickAccept, clickCancel)
{
	DialogUI.call(this, parent, title);
	
	if(exportType == "json")
	{
		this.contentUI.appendStaticText("JSON Formatter");
		this.contentUI.appendLineBreak();
		this.callbackUI = new ListBoxUI(this.contentUI, {change: (e) => { this.changeOption(clickAccept); }});
		this.callbackUI.appendOption("Pretty JSON");
		this.callbackUI.appendOption("Minify JSON");
	}
	else if(exportType == "pawn")
	{
		this.contentUI.appendStaticText("Callback");
		this.contentUI.appendLineBreak();
		this.callbackUI = new ListBoxUI(this.contentUI, {change: (e) => { this.changeOption(clickAccept); }});
		this.callbackUI.appendOption("OnGameModeInit");
		this.callbackUI.appendOption("OnFilterScriptInit");
	}
	
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
	
	this.element.style.width = "260px";
	this.element.style.minWidth = this.element.style.width;
	this.element.style.minHeight = this.element.clientHeight + "px";
	this.element.style.maxHeight = this.element.style.minHeight;
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
		this.contentUI.element.style.display = "";
		
		this.element.style.width = "260px";
		this.element.style.height = "";
		this.element.style.minWidth = this.element.style.width;
		this.element.style.minHeight = "";
		this.element.style.maxHeight = "";
		
		if(this.viewOutputUI)
		{
			this.callbackUI.element.style.width = "";
			this.outputUI.element.style.width = "";
			
			if(this.viewOutputUI.element.nextSibling && this.viewOutputUI.element.nextSibling.entityUI)
				this.viewOutputUI.element.nextSibling.entityUI.remove();
			
			this.viewOutputUI.remove();
			this.viewOutputUI = null;
		}
		
		this.element.style.minHeight = this.element.clientHeight + "px";
		this.element.style.maxHeight = this.element.style.minHeight;
	}
	else
	{
		this.contentUI.element.style.display = "flex";
		
		this.element.style.width = "460px";
		this.element.style.height = "";
		this.element.style.minWidth = this.element.style.width;
		this.element.style.minHeight = "";
		this.element.style.maxHeight = "";
		
		if(!this.viewOutputUI)
		{
			this.viewOutputUI = new EntityUI(this.contentUI, "textarea", {});
			this.contentUI.appendStaticLine();
		}
		
		this.element.style.minHeight = this.element.clientHeight + "px";
		this.element.style.maxHeight = "";
		
		clickAccept(callback, output, false);
	}
	
	let newWidth = this.element.offsetWidth;
	let newHeight = this.element.offsetHeight;
	
	if(oldWidth != newWidth || oldHeight != newHeight)
		this.move(this.element.offsetLeft + (oldWidth - newWidth) / 2, this.element.offsetTop + (oldHeight - newHeight) / 2);
};
