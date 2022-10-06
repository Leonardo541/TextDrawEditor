
function MultipleSelection(main)
{
	this.main = main;
	
	this.rectLeft = 0;
	this.rectTop = 0;
	this.rectRight = 0;
	this.rectBottom = 0;
	
	this.selections = [];
	this.selectionLast = null;
}

MultipleSelection.prototype.isSelected = function(anyObject)
{
	if(anyObject)
	{
		for(let i = 0; i < this.selections.length; i++)
		{
			if(this.selections[i] == anyObject)
				return true;
		}
	}
	
	return false;
};

MultipleSelection.prototype.addSelection = function(anyObject)
{
	if(anyObject)
	{
		this.selections.push(anyObject);
		
		if(this.selections.length != 1)
			this.recalculateSize();
	}
};

MultipleSelection.prototype.removeSelection = function(anyObject)
{
	if(anyObject)
	{
		for(let i = 0; i < this.selections.length; i++)
		{
			if(this.selections[i] == anyObject)
			{
				this.selections.splice(i, 1);
				break;
			}
		}
		
		if(this.selections.length != 1)
			this.recalculateSize();
	}
};

MultipleSelection.prototype.getCurrentTextDraw = function()
{
	let anyObject = this.getCurrentAnyObject();
	
	if(anyObject instanceof TextDraw)
		return anyObject;
	
	return null;
};

MultipleSelection.prototype.getCurrentGuideGrid = function()
{
	let anyObject = this.getCurrentAnyObject();
	
	if(anyObject instanceof GuideGrid)
		return anyObject;
	
	return null;
};

MultipleSelection.prototype.getCurrentGuideLine = function()
{
	let anyObject = this.getCurrentAnyObject();
	
	if(anyObject instanceof GuideLine)
		return anyObject;
	
	return null;
};

MultipleSelection.prototype.getCurrentAnyObject = function()
{
	if(this.selections.length != 0)
		return this.selections.length == 1 ? this.selections[0] : this;
	
	return null;
};

MultipleSelection.prototype.recalculateSize = function()
{
	this.rectLeft = 0;
	this.rectTop = 0;
	this.rectRight = 0;
	this.rectBottom = 0;
	
	for(let i = 0; i < this.selections.length; i++)
	{
		let rectLeft = this.selections[i].getRectLeft();
		let rectTop = this.selections[i].getRectTop();
		let rectRight = this.selections[i].getRectRight();
		let rectBottom = this.selections[i].getRectBottom();
		
		if(rectLeft < rectRight)
		{
			if(i == 0 || rectLeft < this.rectLeft)
				this.rectLeft = rectLeft;
			
			if(i == 0 || rectRight > this.rectRight)
				this.rectRight = rectRight;
		}
		else
		{
			if(i == 0 || rectRight < this.rectLeft)
				this.rectLeft = rectRight;
			
			if(i == 0 || rectLeft > this.rectRight)
				this.rectRight = rectLeft;
		}
		
		if(rectTop < rectBottom)
		{
			if(i == 0 || rectTop < this.rectTop)
				this.rectTop = rectTop;
			
			if(i == 0 || rectBottom > this.rectBottom)
				this.rectBottom = rectBottom;
		}
		else
		{
			if(i == 0 || rectBottom < this.rectTop)
				this.rectTop = rectBottom;
			
			if(i == 0 || rectTop > this.rectBottom)
				this.rectBottom = rectTop;
		}
	}
	
	for(let i = 0; i < this.selections.length; i++)
	{
		this.selections[i].percentLeft = this.selections[i].getRectLeft().getPercentOf(this.rectLeft, this.rectRight);
		this.selections[i].percentTop = this.selections[i].getRectTop().getPercentOf(this.rectTop, this.rectBottom);
		this.selections[i].percentRight = this.selections[i].getRectRight().getPercentOf(this.rectLeft, this.rectRight);
		this.selections[i].percentBottom = this.selections[i].getRectBottom().getPercentOf(this.rectTop, this.rectBottom);
	}
};

MultipleSelection.prototype.offsetRect = function(offsetX, offsetY)
{
	if(this.selections.length == 1)
		return this.selections[0].offsetRect(offsetX, offsetY);
	
	this.rectLeft += offsetX;
	this.rectRight += offsetX;
	this.rectTop += offsetY;
	this.rectBottom += offsetY;
	
	for(let i = 0; i < this.selections.length; i++)
	{
		this.selections[i].offsetRect(offsetX, offsetY);
	}
};

MultipleSelection.prototype.setRectLeft = function(rectLeft)
{
	if(this.selections.length == 1)
		return this.selections[0].setRectLeft(rectLeft);
	
	this.rectLeft = rectLeft;
	
	let width = this.getWidth();
	
	for(let i = 0; i < this.selections.length; i++)
	{
		let oldWidth = this.selections[i].getRectRight() - this.selections[i].getRectLeft();
		
		this.selections[i].setRectLeft(this.rectLeft + this.selections[i].percentLeft / 100 * width);
		this.selections[i].setRectRight(this.rectLeft + this.selections[i].percentRight / 100 * width);
		
		let newWidth = this.selections[i].getRectRight() - this.selections[i].getRectLeft();
		
		if(this.main.letterSizeOnResize && this.selections[i] instanceof TextDraw)
			this.selections[i].letterSizeX = newWidth.getPercentOf(0, oldWidth) / 100 * this.selections[i].letterSizeX;
	}
};

