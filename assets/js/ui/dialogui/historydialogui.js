
function HistoryDialogUI(parent, title, history, historyIdx, keepHistory, clickAccept, clickHistory, contextMenu, keepHistoryChange)
{
	DialogUI.call(this, parent, title);
	
	this.historyListUI = new EntityUI(this.contentUI, "div", {class: ["textDrawList", "resizable"], contextmenu: (e) => { contextMenu(e.clientX, e.clientY); e.preventDefault(); }});
	
	this.keepHistoryLabelUI = new EntityUI(this.contentUI, "label", {});
	this.keepHistoryCheckboxUI = new TextBoxUI(this.keepHistoryLabelUI, {type: "checkbox", checked: (keepHistory ? "checked" : ""), change: (e) => { keepHistoryChange(e); }});
	this.keepHistoryLabelUI.appendStaticText("Keep history");
	
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Close", click: () => { clickAccept(); }});
	
	this.resizeObserver = new ResizeObserver(() => { this.sizeChanged(); });
	this.resizeObserver.observe(this.historyListUI.element);
	
	this.currentHistoryItemUI = null;
	this.lastHistoryItemUI = null;
	
	this.updateHistoryList(history, historyIdx, clickHistory);
}

HistoryDialogUI.prototype = Object.create(DialogUI.prototype);

HistoryDialogUI.prototype.sizeChanged = function()
{
	if(this.lastHistoryItemUI)
	{
		if(this.historyListUI.hasScrollBar())
		{
			if(!this.lastHistoryItemUI.element.classList.contains("lastTextDrawItem"))
				this.lastHistoryItemUI.element.classList.add("lastTextDrawItem");
		}
		else
		{
			if(this.lastHistoryItemUI.element.classList.contains("lastTextDrawItem"))
				this.lastHistoryItemUI.element.classList.remove("lastTextDrawItem");
		}
	}
};

HistoryDialogUI.prototype.updateHistoryList = function(history, historyIdx, clickHistory)
{
	let oldWidth = this.element.offsetWidth;
	let oldHeight = this.element.offsetHeight;
	
	this.historyListUI.element.innerHTML = "";
	
	let historyItemUI = null;
	let currentHistoryItemUI = null;
	
	for(let i = 0; i < history.length; i++)
	{
		let historyData = history[i];
		
		historyItemUI = new EntityUI(this.historyListUI, "div", {class: "textDrawItem", onclick: (e) => { clickHistory(historyData); this.updateStyles(e.currentTarget.entityUI); } });
		historyItemUI.appendStaticText(historyData.type.name);
		
		if(i == historyIdx)
		{
			historyItemUI.element.classList.add("currentTextDrawItem");
			currentHistoryItemUI = historyItemUI;
		}
		else if(i > historyIdx)
		{
			historyItemUI.element.firstChild.style.fontStyle = "italic";
			historyItemUI.element.firstChild.style.color = "#777777";
		}
	}
	
	if(this.historyListUI.hasScrollBar())
		historyItemUI.element.classList.add("lastTextDrawItem");
	
	if(currentHistoryItemUI)
		currentHistoryItemUI.element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
	
	this.currentHistoryItemUI = currentHistoryItemUI;
	this.lastHistoryItemUI = historyItemUI;
	
	let newWidth = this.element.offsetWidth;
	let newHeight = this.element.offsetHeight;
	
	if(oldWidth != newWidth || oldHeight != newHeight)
		this.move(this.element.offsetLeft + (oldWidth - newWidth) / 2, this.element.offsetTop + (oldHeight - newHeight) / 2);
};

HistoryDialogUI.prototype.updateStyles = function(historyItemUI)
{
	if(this.currentHistoryItemUI)
	{
		this.currentHistoryItemUI.element.classList.remove("currentTextDrawItem");
		
		let element = this.currentHistoryItemUI.element.nextSibling;
		
		while(element)
		{
			element.firstChild.style.fontStyle = "";
			element.firstChild.style.color = "";
			
			element = element.nextSibling
		}
	}
	
	if(historyItemUI)
	{
		historyItemUI.element.classList.add("currentTextDrawItem");
		
		let element = historyItemUI.element.nextSibling;
		
		while(element)
		{
			element.firstChild.style.fontStyle = "italic";
			element.firstChild.style.color = "#777777";
			
			element = element.nextSibling
		}
	}
	
	this.currentHistoryItemUI = historyItemUI;
};

HistoryDialogUI.prototype.remove = function()
{
	this.resizeObserver.disconnect();
	DialogUI.prototype.remove.call(this);
};
