
function Project(main)
{
	this.main = main;
	
	this.projectTabUI = new EntityUI(main.scrollableTabsUI, "div", {class: "projectTab", onclick: () => { main.changeProject(this); }, contextmenu: (e) => { main.contextMenuProject(this, e.clientX, e.clientY); e.preventDefault(); }});
	this.thumbnailUI = new DrawableUI(this.projectTabUI, { width: "64", height: "64" });
	
	this.textDrawList = [];
	this.currentTextDraw = null;
	
	this.guideGrids = [];
	this.currentGuideGrid = null;
	
	this.guideLines = [];
	this.currentGuideLine = null;
	
	this.currentAnyObject = null;
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
