
function TextureManager()
{
	this.lastTxdName = "";
	this.lastTexture = {name: "", imageUI: null};
}

TextureManager.prototype.loadTexture = function(name)
{
	let txdAndTexName = name.toLowerCase().split(":", 2);
	
	if(txdAndTexName.length == 2)
	{
		let txdName = txdAndTexName[0];
		let texName = txdAndTexName[1];
		
		if(this.lastTxdName == txdName && this.lastTexture.name == texName)
			return this.lastTexture.imageUI;
		
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
						
						return texture.imageUI;
					}
				}
			}
		}
	}
	
	return null;
};

TextureManager.instance = new TextureManager();
