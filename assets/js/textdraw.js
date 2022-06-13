
function TextDraw(main, name, text, x, y)
{
	this.main = main;
	
	this.textDrawItemUI = new EntityUI(null, "div", {class: "textDrawItem", onclick: () => { main.changeTextDraw(this); }, contextmenu: (e) => { main.contextMenuTextDraw(this, e.clientX, e.clientY); e.preventDefault(); }});
	this.thumbnailUI = new DrawableUI(this.textDrawItemUI, { width: "24", height: "24" });
	this.nameUI = new EntityUI(this.textDrawItemUI, "span", {innerText: name});
	
	this.linesWidth = [];
	this.linesCount = 0;
	
	this.stringWidth = 0;
	this.stringHeight = 0;
	
	this.name = name;
	this.text = text;
	this.x = x;
	this.y = y;
	this.letterSizeX = 1.0;
	this.letterSizeY = 3.5;
	this.textSizeX = x + 140.0;
	this.textSizeY = y + 32.0;
	this.alignment = 1;
	this.color = 0xFFFFFFFF;
	this.useBox = 1;
	this.boxColor = 0x000000AA;
	this.setShadow = 0;
	this.setOutline = 1;
	this.backgroundColor = 0x000000FF;
	this.font = 1;
	this.setProportional = 1;
}

TextDraw.prototype.copyTextDraw = function(textDraw)
{
	textDraw.name = this.name;
	textDraw.text = this.text;
	textDraw.x = this.x;
	textDraw.y = this.y;
	textDraw.letterSizeX = this.letterSizeX;
	textDraw.letterSizeY = this.letterSizeY;
	textDraw.textSizeX = this.textSizeX;
	textDraw.textSizeY = this.textSizeY;
	textDraw.alignment = this.alignment;
	textDraw.color = this.color;
	textDraw.useBox = this.useBox;
	textDraw.boxColor = this.boxColor;
	textDraw.setShadow = this.setShadow;
	textDraw.setOutline = this.setOutline;
	textDraw.backgroundColor = this.backgroundColor;
	textDraw.font = this.font;
	textDraw.setProportional = this.setProportional;
};

TextDraw.prototype.fromTextDraw = function(textDraw)
{
	this.letterSizeX = textDraw.letterSizeX;
	this.letterSizeY = textDraw.letterSizeY;
	this.textSizeX = textDraw.textSizeX;
	this.textSizeY = textDraw.textSizeY;
	this.alignment = textDraw.alignment;
	this.color = textDraw.color;
	this.useBox = textDraw.useBox;
	this.boxColor = textDraw.boxColor;
	this.setShadow = textDraw.setShadow;
	this.setOutline = textDraw.setOutline;
	this.backgroundColor = textDraw.backgroundColor;
	this.font = textDraw.font;
	this.setProportional = textDraw.setProportional;
	
	if(textDraw.width && textDraw.height)
	{
		this.setRectRight(this.getRectLeft() + textDraw.width);
		this.setRectBottom(this.getRectTop() + textDraw.height);
	}
};

TextDraw.prototype.offsetRect = function(offsetX, offsetY)
{
	switch(this.alignment)
	{
		case 1:
			this.x += offsetX;
			this.y += offsetY;
			this.textSizeX += offsetX;
			this.textSizeY += offsetY;
			break;
		
		case 2:
			this.x += offsetX;
			this.y += offsetY;
			this.textSizeX += offsetY;
			break;
		
		case 3:
			this.x += offsetX;
			this.y += offsetY;
			this.textSizeX -= offsetX;
			this.textSizeY += offsetY;
			break;
	}
};

TextDraw.prototype.setRectLeft = function(rectLeft)
{
	switch(this.alignment)
	{
		case 1:
			this.x = rectLeft;
			break;
		
		case 2:
			this.textSizeY = this.getRectRight() - rectLeft;
			this.x = rectLeft + this.textSizeY / 2;
			break;
		
		case 3:
			this.textSizeX = 640 - rectLeft;
			break;
	}
};

TextDraw.prototype.setRectTop = function(rectTop)
{
	this.y = rectTop;
};

TextDraw.prototype.setRectRight = function(rectRight)
{
	switch(this.alignment)
	{
		case 1:
			this.textSizeX = rectRight;
			break;
		
		case 2:
			this.textSizeY = rectRight - this.getRectLeft();
			this.x = rectRight - this.textSizeY / 2;
			break;
		
		case 3:
			this.x = rectRight;
			break;
	}
	
	return 0;
}

TextDraw.prototype.setRectBottom = function(rectBottom)
{
	switch(this.alignment)
	{
		case 1:
			this.textSizeY = rectBottom;
			break;
		
		case 2:
			this.textSizeX = rectBottom;
			break;
		
		case 3:
			this.textSizeY = rectBottom;
			break;
	}
};

TextDraw.prototype.getRectLeft = function()
{
	let rectLeft = 0;
	
	switch(this.alignment)
	{
		case 1:
			rectLeft = this.x;
			break;
		
		case 2:
			rectLeft = this.x - this.textSizeY / 2;
			break;
		
		case 3:
			rectLeft = 640 - this.textSizeX;
			break;
	}
	
	return rectLeft;
};

TextDraw.prototype.getRectTop = function()
{
	return this.y;
}

TextDraw.prototype.getRectRight = function()
{
	let rectRight = 0;
	
	switch(this.alignment)
	{
		case 1:
			rectRight = this.textSizeX;
			break;
		
		case 2:
			rectRight = this.x + this.textSizeY / 2;
			break;
		
		case 3:
			rectRight = this.x;
			break;
	}
	
	return rectRight;
}

TextDraw.prototype.getRectBottom = function()
{
	let rectBottom = 0;
	
	switch(this.alignment)
	{
		case 1:
			rectBottom = this.textSizeY;
			break;
		
		case 2:
			rectBottom = this.textSizeX;
			break;
		
		case 3:
			rectBottom = this.textSizeY;
			break;
	}
	
	return rectBottom;
};

TextDraw.prototype.getPaddingLeft = function()
{
	let paddingLeft = 0;
	
	switch(this.alignment)
	{
		case 1:
			break;
		
		case 2:
			paddingLeft += this.textSizeY / 2;
			paddingLeft -= this.stringWidth / 2 * this.letterSizeX;
			paddingLeft -= this.letterSizeX / 2;
			break;
		
		case 3:
			paddingLeft += this.getRectRight() - this.getRectLeft();
			paddingLeft -= this.stringWidth * this.letterSizeX;
			break;
	}
	
	return paddingLeft;
};

TextDraw.prototype.getStringRectLeft = function()
{
	return this.getRectLeft() + this.getPaddingLeft();
};

TextDraw.prototype.getStringRectTop = function()
{
	return this.getRectTop();
};

TextDraw.prototype.getStringRectRight = function()
{
	return this.getStringRectLeft() + this.stringWidth * this.letterSizeX;
};

TextDraw.prototype.getStringRectBottom = function()
{
	return this.getStringRectTop() + 9.0 * this.linesCount * this.letterSizeY;
};

TextDraw.prototype.changeAlignment = function(alignment)
{
	let rectLeft = this.getRectLeft();
	let rectTop = this.getRectTop();
	let rectRight = this.getRectRight();
	let rectBottom = this.getRectBottom();
	
	switch(alignment)
	{
		case 1:
		case 2:
		case 3:
			this.alignment = alignment;
			break;
	}
	
	this.setRectLeft(rectLeft);
	this.setRectTop(rectTop);
	this.setRectRight(rectRight);
	this.setRectBottom(rectBottom);
};
