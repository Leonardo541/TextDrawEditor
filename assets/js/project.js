
function Project(main)
{
	this.main = main;
	
	this.projectTabUI = new EntityUI(main.scrollableTabsUI, "div", {class: "projectTab", onclick: () => { main.changeProject(this); }, contextmenu: (e) => { main.contextMenuProject(this, e.clientX, e.clientY); e.preventDefault(); }});
	this.thumbnailUI = new DrawableUI(this.projectTabUI, { width: "64", height: "64" });
	
	this.textDrawList = [];
	this.guideGrids = [];
	this.guideLines = [];
	
	this.multipleSelection = new MultipleSelection(main);
	
	this.internalIdCounter = 0;
	
	this.history = [new HistoryData(HistoryType.Beginning, this, {internalId: -1})];
	this.historyIdx = 0;
	this.unpushedHistoryData = null;
	this.historyBeginningSels = [];
	
	this.lastLoad = null;
}

Project.prototype.createTextDraw = function(text, x, y)
{
	let textDraw = new TextDraw(this.main, ++this.internalIdCounter, this.getNewName("TextDraw", this.textDrawList), text, x, y);
	this.textDrawList.push(textDraw);
	return textDraw;
};

Project.prototype.removeTextDraw = function(textDraw)
{
	for(let i = 0; i < this.textDrawList.length; i++)
	{
		if(this.textDrawList[i] == textDraw)
		{
			this.textDrawList.splice(i, 1);
			break;
		}
	}
	
	textDraw.textDrawItemUI.remove();
};

Project.prototype.createGuideGrid = function(x, y, width, height, margin, padding, columns, rows)
{
	let guideGrid = new GuideGrid(this.main, ++this.internalIdCounter, this.getNewName("GuideGrid", this.guideGrids), x, y, width, height, margin, padding, columns, rows);
	this.guideGrids.push(guideGrid);
	return guideGrid;
};

Project.prototype.removeGuideGrid = function(guideGrid)
{
	for(let i = 0; i < this.guideGrids.length; i++)
	{
		if(this.guideGrids[i] == guideGrid)
		{
			this.guideGrids.splice(i, 1);
			break;
		}
	}
	
	guideGrid.textDrawItemUI.remove();
};

Project.prototype.createGuideLine = function(x, y, size, margin, style)
{
	let guideLine = new GuideLine(this.main, ++this.internalIdCounter, this.getNewName("GuideLine", this.guideLines), x, y, size, margin, style);
	this.guideLines.push(guideLine);
	return guideLine;
};

Project.prototype.removeGuideLine = function(guideLine)
{
	for(let i = 0; i < this.guideLines.length; i++)
	{
		if(this.guideLines[i] == guideLine)
		{
			this.guideLines.splice(i, 1);
			break;
		}
	}
	
	guideLine.textDrawItemUI.remove();
};

Project.prototype.getNewName = function(prefix, list)
{
	for(let i = 1; ; i++)
	{
		let name = prefix + i;
		let used = false;
		
		for(let j = 0; j < list.length; j++)
		{
			if(list[j].name == name)
			{
				used = true;
				break;
			}
		}
		
		if(!used)
			return name;
	}
};

Project.prototype.getCurrentTextDraw = function()
{
	return this.multipleSelection.getCurrentTextDraw();
};

Project.prototype.getCurrentGuideGrid = function()
{
	return this.multipleSelection.getCurrentGuideGrid();
};

Project.prototype.getCurrentGuideLine = function()
{
	return this.multipleSelection.getCurrentGuideLine();
};

Project.prototype.getCurrentAnyObject = function()
{
	return this.multipleSelection.getCurrentAnyObject();
};

