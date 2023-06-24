
function TextureExplorerDialogUI(parent, title, textureDictionary, clickAccept, contextMenu)
{
	DialogUI.call(this, parent, title);
	
	this.texListUI = new EntityUI(this.contentUI, "div", {class: ["textureList", "resizable"]});
	this.infoUI = new EntityUI(this.contentUI, "span", {innerHTML: "&#9432; Press the right button on the mouse to copy."});
	
	for(let i = 0; i < textureDictionary.textures.length; i++)
	{
		let texture = textureDictionary.textures[i];
		let txdAndTexName = textureDictionary.name + ":" + texture.name;
		
		let texItemUI = new EntityUI(this.texListUI, "div", {class: "textureItem", title: txdAndTexName, contextmenu: (e) => { contextMenu(txdAndTexName, e.clientX, e.clientY); e.preventDefault(); }});
		
		textureDictionary.textures[i].imageUI.element.toBlob((blob) => { new EntityUI(texItemUI, "img", {src: URL.createObjectURL(blob), width: 64, height: 64}); });
	}
	
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Close", click: () => { clickAccept(); }});
	
	this.textureDictionary = textureDictionary;
	
	this.resizeObserver = new ResizeObserver(() => { this.sizeChanged(); });
	this.resizeObserver.observe(this.texListUI.element);
}

TextureExplorerDialogUI.prototype = Object.create(DialogUI.prototype);

TextureExplorerDialogUI.prototype.sizeChanged = function()
{
	this.infoUI.element.style.display = "inline-block";
	this.infoUI.element.style.width = this.texListUI.element.offsetWidth + "px";
};

TextureExplorerDialogUI.prototype.remove = function()
{
	this.resizeObserver.disconnect();
	DialogUI.prototype.remove.call(this);
};
