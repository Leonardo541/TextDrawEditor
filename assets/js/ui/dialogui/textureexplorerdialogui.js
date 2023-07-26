
function TextureExplorerDialogUI(parent, title, textureDictionary, clickAccept, contextMenu)
{
	DialogUI.call(this, parent, title);
	
	this.contentUI.element.style.display = "flex";
	
	this.texListUI = new EntityUI(this.contentUI, "div", {class: "textureList"});
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
	
	this.element.style.width = "460px";
	this.element.style.minWidth = this.element.style.width;
	this.element.style.minHeight = this.element.clientHeight + "px";
}

TextureExplorerDialogUI.prototype = Object.create(DialogUI.prototype);