Project.prototype.loadProject = function(savedProject, noLoadHistory)
{
	if(!noLoadHistory)
		this.internalIdCounter = savedProject.internalIdCounter ?? 0;
	
	let savedTextDraws = savedProject.textDraws ?? [];
	
	for(let i = 0; i < savedTextDraws.length; i++)
	{
		if(noLoadHistory)
			savedTextDraws[i].internalId = undefined;
		
		let textDraw = new TextDraw(this.main, savedTextDraws[i].internalId ?? ++this.internalIdCounter, savedTextDraws[i].name, savedTextDraws[i].text, savedTextDraws[i].x, savedTextDraws[i].y);
		this.textDrawList.push(textDraw);
		textDraw.fromTextDraw(savedTextDraws[i]);
		
		if(savedTextDraws[i].hidden)
		{
			textDraw.visibility = false;
			textDraw.visibilityUI.element.style.backgroundPositionY = "-24px";
		}
		
		if(savedTextDraws[i].selected)
		{
			this.multipleSelection.addSelection(textDraw);
			
			textDraw.textDrawItemUI.element.classList.add("currentTextDrawItem");
		}
		
		if(this.lastLoad)
			this.lastLoad.push(textDraw);
	}
	
	let savedGuideGrids = savedProject.guideGrids ?? [];
	
	for(let i = 0; i < savedGuideGrids.length; i++)
	{
		if(noLoadHistory)
			savedGuideGrids[i].internalId = undefined;
		
		let guideGrid = new GuideGrid(this.main, savedGuideGrids[i].internalId ?? ++this.internalIdCounter, savedGuideGrids[i].name, savedGuideGrids[i].x, savedGuideGrids[i].y, savedGuideGrids[i].width, savedGuideGrids[i].height, savedGuideGrids[i].margin, savedGuideGrids[i].padding, savedGuideGrids[i].rows, savedGuideGrids[i].columns);
		this.guideGrids.push(guideGrid);
		
		if(savedGuideGrids[i].hidden)
		{
			guideGrid.visibility = false;
			guideGrid.visibilityUI.element.style.backgroundPositionY = "-24px";
		}
		
		if(savedGuideGrids[i].selected)
		{
			this.multipleSelection.addSelection(guideGrid);
			
			guideGrid.textDrawItemUI.element.classList.add("currentTextDrawItem");
		}
		
		if(this.lastLoad)
			this.lastLoad.push(guideGrid);
	}
	
	let savedGuideLines = savedProject.guideLines ?? [];
	
	for(let i = 0; i < savedGuideLines.length; i++)
	{
		if(noLoadHistory)
			savedGuideLines[i].internalId = undefined;
		
		let guideLine = new GuideLine(this.main, savedGuideLines[i].internalId ?? ++this.internalIdCounter, savedGuideLines[i].name, savedGuideLines[i].x, savedGuideLines[i].y, savedGuideLines[i].size, savedGuideLines[i].padding, savedGuideLines[i].style);
		this.guideLines.push(guideLine);
		
		if(savedGuideLines[i].hidden)
		{
			guideLine.visibility = false;
			guideLine.visibilityUI.element.style.backgroundPositionY = "-24px";
		}
		
		if(savedGuideLines[i].selected)
		{
			this.multipleSelection.addSelection(guideLine);
			
			guideLine.textDrawItemUI.element.classList.add("currentTextDrawItem");
		}
		
		if(this.lastLoad)
			this.lastLoad.push(guideLine);
	}
	
	let savedHistory = savedProject.history ?? [];
	
	if(!noLoadHistory && savedHistory.length > 1)
	{
		this.history = [];
		this.historyIdx = savedProject.historyIdx ?? 0;
		
		for(let i = 0; i < savedHistory.length; i++)
		{
			this.history.push(new HistoryData(HistoryTypeById[savedHistory[i].type], this, savedHistory[i]));
		}
	}
	else
	{
		this.history[0].selections = this.getSelectionsByInternalId();
	}
	
	return this;
};

Project.prototype.saveProject = function(noSaveHistory)
{
	let savedTextDraws = [];
	
	for(let i = 0; i < this.textDrawList.length; i++)
	{
		let savedTextDraw = {};
		
		this.textDrawList[i].copyTextDraw(savedTextDraw);
		
		if(noSaveHistory)
			savedTextDraw.internalId = undefined;
		
		if(!this.textDrawList[i].visibility)
			savedTextDraw.hidden = true;
		
		if(this.multipleSelection.isSelected(this.textDrawList[i]))
			savedTextDraw.selected = true;
		
		savedTextDraws.push(savedTextDraw);
	}
	
	let savedGuideGrids = [];
	
	for(let i = 0; i < this.guideGrids.length; i++)
	{
		let savedGuideGrid = {};
		
		this.guideGrids[i].copyGuideGrid(savedGuideGrid);
		
		if(noSaveHistory)
			savedGuideGrid.internalId = undefined;
		
		if(!this.guideGrids[i].visibility)
			savedGuideGrid.hidden = true;
		
		if(this.multipleSelection.isSelected(this.guideGrids[i]))
			savedGuideGrid.selected = true;
		
		savedGuideGrids.push(savedGuideGrid);
	}
	
	let savedGuideLines = [];
	
	for(let i = 0; i < this.guideLines.length; i++)
	{
		let savedGuideLine = {};
		
		this.guideLines[i].copyGuideLine(savedGuideLine);
		
		if(noSaveHistory)
			savedGuideLine.internalId = undefined;
		
		if(!this.guideLines[i].visibility)
			savedGuideLine.hidden = true;
		
		if(this.multipleSelection.isSelected(this.guideLines[i]))
			savedGuideLine.selected = true;
		
		savedGuideLines.push(savedGuideLine);
	}
	
	let savedHistory = [];
	let historyIdx = 0;
	
	if(!noSaveHistory && this.history.length > 1)
	{
		for(let i = 0; i < this.history.length; i++)
		{
			let savedHistoryData = {};
			
			this.history[i].copyHistoryData(savedHistoryData);
			
			savedHistory.push(savedHistoryData);
		}
		
		historyIdx = this.historyIdx;
	}
	
	return {internalIdCounter: this.internalIdCounter, textDraws: savedTextDraws, guideGrids: savedGuideGrids, guideLines: savedGuideLines, history: savedHistory, historyIdx: historyIdx};
};