MultipleSelection.prototype.setRectTop = function(rectTop)
{
	if(this.selections.length == 1)
		return this.selections[0].setRectTop(rectTop);
	
	this.rectTop = rectTop;
	
	let height = this.getHeight();
	
	for(let i = 0; i < this.selections.length; i++)
	{
		let oldHeight = this.selections[i].getRectBottom() - this.selections[i].getRectTop();
		
		this.selections[i].setRectTop(this.rectTop + this.selections[i].percentTop / 100 * height);
		this.selections[i].setRectBottom(this.rectTop + this.selections[i].percentBottom / 100 * height);
		
		let newHeight = this.selections[i].getRectBottom() - this.selections[i].getRectTop();
		
		if(this.main.letterSizeOnResize && this.selections[i] instanceof TextDraw)
			this.selections[i].letterSizeY = newHeight.getPercentOf(0, oldHeight) / 100 * this.selections[i].letterSizeY;
	}
};

MultipleSelection.prototype.setRectRight = function(rectRight)
{
	if(this.selections.length == 1)
		return this.selections[0].setRectRight(rectRight);
	
	this.rectRight = rectRight;
	
	let width = this.getWidth();
	
	for(let i = 0; i < this.selections.length; i++)
	{
		let oldWidth = this.selections[i].getRectRight() - this.selections[i].getRectLeft();
		
		this.selections[i].setRectLeft(this.rectLeft + this.selections[i].percentLeft / 100 * width);
		this.selections[i].setRectRight(this.rectLeft + this.selections[i].percentRight / 100 * width);
		
		let newWidth = this.selections[i].getRectRight() - this.selections[i].getRectLeft();
		
		if(this.main.letterSizeOnResize && this.selections[i] instanceof TextDraw)
			this.selections[i].letterSizeX = newWidth.getPercentOf(0, oldWidth) / 100 * this.selections[i].letterSizeX;
	}
};

MultipleSelection.prototype.setRectBottom = function(rectBottom)
{
	if(this.selections.length == 1)
		return this.selections[0].setRectBottom(rectBottom);
	
	this.rectBottom = rectBottom;
	
	let height = this.getHeight();
	
	for(let i = 0; i < this.selections.length; i++)
	{
		let oldHeight = this.selections[i].getRectBottom() - this.selections[i].getRectTop();
		
		this.selections[i].setRectTop(this.rectTop + this.selections[i].percentTop / 100 * height);
		this.selections[i].setRectBottom(this.rectTop + this.selections[i].percentBottom / 100 * height);
		
		let newHeight = this.selections[i].getRectBottom() - this.selections[i].getRectTop();
		
		if(this.main.letterSizeOnResize && this.selections[i] instanceof TextDraw)
			this.selections[i].letterSizeY = newHeight.getPercentOf(0, oldHeight) / 100 * this.selections[i].letterSizeY;
	}
};

MultipleSelection.prototype.getRectLeft = function()
{
	if(this.selections.length == 1)
		return this.selections[0].getRectLeft();
	
	return this.rectLeft;
};

MultipleSelection.prototype.getRectTop = function()
{
	if(this.selections.length == 1)
		return this.selections[0].getRectTop();
	
	return this.rectTop;
};

MultipleSelection.prototype.getRectRight = function()
{
	if(this.selections.length == 1)
		return this.selections[0].getRectRight();
	
	return this.rectRight;
};

MultipleSelection.prototype.getRectBottom = function()
{
	if(this.selections.length == 1)
		return this.selections[0].getRectBottom();
	
	return this.rectBottom;
};

MultipleSelection.prototype.setX = function(x)
{
	let width = this.getWidth();
	
	this.setRectLeft(x);
	this.setRectRight(x + width);
};

MultipleSelection.prototype.setY = function(y)
{
	let height = this.getHeight();
	
	this.setRectTop(y);
	this.setRectBottom(y + height);
};

MultipleSelection.prototype.setWidth = function(width)
{
	this.setRectRight(this.getRectLeft() + width);
};

MultipleSelection.prototype.setHeight = function(height)
{
	this.setRectBottom(this.getRectTop() + height);
};

MultipleSelection.prototype.getX = function()
{
	return this.getRectLeft();
};

MultipleSelection.prototype.getY = function()
{
	return this.getRectTop();
};

MultipleSelection.prototype.getWidth = function()
{
	return this.getRectRight() - this.getRectLeft();
};

MultipleSelection.prototype.getHeight = function()
{
	return this.getRectBottom() - this.getRectTop();
};
