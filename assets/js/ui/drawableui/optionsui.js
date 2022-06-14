
function OptionsUI(parent, setting)
{
	DrawableUI.call(this, parent, setting);
	
	this.width = 0;
	this.height = 0;
	
	this.rectLeft = 0;
	this.rectTop = 0;
	this.rectRight = 0;
	this.rectBottom = 0;
	
	this.resizeRectLeft = 0;
	this.resizeRectTop = 0;
	this.resizeRectRight = 0;
	this.resizeRectBottom = 0;
	
	this.moveRectLeft = 0;
	this.moveRectTop = 0;
	this.moveRectRight = 0;
	this.moveRectBottom = 0;
	
	this.resizeLetterRectLeft = 0;
	this.resizeLetterRectTop = 0;
	this.resizeLetterRectRight = 0;
	this.resizeLetterRectBottom = 0;
	
	this.imageResizeUI = new EntityUI(null, "img", {"src": "./assets/images/resize.png", onload: () => { this.imageLoaded(); }});
	this.imageMoveUI = new EntityUI(null, "img", {"src": "./assets/images/move.png", onload: () => { this.imageLoaded(); }});
	this.imageResizeLetterUI = new EntityUI(null, "img", {"src": "./assets/images/resize-letter.png", onload: () => { this.imageLoaded(); }});
}

OptionsUI.prototype = Object.create(DrawableUI.prototype);

OptionsUI.prototype.imageLoaded = function()
{
	if(this.imageResizeUI.element.complete && this.imageMoveUI.element.complete && this.imageResizeLetterUI.element.complete)
	{
		if(this.repaint !== undefined)
			this.repaint();
	}
};

OptionsUI.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;
	
	this.element.width = width;
	this.element.height = height;
};

OptionsUI.prototype.clear = function()
{
	this.context.clearRect(0, 0, this.width, this.height);
}

OptionsUI.prototype.paint = function(textDraw, option)
{
	let scaleX = textDraw.main.screenshotUI.width / 640.0;
    let scaleY = textDraw.main.screenshotUI.height / 448.0;
	
	let left = 0.0;
	let top = 0.0;
	let right = 0.0;
	let bottom = 0.0;
	
	if(option == "resize-letter")
	{
		left = textDraw.getStringRectLeft() * scaleX;
		top = textDraw.getStringRectTop() * scaleY;
		right = textDraw.getStringRectRight() * scaleX;
		bottom = textDraw.getStringRectBottom() * scaleY;
	}
	else
	{
		left = textDraw.getRectLeft() * scaleX;
		top = textDraw.getRectTop() * scaleY;
		right = textDraw.getRectRight() * scaleX;
		bottom = textDraw.getRectBottom() * scaleY;
	}
	
	this.rectLeft = left;
	this.rectTop = top;
	this.rectRight = right;
	this.rectBottom = bottom;
	
	this.context.beginPath();
	this.context.setLineDash([5]);
	this.context.rect(Math.round(left), Math.round(top), Math.round(right - left), Math.round(bottom - top));
	this.context.stroke();
	
    let x;
	let y;
	
	if(right > left)
	{
		x = right - 56;
	}
	else
	{
		x = left - 56;
	}
	
	if(bottom < top)
	{
		let tmp = top;
		top = bottom;
		bottom = tmp;
	}
	
	if(top > 24)
	{
		y = top - 24;
	}
	else
	{
		y = bottom + 8;
	}
	
	if(x < 4)
	{
		x = 4;
	}
	
	if(x > (this.width - 60))
	{
		x = this.width - 60;
	}
	
	if(y < 4)
	{
		y = 4;
	}
	
	if(y > (this.height - 24))
	{
		y = this.height - 24;
	}
	
	if(textDraw.font == 4)
		x += 20;
	
	this.resizeRectLeft = x;
	this.resizeRectTop = y;
	this.resizeRectRight = x + 20;
	this.resizeRectBottom = y + 20;
	
	if(option == "resize")
	{
		this.context.beginPath();
		this.context.setLineDash([1]);
		this.context.rect(x - 2, y - 2, 20, 20);
		this.context.stroke();
	}
	
	this.context.drawImage(this.imageResizeUI.element, 0, 0, 16, 16, x, y, 16, 16);
	
	x += 20;
	
	this.moveRectLeft = x;
	this.moveRectTop = y;
	this.moveRectRight = x + 20;
	this.moveRectBottom = y + 20;
	
	if(option == "move")
	{
		this.context.beginPath();
		this.context.setLineDash([1]);
		this.context.rect(x - 2, y - 2, 20, 20);
		this.context.stroke();
	}
	
	this.context.drawImage(this.imageMoveUI.element, 0, 0, 16, 16, x, y, 16, 16);
	
	if(textDraw.font != 4)
	{
		x += 20;
		
		this.resizeLetterRectLeft = x;
		this.resizeLetterRectTop = y;
		this.resizeLetterRectRight = x + 20;
		this.resizeLetterRectBottom = y + 20;
		
		if(option == "resize-letter")
		{
			this.context.beginPath();
			this.context.setLineDash([1]);
			this.context.rect(x - 2, y - 2, 20, 20);
			this.context.stroke();
		}
		
		this.context.drawImage(this.imageResizeLetterUI.element, 0, 0, 16, 16, x, y, 16, 16);
	}
	else
	{
		this.resizeLetterRectLeft = 0;
		this.resizeLetterRectTop = 0;
		this.resizeLetterRectRight = 0;
		this.resizeLetterRectBottom = 0;
	}
};

OptionsUI.prototype.isInRect = function(x, y)
{
	rectLeft = this.rectLeft;
	rectTop = this.rectTop;
	rectRight = this.rectRight;
	rectBottom = this.rectBottom;
	
	if(rectLeft > rectRight)
	{
		let tempRectLeft = rectLeft;
		rectLeft = rectRight;
		rectRight = tempRectLeft;
	}
	
	if(rectTop > rectBottom)
	{
		let tempRectTop = rectTop;
		rectTop = rectBottom;
		rectBottom = tempRectTop;
	}
	
	return (rectLeft - 4) < x && x < (rectRight + 4) && (rectTop - 4) < y && y < (rectBottom + 4);
};

OptionsUI.prototype.isInResizeRect = function(x, y)
{
	return this.resizeRectLeft < x && x < this.resizeRectRight && this.resizeRectTop < y && y < this.resizeRectBottom;
};

OptionsUI.prototype.isInMoveRect = function(x, y)
{
	return this.moveRectLeft < x && x < this.moveRectRight && this.moveRectTop < y && y < this.moveRectBottom;
};

OptionsUI.prototype.isInResizeLetterRect = function(x, y)
{
	return this.resizeLetterRectLeft < x && x < this.resizeLetterRectRight && this.resizeLetterRectTop < y && y < this.resizeLetterRectBottom;
};