Project.prototype.findInternalId = function(internalId)
{
	if(internalId == 0)
		return this.multipleSelection;
	
	for(let i = 0; i < this.textDrawList.length; i++)
	{
		if(this.textDrawList[i].internalId == internalId)
			return this.textDrawList[i];
	}
	
	for(let i = 0; i < this.guideGrids.length; i++)
	{
		if(this.guideGrids[i].internalId == internalId)
			return this.guideGrids[i];
	}
	
	for(let i = 0; i < this.guideLines.length; i++)
	{
		if(this.guideLines[i].internalId == internalId)
			return this.guideLines[i];
	}
	
	return null;
};

Project.prototype.getSelectionsByInternalId = function()
{
	let selections = [];
	
	for(let i = 0; i < this.multipleSelection.selections.length; i++)
	{
		selections.push(this.multipleSelection.selections[i].internalId);
	}
	
	return selections;
};

Project.prototype.setSelectionsByInternalId = function(selections)
{
	this.multipleSelection = new MultipleSelection(main);
	
	for(let i = 0; i < selections.length; i++)
	{
		let anyObject = this.findInternalId(selections[i]);
		
		if(anyObject)
		{
			this.multipleSelection.addSelection(anyObject);
		}
	}
};

Project.prototype.updateHistoryData = function(type, anyObject)
{
	if(!anyObject)
		anyObject = this.getCurrentAnyObject();
	
	if(anyObject)
	{
		if(this.unpushedHistoryData)
		{
			if(this.unpushedHistoryData.type == type && this.unpushedHistoryData.internalId == anyObject.internalId)
			{
				this.unpushedHistoryData.updateNewValue(this, anyObject);
				return;
			}
			
			this.pushHistoryData();
		}
		
		this.unpushedHistoryData = new HistoryData(type, this, anyObject);
		
		if(this.historyIdx == 0)
			this.historyBeginningSels = this.getSelectionsByInternalId();
	}
};

Project.prototype.checkAndPushHistoryData = function(type, anyObject)
{
	let ret = false;
	
	if(!anyObject)
		anyObject = this.getCurrentAnyObject();
	
	if(anyObject)
	{
		if(this.unpushedHistoryData)
		{
			if(this.unpushedHistoryData.type == type && this.unpushedHistoryData.internalId == anyObject.internalId)
			{
				ret = this.pushHistoryData();
			}
		}
	}
	
	return ret;
};

Project.prototype.pushHistoryData = function()
{
	let ret = false;
	
	if(this.unpushedHistoryData)
	{
		if(this.unpushedHistoryData.isValueChanged())
		{
			if(this.historyIdx == 0)
				this.history[0].selections = this.historyBeginningSels;
			
			this.unpushedHistoryData.selections = this.getSelectionsByInternalId();
			this.history.length = this.historyIdx + 1;
			this.history.push(this.unpushedHistoryData);
			this.historyIdx = this.history.length - 1;
			
			ret = true;
		}
		
		this.unpushedHistoryData = null;
	}
	
	return ret;
};

Project.prototype.applyHistoryData = function(historyData)
{
	let historyIdx = this.history.indexOf(historyData);
	
	if(historyIdx != -1)
	{
		if(this.historyIdx > historyIdx)
		{
			for(let i = this.historyIdx; i > historyIdx; i--)
			{
				if(this.history[i].type.setSelections)
					this.setSelectionsByInternalId(this.history[i].selections);
				
				this.history[i].applyOldValue(this);
			}
		}
		else
		{
			for(let i = this.historyIdx; i < historyIdx; i++)
			{
				if(this.history[i + 1].type.setSelections)
					this.setSelectionsByInternalId(this.history[i + 1].selections);
				
				this.history[i + 1].applyNewValue(this);
			}
		}
		
		this.setSelectionsByInternalId(this.history[historyIdx].selections);
		
		this.historyIdx = historyIdx;
	}
};

Project.prototype.clearHistoryData = function()
{
	this.history = [new HistoryData(HistoryType.Beginning, this, {internalId: -1})];
	this.historyIdx = 0;
	this.unpushedHistoryData = null;
	this.historyBeginningSels = [];
};

