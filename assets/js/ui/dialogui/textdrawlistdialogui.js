
function TextDrawListDialogUI(parent, title, textDrawListUI, clickAccept)
{
	DialogUI.call(this, parent, title);
	
	this.contentUI.element.style.display = "flex";
	this.contentUI.element.appendChild(textDrawListUI.element);
	
	this.textDrawListUI = textDrawListUI;
	
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Close", click: () => { clickAccept(); }});
	
	this.resizeObserver = new ResizeObserver(() => { this.sizeChanged(); });
	this.resizeObserver.observe(textDrawListUI.element);
	
	this.element.style.width = "260px";
	this.element.style.minWidth = this.element.style.width;
	this.element.style.minHeight = this.element.clientHeight + "px";
}

TextDrawListDialogUI.prototype = Object.create(DialogUI.prototype);

TextDrawListDialogUI.prototype.sizeChanged = function()
{
	if(this.textDrawListUI.lastTextDrawItemUI)
	{
		if(this.textDrawListUI.hasScrollBar())
		{
			if(!this.textDrawListUI.lastTextDrawItemUI.element.classList.contains("lastTextDrawItem"))
				this.textDrawListUI.lastTextDrawItemUI.element.classList.add("lastTextDrawItem");
		}
		else
		{
			if(this.textDrawListUI.lastTextDrawItemUI.element.classList.contains("lastTextDrawItem"))
				this.textDrawListUI.lastTextDrawItemUI.element.classList.remove("lastTextDrawItem");
		}
	}
	
	if(this.position.width != this.element.clientWidth || this.position.height != this.element.clientHeight)
	{
		this.position.width = this.element.clientWidth;
		this.position.height = this.element.clientHeight;
		
		clearTimeout(this.saveSettingsTimeoutId);
		this.saveSettingsTimeoutId = setTimeout(() => main.saveSettings(), 200);
	}
};

TextDrawListDialogUI.prototype.remove = function()
{
	this.resizeObserver.disconnect();
	DialogUI.prototype.remove.call(this);
};
