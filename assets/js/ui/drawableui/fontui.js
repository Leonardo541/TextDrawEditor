
function FontUI(parent, fontFile, setting)
{
	DrawableUI.call(this, parent, setting);
	
	this.width = 0;
	this.height = 0;
	this.color = 0x00000000;
	
	this.imageUI = new EntityUI(null, "img", {"src": "./assets/images/font" + fontFile + ".png", onload: () => { this.resize(); }});
	this.colorUI = new DrawableUI(null, {});
	
	if(fontFile == 1)
	{
		this.prop = [ 15, 9, 17, 27, 20, 34, 23, 12, 12, 12, 21, 20, 12, 14, 12, 15, 23, 15, 21, 21, 21, 21, 21, 21, 20, 21, 12, 12, 24, 24, 24, 19, 10, 22, 19, 19, 22, 16, 19, 24, 22, 11, 16, 21, 15, 28, 24, 27, 20, 25, 19, 19, 18, 23, 23, 31, 23, 19, 21, 21, 13, 35, 11, 21, 10, 19, 20, 14, 20, 19, 13, 20, 19, 9, 9, 19, 9, 29, 19, 21, 19, 19, 15, 15, 14, 18, 19, 27, 20, 20, 17, 21, 17, 20, 15, 15, 22, 22, 22, 22, 29, 19, 16, 16, 16, 16, 11, 11, 11, 11, 27, 27, 27, 27, 23, 23, 23, 23, 20, 19, 19, 19, 19, 30, 14, 19, 19, 19, 19, 9, 9, 9, 9, 21, 21, 21, 21, 18, 18, 18, 18, 24, 19, 19, 20, 18, 19, 19, 21, 19, 19, 19, 19, 19, 16, 19, 19, 19, 20, 19, 16, 19, 19, 9, 19, 20, 14, 29, 19, 19, 19, 19, 19, 19, 21, 19, 20, 32, 21, 19, 19, 19, 19, 19, 19, 29, 19, 19, 19, 19, 19, 9, 9, 9, 9, 19, 19, 19, 19, 19, 19, 19, 19, 19, 21, 19, 10, 9 ];
		this.unprop = 27;
	}
	else
	{
		this.prop = [ 12, 13, 13, 28, 28, 28, 28, 8, 17, 17, 30, 28, 28, 12, 9, 21, 28, 14, 28, 28, 28, 28, 28, 28, 28, 28, 13, 13, 30, 30, 30, 30, 10, 25, 23, 21, 24, 22, 20, 24, 24, 17, 20, 22, 20, 30, 27, 27, 26, 26, 24, 23, 24, 31, 23, 31, 24, 23, 21, 28, 33, 33, 14, 28, 10, 11, 12, 9, 11, 10, 10, 12, 12, 7, 7, 13, 5, 18, 12, 10, 12, 11, 10, 12, 8, 13, 13, 18, 17, 13, 12, 30, 30, 37, 35, 37, 25, 25, 25, 25, 33, 21, 24, 24, 24, 24, 17, 17, 17, 17, 27, 27, 27, 27, 31, 31, 31, 31, 11, 11, 11, 11, 11, 20, 9, 10, 10, 10, 10, 7, 7, 7, 7, 10, 10, 10, 10, 13, 13, 13, 13, 27, 12, 30, 27, 16, 27, 27, 27, 27, 27, 27, 27, 27, 18, 29, 26, 25, 28, 26, 25, 27, 28, 12, 24, 25, 24, 30, 27, 29, 26, 26, 25, 26, 25, 26, 28, 32, 27, 26, 26, 29, 29, 29, 29, 33, 25, 26, 26, 26, 26, 14, 14, 14, 14, 29, 29, 29, 29, 26, 26, 26, 26, 21, 25, 30, 27, 27 ];
		this.unprop = 20;
	}
}

FontUI.prototype = Object.create(DrawableUI.prototype);

FontUI.prototype.resize = function()
{
	this.width = this.imageUI.element.width;
	this.height = this.imageUI.element.height;
	
	if(this.width != this.element.width || this.height != this.element.height)
	{
		this.element.width = this.width;
		this.element.height = this.height;
		
		this.colorUI.element.width = this.width;
		this.colorUI.element.height = this.height;
		
		if(this.repaint !== undefined)
			this.repaint();
	}
};

FontUI.prototype.setColor = function(color)
{
	this.color = color;
	
	this.colorUI.context.clearRect(0, 0, this.width, this.height);
	this.colorUI.context.fillStyle = color.toRGBA();
	this.colorUI.context.fillRect(0, 0, this.width, this.height);
	this.colorUI.context.globalCompositeOperation = "destination-in";
	this.colorUI.context.drawImage(this.imageUI.element, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
	this.colorUI.context.globalCompositeOperation = "source-over";
};

FontUI.prototype.setColorLighter = function()
{
	let color = this.color;
	
	let red = (color >> 24) & 0xFF;
	let green = (color >> 16) & 0xFF;
	let blue = (color >> 8) & 0xFF;
	let alpha = color & 0xFF;
	
	red = (red * 1.5) >>> 0;
	green = (green * 1.5) >>> 0;
	blue = (blue * 1.5) >>> 0;
	
	red = Math.min(red, 255);
	green = Math.min(green, 255);
	blue = Math.min(blue, 255);
	
	color = ((red << 24) + (green << 16) + (blue << 8) + (alpha)) >>> 0;
	
	this.setColor(color);
};
