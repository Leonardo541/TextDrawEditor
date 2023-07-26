
function TextureDictionaryDialogUI(parent, title, clickAccept, clickExplorer)
{
	DialogUI.call(this, parent, title);
	
	this.contentUI.element.style.display = "flex";
	
	this.txdListUI = new EntityUI(this.contentUI, "div", {class: "textDrawList"});
	this.fileInputUI = new FileBoxUI(this.contentUI, {accept: ".txd", multiple: "multiple", onchange: (e) => { this.loadTxd(e);  }});
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Close", click: () => { clickAccept(); }});
	
	this.resizeObserver = new ResizeObserver(() => { this.sizeChanged(); });
	this.resizeObserver.observe(this.txdListUI.element);
	
	this.lastTxdItemUI = null;
	
	this.updateTxdListBind = this.updateTxdList.bind(this, clickExplorer);
	
	TextureDictionary.updateEventListeners.push(this.updateTxdListBind);
	
	this.updateTxdList(clickExplorer);
	
	this.element.style.width = "260px";
	this.element.style.minWidth = this.element.style.width;
	this.element.style.minHeight = this.element.clientHeight + "px";
}

TextureDictionaryDialogUI.prototype = Object.create(DialogUI.prototype);

TextureDictionaryDialogUI.prototype.sizeChanged = function()
{
	if(this.lastTxdItemUI)
	{
		if(this.txdListUI.hasScrollBar())
		{
			if(!this.lastTxdItemUI.element.classList.contains("lastTextDrawItem"))
				this.lastTxdItemUI.element.classList.add("lastTextDrawItem");
		}
		else
		{
			if(this.lastTxdItemUI.element.classList.contains("lastTextDrawItem"))
				this.lastTxdItemUI.element.classList.remove("lastTextDrawItem");
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

TextureDictionaryDialogUI.prototype.loadTxd = function(e)
{
	let files = e.target.files;
	
	for(let i = 0; i < files.length; i++)
	{
		if(files[i].name.toLowerCase().endsWith(".txd"))
		{
			let name = files[i].name.toLowerCase().slice(0, -4);
			
			if(TextureDictionary.instances.find(textureDictionary => textureDictionary.name == name))
			{
				alert(name + " is already loaded");
				continue;
			}
			
			let reader = new FileReader();
			
			reader.onload = (e) =>
			{
				if(e.target.readyState == FileReader.DONE)
					TextureDictionary.newInstance(name, new Uint8Array(e.target.result));
			};
			
			reader.readAsArrayBuffer(files[i]);
		}
		else
		{
			alert("not an .txd");
		}
	}
	
	this.fileInputUI.element.value = "";
};

TextureDictionaryDialogUI.prototype.updateTxdList = function(clickExplorer)
{
	let oldWidth = this.element.offsetWidth;
	let oldHeight = this.element.offsetHeight;
	
	this.txdListUI.element.innerHTML = "";
	
	let txdItemUI = null;
	
	for(let i = 0; i < TextureDictionary.instances.length; i++)
	{
		let textureDictionary = TextureDictionary.instances[i];
		
		txdItemUI = new EntityUI(this.txdListUI, "div", {class: "textDrawItem", onclick: () => { clickExplorer(textureDictionary); } });
		txdItemUI.appendStaticText(textureDictionary.name);
	}
	
	if(this.txdListUI.hasScrollBar())
		txdItemUI.element.classList.add("lastTextDrawItem");
	
	this.lastTxdItemUI = txdItemUI;
	
	let newWidth = this.element.offsetWidth;
	let newHeight = this.element.offsetHeight;
	
	if(oldWidth != newWidth || oldHeight != newHeight)
		this.move(this.element.offsetLeft + (oldWidth - newWidth) / 2, this.element.offsetTop + (oldHeight - newHeight) / 2);
};

TextureDictionaryDialogUI.prototype.remove = function()
{
	this.resizeObserver.disconnect();
	TextureDictionary.updateEventListeners.splice(TextureDictionary.updateEventListeners.indexOf(this.updateTxdListBind), 1);
	DialogUI.prototype.remove.call(this);
};
