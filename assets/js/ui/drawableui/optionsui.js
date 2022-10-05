
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

OptionsUI.prototype.paintGuideGrids = function(currentGuideGrid, guideGrids, option)
{
	if(guideGrids.length == 0)
		return;
	
	let scaleX = guideGrids[0].main.screenshotUI.width / 640.0;
	let scaleY = guideGrids[0].main.screenshotUI.height / 448.0;
	
	for(let i = 0; i < guideGrids.length; i++)
	{
		let guideGrid = guideGrids[i];
		
		let horizontalLineCount = guideGrid.getHorizontalLineCount();
		let verticalLineCount = guideGrid.getVerticalLineCount();
		
		if(horizontalLineCount >= 0 && verticalLineCount > 0)
		{
			this.context.beginPath();
			
			if(guideGrid == currentGuideGrid)
			{
				this.context.setLineDash([5]);
			}
			else
			{
				this.context.setLineDash([]);
			}
			
			let minX = Math.round(guideGrid.getVerticalLine(0) * scaleX);
			let maxX = Math.round(guideGrid.getVerticalLine(verticalLineCount - 1) * scaleX);
			
			for(let j = 0; j < horizontalLineCount; j++)
			{
				let line = Math.round(guideGrid.getHorizontalLine(j) * scaleY);
				
				this.context.moveTo(minX, line);
				this.context.lineTo(maxX, line);
			}
			
			let minY = Math.round(guideGrid.getHorizontalLine(0) * scaleY);
			let maxY = Math.round(guideGrid.getHorizontalLine(horizontalLineCount - 1) * scaleY);
			
			for(let j = 0; j < verticalLineCount; j++)
			{
				let line = Math.round(guideGrid.getVerticalLine(j) * scaleX);
				
				this.context.moveTo(line, minY);
				this.context.lineTo(line, maxY);
			}
			
			this.context.stroke();
			
			if(guideGrid == currentGuideGrid)
			{
				this.context.fillStyle = "#000000";
				
				for(let j = 0; j < horizontalLineCount; j++)
				{
					let line = Math.round(guideGrid.getHorizontalLine(j) * scaleY);
					
					this.context.fillRect(minX - 2, line - 2, 4, 4);
					this.context.fillRect(maxX - 2, line - 2, 4, 4);
				}
				
				for(let j = 1; j < (verticalLineCount - 1); j++)
				{
					let line = Math.round(guideGrid.getVerticalLine(j) * scaleX);
					
					this.context.fillRect(line - 2, minY - 2, 4, 4);
					this.context.fillRect(line - 2, maxY - 2, 4, 4);
				}
			}
		}
	}
	
	if(currentGuideGrid)
	{
		let left = currentGuideGrid.getRectLeft() * scaleX;
		let top = currentGuideGrid.getRectTop() * scaleY;
		let right = currentGuideGrid.getRectRight() * scaleX;
		let bottom = currentGuideGrid.getRectBottom() * scaleY;
		
		this.drawOptions(left, top, right, bottom, option, false);
	}
};

OptionsUI.prototype.paintGuideLines = function(currentGuideLine, guideLines, option)
{
	if(guideLines.length == 0)
		return;
	
	let scaleX = guideLines[0].main.screenshotUI.width / 640.0;
	let scaleY = guideLines[0].main.screenshotUI.height / 448.0;
	
	for(let i = 0; i < guideLines.length; i++)
	{
		let guideLine = guideLines[i];
		
		this.context.beginPath();
		
		if(guideLine == currentGuideLine)
		{
			this.context.setLineDash([5]);
		}
		else
		{
			this.context.setLineDash([]);
		}
		
		let x = guideLine.x * scaleX;
		let y = guideLine.y * scaleY;
		
		if(guideLine.style == 0)
		{
			this.context.moveTo(x, y);
			this.context.lineTo(x + guideLine.size * scaleX, y);
		}
		else
		{
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + guideLine.size * scaleY);
		}
		
		this.context.stroke();
		
		if(guideLine == currentGuideLine)
		{
			this.context.fillStyle = "#000000";
			this.context.fillRect(x - 2, y - 2, 4, 4);
			
			if(guideLine.style == 0)
			{
				this.context.fillRect(x + guideLine.size * scaleX - 2, y - 2, 4, 4);
			}
			else
			{
				this.context.fillRect(x - 2, y + guideLine.size * scaleY - 2, 4, 4);
			}
		}
	}
	
	if(currentGuideLine)
	{
		let left = currentGuideLine.getRectLeft() * scaleX;
		let top = currentGuideLine.getRectTop() * scaleY;
		let right = currentGuideLine.getRectRight() * scaleX;
		let bottom = currentGuideLine.getRectBottom() * scaleY;
		
		this.drawOptions(left, top, right, bottom, option, false);
	}
};

OptionsUI.prototype.paintMultipleSelection = function(multipleSelection, option)
{
	let scaleX = multipleSelection.main.screenshotUI.width / 640.0;
	let scaleY = multipleSelection.main.screenshotUI.height / 448.0;
	
	let left = multipleSelection.getRectLeft() * scaleX;
	let top = multipleSelection.getRectTop() * scaleY;
	let right = multipleSelection.getRectRight() * scaleX;
	let bottom = multipleSelection.getRectBottom() * scaleY;
	
	this.context.beginPath();
	this.context.setLineDash([5]);
	this.context.rect(Math.round(left), Math.round(top), Math.round(right - left), Math.round(bottom - top));
	this.context.stroke();
	
	this.drawOptions(left, top, right, bottom, option, false);
};

OptionsUI.prototype.paint = function(textDraw, option)
{
	if(!textDraw)
		return;
	
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
	
	this.context.beginPath();
	this.context.setLineDash([5]);
	this.context.rect(Math.round(left), Math.round(top), Math.round(right - left), Math.round(bottom - top));
	this.context.stroke();
	
	this.drawOptions(left, top, right, bottom, option, textDraw.font != 4 && textDraw.font != 5);
};

OptionsUI.prototype.drawOptions = function(left, top, right, bottom, option, enableResizeLetter)
{
	this.rectLeft = left;
	this.rectTop = top;
	this.rectRight = right;
	this.rectBottom = bottom;
	
	let x;
	let y;
	
	let w = enableResizeLetter ? 60 : 40;
	
	if(right > left)
	{
		x = right - (w - 4);
	}
	else
	{
		x = left - (w - 4);
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
	
	if(x > (this.width - w))
	{
		x = this.width - w;
	}
	
	if(y < 4)
	{
		y = 4;
	}
	
	if(y > (this.height - 24))
	{
		y = this.height - 24;
	}
	
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
	
	if(enableResizeLetter)
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
