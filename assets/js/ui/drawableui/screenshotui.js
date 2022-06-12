
function ScreenshotUI(parent, setting)
{
	DrawableUI.call(this, parent, setting);
	
	this.width = 0;
	this.height = 0;
	
	this.imageUI = new EntityUI(null, "img", {src: "./assets/images/640x480.png", onload: () => { this.resize(); this.paint(); }});
}

ScreenshotUI.prototype = Object.create(DrawableUI.prototype);

ScreenshotUI.prototype.resize = function()
{
	this.width = this.imageUI.element.width;
	this.height = this.imageUI.element.height;
	
	if(this.width != this.element.width || this.height != this.element.height)
	{
		this.element.width = this.width;
		this.element.height = this.height;
		
		if(this.repaint !== undefined)
			this.repaint();
	}
};

ScreenshotUI.prototype.clear = function()
{
	this.context.clearRect(0, 0, this.width, this.height);
}

ScreenshotUI.prototype.paint = function()
{
	this.context.drawImage(this.imageUI.element, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
};

ScreenshotUI.prototype.screenshotChange = function(url)
{
	this.imageUI.element.src = url;
};
