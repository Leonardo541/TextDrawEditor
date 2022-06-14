
function TextureDictionary(name, bytes)
{
	this.name = name;
	this.textures = []
	
	this.processTxd(bytes);
}

TextureDictionary.prototype.processTxd = function(bytes)
{
	let id = bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24);
	let size = bytes[4] | (bytes[5] << 8) | (bytes[6] << 16) | (bytes[7] << 24);
	
	switch(id)
	{
		case 0x16:
			this.processTxdFile(bytes, 12, 12 + size);
			break;
	}
};

TextureDictionary.prototype.processTxdFile = function(bytes, pos, end)
{
	while(pos < end)
	{
		let id = bytes[pos + 0] | (bytes[pos + 1] << 8) | (bytes[pos + 2] << 16) | (bytes[pos + 3] << 24);
		let size = bytes[pos + 4] | (bytes[pos + 5] << 8) | (bytes[pos + 6] << 16) | (bytes[pos + 7] << 24);
		
		switch(id)
		{
			case 0x01:
				this.processTxdInfo(bytes, pos + 12, pos + 12 + size);
				break;
			
			case 0x15:
				this.processTxdTexture(bytes, pos + 12, pos + 12 + size);
				break;
		}
		
		pos += size + 12;
	}
};

TextureDictionary.prototype.processTxdInfo = function(bytes, pos, end)
{
	
};

TextureDictionary.prototype.processTxdTexture = function(bytes, pos, end)
{
	while(pos < end)
	{
		let id = bytes[pos + 0] | (bytes[pos + 1] << 8) | (bytes[pos + 2] << 16) | (bytes[pos + 3] << 24);
		let size = bytes[pos + 4] | (bytes[pos + 5] << 8) | (bytes[pos + 6] << 16) | (bytes[pos + 7] << 24);
		
		switch(id)
		{
			case 0x01:
				this.processTxdTextureData(bytes, pos + 12, pos + 12 + size);
				break;
			
			case 0x03:
				this.processTxdExtraInfo(bytes, pos + 12, pos + 12 + size);
				break;
		}
		
		pos += size + 12;
	}
};

TextureDictionary.prototype.processTxdTextureData = function(bytes, pos, end)
{
	let name = "";
	
	for(let j = 0; j < 32; j++)
	{
		if(bytes[pos + 8 + j] == 0)
			break;
		
		name += String.fromCharCode(bytes[pos + 8 + j]);
	}
	
	name = name.toLowerCase();
	
	let rasterFormat = bytes[pos + 72] | (bytes[pos + 73] << 8) | (bytes[pos + 74] << 16) | (bytes[pos + 75] << 24);
	let d3dFormat = bytes[pos + 76] | (bytes[pos + 77] << 8) | (bytes[pos + 78] << 16) | (bytes[pos + 79] << 24);
	let width = bytes[pos + 80] | (bytes[pos + 81] << 8);
	let height = bytes[pos + 82] | (bytes[pos + 83] << 8);
	let depth = bytes[pos + 84];
	
	if(depth == 8)
		pos += 1024;
	
	let size = bytes[pos + 88] | (bytes[pos + 89] << 8) | (bytes[pos + 90] << 16) | (bytes[pos + 91] << 24);
	
	pos += 92;
	
	let imageUI = new DrawableUI(null, {width: width, height: height});
	let imageData = imageUI.context.getImageData(0, 0, width, height);
	
	let idx = 0;
	
	switch(d3dFormat)
	{
		case 0x31545844: // DXT1
			decompressDXT(width, height, bytes.slice(pos, pos + size), imageData.data, DXT1BlockSize, decompressBlockDXT1)
			break;
		
		case 0x33545844: // DXT3
			decompressDXT(width, height, bytes.slice(pos, pos + size), imageData.data, DXT3BlockSize, decompressBlockDXT3)
			break;
		
		default:
			switch(rasterFormat)
			{
				case 0x0500: // D3DFMT_A8R8G8B8
					while(idx < size)
					{
						imageData.data[idx    ] = bytes[pos + idx + 2];
						imageData.data[idx + 1] = bytes[pos + idx + 1];
						imageData.data[idx + 2] = bytes[pos + idx];
						imageData.data[idx + 3] = bytes[pos + idx + 3];
						idx += 4;
					}
					
					break;
				
				case 0x0600: // D3DFMT_X8R8G8B8
					while(idx < size)
					{
						imageData.data[idx    ] = bytes[pos + idx + 2];
						imageData.data[idx + 1] = bytes[pos + idx + 1];
						imageData.data[idx + 2] = bytes[pos + idx];
						imageData.data[idx + 3] = 0xFF;
						idx += 4;
					}
					
					break;
				
				default:
					console.log("[Unsupported format] d3dFormat: " + d3dFormat.toString(16) + ", rasterFormat: " + rasterFormat.toString(16));
					break;
			}
			
			break;
	}
	
	imageUI.context.putImageData(imageData, 0, 0);
	
	this.textures.push({name: name, imageUI: imageUI});
};

TextureDictionary.prototype.processTxdExtraInfo = function(bytes, pos, end)
{
	
};

TextureDictionary.instances = [];
TextureDictionary.updateEventListeners = [];

TextureDictionary.newInstance = function(name, bytes)
{
	let instance = new TextureDictionary(name, bytes);
	TextureDictionary.instances.push(instance);
	TextureDictionary.updateEvent();
	return instance;
};

TextureDictionary.updateEvent = function()
{
	for(let i = 0; i < TextureDictionary.updateEventListeners.length; i++)
		TextureDictionary.updateEventListeners[i]();
};
