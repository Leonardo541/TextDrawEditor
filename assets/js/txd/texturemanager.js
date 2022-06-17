
function TextureManager()
{
	this.lastTxdName = "";
	this.lastTexture = {name: "", imageUI: null};
	this.lastColor = 0;
	
	this.colorUI = null;
}

TextureManager.prototype.loadTexture = function(name, color)
{
	let txdAndTexName = name.toLowerCase().split(":", 2);
	
	if(txdAndTexName.length == 2)
	{
		let txdName = txdAndTexName[0];
		let texName = txdAndTexName[1];
		
		if(this.lastTxdName == txdName && this.lastTexture.name == texName)
		{
			if(color != 0xFFFFFFFF)
			{
				if(this.lastColor != color)
				{
					this.lastColor = color;
					this.setColor(color);
				}
				
				return this.colorUI;
			}
			
			return this.lastTexture.imageUI;
		}
		
		for(let i = 0; i < TextureDictionary.instances.length; i++)
		{
			let textureDictionary = TextureDictionary.instances[i];
			
			if(textureDictionary.name == txdName)
			{
				for(let j = 0; j < textureDictionary.textures.length; j++)
				{
					let texture = textureDictionary.textures[j];
					
					if(texture.name == texName)
					{
						this.lastTxdName = txdName;
						this.lastTexture = texture;
						this.lastColor = color;
						
						if(color != 0xFFFFFFFF)
						{
							this.setColor(color);
							return this.colorUI;
						}
						
						return texture.imageUI;
					}
				}
			}
		}
	}
	
	return null;
};

TextureManager.prototype.setColor = function(color)
{
	let width = this.lastTexture.imageUI.element.width;
	let height = this.lastTexture.imageUI.element.height;
	
	if(!this.colorUI)
	{
		this.colorUI = new DrawableUI(null, {width: width, height: height});
	}
	else if(this.colorUI.element.width != width || this.colorUI.element.height != height)
	{
		this.colorUI.element.width = width;
		this.colorUI.element.height = height;
	}
	
	this.colorUI.context.clearRect(0, 0, width, height);
	this.colorUI.context.globalCompositeOperation = "copy";
	this.colorUI.context.drawImage(this.lastTexture.imageUI.element, 0, 0, width, height, 0, 0, width, height);
	this.colorUI.context.globalCompositeOperation = "multiply";
	this.colorUI.context.fillStyle = color.toRGB();
	this.colorUI.context.fillRect(0, 0, width, height);
	this.colorUI.context.globalCompositeOperation = "destination-atop";
	this.colorUI.context.globalAlpha = color.getAlpha();
	this.colorUI.context.drawImage(this.lastTexture.imageUI.element, 0, 0, width, height, 0, 0, width, height);
	this.colorUI.context.globalAlpha = 1;
};

TextureManager.instance = new TextureManager();
