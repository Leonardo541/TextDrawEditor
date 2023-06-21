
function MultipleSelection(main)
{
	this.main = main;
	this.internalId = 0;
	
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
		
		this.selections[i].oldLetterSizeX = this.selections[i].letterSizeX;
		this.selections[i].oldLetterSizeY = this.selections[i].letterSizeY;
		this.selections[i].oldWidth = this.selections[i].getRectRight() - this.selections[i].getRectLeft();
		this.selections[i].oldHeight = this.selections[i].getRectBottom() - this.selections[i].getRectTop();
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
	
	if(width == 0)
		width = 0.0000009;
	
	for(let i = 0; i < this.selections.length; i++)
	{
		this.selections[i].setRectLeft(this.rectLeft + this.selections[i].percentLeft / 100 * width);
		this.selections[i].setRectRight(this.rectLeft + this.selections[i].percentRight / 100 * width);
		
		let newWidth = this.selections[i].getRectRight() - this.selections[i].getRectLeft();
		
		if(this.main.letterSizeOnResize && this.selections[i] instanceof TextDraw)
		{
			if(this.selections[i].oldLetterSizeX != 0)
			{
				this.selections[i].letterSizeX = newWidth.getPercentOf(0, this.selections[i].oldWidth) / 100 * this.selections[i].oldLetterSizeX;
			}
			else
			{
				this.selections[i].letterSizeX = 0;
			}
		}
	}
};

MultipleSelection.prototype.setRectTop = function(rectTop)
{
	if(this.selections.length == 1)
		return this.selections[0].setRectTop(rectTop);
	
	this.rectTop = rectTop;
	
	let height = this.getHeight();
	
	if(height == 0)
		height = 0.0000009;
	
	for(let i = 0; i < this.selections.length; i++)
	{
		this.selections[i].setRectTop(this.rectTop + this.selections[i].percentTop / 100 * height);
		this.selections[i].setRectBottom(this.rectTop + this.selections[i].percentBottom / 100 * height);
		
		let newHeight = this.selections[i].getRectBottom() - this.selections[i].getRectTop();
		
		if(this.main.letterSizeOnResize && this.selections[i] instanceof TextDraw)
		{
			if(this.selections[i].oldLetterSizeY != 0)
			{
				this.selections[i].letterSizeY = newHeight.getPercentOf(0, this.selections[i].oldHeight) / 100 * this.selections[i].oldLetterSizeY;
			}
			else
			{
				this.selections[i].letterSizeY = 0;
			}
		}
	}
};

MultipleSelection.prototype.setRectRight = function(rectRight)
{
	if(this.selections.length == 1)
		return this.selections[0].setRectRight(rectRight);
	
	this.rectRight = rectRight;
	
	let width = this.getWidth();
	
	if(width == 0)
		width = 0.0000009;
	
	for(let i = 0; i < this.selections.length; i++)
	{
		this.selections[i].setRectLeft(this.rectLeft + this.selections[i].percentLeft / 100 * width);
		this.selections[i].setRectRight(this.rectLeft + this.selections[i].percentRight / 100 * width);
		
		let newWidth = this.selections[i].getRectRight() - this.selections[i].getRectLeft();
		
		if(this.main.letterSizeOnResize && this.selections[i] instanceof TextDraw)
		{
			if(this.selections[i].oldLetterSizeX != 0)
			{
				this.selections[i].letterSizeX = newWidth.getPercentOf(0, this.selections[i].oldWidth) / 100 * this.selections[i].oldLetterSizeX;
			}
			else
			{
				this.selections[i].letterSizeX = 0;
			}
		}
	}
};

