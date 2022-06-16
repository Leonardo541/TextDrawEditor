
function GuideGrid(main, name, x, y, width, height, margin, padding, rows, columns)
{
	this.main = main;
	this.name = name;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.margin = margin;
	this.padding = padding;
	this.rows = rows;
	this.columns = columns;
}

GuideGrid.prototype.copyGuideGrid = function(guideGrid)
{
	guideGrid.name = this.name;
	guideGrid.x = this.x;
	guideGrid.y = this.y;
	guideGrid.width = this.width;
	guideGrid.height = this.height;
	guideGrid.margin = this.margin;
	guideGrid.padding = this.padding;
	guideGrid.rows = this.rows;
	guideGrid.columns = this.columns;
};

GuideGrid.prototype.getHorizontalLine = function(idx)
{
	return this.y + this.height / this.rows * idx;
};

GuideGrid.prototype.getHorizontalLineCount = function()
{
	if(this.rows > 0 && this.columns > 0)
		return this.rows + 1;
	
	return 0;
};

GuideGrid.prototype.getVerticalLine = function(idx)
{
	return this.x + this.width / this.columns * idx;
};

GuideGrid.prototype.getVerticalLineCount = function()
{
	if(this.rows > 0 && this.columns > 0)
		return this.columns + 1;
	
	return 0;
};

GuideGrid.prototype.offsetRect = function(offsetX, offsetY)
{
	this.x += offsetX;
	this.y += offsetY;
};

GuideGrid.prototype.setRectLeft = function(rectLeft)
{
	this.width = this.getRectRight() - rectLeft;
	this.x = rectLeft;
};

GuideGrid.prototype.setRectTop = function(rectTop)
{
	this.height = this.getRectBottom() - rectTop;
	this.y = rectTop;
};

GuideGrid.prototype.setRectRight = function(rectRight)
{
	this.width = rectRight - this.x;
};

GuideGrid.prototype.setRectBottom = function(rectBottom)
{
	this.height = rectBottom - this.y;
};

GuideGrid.prototype.getRectLeft = function()
{
	return this.x;
};

GuideGrid.prototype.getRectTop = function()
{
	return this.y;
};

GuideGrid.prototype.getRectRight = function()
{
	return this.x + this.width;
};

GuideGrid.prototype.getRectBottom = function()
{
	return this.y + this.height;
};