Project.prototype.historyTextDrawCreate = function(internalId, funcname, oldValue, newValue)
{
	if(funcname == "applyNewValue")
	{
		let textDraw = new TextDraw(this.main, internalId, this.getNewName("TextDraw", this.textDrawList), newValue[0], newValue[1], newValue[2]);
		this.textDrawList.push(textDraw);
	}
};

Project.prototype.historyTextDrawDuplicate = function(internalId, funcname, oldValue, newValue)
{
	if(funcname == "applyNewValue")
	{
		let fromTextDraw = this.findInternalId(newValue[3]);
		
		if(fromTextDraw)
		{
			let copiedTextDraw = {};
			fromTextDraw.copyTextDraw(copiedTextDraw);
			copiedTextDraw.width = fromTextDraw.getRectRight() - fromTextDraw.getRectLeft();
			copiedTextDraw.height = fromTextDraw.getRectBottom() - fromTextDraw.getRectTop();
			
			let textDraw = new TextDraw(this.main, internalId, this.getNewName("TextDraw", this.textDrawList), newValue[0], newValue[1], newValue[2]);
			textDraw.fromTextDraw(copiedTextDraw);
			this.textDrawList.push(textDraw);
		}
	}
};

Project.prototype.historyTextDrawFromAnotherPoject = function(internalId, funcname, oldValue, newValue)
{
	if(funcname == "applyNewValue")
	{
		let textDraw = new TextDraw(this.main, internalId, this.getNewName("TextDraw", this.textDrawList), newValue[0], newValue[1], newValue[2]);
		
		textDraw.letterSizeX = newValue[3];
		textDraw.letterSizeY = newValue[4];
		textDraw.textSizeX = newValue[5];
		textDraw.textSizeY = newValue[6];
		textDraw.alignment = newValue[7];
		textDraw.color = newValue[8];
		textDraw.useBox = newValue[9];
		textDraw.boxColor = newValue[10];
		textDraw.setShadow = newValue[11];
		textDraw.setOutline = newValue[12];
		textDraw.backgroundColor = newValue[13];
		textDraw.font = newValue[14];
		textDraw.setProportional = newValue[15];
		
		this.textDrawList.push(textDraw);
	}
};

Project.prototype.historyTextDrawRemove = function(internalId, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue")
	{
		let textDraw = new TextDraw(this.main, internalId, newValue[0], newValue[1], newValue[2], newValue[3]);
		
		textDraw.letterSizeX = newValue[4];
		textDraw.letterSizeY = newValue[5];
		textDraw.textSizeX = newValue[6];
		textDraw.textSizeY = newValue[7];
		textDraw.alignment = newValue[8];
		textDraw.color = newValue[9];
		textDraw.useBox = newValue[10];
		textDraw.boxColor = newValue[11];
		textDraw.setShadow = newValue[12];
		textDraw.setOutline = newValue[13];
		textDraw.backgroundColor = newValue[14];
		textDraw.font = newValue[15];
		textDraw.setProportional = newValue[16];
		textDraw.setVisibility(newValue[17]);
		
		this.textDrawList.splice(newValue[18], 0, textDraw);
	}
};

Project.prototype.historyGuideGridCreate = function(internalId, funcname, oldValue, newValue)
{
	if(funcname == "applyNewValue")
	{
		let guideGrid = new GuideGrid(this.main, internalId, this.getNewName("GuideGrid", this.guideGrids), newValue[0], newValue[1], newValue[2], newValue[3], newValue[4], newValue[5], newValue[6], newValue[7]);
		this.guideGrids.push(guideGrid);
	}
};

Project.prototype.historyGuideGridRemove = function(internalId, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue")
	{
		let guideGrid = new GuideGrid(this.main, internalId, newValue[0], newValue[1], newValue[2], newValue[3], newValue[4], newValue[5], newValue[6], newValue[7], newValue[8]);
		guideGrid.setVisibility(newValue[9]);
		this.guideGrids.splice(newValue[10], 0, guideGrid);
	}
};

Project.prototype.historyGuideLineCreate = function(internalId, funcname, oldValue, newValue)
{
	if(funcname == "applyNewValue")
	{
		let guideLine = new GuideLine(this.main, internalId, this.getNewName("GuideLine", this.guideLines), newValue[0], newValue[1], newValue[2], newValue[3], newValue[4]);
		this.guideLines.push(guideLine);
	}
};

Project.prototype.historyGuideLineRemove = function(internalId, funcname, oldValue, newValue)
{
	if(funcname == "applyOldValue")
	{
		let guideLine = new GuideLine(this.main, internalId, newValue[0], newValue[1], newValue[2], newValue[3], newValue[4], newValue[5]);
		guideLine.setVisibility(newValue[6]);
		this.guideLines.splice(newValue[7], 0, guideLine);
	}
};
