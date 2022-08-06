
function TextureDictionaryDialogUI(parent, title, clickAccept, clickExplorer)
{
	DialogUI.call(this, parent, title);
	
	this.txdListUI = new EntityUI(this.contentUI, "div", {class: ["textDrawList", "resizable"]});
	this.fileInputUI = new FileBoxUI(this.contentUI, {accept: ".txd", multiple: "multiple", onchange: (e) => { this.loadTxd(e);  }});
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Accept", click: () => { clickAccept(); }});
	
	this.resizeObserver = new ResizeObserver(() => { this.sizeChanged(); });
	this.resizeObserver.observe(this.txdListUI.element);
	
	this.updateTxdListBind = this.updateTxdList.bind(this, clickExplorer);
	
	TextureDictionary.updateEventListeners.push(this.updateTxdListBind);
	
	this.updateTxdList(clickExplorer);
}

TextureDictionaryDialogUI.prototype = Object.create(DialogUI.prototype);

TextureDictionaryDialogUI.prototype.sizeChanged = function()
{
	this.fileInputUI.element.style.width = this.txdListUI.element.offsetWidth + "px";
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