MultipleSelection.prototype.setRectBottom = function(rectBottom)
{
	if(this.selections.length == 1)
		return this.selections[0].setRectBottom(rectBottom);
	
	this.rectBottom = rectBottom;
	
	let height = this.getHeight();
	
	if(height == 0)
		height = 0.0000009;
	
	for(let i = 0; i < this.selections.length; i++)
	{
		this.selections[i].setRectTop(this.rectTop + this.selections[i].percentTop / 100 * height);
		this.selections[i].setRectBottom(this.rectTop + this.selections[i].percentBottom / 100 * height);
		
		let newHeight = this.selections[i].getRectBottom() - this.selections[i].getRectTop();
		
		if(this.main.letterSizeOnResize && this.selections[i] instanceof TextDraw)
		{
			if(this.selections[i].oldLetterSizeY != 0)
			{
				this.selections[i].letterSizeY = newHeight.getPercentOf(0, this.selections[i].oldHeight) / 100 * this.selections[i].oldLetterSizeY;
			}
			else
			{
				this.selections[i].letterSizeY = 0;
			}
		}
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

MultipleSelection.prototype.getMyIndex = function(project)
{
	if(this.selections.length == 1)
		return this.selections[0].getMyIndex(project);
	
	let indices = [];
	
	for(let i = 0; i < this.selections.length; i++)
	{
		indices.push(this.selections[i].getMyIndex(project));
	}
	
	return indices;
};

MultipleSelection.prototype.historyProjectOpen = function(project, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue")
	{
		let textDraws = oldValue[0];
		let guideGrids = oldValue[1];
		let guideLines = oldValue[2];
		
		for(let i = 0; i < textDraws.length; i++)
		{
			let textDraw = project.findInternalId(textDraws[i][0]);
			
			if(textDraw)
			{
				project.removeTextDraw(textDraw);
			}
		}
		
		for(let i = 0; i < guideGrids.length; i++)
		{
			let guideGrid = project.findInternalId(guideGrids[i][0]);
			
			if(guideGrid)
			{
				project.removeGuideGrid(guideGrid);
			}
		}
		
		for(let i = 0; i < guideLines.length; i++)
		{
			let guideLine = project.findInternalId(guideLines[i][0]);
			
			if(guideLine)
			{
				project.removeGuideLine(guideLine);
			}
		}
	}
	else if(funcname == "applyNewValue")
	{
		let textDraws = newValue[0];
		let guideGrids = newValue[1];
		let guideLines = newValue[2];
		
		for(let i = 0; i < textDraws.length; i++)
		{
			let textDraw = new TextDraw(project.main, textDraws[i][0], textDraws[i][1], textDraws[i][2], textDraws[i][3], textDraws[i][4]);
			
			textDraw.letterSizeX = textDraws[i][5];
			textDraw.letterSizeY = textDraws[i][6];
			textDraw.textSizeX = textDraws[i][7];
			textDraw.textSizeY = textDraws[i][8];
			textDraw.alignment = textDraws[i][9];
			textDraw.color = textDraws[i][10];
			textDraw.useBox = textDraws[i][11];
			textDraw.boxColor = textDraws[i][12];
			textDraw.setShadow = textDraws[i][13];
			textDraw.setOutline = textDraws[i][14];
			textDraw.backgroundColor = textDraws[i][15];
			textDraw.font = textDraws[i][16];
			textDraw.setProportional = textDraws[i][17];
			textDraw.setVisibility(textDraws[i][18]);
			
			project.textDrawList.splice(textDraws[i][19], 0, textDraw);
		}
		
		for(let i = 0; i < guideGrids.length; i++)
		{
			let guideGrid = new GuideGrid(project.main, guideGrids[i][0], guideGrids[i][1], guideGrids[i][2], guideGrids[i][3], guideGrids[i][4], guideGrids[i][5], guideGrids[i][6], guideGrids[i][7], guideGrids[i][8], guideGrids[i][9]);
			guideGrid.setVisibility(guideGrids[i][10]);
			project.guideGrids.splice(guideGrids[i][11], 0, guideGrid);
		}
		
		for(let i = 0; i < guideLines.length; i++)
		{
			let guideLine = new GuideLine(project.main, guideLines[i][0], guideLines[i][1], guideLines[i][2], guideLines[i][3], guideLines[i][4], guideLines[i][5], guideLines[i][6]);
			guideLine.setVisibility(guideLines[i][7]);
			project.guideLines.splice(guideLines[i][8], 0, guideLine);
		}
	}
	else if(funcname == "updateOldValue")
	{
		return [];
	}
	else if(funcname == "updateNewValue")
	{
		let lastLoad = project.lastLoad;
		
		if(!lastLoad)
			lastLoad = this.selections;
		
		let textDraws = [];
		let guideGrids = [];
		let guideLines = [];
		
		for(let i = 0; i < lastLoad.length; i++)
		{
			let anyObject = lastLoad[i];
			
			if(anyObject instanceof TextDraw)
			{
				textDraws.push([anyObject.internalId, anyObject.name, anyObject.text, anyObject.x, anyObject.y, anyObject.letterSizeX, anyObject.letterSizeY, anyObject.textSizeX, anyObject.textSizeY, anyObject.alignment, anyObject.color, anyObject.useBox, anyObject.boxColor, anyObject.setShadow, anyObject.setOutline, anyObject.backgroundColor, anyObject.font, anyObject.setProportional, anyObject.visibility, anyObject.getMyIndex(project)]);
			}
			else if(anyObject instanceof GuideGrid)
			{
				guideGrids.push([anyObject.internalId, anyObject.name, anyObject.x, anyObject.y, anyObject.width, anyObject.height, anyObject.margin, anyObject.padding, anyObject.rows, anyObject.columns, anyObject.visibility, anyObject.getMyIndex(project)]);
			}
			else if(anyObject instanceof GuideLine)
			{
				guideLines.push([anyObject.internalId, anyObject.name, anyObject.x, anyObject.y, anyObject.size, anyObject.padding, anyObject.style, anyObject.visibility, anyObject.getMyIndex(project)]);
			}
		}
		
		return [textDraws, guideGrids, guideLines];
	}
};

MultipleSelection.prototype.historyMultipleDuplicate = function(project, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue")
	{
		let textDraws = oldValue[0];
		let guideGrids = oldValue[1];
		let guideLines = oldValue[2];
		
		for(let i = 0; i < textDraws.length; i++)
		{
			let textDraw = project.findInternalId(textDraws[i][0]);
			
			if(textDraw)
			{
				project.removeTextDraw(textDraw);
			}
		}
		
		for(let i = 0; i < guideGrids.length; i++)
		{
			let guideGrid = project.findInternalId(guideGrids[i][0]);
			
			if(guideGrid)
			{
				project.removeGuideGrid(guideGrid);
			}
		}
		
		for(let i = 0; i < guideLines.length; i++)
		{
			let guideLine = project.findInternalId(guideLines[i][0]);
			
			if(guideLine)
			{
				project.removeGuideLine(guideLine);
			}
		}
	}
	else if(funcname == "applyNewValue")
	{
		let textDraws = newValue[0];
		let guideGrids = newValue[1];
		let guideLines = newValue[2];
		
		this.selections = [];
		this.selectionLast = null;
		
		for(let i = 0; i < textDraws.length; i++)
		{
			let fromTextDraw = project.findInternalId(textDraws[i][1]);
			
			if(fromTextDraw)
			{
				let copiedTextDraw = {};
				fromTextDraw.copyTextDraw(copiedTextDraw);
				copiedTextDraw.width = fromTextDraw.getRectRight() - fromTextDraw.getRectLeft();
				copiedTextDraw.height = fromTextDraw.getRectBottom() - fromTextDraw.getRectTop();
				
				let textDraw = new TextDraw(project.main, textDraws[i][0], project.getNewName("TextDraw", project.textDrawList), copiedTextDraw.text, copiedTextDraw.x, copiedTextDraw.y);
				textDraw.fromTextDraw(copiedTextDraw);
				project.textDrawList.push(textDraw);
				
				this.addSelection(textDraw);
				this.selectionLast = textDraw;
			}
		}
		
		for(let i = 0; i < guideGrids.length; i++)
		{
			let fromGuideGrid = project.findInternalId(guideGrids[i][1]);
			
			if(fromGuideGrid)
			{
				let guideGrid = new GuideGrid(project.main, guideGrids[i][0], project.getNewName("GuideGrid", project.guideGrids), fromGuideGrid.x, fromGuideGrid.y, fromGuideGrid.width, fromGuideGrid.height, fromGuideGrid.margin, fromGuideGrid.padding, fromGuideGrid.rows, fromGuideGrid.columns);
				project.guideGrids.push(guideGrid);
				
				this.addSelection(guideGrid);
				this.selectionLast = guideGrid;
			}
		}
		
		for(let i = 0; i < guideLines.length; i++)
		{
			let fromGuideLine = project.findInternalId(guideLines[i][1]);
			
			if(fromGuideLine)
			{
				let guideLine = new GuideLine(project.main, guideLines[i][0], project.getNewName("GuideLine", project.guideLines), fromGuideLine.x, fromGuideLine.y, fromGuideLine.size, fromGuideLine.padding, fromGuideLine.style);
				project.guideLines.push(guideLine);
				
				this.addSelection(guideLine);
				this.selectionLast = guideLine;
			}
		}
	}
	else if(funcname == "updateOldValue")
	{
		return [];
	}
	else if(funcname == "updateNewValue")
	{
		let textDraws = [];
		let guideGrids = [];
		let guideLines = [];
		
		for(let i = 0; i < this.selections.length; i++)
		{
			let anyObject = this.selections[i];
			
			if(anyObject instanceof TextDraw)
			{
				textDraws.push([anyObject.internalId, anyObject.duplicateFromInternalId]);
			}
			else if(anyObject instanceof GuideGrid)
			{
				guideGrids.push([anyObject.internalId, anyObject.duplicateFromInternalId]);
			}
			else if(anyObject instanceof GuideLine)
			{
				guideLines.push([anyObject.internalId, anyObject.duplicateFromInternalId]);
			}
		}
		
		return [textDraws, guideGrids, guideLines];
	}
};

MultipleSelection.prototype.historyMultipleFromAnotherPoject = function(project, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue")
	{
		let textDraws = oldValue[0];
		let guideGrids = oldValue[1];
		let guideLines = oldValue[2];
		
		for(let i = 0; i < textDraws.length; i++)
		{
			let textDraw = project.findInternalId(textDraws[i][0]);
			
			if(textDraw)
			{
				project.removeTextDraw(textDraw);
			}
		}
		
		for(let i = 0; i < guideGrids.length; i++)
		{
			let guideGrid = project.findInternalId(guideGrids[i][0]);
			
			if(guideGrid)
			{
				project.removeGuideGrid(guideGrid);
			}
		}
		
		for(let i = 0; i < guideLines.length; i++)
		{
			let guideLine = project.findInternalId(guideLines[i][0]);
			
			if(guideLine)
			{
				project.removeGuideLine(guideLine);
			}
		}
	}
	else if(funcname == "applyNewValue")
	{
		let textDraws = newValue[0];
		let guideGrids = newValue[1];
		let guideLines = newValue[2];
		
		this.selections = [];
		this.selectionLast = null;
		
		for(let i = 0; i < textDraws.length; i++)
		{
			let textDraw = new TextDraw(this.main, textDraws[i][0], project.getNewName("TextDraw", project.textDrawList), textDraws[i][1], textDraws[i][2], textDraws[i][3]);
			
			textDraw.letterSizeX = textDraws[i][4];
			textDraw.letterSizeY = textDraws[i][5];
			textDraw.textSizeX = textDraws[i][6];
			textDraw.textSizeY = textDraws[i][7];
			textDraw.alignment = textDraws[i][8];
			textDraw.color = textDraws[i][9];
			textDraw.useBox = textDraws[i][10];
			textDraw.boxColor = textDraws[i][11];
			textDraw.setShadow = textDraws[i][12];
			textDraw.setOutline = textDraws[i][13];
			textDraw.backgroundColor = textDraws[i][14];
			textDraw.font = textDraws[i][15];
			textDraw.setProportional = textDraws[i][16];
			
			project.textDrawList.push(textDraw);
			
			this.addSelection(textDraw);
			this.selectionLast = textDraw;
		}
		
		for(let i = 0; i < guideGrids.length; i++)
		{
			let guideGrid = new GuideGrid(project.main, guideGrids[i][0], project.getNewName("GuideGrid", project.guideGrids), guideGrids[i][1], guideGrids[i][2], guideGrids[i][3], guideGrids[i][4], guideGrids[i][5], guideGrids[i][6], guideGrids[i][7], guideGrids[i][8]);
			project.guideGrids.push(guideGrid);
			
			this.addSelection(guideGrid);
			this.selectionLast = guideGrid;
		}
		
		for(let i = 0; i < guideLines.length; i++)
		{
			let guideLine = new GuideLine(project.main, guideLines[i][0], project.getNewName("GuideLine", project.guideLines), guideLines[i][1], guideLines[i][2], guideLines[i][3], guideLines[i][4], guideLines[i][5]);
			project.guideLines.push(guideLine);
			
			this.addSelection(guideLine);
			this.selectionLast = guideLine;
		}
	}
	else if(funcname == "updateOldValue")
	{
		return [];
	}
	else if(funcname == "updateNewValue")
	{
		let textDraws = [];
		let guideGrids = [];
		let guideLines = [];
		
		for(let i = 0; i < this.selections.length; i++)
		{
			let anyObject = this.selections[i];
			
			if(anyObject instanceof TextDraw)
			{
				textDraws.push([anyObject.internalId, anyObject.text, anyObject.x, anyObject.y, anyObject.letterSizeX, anyObject.letterSizeY, anyObject.textSizeX, anyObject.textSizeY, anyObject.alignment, anyObject.color, anyObject.useBox, anyObject.boxColor, anyObject.setShadow, anyObject.setOutline, anyObject.backgroundColor, anyObject.font, anyObject.setProportional]);
			}
			else if(anyObject instanceof GuideGrid)
			{
				guideGrids.push([anyObject.internalId, anyObject.x, anyObject.y, anyObject.width, anyObject.height, anyObject.margin, anyObject.padding, anyObject.rows, anyObject.columns]);
			}
			else if(anyObject instanceof GuideLine)
			{
				guideLines.push([anyObject.internalId, anyObject.x, anyObject.y, anyObject.size, anyObject.padding, anyObject.style]);
			}
		}
		
		return [textDraws, guideGrids, guideLines];
	}
};

MultipleSelection.prototype.historyMultipleRemove = function(project, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue")
	{
		let textDraws = newValue[0];
		let guideGrids = newValue[1];
		let guideLines = newValue[2];
		
		for(let i = 0; i < textDraws.length; i++)
		{
			let textDraw = new TextDraw(project.main, textDraws[i][0], textDraws[i][1], textDraws[i][2], textDraws[i][3], textDraws[i][4]);
			
			textDraw.letterSizeX = textDraws[i][5];
			textDraw.letterSizeY = textDraws[i][6];
			textDraw.textSizeX = textDraws[i][7];
			textDraw.textSizeY = textDraws[i][8];
			textDraw.alignment = textDraws[i][9];
			textDraw.color = textDraws[i][10];
			textDraw.useBox = textDraws[i][11];
			textDraw.boxColor = textDraws[i][12];
			textDraw.setShadow = textDraws[i][13];
			textDraw.setOutline = textDraws[i][14];
			textDraw.backgroundColor = textDraws[i][15];
			textDraw.font = textDraws[i][16];
			textDraw.setProportional = textDraws[i][17];
			textDraw.setVisibility(textDraws[i][18]);
			
			project.textDrawList.splice(textDraws[i][19], 0, textDraw);
		}
		
		for(let i = 0; i < guideGrids.length; i++)
		{
			let guideGrid = new GuideGrid(project.main, guideGrids[i][0], guideGrids[i][1], guideGrids[i][2], guideGrids[i][3], guideGrids[i][4], guideGrids[i][5], guideGrids[i][6], guideGrids[i][7], guideGrids[i][8], guideGrids[i][9]);
			guideGrid.setVisibility(guideGrids[i][10]);
			project.guideGrids.splice(guideGrids[i][11], 0, guideGrid);
		}
		
		for(let i = 0; i < guideLines.length; i++)
		{
			let guideLine = new GuideLine(project.main, guideLines[i][0], guideLines[i][1], guideLines[i][2], guideLines[i][3], guideLines[i][4], guideLines[i][5], guideLines[i][6]);
			guideLine.setVisibility(guideLines[i][7]);
			project.guideLines.splice(guideLines[i][8], 0, guideLine);
		}
	}
	else if(funcname == "applyNewValue")
	{
		let textDraws = oldValue[0];
		let guideGrids = oldValue[1];
		let guideLines = oldValue[2];
		
		for(let i = 0; i < textDraws.length; i++)
		{
			let textDraw = project.findInternalId(textDraws[i][0]);
			
			if(textDraw)
			{
				project.removeTextDraw(textDraw);
			}
		}
		
		for(let i = 0; i < guideGrids.length; i++)
		{
			let guideGrid = project.findInternalId(guideGrids[i][0]);
			
			if(guideGrid)
			{
				project.removeGuideGrid(guideGrid);
			}
		}
		
		for(let i = 0; i < guideLines.length; i++)
		{
			let guideLine = project.findInternalId(guideLines[i][0]);
			
			if(guideLine)
			{
				project.removeGuideLine(guideLine);
			}
		}
	}
	else if(funcname == "updateOldValue")
	{
		let textDraws = [];
		let guideGrids = [];
		let guideLines = [];
		
		for(let i = 0; i < this.selections.length; i++)
		{
			let anyObject = this.selections[i];
			
			if(anyObject instanceof TextDraw)
			{
				textDraws.push([anyObject.internalId, anyObject.name, anyObject.text, anyObject.x, anyObject.y, anyObject.letterSizeX, anyObject.letterSizeY, anyObject.textSizeX, anyObject.textSizeY, anyObject.alignment, anyObject.color, anyObject.useBox, anyObject.boxColor, anyObject.setShadow, anyObject.setOutline, anyObject.backgroundColor, anyObject.font, anyObject.setProportional, anyObject.visibility, anyObject.getMyIndex(project)]);
			}
			else if(anyObject instanceof GuideGrid)
			{
				guideGrids.push([anyObject.internalId, anyObject.name, anyObject.x, anyObject.y, anyObject.width, anyObject.height, anyObject.margin, anyObject.padding, anyObject.rows, anyObject.columns, anyObject.visibility, anyObject.getMyIndex(project)]);
			}
			else if(anyObject instanceof GuideLine)
			{
				guideLines.push([anyObject.internalId, anyObject.name, anyObject.x, anyObject.y, anyObject.size, anyObject.padding, anyObject.style, anyObject.visibility, anyObject.getMyIndex(project)]);
			}
		}
		
		return [textDraws, guideGrids, guideLines];
	}
	else if(funcname == "updateNewValue")
	{
		return [];
	}
};

MultipleSelection.prototype.historyRect = function(project, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue" || funcname == "applyNewValue")
	{
		this.main.letterSizeOnResize = newValue[4];
		
		this.rectLeft = oldValue[0];
		this.rectTop = oldValue[1];
		this.rectRight = oldValue[2];
		this.rectBottom = oldValue[3];
		
		for(let i = 0; i < this.selections.length; i++)
		{
			this.selections[i].percentLeft = this.selections[i].getRectLeft().getPercentOf(this.rectLeft, this.rectRight);
			this.selections[i].percentTop = this.selections[i].getRectTop().getPercentOf(this.rectTop, this.rectBottom);
			this.selections[i].percentRight = this.selections[i].getRectRight().getPercentOf(this.rectLeft, this.rectRight);
			this.selections[i].percentBottom = this.selections[i].getRectBottom().getPercentOf(this.rectTop, this.rectBottom);
			
			this.selections[i].oldLetterSizeX = this.selections[i].letterSizeX;
			this.selections[i].oldLetterSizeY = this.selections[i].letterSizeY;
			this.selections[i].oldWidth = this.selections[i].getRectRight() - this.selections[i].getRectLeft();
			this.selections[i].oldHeight = this.selections[i].getRectBottom() - this.selections[i].getRectTop();
		}
		
		this.setRectLeft(newValue[0]);
		this.setRectTop(newValue[1]);
		this.setRectRight(newValue[2]);
		this.setRectBottom(newValue[3]);
	}
	else if(funcname == "updateOldValue" || funcname == "updateNewValue")
	{
		return [this.rectLeft, this.rectTop, this.rectRight, this.rectBottom, this.main.letterSizeOnResize];
	}
};
