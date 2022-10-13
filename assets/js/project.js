
function Project(main)
{
	this.main = main;
	
	this.projectTabUI = new EntityUI(main.scrollableTabsUI, "div", {class: "projectTab", onclick: () => { main.changeProject(this); }, contextmenu: (e) => { main.contextMenuProject(this, e.clientX, e.clientY); e.preventDefault(); }});
	this.thumbnailUI = new DrawableUI(this.projectTabUI, { width: "64", height: "64" });
	
	this.textDrawList = [];
	this.guideGrids = [];
	this.guideLines = [];
	
	this.multipleSelection = new MultipleSelection(main);
}

Project.prototype.createTextDraw = function(text, x, y)
{
	let textDraw = new TextDraw(this.main, this.getNewName("TextDraw", this.textDrawList), text, x, y);
	this.textDrawList.push(textDraw);
	return textDraw;
};

Project.prototype.createGuideGrid = function(x, y, width, height, margin, padding, columns, rows)
{
	let guideGrid = new GuideGrid(this.main, this.getNewName("GuideGrid", this.guideGrids), x, y, width, height, margin, padding, columns, rows);
	this.guideGrids.push(guideGrid);
	return guideGrid;
};

Project.prototype.createGuideLine = function(x, y, size, margin, style)
{
	let guideLine = new GuideLine(this.main, this.getNewName("GuideLine", this.guideLines), x, y, size, margin, style);
	this.guideLines.push(guideLine);
	return guideLine;
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

Project.prototype.loadProject = function(savedProject)
{
	let savedTextDraws = savedProject.textDraws ?? [];
	
	for(let i = 0; i < savedTextDraws.length; i++)
	{
		let textDraw = new TextDraw(this.main, savedTextDraws[i].name, savedTextDraws[i].text, savedTextDraws[i].x, savedTextDraws[i].y);
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
	}
	
	let savedGuideGrids = savedProject.guideGrids ?? [];
	
	for(let i = 0; i < savedGuideGrids.length; i++)
	{
		let guideGrid = new GuideGrid(this.main, savedGuideGrids[i].name, savedGuideGrids[i].x, savedGuideGrids[i].y, savedGuideGrids[i].width, savedGuideGrids[i].height, savedGuideGrids[i].margin, savedGuideGrids[i].padding, savedGuideGrids[i].rows, savedGuideGrids[i].columns);
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
	}
	
	let savedGuideLines = savedProject.guideLines ?? [];
	
	for(let i = 0; i < savedGuideLines.length; i++)
	{
		let guideLine = new GuideLine(this.main, savedGuideLines[i].name, savedGuideLines[i].x, savedGuideLines[i].y, savedGuideLines[i].size, savedGuideLines[i].padding, savedGuideLines[i].style);
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
	}
	
	return this;
};

Project.prototype.saveProject = function()
{
	let savedTextDraws = [];
	
	for(let i = 0; i < this.textDrawList.length; i++)
	{
		let savedTextDraw = {};
		
		this.textDrawList[i].copyTextDraw(savedTextDraw);
		
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
		
		if(!this.guideLines[i].visibility)
			savedGuideLine.hidden = true;
		
		if(this.multipleSelection.isSelected(this.guideLines[i]))
			savedGuideLine.selected = true;
		
		savedGuideLines.push(savedGuideLine);
	}
	
	return {textDraws: savedTextDraws, guideGrids: savedGuideGrids, guideLines: savedGuideLines};
};
