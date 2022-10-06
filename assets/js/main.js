
let main = null;

window.onload = function()
{
	main = new Main();
};

function Main()
{
	this.contextMenuUI = null;
	this.dialogsUI = [];
	
	this.mainUI = new EntityUI("body", "div", {id: "main"});
	
	this.tabsUI = new EntityUI(this.mainUI, "div", {id: "tabs"});
	this.controlsUI = new EntityUI(this.mainUI, "div", {id: "controls"});
	this.screenUI = new EntityUI(this.mainUI, "div", {id: "screen"});
	
	this.scrollableTabsUI = new EntityUI(this.tabsUI, "div", {class: ["scrollable", "scrollbarThin"]});
	this.scrollableControlsUI = new EntityUI(this.controlsUI, "div", {class: ["scrollable", "scrollbarThin"]});
	this.scrollableScreenUI = new EntityUI(this.screenUI, "div", {class: "scrollable"});
	
	this.addProjectTabUI = new EntityUI(this.scrollableTabsUI, "div", {class: "addProjectTab", onclick: (e) => { this.addProject(); }});
	
	this.scrollableControlsUI.appendSpacing();
	this.controlListUI = new EntityUI(this.scrollableControlsUI, "div", {class: "textDrawList"});
	this.scrollableControlsUI.appendStaticLine();
	
	this.textDrawControlsUI = new EntityUI(this.scrollableControlsUI, "div", {style: {display: "none"}});
	this.guideGridControlsUI = new EntityUI(this.scrollableControlsUI, "div", {style: {display: "none"}});
	this.guideLineControlsUI = new EntityUI(this.scrollableControlsUI, "div", {style: {display: "none"}});
	this.multipleControlsUI = new EntityUI(this.scrollableControlsUI, "div", {style: {display: "none"}});
	
	this.textDrawControlsUI.appendStaticText("Name");
	this.textDrawControlsUI.appendLineBreak();
	this.controlNameUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.nameChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Text");
	this.textDrawControlsUI.appendLineBreak();
	this.controlTextUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.textChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Position");
	this.textDrawControlsUI.appendLineBreak();
	this.controlXUI = new TextBoxUI(this.textDrawControlsUI, {class: "textBoxLeft", keyup: (e) => { this.xChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.controlYUI = new TextBoxUI(this.textDrawControlsUI, {class: "textBoxRight", keyup: (e) => { this.yChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Letter Size");
	this.textDrawControlsUI.appendLineBreak();
	this.controlLetterSizeXUI = new TextBoxUI(this.textDrawControlsUI, {class: "textBoxLeft", keyup: (e) => { this.letterSizeXChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.controlLetterSizeYUI = new TextBoxUI(this.textDrawControlsUI, {class: "textBoxRight", keyup: (e) => { this.letterSizeYChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Text Size");
	this.textDrawControlsUI.appendLineBreak();
	this.controlTextSizeXUI = new TextBoxUI(this.textDrawControlsUI, {class: "textBoxLeft", keyup: (e) => { this.textSizeXChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.controlTextSizeYUI = new TextBoxUI(this.textDrawControlsUI, {class: "textBoxRight", keyup: (e) => { this.textSizeYChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Alignment");
	this.textDrawControlsUI.appendLineBreak();
	this.controlAlignmentUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.alignmentChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Color");
	this.textDrawControlsUI.appendLineBreak();
	this.controlColorUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.colorChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Use Box");
	this.textDrawControlsUI.appendLineBreak();
	this.controlUseBoxUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.useBoxChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Box Color");
	this.textDrawControlsUI.appendLineBreak();
	this.controlBoxColorUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.boxColorChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Set Shadow");
	this.textDrawControlsUI.appendLineBreak();
	this.controlSetShadowUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.setShadowChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Set Outline");
	this.textDrawControlsUI.appendLineBreak();
	this.controlSetOutlineUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.setOutlineChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Background Color");
	this.textDrawControlsUI.appendLineBreak();
	this.controlBackgroundColorUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.backgroundColorChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Font");
	this.textDrawControlsUI.appendLineBreak();
	this.controlFontUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.fontChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendLineBreak();
	this.textDrawControlsUI.appendStaticText("Set Proportional");
	this.textDrawControlsUI.appendLineBreak();
	this.controlSetProportionalUI = new TextBoxUI(this.textDrawControlsUI, {keyup: (e) => { this.setProportionalChange(e); }, focusout: (e) => { this.repaintThumbnail(); this.saveProjects(); }});
	this.textDrawControlsUI.appendStaticLine();
	this.controlTxdUI = new ButtonUI(this.textDrawControlsUI, {innerText: "Texture Dictionary", onclick: (e) => { this.showTextureDictionaryDialog(); }});
	
	this.guideGridControlsUI.appendStaticText("Name");
	this.guideGridControlsUI.appendLineBreak();
	this.controlGuideGridNameUI = new TextBoxUI(this.guideGridControlsUI, {keyup: (e) => { this.guideGridNameChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.guideGridControlsUI.appendLineBreak();
	this.guideGridControlsUI.appendStaticText("Position");
	this.guideGridControlsUI.appendLineBreak();
	this.controlGuideGridXUI = new TextBoxUI(this.guideGridControlsUI, {class: "textBoxLeft", keyup: (e) => { this.guideGridXChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.controlGuideGridYUI = new TextBoxUI(this.guideGridControlsUI, {class: "textBoxRight", keyup: (e) => { this.guideGridYChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.guideGridControlsUI.appendLineBreak();
	this.guideGridControlsUI.appendStaticText("Size");
	this.guideGridControlsUI.appendLineBreak();
	this.controlGuideGridWidthUI = new TextBoxUI(this.guideGridControlsUI, {class: "textBoxLeft", keyup: (e) => { this.guideGridWidthChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.controlGuideGridHeightUI = new TextBoxUI(this.guideGridControlsUI, {class: "textBoxRight", keyup: (e) => { this.guideGridHeightChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.guideGridControlsUI.appendLineBreak();
	this.guideGridControlsUI.appendStaticText("Margin / Padding");
	this.guideGridControlsUI.appendLineBreak();
	this.controlGuideGridMarginUI = new TextBoxUI(this.guideGridControlsUI, {class: "textBoxLeft", keyup: (e) => { this.guideGridMarginChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.controlGuideGridPaddingUI = new TextBoxUI(this.guideGridControlsUI, {class: "textBoxRight", keyup: (e) => { this.guideGridPaddingChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.guideGridControlsUI.appendLineBreak();
	this.guideGridControlsUI.appendStaticText("Rows / Columns");
	this.guideGridControlsUI.appendLineBreak();
	this.controlGuideGridRowsUI = new TextBoxUI(this.guideGridControlsUI, {class: "textBoxLeft", keyup: (e) => { this.guideGridRowsChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.controlGuideGridColumnsUI = new TextBoxUI(this.guideGridControlsUI, {class: "textBoxRight", keyup: (e) => { this.guideGridColumnsChange(e); }, focusout: (e) => { this.saveProjects(); }});
	
	this.guideLineControlsUI.appendStaticText("Name");
	this.guideLineControlsUI.appendLineBreak();
	this.controlGuideLineNameUI = new TextBoxUI(this.guideLineControlsUI, {keyup: (e) => { this.guideLineNameChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.guideLineControlsUI.appendLineBreak();
	this.guideLineControlsUI.appendStaticText("Position");
	this.guideLineControlsUI.appendLineBreak();
	this.controlGuideLineXUI = new TextBoxUI(this.guideLineControlsUI, {class: "textBoxLeft", keyup: (e) => { this.guideLineXChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.controlGuideLineYUI = new TextBoxUI(this.guideLineControlsUI, {class: "textBoxRight", keyup: (e) => { this.guideLineYChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.guideLineControlsUI.appendLineBreak();
	this.guideLineControlsUI.appendStaticText("Size");
	this.guideLineControlsUI.appendLineBreak();
	this.controlGuideLineSizeUI = new TextBoxUI(this.guideLineControlsUI, {keyup: (e) => { this.guideLineSizeChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.guideLineControlsUI.appendLineBreak();
	this.guideLineControlsUI.appendStaticText("Padding");
	this.guideLineControlsUI.appendLineBreak();
	this.controlGuideLinePaddingUI = new TextBoxUI(this.guideLineControlsUI, {keyup: (e) => { this.guideLinePaddingChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.guideLineControlsUI.appendLineBreak();
	this.guideLineControlsUI.appendStaticText("Style");
	this.guideLineControlsUI.appendLineBreak();
	this.controlGuideLineStyleUI = new ListBoxUI(this.guideLineControlsUI, {change: (e) => { this.guideLineStyleChange(e); }, focusout: (e) => { this.saveProjects(); }});
	this.controlGuideLineStyleUI.appendOption("Horizontal");
	this.controlGuideLineStyleUI.appendOption("Vertical");
	
	this.multipleControlsUI.appendStaticText("Position");
	this.multipleControlsUI.appendLineBreak();
	this.controlMultipleXUI = new TextBoxUI(this.multipleControlsUI, {class: "textBoxLeft", keyup: (e) => { this.multipleXChange(e); }, focusout: (e) => { this.repaintedThumbnailAll = false; this.repaint(); this.saveProjects(); }});
	this.controlMultipleYUI = new TextBoxUI(this.multipleControlsUI, {class: "textBoxRight", keyup: (e) => { this.multipleYChange(e); }, focusout: (e) => { this.repaintedThumbnailAll = false; this.repaint(); this.saveProjects(); }});
	this.multipleControlsUI.appendLineBreak();
	this.multipleControlsUI.appendStaticText("Size");
	this.multipleControlsUI.appendLineBreak();
	this.controlMultipleWidthUI = new TextBoxUI(this.multipleControlsUI, {class: "textBoxLeft", keyup: (e) => { this.multipleWidthChange(e); }, focusout: (e) => { this.repaintedThumbnailAll = false; this.repaint(); this.saveProjects(); }});
	this.controlMultipleHeightUI = new TextBoxUI(this.multipleControlsUI, {class: "textBoxRight", keyup: (e) => { this.multipleHeightChange(e); }, focusout: (e) => { this.repaintedThumbnailAll = false; this.repaint(); this.saveProjects(); }});
	
	this.scrollableControlsUI.appendStaticLine();
	this.control640x480UI = new ButtonUI(this.scrollableControlsUI, {innerText: "640x480", onclick: (e) => { this.screenshotChange("./assets/images/640x480.png"); }});
	this.scrollableControlsUI.appendLineBreak();
	this.control800x600UI = new ButtonUI(this.scrollableControlsUI, {innerText: "800x600", onclick: (e) => { this.screenshotChange("./assets/images/800x600.png"); }});
	this.scrollableControlsUI.appendLineBreak();
	this.control1024x768UI = new ButtonUI(this.scrollableControlsUI, {innerText: "1024x768", onclick: (e) => { this.screenshotChange("./assets/images/1024x768.png"); }});
	this.scrollableControlsUI.appendLineBreak();
	this.controlCustomUI = new FileBoxUI(this.scrollableControlsUI, {accept: "image/*", onchange: (e) => { this.screenshotCustom(e); }});
	this.scrollableControlsUI.appendSpacing();
	
	this.screenshotUI = new ScreenshotUI(this.scrollableScreenUI, {});
	this.screenshotUI.repaint = this.repaint.bind(this);
	
	this.font1UI = new FontUI(null, 1, {});
	this.font1UI.repaint = this.repaint.bind(this);
	
	this.font2UI = new FontUI(null, 2, {}); 
	this.font2UI.repaint = this.repaint.bind(this);
	
	this.belowTextDrawUI = new TextDrawUI(this.scrollableScreenUI, {});
	this.boxTextDrawUI = new TextDrawUI(this.scrollableScreenUI, {});
	this.currentTextDrawUI = new TextDrawUI(this.scrollableScreenUI, {});
	this.aboveTextDrawUI = new TextDrawUI(this.scrollableScreenUI, {});
	
	this.optionsUI = new OptionsUI(this.scrollableScreenUI, {contextmenu: (e) => { this.contextMenuScreen(e.clientX, e.clientY); e.preventDefault(); }});
	this.optionsUI.repaint = this.repaint.bind(this);
	
	this.projects = [];
	this.currentProject = null;
	this.saveProjectsEnabled = false;
	
	this.repaintedThumbnailAll = true;
	
	this.loadProjects();
	
	if(this.projects.length == 0)
		this.addProject();
	
	this.movingAnyObject = false;
	this.movingAnyObjectList = [];
	this.movingAnyObjectIdx = -1;
	
	this.clicked = false;
	this.clickLeft = false;
	this.clickTop = false;
	this.clickRight = false;
	this.clickBottom = false;
	this.clickOption = "resize";
	
	window.addEventListener("mousedown", (e) => { this.checkMouse(e, true, false); });
	window.addEventListener("mouseup", (e) => { this.checkMouse(e, false, true); });
	window.addEventListener("mousemove", (e) => { this.checkMouse(e, false, false); });
	window.addEventListener("resize", (e) => { this.checkScrollBars(e); this.dialogsUI.forEach(dialogUI => dialogUI.move(dialogUI.element.offsetLeft, dialogUI.element.offsetTop)); });
	
	this.checkScrollBars();
	
	TextureDictionary.updateEventListeners.push(this.repaint.bind(this));
}

Main.prototype.addProject = function()
{
	let project = new Project(this);
	
	let textDraw = project.createTextDraw("Example", 10, 10);
	
	project.multipleSelection = new MultipleSelection(this);
	project.multipleSelection.addSelection(textDraw);
	
	this.projects.push(project);
	
	this.changeProject(project);
	this.changeTextDraw(textDraw);
	
	this.checkScrollBars();
};

Main.prototype.removeProject = function(project)
{
	for(let i = 0; i < this.projects.length; i++)
	{
		if(this.projects[i] == project)
		{
			this.projects.splice(i, 1);
			break;
		}
	}
	
	project.projectTabUI.remove();
	
	if(this.currentProject == project)
	{
		this.changeProject(null);
	}
};

Main.prototype.changeProject = function(project)
{
	if(this.currentProject == project && project.projectTabUI.element.classList.contains("currentProjectTab"))
		return;
	
	if(this.currentProject)
		this.currentProject.projectTabUI.element.classList.remove("currentProjectTab");
	
	this.currentProject = project;
	
	if(this.currentProject)
		this.currentProject.projectTabUI.element.classList.add("currentProjectTab");
	
	if(project)
	{
		if(project.getCurrentTextDraw())
		{
			this.textDrawControlsUI.element.style.display = "";
			this.guideGridControlsUI.element.style.display = "none";
			this.guideLineControlsUI.element.style.display = "none";
			this.multipleControlsUI.element.style.display = "none";
		}
		else if(project.getCurrentGuideGrid())
		{
			this.textDrawControlsUI.element.style.display = "none";
			this.guideGridControlsUI.element.style.display = "";
			this.guideLineControlsUI.element.style.display = "none";
			this.multipleControlsUI.element.style.display = "none";
		}
		else if(project.getCurrentGuideLine())
		{
			this.textDrawControlsUI.element.style.display = "none";
			this.guideGridControlsUI.element.style.display = "none";
			this.guideLineControlsUI.element.style.display = "";
			this.multipleControlsUI.element.style.display = "none";
		}
		else if(project.multipleSelection.selections.length > 1)
		{
			this.textDrawControlsUI.element.style.display = "none";
			this.guideGridControlsUI.element.style.display = "none";
			this.guideLineControlsUI.element.style.display = "none";
			this.multipleControlsUI.element.style.display = "";
		}
		else
		{
			this.textDrawControlsUI.element.style.display = "";
			this.guideGridControlsUI.element.style.display = "none";
			this.guideLineControlsUI.element.style.display = "none";
			this.multipleControlsUI.element.style.display = "none";
		}
	}
	else
	{
		this.textDrawControlsUI.element.style.display = "";
		this.guideGridControlsUI.element.style.display = "none";
		this.guideLineControlsUI.element.style.display = "none";
		this.multipleControlsUI.element.style.display = "none";
	}
	
	this.saveProjectsEnabled = true;
	this.saveProjects();
	
	this.updateControlList();
	this.updateControls();
	this.updateGuideGridControls();
	this.updateGuideLineControls();
	this.updateMultipleControls();
	
	this.checkScrollBars();
	
	this.repaint();
	
	this.saveProjectsEnabled = true;
	this.saveProjects();
};

Main.prototype.loadProjects = function()
{
	let json = window.localStorage.getItem("save");
	
	if(json)
	{
		let saved = JSON.parse(json);
		
		let savedProjects = saved.projects;
		let savedCurrentProjectIdx = saved.currentProjectIdx;
		
		for(let i = 0; i < savedProjects.length; i++)
		{
			let project = new Project(this);
			
			let savedTextDraws = savedProjects[i].textDraws;
			let savedCurrentTextDrawIdx = savedProjects[i].currentTextDrawIdx;
			
			for(let j = 0; j < savedTextDraws.length; j++)
			{
				let textDraw = new TextDraw(this, savedTextDraws[j].name, savedTextDraws[j].text, savedTextDraws[j].x, savedTextDraws[j].y);
				project.textDrawList.push(textDraw);
				textDraw.fromTextDraw(savedTextDraws[j]);
				
				if(savedTextDraws[j].hidden)
				{
					textDraw.visibility = false;
					textDraw.visibilityUI.element.style.backgroundPositionY = "-24px";
				}
				
				if(j == savedCurrentTextDrawIdx)
				{
					project.multipleSelection = new MultipleSelection(this);
					project.multipleSelection.addSelection(textDraw);
					
					textDraw.textDrawItemUI.element.classList.add("currentTextDrawItem");
					
					if(i == savedCurrentProjectIdx)
					{
						this.textDrawControlsUI.element.style.display = "";
						this.guideGridControlsUI.element.style.display = "none";
						this.guideLineControlsUI.element.style.display = "none";
						this.multipleControlsUI.element.style.display = "none";
					}
				}
				else if(savedTextDraws[j].selected)
				{
					project.multipleSelection.addSelection(textDraw);
					
					textDraw.textDrawItemUI.element.classList.add("currentTextDrawItem");
					
					if(i == savedCurrentProjectIdx)
					{
						this.textDrawControlsUI.element.style.display = "none";
						this.guideGridControlsUI.element.style.display = "none";
						this.guideLineControlsUI.element.style.display = "none";
						this.multipleControlsUI.element.style.display = "";
					}
				}
			}
			
			let savedGuideGrids = savedProjects[i].guideGrids ?? [];
			let savedCurrentGuideGridIdx = savedProjects[i].currentGuideGridIdx ?? -1;
			
			for(let j = 0; j < savedGuideGrids.length; j++)
			{
				let guideGrid = new GuideGrid(this, savedGuideGrids[j].name, savedGuideGrids[j].x, savedGuideGrids[j].y, savedGuideGrids[j].width, savedGuideGrids[j].height, savedGuideGrids[j].margin, savedGuideGrids[j].padding, savedGuideGrids[j].rows, savedGuideGrids[j].columns);
				project.guideGrids.push(guideGrid);
				
				if(savedGuideGrids[j].hidden)
				{
					guideGrid.visibility = false;
					guideGrid.visibilityUI.element.style.backgroundPositionY = "-24px";
				}
				
				if(j == savedCurrentGuideGridIdx)
				{
					project.multipleSelection = new MultipleSelection(this);
					project.multipleSelection.addSelection(guideGrid);
					
					guideGrid.textDrawItemUI.element.classList.add("currentTextDrawItem");
					
					if(i == savedCurrentProjectIdx)
					{
						this.textDrawControlsUI.element.style.display = "none";
						this.guideGridControlsUI.element.style.display = "";
						this.guideLineControlsUI.element.style.display = "none";
						this.multipleControlsUI.element.style.display = "none";
					}
				}
				else if(savedGuideGrids[j].selected)
				{
					project.multipleSelection.addSelection(guideGrid);
					
					guideGrid.textDrawItemUI.element.classList.add("currentTextDrawItem");
					
					if(i == savedCurrentProjectIdx)
					{
						this.textDrawControlsUI.element.style.display = "none";
						this.guideGridControlsUI.element.style.display = "none";
						this.guideLineControlsUI.element.style.display = "none";
						this.multipleControlsUI.element.style.display = "";
					}
				}
			}
			
			let savedGuideLines = savedProjects[i].guideLines ?? [];
			let savedCurrentGuideLineIdx = savedProjects[i].currentGuideLineIdx ?? -1;
			
			for(let j = 0; j < savedGuideLines.length; j++)
			{
				let guideLine = new GuideLine(this, savedGuideLines[j].name, savedGuideLines[j].x, savedGuideLines[j].y, savedGuideLines[j].size, savedGuideLines[j].padding, savedGuideLines[j].style);
				project.guideLines.push(guideLine);
				
				if(savedGuideLines[j].hidden)
				{
					guideLine.visibility = false;
					guideLine.visibilityUI.element.style.backgroundPositionY = "-24px";
				}
				
				if(j == savedCurrentGuideLineIdx)
				{
					project.multipleSelection = new MultipleSelection(this);
					project.multipleSelection.addSelection(guideLine);
					
					guideLine.textDrawItemUI.element.classList.add("currentTextDrawItem");
					
					if(i == savedCurrentProjectIdx)
					{
						this.textDrawControlsUI.element.style.display = "none";
						this.guideGridControlsUI.element.style.display = "none";
						this.guideLineControlsUI.element.style.display = "";
						this.multipleControlsUI.element.style.display = "none";
					}
				}
				else if(savedGuideGrids[j].selected)
				{
					project.multipleSelection.addSelection(guideLine);
					
					guideLine.textDrawItemUI.element.classList.add("currentTextDrawItem");
					
					if(i == savedCurrentProjectIdx)
					{
						this.textDrawControlsUI.element.style.display = "none";
						this.guideGridControlsUI.element.style.display = "none";
						this.guideLineControlsUI.element.style.display = "none";
						this.multipleControlsUI.element.style.display = "";
					}
				}
			}
			
			this.projects.push(project);
			
			if(i == savedCurrentProjectIdx)
			{
				this.currentProject = project;
				this.currentProject.projectTabUI.element.classList.add("currentProjectTab");
			}
		}
		
		this.updateControlList();
		this.updateControls();
		this.updateGuideGridControls();
		this.updateGuideLineControls();
		this.updateMultipleControls();
		
		this.repaintedThumbnailAll = false;
		
		this.repaint();
		
		this.checkScrollBars();
	}
};

Main.prototype.saveProjects = function()
{
	if(this.saveProjectsEnabled)
	{
		let savedProjects = [];
		let savedCurrentProjectIdx = -1;
		
		for(let i = 0; i < this.projects.length; i++)
		{
			let savedTextDraws = [];
			let savedCurrentTextDrawIdx = -1;
			
			for(let j = 0; j < this.projects[i].textDrawList.length; j++)
			{
				let savedTextDraw = {};
				
				this.projects[i].textDrawList[j].copyTextDraw(savedTextDraw);
				
				if(!this.projects[i].textDrawList[j].visibility)
					savedTextDraw.hidden = true;
				
				if(this.projects[i].multipleSelection.isSelected(this.projects[i].textDrawList[j]))
					savedTextDraw.selected = true;
				
				savedTextDraws.push(savedTextDraw);
				
				if(this.projects[i].textDrawList[j] == this.projects[i].getCurrentTextDraw())
					savedCurrentTextDrawIdx = j;
			}
			
			let savedGuideGrids = [];
			let savedCurrentGuideGridIdx = -1;
			
			for(let j = 0; j < this.projects[i].guideGrids.length; j++)
			{
				let savedGuideGrid = {};
				
				this.projects[i].guideGrids[j].copyGuideGrid(savedGuideGrid);
				
				if(!this.projects[i].guideGrids[j].visibility)
					savedGuideGrid.hidden = true;
				
				if(this.projects[i].multipleSelection.isSelected(this.projects[i].guideGrids[j]))
					savedGuideGrid.selected = true;
				
				savedGuideGrids.push(savedGuideGrid);
				
				if(this.projects[i].guideGrids[j] == this.projects[i].getCurrentGuideGrid())
					savedCurrentGuideGridIdx = j;
			}
			
			let savedGuideLines = [];
			let savedCurrentGuideLineIdx = -1;
			
			for(let j = 0; j < this.projects[i].guideLines.length; j++)
			{
				let savedGuideLine = {};
				
				this.projects[i].guideLines[j].copyGuideLine(savedGuideLine);
				
				if(!this.projects[i].guideLines[j].visibility)
					savedGuideLine.hidden = true;
				
				if(this.projects[i].multipleSelection.isSelected(this.projects[i].guideLines[j]))
					savedGuideLine.selected = true;
				
				savedGuideLines.push(savedGuideLine);
				
				if(this.projects[i].guideLines[j] == this.projects[i].getCurrentGuideLine())
					savedCurrentGuideLineIdx = j;
			}
			
			savedProjects.push({textDraws: savedTextDraws, currentTextDrawIdx: savedCurrentTextDrawIdx, guideGrids: savedGuideGrids, currentGuideGridIdx: savedCurrentGuideGridIdx, guideLines: savedGuideLines, currentGuideLineIdx: savedCurrentGuideLineIdx});
			
			if(this.projects[i] == this.currentProject)
				savedCurrentProjectIdx = i;
		}
		
		window.localStorage.setItem("save", JSON.stringify({projects: savedProjects, currentProjectIdx: savedCurrentProjectIdx}));
		
		this.saveProjectsEnabled = false;
	}
};

Main.prototype.createTextDraw = function(text, x, y, fromTextDraw)
{
	let textDraw = this.currentProject.createTextDraw(text, x, y);
	
	if(fromTextDraw)
		textDraw.fromTextDraw(fromTextDraw);
	
	this.updateControlList();
	this.changeTextDraw(textDraw);
};

Main.prototype.removeTextDraw = function (textDraw)
{
	for(let i = 0; i < this.currentProject.textDrawList.length; i++)
	{
		if(this.currentProject.textDrawList[i] == textDraw)
		{
			this.currentProject.textDrawList.splice(i, 1);
			break;
		}
	}
	
	textDraw.textDrawItemUI.remove();
	
	if(this.currentProject.getCurrentTextDraw() == textDraw)
	{
		this.changeTextDraw(null);
	}
	else
	{
		this.repaint();
		
		this.saveProjectsEnabled = true;
		this.saveProjects();
	}
};

Main.prototype.changeTextDraw = function(textDraw, notCheckOtherCurrent)
{
	if(!notCheckOtherCurrent)
	{
		if(this.currentProject.getCurrentGuideGrid())
			this.changeGuideGrid(null, true);
		
		if(this.currentProject.getCurrentGuideLine())
			this.changeGuideLine(null, true);
	}
	
	if(this.currentProject.getCurrentTextDraw() == textDraw && textDraw.textDrawItemUI.element.classList.contains("currentTextDrawItem"))
		return;
	
	for(let i = 0; i < this.currentProject.multipleSelection.selections.length; i++)
		this.currentProject.multipleSelection.selections[i].textDrawItemUI.element.classList.remove("currentTextDrawItem");
	
	this.currentProject.multipleSelection = new MultipleSelection(this);
	this.currentProject.multipleSelection.addSelection(textDraw);
	this.currentProject.multipleSelection.selectionLast = textDraw;
	
	if(this.currentProject.getCurrentTextDraw())
		this.currentProject.getCurrentTextDraw().textDrawItemUI.element.classList.add("currentTextDrawItem");
	
	this.updateControls();
	
	if(textDraw)
	{
		this.textDrawControlsUI.element.style.display = "";
		this.guideGridControlsUI.element.style.display = "none";
		this.guideLineControlsUI.element.style.display = "none";
		this.multipleControlsUI.element.style.display = "none";
	}
	
	this.checkScrollBars();
	
	this.repaint();
	
	this.saveProjectsEnabled = true;
	this.saveProjects();
};

Main.prototype.createGuideGrid = function(x, y, width, height, margin, padding, rows, columns)
{
	let guideGrid = this.currentProject.createGuideGrid(x, y, width, height, margin, padding, rows, columns);
	
	this.updateControlList();
	this.changeGuideGrid(guideGrid);
};

Main.prototype.removeGuideGrid = function(guideGrid)
{
	for(let i = 0; i < this.currentProject.guideGrids.length; i++)
	{
		if(this.currentProject.guideGrids[i] == guideGrid)
		{
			this.currentProject.guideGrids.splice(i, 1);
			break;
		}
	}
	
	guideGrid.textDrawItemUI.remove();
	
	if(this.currentProject.getCurrentGuideGrid() == guideGrid)
	{
		this.changeGuideGrid(null);
	}
	else
	{
		this.repaint();
		
		this.saveProjectsEnabled = true;
		this.saveProjects();
	}
};

Main.prototype.changeGuideGrid = function(guideGrid, notCheckOtherCurrent)
{
	if(!notCheckOtherCurrent)
	{
		if(this.currentProject.getCurrentTextDraw())
			this.changeTextDraw(null, true);
		
		if(this.currentProject.getCurrentGuideLine())
			this.changeGuideLine(null, true);
	}
	
	if(this.currentProject.getCurrentGuideGrid() == guideGrid && guideGrid.textDrawItemUI.element.classList.contains("currentTextDrawItem"))
		return;
	
	for(let i = 0; i < this.currentProject.multipleSelection.selections.length; i++)
		this.currentProject.multipleSelection.selections[i].textDrawItemUI.element.classList.remove("currentTextDrawItem");
	
	this.currentProject.multipleSelection = new MultipleSelection(this);
	this.currentProject.multipleSelection.addSelection(guideGrid);
	this.currentProject.multipleSelection.selectionLast = guideGrid;
	
	if(this.currentProject.getCurrentGuideGrid())
		this.currentProject.getCurrentGuideGrid().textDrawItemUI.element.classList.add("currentTextDrawItem");
	
	this.updateGuideGridControls();
	
	if(guideGrid)
	{
		this.textDrawControlsUI.element.style.display = "none";
		this.guideGridControlsUI.element.style.display = "";
		this.guideLineControlsUI.element.style.display = "none";
		this.multipleControlsUI.element.style.display = "none";
	}
	
	this.checkScrollBars();
	
	if(this.clickOption == "resize-letter")
		this.clickOption = "resize";
	
	this.repaint();
	
	this.saveProjectsEnabled = true;
	this.saveProjects();
};

Main.prototype.createGuideLine = function(x, y, size, padding, style)
{
	let guideGrid = this.currentProject.createGuideLine(x, y, size, padding, style);
	
	this.updateControlList();
	this.changeGuideLine(guideGrid);
};

Main.prototype.removeGuideLine = function(guideLine)
{
	for(let i = 0; i < this.currentProject.guideLines.length; i++)
	{
		if(this.currentProject.guideLines[i] == guideLine)
		{
			this.currentProject.guideLines.splice(i, 1);
			break;
		}
	}
	
	guideLine.textDrawItemUI.remove();
	
	if(this.currentProject.getCurrentGuideLine() == guideLine)
	{
		this.changeGuideLine(null);
	}
	else
	{
		this.repaint();
		
		this.saveProjectsEnabled = true;
		this.saveProjects();
	}
};

Main.prototype.changeGuideLine = function(guideLine, notCheckOtherCurrent)
{
	if(!notCheckOtherCurrent)
	{
		if(this.currentProject.getCurrentTextDraw())
			this.changeTextDraw(null, true);
		
		if(this.currentProject.getCurrentGuideGrid())
			this.changeGuideGrid(null, true);
	}
	
	if(this.currentProject.getCurrentGuideLine() == guideLine && guideLine.textDrawItemUI.element.classList.contains("currentTextDrawItem"))
		return;
	
	for(let i = 0; i < this.currentProject.multipleSelection.selections.length; i++)
		this.currentProject.multipleSelection.selections[i].textDrawItemUI.element.classList.remove("currentTextDrawItem");
	
	this.currentProject.multipleSelection = new MultipleSelection(this);
	this.currentProject.multipleSelection.addSelection(guideLine);
	this.currentProject.multipleSelection.selectionLast = guideLine;
	
	if(this.currentProject.getCurrentGuideLine())
		this.currentProject.getCurrentGuideLine().textDrawItemUI.element.classList.add("currentTextDrawItem");
	
	this.updateGuideLineControls();
	
	if(guideLine)
	{
		this.textDrawControlsUI.element.style.display = "none";
		this.guideGridControlsUI.element.style.display = "none";
		this.guideLineControlsUI.element.style.display = "";
		this.multipleControlsUI.element.style.display = "none";
	}
	
	this.checkScrollBars();
	
	if(this.clickOption == "resize-letter")
		this.clickOption = "resize";
	
	this.repaint();
	
	this.saveProjectsEnabled = true;
	this.saveProjects();
};

Main.prototype.adjacentAnyObject = function(anyObject, ctrlKey)
{
	let selectionLast = this.currentProject.multipleSelection.selectionLast;
	
	if(selectionLast == null)
		return this.toggleAnyObject(anyObject);
	
	if(!ctrlKey)
	{
		for(let i = 0; i < this.currentProject.multipleSelection.selections.length; i++)
			this.currentProject.multipleSelection.selections[i].textDrawItemUI.element.classList.remove("currentTextDrawItem");
		
		this.currentProject.multipleSelection = new MultipleSelection(this);
		this.currentProject.multipleSelection.selectionLast = selectionLast;
	}
	
	let selecting = false;
	
	for(let i = 0; i < this.currentProject.textDrawList.length; i++)
	{
		let textDraw = this.currentProject.textDrawList[i];
		
		if(textDraw == anyObject || textDraw == selectionLast)
		{
			selecting = !selecting;
			
			if(!this.currentProject.multipleSelection.isSelected(textDraw))
			{
				this.currentProject.multipleSelection.addSelection(textDraw);
				
				textDraw.textDrawItemUI.element.classList.add("currentTextDrawItem");
			}
		}
		else if(selecting)
		{
			if(!this.currentProject.multipleSelection.isSelected(textDraw))
			{
				this.currentProject.multipleSelection.addSelection(textDraw);
				
				textDraw.textDrawItemUI.element.classList.add("currentTextDrawItem");
			}
		}
	}
	
	for(let i = 0; i < this.currentProject.guideGrids.length; i++)
	{
		let guideGrid = this.currentProject.guideGrids[i];
		
		if(guideGrid == anyObject || guideGrid == selectionLast)
		{
			selecting = !selecting;
			
			if(!this.currentProject.multipleSelection.isSelected(guideGrid))
			{
				this.currentProject.multipleSelection.addSelection(guideGrid);
				
				guideGrid.textDrawItemUI.element.classList.add("currentTextDrawItem");
			}
		}
		else if(selecting)
		{
			if(!this.currentProject.multipleSelection.isSelected(guideGrid))
			{
				this.currentProject.multipleSelection.addSelection(guideGrid);
				
				guideGrid.textDrawItemUI.element.classList.add("currentTextDrawItem");
			}
		}
	}
	
	for(let i = 0; i < this.currentProject.guideLines.length; i++)
	{
		let guideLine = this.currentProject.guideLines[i];
		
		if(guideLine == anyObject || guideLine == selectionLast)
		{
			selecting = !selecting;
			
			if(!this.currentProject.multipleSelection.isSelected(guideLine))
			{
				this.currentProject.multipleSelection.addSelection(guideLine);
				
				guideLine.textDrawItemUI.element.classList.add("currentTextDrawItem");
			}
		}
		else if(selecting)
		{
			if(!this.currentProject.multipleSelection.isSelected(guideLine))
			{
				this.currentProject.multipleSelection.addSelection(guideLine);
				
				guideLine.textDrawItemUI.element.classList.add("currentTextDrawItem");
			}
		}
	}
	
	anyObject = this.currentProject.getCurrentAnyObject();
	
	if(anyObject)
	{
		if(anyObject instanceof TextDraw)
		{
			anyObject.textDrawItemUI.element.classList.remove("currentTextDrawItem");
			this.changeTextDraw(anyObject);
		}
		else if(anyObject instanceof GuideGrid)
		{
			anyObject.textDrawItemUI.element.classList.remove("currentTextDrawItem");
			this.changeGuideGrid(anyObject);
		}
		else if(anyObject instanceof GuideLine)
		{
			anyObject.textDrawItemUI.element.classList.remove("currentTextDrawItem");
			this.changeGuideLine(anyObject);
		}
		else
		{
			this.updateMultipleControls();
			
			this.saveProjectsEnabled = true;
			this.saveProjects();
			this.textDrawControlsUI.element.style.display = "none";
			this.guideGridControlsUI.element.style.display = "none";
			this.guideLineControlsUI.element.style.display = "none";
			this.multipleControlsUI.element.style.display = "";
			
			this.checkScrollBars();
			
			if(this.clickOption == "resize-letter")
				this.clickOption = "resize";
			
			this.repaint();
			
			this.saveProjectsEnabled = true;
			this.saveProjects();
		}
	}
	else
	{
		this.updateControls();
		
		this.textDrawControlsUI.element.style.display = "";
		this.guideGridControlsUI.element.style.display = "none";
		this.guideLineControlsUI.element.style.display = "none";
		this.multipleControlsUI.element.style.display = "none";
		
		this.checkScrollBars();
		
		this.repaint();
		
		this.saveProjectsEnabled = true;
		this.saveProjects();
	}
};

Main.prototype.toggleAnyObject = function(anyObject)
{
	if(!this.currentProject.multipleSelection.isSelected(anyObject))
	{
		this.currentProject.multipleSelection.addSelection(anyObject);
		this.currentProject.multipleSelection.selectionLast = anyObject;
		
		anyObject.textDrawItemUI.element.classList.add("currentTextDrawItem");
	}
	else
	{
		this.currentProject.multipleSelection.removeSelection(anyObject);
		this.currentProject.multipleSelection.selectionLast = anyObject;
		
		anyObject.textDrawItemUI.element.classList.remove("currentTextDrawItem");
	}
	
	anyObject = this.currentProject.getCurrentAnyObject();
	
	if(anyObject)
	{
		if(anyObject instanceof TextDraw)
		{
			anyObject.textDrawItemUI.element.classList.remove("currentTextDrawItem");
			this.changeTextDraw(anyObject);
		}
		else if(anyObject instanceof GuideGrid)
		{
			anyObject.textDrawItemUI.element.classList.remove("currentTextDrawItem");
			this.changeGuideGrid(anyObject);
		}
		else if(anyObject instanceof GuideLine)
		{
			anyObject.textDrawItemUI.element.classList.remove("currentTextDrawItem");
			this.changeGuideLine(anyObject);
		}
		else
		{
			this.updateMultipleControls();
			
			this.saveProjectsEnabled = true;
			this.saveProjects();
			this.textDrawControlsUI.element.style.display = "none";
			this.guideGridControlsUI.element.style.display = "none";
			this.guideLineControlsUI.element.style.display = "none";
			this.multipleControlsUI.element.style.display = "";
			
			this.checkScrollBars();
			
			if(this.clickOption == "resize-letter")
				this.clickOption = "resize";
			
			this.repaint();
			
			this.saveProjectsEnabled = true;
			this.saveProjects();
		}
	}
	else
	{
		this.updateControls();
		
		this.textDrawControlsUI.element.style.display = "";
		this.guideGridControlsUI.element.style.display = "none";
		this.guideLineControlsUI.element.style.display = "none";
		this.multipleControlsUI.element.style.display = "none";
		
		this.checkScrollBars();
		
		this.repaint();
		
		this.saveProjectsEnabled = true;
		this.saveProjects();
	}
};

Main.prototype.visibilityAnyObject = function(anyObject)
{
	anyObject.visibility = !anyObject.visibility;
	anyObject.visibilityUI.element.style.backgroundPositionY = anyObject.visibility ? "0px" : "-24px";
	
	this.repaint();
	
	this.saveProjectsEnabled = true;
	this.saveProjects();
};

Main.prototype.contextMenuProject = function(project, x, y)
{
	if(this.contextMenuUI)
		this.contextMenuUI.remove();
	
	this.contextMenuUI = new ContextMenuUI("body", x, y);
	this.contextMenuUI.appendItem("Import Project", () => { this.showImportDialog("Import Project", x, y, project); });
	this.contextMenuUI.appendItem("Export Project", () => { this.showExportDialog("Export Project", x, y, project); });
	this.contextMenuUI.appendStaticLine();
	this.contextMenuUI.appendItem("Remove Project", () => { this.removeProject(project) });
	
	this.changeProject(project);
};

Main.prototype.contextMenuTextDraw = function(textDraw, x, y)
{
	if(this.contextMenuUI)
		this.contextMenuUI.remove();
	
	this.contextMenuUI = new ContextMenuUI("body", x, y);
	this.contextMenuUI.appendItem("Export TextDraw", () => { this.showExportDialog("Export TextDraw", x, y, textDraw); });
	this.contextMenuUI.appendStaticLine();
	this.contextMenuUI.appendItem("Duplicate TextDraw", () => { this.showCreateDialog(textDraw.text, x, y, textDraw); });
	this.contextMenuUI.appendItem("Remove TextDraw", () => { this.removeTextDraw(textDraw) });
	
	this.changeTextDraw(textDraw);
};

Main.prototype.contextMenuGuideGrid = function(guideGrid, x, y)
{
	if(this.contextMenuUI)
		this.contextMenuUI.remove();
	
	this.contextMenuUI = new ContextMenuUI("body", x, y);
	this.contextMenuUI.appendItem("Duplicate", () => { this.changeGuideGrid(guideGrid); this.showGuideGridDialog(x, y, guideGrid); });
	this.contextMenuUI.appendItem("Remove", () => { this.removeGuideGrid(guideGrid); });
	
	this.changeGuideGrid(guideGrid);
};

Main.prototype.contextMenuGuideLine = function(guideLine, x, y)
{
	if(this.contextMenuUI)
		this.contextMenuUI.remove();
	
	this.contextMenuUI = new ContextMenuUI("body", x, y);
	this.contextMenuUI.appendItem("Duplicate", () => { this.changeGuideLine(guideLine); this.showGuideLineDialog(x, y, guideLine); });
	this.contextMenuUI.appendItem("Remove", () => { this.removeGuideLine(guideLine); });
	
	this.changeGuideLine(guideLine);
};

Main.prototype.contextMenuScreen = function(x, y)
{
	if(this.contextMenuUI)
		this.contextMenuUI.remove();
	
	let mouseX = x - this.screenshotUI.element.getBoundingClientRect().left;
	let mouseY = y - this.screenshotUI.element.getBoundingClientRect().top;
	
	let scaleX = this.screenshotUI.width / 640.0;
	let scaleY = this.screenshotUI.height / 448.0;
	
	this.contextMenuUI = new ContextMenuUI("body", x, y);
	this.contextMenuUI.appendItem("Create TextDraw", () => { this.showCreateDialog("Example", x, y); }).element.style.backgroundImage = "url(./assets/images/icon-create.png)";
	this.contextMenuUI.appendStaticLine();
	this.contextMenuUI.appendItem("Create Guide Grid", () => { this.showGuideGridDialog(x, y); }).element.style.backgroundImage = "url(./assets/images/icon-guide-grid.png)";
	this.contextMenuUI.appendItem("Create Guide Line", () => { this.showGuideLineDialog(x, y); }).element.style.backgroundImage = "url(./assets/images/icon-guide-line.png)";
	
	let firstItem = true;
	
	for(let i = 0; i < this.currentProject.textDrawList.length; i++)
	{
		let textDraw = this.currentProject.textDrawList[i];
		
		let left = textDraw.getRectLeft() * scaleX;
		let top = textDraw.getRectTop() * scaleY;
		let right = textDraw.getRectRight() * scaleX;
		let bottom = textDraw.getStringRectBottom() * scaleY;
		
		if(left <= mouseX && mouseX < right && top <= mouseY && mouseY < bottom)
		{
			if(firstItem)
			{
				this.contextMenuUI.appendStaticLine();
				firstItem = false;
			}
			
			let contextItemUI = this.contextMenuUI.appendItem(textDraw.name, false);
			let contextSubMenuUI = new ContextMenuUI(contextItemUI, 0, 0);
			
			if(this.currentProject.getCurrentTextDraw() == textDraw)
			{
				contextItemUI.element.style.fontStyle = "italic";
				contextSubMenuUI.element.style.fontStyle = "normal";
			}
			
			contextSubMenuUI.appendItem("Select", () => { this.changeTextDraw(textDraw); });
			contextSubMenuUI.appendStaticLine();
			contextSubMenuUI.appendItem("Export", () => { this.changeTextDraw(textDraw); this.showExportDialog("Export TextDraw", x, y, textDraw); });
			contextSubMenuUI.appendStaticLine();
			contextSubMenuUI.appendItem("Duplicate", () => { this.changeTextDraw(textDraw); this.showCreateDialog(textDraw.text, x, y, textDraw); });
			contextSubMenuUI.appendItem("Remove", () => { this.removeTextDraw(textDraw); });
		}
	}
	
	firstItem = true;
	
	for(let i = 0; i < this.currentProject.guideGrids.length; i++)
	{
		let guideGrid = this.currentProject.guideGrids[i];
		
		let left = guideGrid.getRectLeft() * scaleX;
		let top = guideGrid.getRectTop() * scaleY;
		let right = guideGrid.getRectRight() * scaleX;
		let bottom = guideGrid.getRectBottom() * scaleY;
		
		if(left <= mouseX && mouseX < right && top <= mouseY && mouseY < bottom)
		{
			if(firstItem)
			{
				this.contextMenuUI.appendStaticLine();
				firstItem = false;
			}
			
			let contextItemUI = this.contextMenuUI.appendItem(guideGrid.name, false);
			let contextSubMenuUI = new ContextMenuUI(contextItemUI, 0, 0);
			
			if(this.currentProject.getCurrentGuideGrid() == guideGrid)
			{
				contextItemUI.element.style.fontStyle = "italic";
				contextSubMenuUI.element.style.fontStyle = "normal";
			}
			
			contextSubMenuUI.appendItem("Select", () => { this.changeGuideGrid(guideGrid); });
			contextSubMenuUI.appendStaticLine();
			contextSubMenuUI.appendItem("Duplicate", () => { this.changeGuideGrid(guideGrid); this.showGuideGridDialog(x, y, guideGrid); });
			contextSubMenuUI.appendItem("Remove", () => { this.removeGuideGrid(guideGrid); });
		}
	}
	
	firstItem = true;
	
	for(let i = 0; i < this.currentProject.guideLines.length; i++)
	{
		let guideLine = this.currentProject.guideLines[i];
		
		let left = guideLine.getRectLeft() * scaleX;
		let top = guideLine.getRectTop() * scaleY;
		let right = guideLine.getRectRight() * scaleX;
		let bottom = guideLine.getRectBottom() * scaleY;
		
		if(guideLine.style == 0)
		{
			top -= 10;
			bottom += 10;
		}
		else
		{
			left -= 10;
			right += 10;
		}
		
		if(left <= mouseX && mouseX < right && top <= mouseY && mouseY < bottom)
		{
			if(firstItem)
			{
				this.contextMenuUI.appendStaticLine();
				firstItem = false;
			}
			
			let contextItemUI = this.contextMenuUI.appendItem(guideLine.name, false);
			let contextSubMenuUI = new ContextMenuUI(contextItemUI, 0, 0);
			
			if(this.currentProject.getCurrentGuideLine() == guideLine)
			{
				contextItemUI.element.style.fontStyle = "italic";
				contextSubMenuUI.element.style.fontStyle = "normal";
			}
			
			contextSubMenuUI.appendItem("Select", () => { this.changeGuideLine(guideLine); });
			contextSubMenuUI.appendStaticLine();
			contextSubMenuUI.appendItem("Duplicate", () => { this.changeGuideLine(guideLine); this.showGuideLineDialog(x, y, guideLine); });
			contextSubMenuUI.appendItem("Remove", () => { this.removeGuideLine(guideLine); });
		}
	}
	
	this.contextMenuUI.updateSubMenuPosition();
};

Main.prototype.contextMenuTexture = function(text, x, y)
{
	if(this.contextMenuUI)
		this.contextMenuUI.remove();
	
	this.contextMenuUI = new ContextMenuUI("body", x, y);
	this.contextMenuUI.appendItem("Copy", () => {  navigator.clipboard.writeText(text); });
};

Main.prototype.showCreateDialog = function(text, x, y, fromTextDraw)
{
	let mouseX;
	let mouseY;
	
	let scaleX = this.screenshotUI.width / 640.0;
	let scaleY = this.screenshotUI.height / 448.0;
	
	let copiedTextDraw = null;
	
	if(fromTextDraw)
	{
		copiedTextDraw = {};
		fromTextDraw.copyTextDraw(copiedTextDraw);
		copiedTextDraw.width = fromTextDraw.getRectRight() - fromTextDraw.getRectLeft();
		copiedTextDraw.height = fromTextDraw.getRectBottom() - fromTextDraw.getRectTop();
		
		x = fromTextDraw.getRectLeft() + (fromTextDraw.getRectRight() - fromTextDraw.getRectLeft()) / 2;
		y = fromTextDraw.getRectTop() + (fromTextDraw.getStringRectBottom() - fromTextDraw.getRectTop()) / 2;
		
		x *= scaleX;
		y *= scaleY;
		
		x += this.screenshotUI.element.getBoundingClientRect().left;
		y += this.screenshotUI.element.getBoundingClientRect().top;
		
		mouseX = copiedTextDraw.x;
		mouseY = copiedTextDraw.y;
		
		scaleX = 1.0;
		scaleY = 1.0;
	}
	else
	{
		mouseX = x - this.screenshotUI.element.getBoundingClientRect().left;
		mouseY = y - this.screenshotUI.element.getBoundingClientRect().top;
	}
	
	let dialogUI = new CreateDialogUI("body", "Create TextDraw", text, mouseX / scaleX, mouseY / scaleY, (text, x, y) => { this.createTextDraw(text, x, y, copiedTextDraw); this.hideDialog(dialogUI); }, () => { this.hideDialog(dialogUI); });
	
	dialogUI.move(x - dialogUI.element.clientWidth / 2, y - dialogUI.element.clientHeight / 2);
	
	this.dialogsUI.push(dialogUI);
};

Main.prototype.showExportDialog = function(title, x, y, fromTextDrawOrProject)
{
	let scaleX = this.screenshotUI.width / 640.0;
	let scaleY = this.screenshotUI.height / 448.0;
	
	let copiedTextDraws = [];
	
	if(fromTextDrawOrProject instanceof TextDraw)
	{
		copiedTextDraw = {};
		fromTextDrawOrProject.copyTextDraw(copiedTextDraw);
		copiedTextDraw.width = fromTextDrawOrProject.getRectRight() - fromTextDrawOrProject.getRectLeft();
		copiedTextDraw.height = fromTextDrawOrProject.getRectBottom() - fromTextDrawOrProject.getRectTop();
		
		x = fromTextDrawOrProject.getRectLeft() + (fromTextDrawOrProject.getRectRight() - fromTextDrawOrProject.getRectLeft()) / 2;
		y = fromTextDrawOrProject.getRectTop() + (fromTextDrawOrProject.getStringRectBottom() - fromTextDrawOrProject.getRectTop()) / 2;
		
		x *= scaleX;
		y *= scaleY;
		
		x += this.screenshotUI.element.getBoundingClientRect().left;
		y += this.screenshotUI.element.getBoundingClientRect().top;
		
		copiedTextDraws.push(copiedTextDraw);
	}
	else if(fromTextDrawOrProject instanceof Project)
	{
		for(let i = 0; i < fromTextDrawOrProject.textDrawList.length; i++)
		{
			let copiedTextDraw = {};
			fromTextDrawOrProject.textDrawList[i].copyTextDraw(copiedTextDraw);
			copiedTextDraw.width = fromTextDrawOrProject.textDrawList[i].getRectRight() - fromTextDrawOrProject.textDrawList[i].getRectLeft();
			copiedTextDraw.height = fromTextDrawOrProject.textDrawList[i].getRectBottom() - fromTextDrawOrProject.textDrawList[i].getRectTop();
			
			copiedTextDraws.push(copiedTextDraw);
		}
	}
	
	let dialogUI = new ExportDialogUI("body", title, (callback, output, clicked) => { this.acceptExportDialog(dialogUI, callback, output, copiedTextDraws); if(output == 0 || clicked) this.hideDialog(dialogUI); }, () => { this.hideDialog(dialogUI); });
	
	dialogUI.move(x - dialogUI.element.clientWidth / 2, y - dialogUI.element.clientHeight / 2);
	
	this.dialogsUI.push(dialogUI);
};

Main.prototype.acceptExportDialog = function(dialogUI, callback, output, textDraws)
{
	let code = "\r\n#include <a_samp>\r\n\r\n";
	
	for(let i = 0; i < textDraws.length; i++)
	{
		code += "new Text:" + textDraws[i].name + ";\r\n";
	}
	
	if(callback == 0)
	{
		code += "\r\npublic OnGameModeInit()\r\n{\r\n";
	}
	else
	{
		code += "\r\npublic OnFilterScriptInit()\r\n{\r\n";
	}
	
	for(let i = 0; i < textDraws.length; i++)
	{
		if(i != 0)
			code += "\r\n";
		
		let paramFont = textDraws[i].font.toString();
		
		if(paramFont == 4)
		{
			paramFont = "TEXT_DRAW_FONT_SPRITE_DRAW";
		}
		else if(paramFont == 5)
		{
			paramFont = "TEXT_DRAW_FONT_MODEL_PREVIEW";
		}
		
		code += "\t" + textDraws[i].name + " = TextDrawCreate(" + textDraws[i].x.toPlainString() + ", " + textDraws[i].y.toPlainString() + ", " + JSON.stringify(textDraws[i].text) + ");\r\n";
		code += "\tTextDrawLetterSize(" + textDraws[i].name + ", " + textDraws[i].letterSizeX.toPlainString() + ", " + textDraws[i].letterSizeY.toPlainString() + ");\r\n";
		code += "\tTextDrawTextSize(" + textDraws[i].name + ", " + textDraws[i].textSizeX.toPlainString() + ", " + textDraws[i].textSizeY.toPlainString() + ");\r\n";
		code += "\tTextDrawAlignment(" + textDraws[i].name + ", " + textDraws[i].alignment.toString() + ");\r\n";
		code += "\tTextDrawColor(" + textDraws[i].name + ", 0x" + textDraws[i].color.toString(16).toUpperCase().padZero(8) + ");\r\n";
		code += "\tTextDrawUseBox(" + textDraws[i].name + ", " + textDraws[i].useBox.toString() + ");\r\n";
		code += "\tTextDrawBoxColor(" + textDraws[i].name + ", 0x" + textDraws[i].boxColor.toString(16).toUpperCase().padZero(8) + ");\r\n";
		code += "\tTextDrawSetShadow(" + textDraws[i].name + ", " + textDraws[i].setShadow.toString() + ");\r\n";
		code += "\tTextDrawSetOutline(" + textDraws[i].name + ", " + textDraws[i].setOutline.toString() + ");\r\n";
		code += "\tTextDrawBackgroundColor(" + textDraws[i].name + ", 0x" + textDraws[i].backgroundColor.toString(16).toUpperCase().padZero(8) + ");\r\n";
		code += "\tTextDrawFont(" + textDraws[i].name + ", " + paramFont + ");\r\n";
		code += "\tTextDrawSetProportional(" + textDraws[i].name + ", " + textDraws[i].setProportional.toString() + ");\r\n";
	}
	
	if(callback == 0)
	{
		code += "}\r\n\r\npublic OnGameModeExit()\r\n{\r\n";
	}
	else
	{
		code += "}\r\n\r\npublic OnFilterScriptExit()\r\n{\r\n";
	}
	
	for(let i = 0; i < textDraws.length; i++)
	{
		code += "\tTextDrawDestroy(" + textDraws[i].name + ");\r\n";
	}
	
	code += "}\r\n";
	
	if(output == 0)
	{
		let downloadUI = new EntityUI(null, "a", {href: "data:text/plain;charset=utf-8," + encodeURIComponent(code), download: "exported.pwn"});
		downloadUI.element.click();
	}
	else
	{
		dialogUI.viewOutputUI.element.value = code;
	}
};

Main.prototype.showImportDialog = function(title, x, y, toProject)
{
	let dialogUI = new ImportDialogUI("body", title, (input) => { this.acceptImportDialog(dialogUI, input, toProject); this.hideDialog(dialogUI); }, () => { this.hideDialog(dialogUI); });
	
	dialogUI.move(x - dialogUI.element.clientWidth / 2, y - dialogUI.element.clientHeight / 2);
	
	this.dialogsUI.push(dialogUI);
};

Main.prototype.acceptImportDialog = function(dialogUI, input, toProject)
{
	if(input == 1)
		dialogUI.inputAsText(dialogUI.viewInputUI.element.value);
	
	let textDraws = dialogUI.textDraws;
	
	for(let i = 0; i < textDraws.length; i++)
	{
		let textDraw = toProject.createTextDraw(textDraws[i].text, textDraws[i].x, textDraws[i].y);
		textDraw.fromTextDraw(textDraws[i]);
	}
	
	if(this.currentProject == toProject)
	{
		this.updateControlList();
		this.updateControls();
		this.updateGuideGridControls();
		this.updateGuideLineControls();
		this.updateMultipleControls();
	}
	
	this.repaintedThumbnailAll = false;
	
	this.repaint();
	
	this.saveProjectsEnabled = true;
	this.saveProjects();
}

Main.prototype.showGuideGridDialog = function(x, y, fromGuideGrid)
{
	let mouseX;
	let mouseY;
	
	let scaleX = this.screenshotUI.width / 640.0;
	let scaleY = this.screenshotUI.height / 448.0;
	
	let width;
	let height;
	let margin;
	let padding;
	let rows;
	let columns;
	
	if(fromGuideGrid)
	{
		x = fromGuideGrid.getRectLeft() + (fromGuideGrid.getRectRight() - fromGuideGrid.getRectLeft()) / 2;
		y = fromGuideGrid.getRectTop() + (fromGuideGrid.getRectBottom() - fromGuideGrid.getRectTop()) / 2;
		
		x *= scaleX;
		y *= scaleY;
		
		x += this.screenshotUI.element.getBoundingClientRect().left;
		y += this.screenshotUI.element.getBoundingClientRect().top;
		
		mouseX = fromGuideGrid.x;
		mouseY = fromGuideGrid.y;
		
		scaleX = 1.0;
		scaleY = 1.0;
		
		width = fromGuideGrid.width;
		height = fromGuideGrid.height;
		margin = fromGuideGrid.margin;
		padding = fromGuideGrid.padding;
		rows = fromGuideGrid.rows;
		columns = fromGuideGrid.columns;
	}
	else
	{
		mouseX = x - this.screenshotUI.element.getBoundingClientRect().left;
		mouseY = y - this.screenshotUI.element.getBoundingClientRect().top;
		
		width = 100;
		height = 100;
		margin = 0;
		padding = 0;
		rows = 3;
		columns = 3;
	}
	
	let dialogUI = new GuideGridDialogUI("body", "Create Guide Grid", mouseX / scaleX, mouseY / scaleY, width, height, margin, padding, rows, columns, (x, y, width, height, margin, padding, rows, columns) => { this.createGuideGrid(x, y, width, height, margin, padding, rows, columns); this.hideDialog(dialogUI); }, () => { this.hideDialog(dialogUI); });
	
	dialogUI.move(x - dialogUI.element.clientWidth / 2, y - dialogUI.element.clientHeight / 2);
	
	this.dialogsUI.push(dialogUI);
};

Main.prototype.showGuideLineDialog = function(x, y, fromGuideLine)
{
	let mouseX;
	let mouseY;
	
	let scaleX = this.screenshotUI.width / 640.0;
	let scaleY = this.screenshotUI.height / 448.0;
	
	let size;
	let padding;
	let style;
	
	if(fromGuideLine)
	{
		x = fromGuideLine.getRectLeft() + (fromGuideLine.getRectRight() - fromGuideLine.getRectLeft()) / 2;
		y = fromGuideLine.getRectTop() + (fromGuideLine.getRectBottom() - fromGuideLine.getRectTop()) / 2;
		
		x *= scaleX;
		y *= scaleY;
		
		x += this.screenshotUI.element.getBoundingClientRect().left;
		y += this.screenshotUI.element.getBoundingClientRect().top;
		
		mouseX = fromGuideLine.x;
		mouseY = fromGuideLine.y;
		
		scaleX = 1.0;
		scaleY = 1.0;
		
		size = fromGuideLine.size;
		padding = fromGuideLine.padding;
		style = fromGuideLine.style;
	}
	else
	{
		mouseX = x - this.screenshotUI.element.getBoundingClientRect().left;
		mouseY = y - this.screenshotUI.element.getBoundingClientRect().top;
		
		size = 100;
		padding = 0;
		style = 0;
	}
	
	let dialogUI = new GuideLineDialogUI("body", "Create Guide Line", mouseX / scaleX, mouseY / scaleY, size, padding, style, (x, y, size, padding, style) => { this.createGuideLine(x, y, size, padding, style); this.hideDialog(dialogUI); }, () => { this.hideDialog(dialogUI); });
	
	dialogUI.move(x - dialogUI.element.clientWidth / 2, y - dialogUI.element.clientHeight / 2);
	
	this.dialogsUI.push(dialogUI);
};

Main.prototype.showTextureDictionaryDialog = function()
{
	let dialogUI = this.dialogsUI.find(dialogUI => dialogUI instanceof TextureDictionaryDialogUI);
	
	if(dialogUI)
	{
		dialogUI.focus();
		return;
	}
	
	dialogUI = new TextureDictionaryDialogUI("body", "Texture Dictionary", () => { this.hideDialog(dialogUI); }, (textureDictionary) => { this.showTextureExplorerDialog(textureDictionary); });
	
	this.dialogsUI.push(dialogUI);
};

Main.prototype.showTextureExplorerDialog = function(textureDictionary)
{
	let dialogUI = new TextureExplorerDialogUI("body", "Texture Explorer", textureDictionary, () => { this.hideDialog(dialogUI); }, (text, x, y) => { this.contextMenuTexture(text, x, y); });
	
	this.dialogsUI.push(dialogUI);
};

Main.prototype.hideDialog = function(dialogUI)
{
	this.dialogsUI.splice(this.dialogsUI.indexOf(dialogUI), 1);
	dialogUI.remove();
};

Main.prototype.updateControlList = function()
{
	this.controlListUI.element.innerHTML = "";
	
	if(this.currentProject)
	{
		let lastTextDrawItemUI = null;
		
		for(let i = 0; i < this.currentProject.textDrawList.length; i++)
		{
			if(this.currentProject.textDrawList[i].textDrawItemUI.element.classList.contains("lastTextDrawItem"))
				this.currentProject.textDrawList[i].textDrawItemUI.element.classList.remove("lastTextDrawItem");
			
			this.controlListUI.element.appendChild(this.currentProject.textDrawList[i].textDrawItemUI.element);
			
			lastTextDrawItemUI = this.currentProject.textDrawList[i].textDrawItemUI;
		}
		
		for(let i = 0; i < this.currentProject.guideGrids.length; i++)
		{
			if(this.currentProject.guideGrids[i].textDrawItemUI.element.classList.contains("lastTextDrawItem"))
				this.currentProject.guideGrids[i].textDrawItemUI.element.classList.remove("lastTextDrawItem");
			
			this.controlListUI.element.appendChild(this.currentProject.guideGrids[i].textDrawItemUI.element);
			
			lastTextDrawItemUI = this.currentProject.guideGrids[i].textDrawItemUI;
		}
		
		for(let i = 0; i < this.currentProject.guideLines.length; i++)
		{
			if(this.currentProject.guideLines[i].textDrawItemUI.element.classList.contains("lastTextDrawItem"))
				this.currentProject.guideLines[i].textDrawItemUI.element.classList.remove("lastTextDrawItem");
			
			this.controlListUI.element.appendChild(this.currentProject.guideLines[i].textDrawItemUI.element);
			
			lastTextDrawItemUI = this.currentProject.guideLines[i].textDrawItemUI;
		}
		
		if(lastTextDrawItemUI && this.controlListUI.hasScrollBar())
			lastTextDrawItemUI.element.classList.add("lastTextDrawItem");
	}
}

Main.prototype.updateControls = function()
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.controlNameUI.element.value = this.currentProject.getCurrentTextDraw().name;
		this.controlTextUI.element.value = this.currentProject.getCurrentTextDraw().text;
		this.controlXUI.element.value = this.currentProject.getCurrentTextDraw().x.toPlainString();
		this.controlYUI.element.value = this.currentProject.getCurrentTextDraw().y.toPlainString();
		this.controlLetterSizeXUI.element.value = this.currentProject.getCurrentTextDraw().letterSizeX.toPlainString();
		this.controlLetterSizeYUI.element.value = this.currentProject.getCurrentTextDraw().letterSizeY.toPlainString();
		this.controlTextSizeXUI.element.value = this.currentProject.getCurrentTextDraw().textSizeX.toPlainString();
		this.controlTextSizeYUI.element.value = this.currentProject.getCurrentTextDraw().textSizeY.toPlainString();
		this.controlAlignmentUI.element.value = this.currentProject.getCurrentTextDraw().alignment.toString();
		this.controlColorUI.element.value = this.currentProject.getCurrentTextDraw().color.toString(16).toUpperCase().padZero(8);
		this.controlUseBoxUI.element.value = this.currentProject.getCurrentTextDraw().useBox.toString();
		this.controlBoxColorUI.element.value = this.currentProject.getCurrentTextDraw().boxColor.toString(16).toUpperCase().padZero(8);
		this.controlSetShadowUI.element.value = this.currentProject.getCurrentTextDraw().setShadow.toString();
		this.controlSetOutlineUI.element.value = this.currentProject.getCurrentTextDraw().setOutline.toString();
		this.controlBackgroundColorUI.element.value = this.currentProject.getCurrentTextDraw().backgroundColor.toString(16).toUpperCase().padZero(8);
		this.controlFontUI.element.value = this.currentProject.getCurrentTextDraw().font.toString();
		this.controlSetProportionalUI.element.value = this.currentProject.getCurrentTextDraw().setProportional.toString();
	}
	else
	{
		this.controlNameUI.element.value = "";
		this.controlTextUI.element.value = "";
		this.controlXUI.element.value = "";
		this.controlYUI.element.value = "";
		this.controlLetterSizeXUI.element.value = "";
		this.controlLetterSizeYUI.element.value = "";
		this.controlTextSizeXUI.element.value = "";
		this.controlTextSizeYUI.element.value = "";
		this.controlAlignmentUI.element.value = "";
		this.controlColorUI.element.value = "";
		this.controlUseBoxUI.element.value = "";
		this.controlBoxColorUI.element.value = "";
		this.controlSetShadowUI.element.value = "";
		this.controlSetOutlineUI.element.value = "";
		this.controlBackgroundColorUI.element.value = "";
		this.controlFontUI.element.value = "";
		this.controlSetProportionalUI.element.value = "";
	}
};

Main.prototype.nameChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().nameUI.element.innerHTML = e.target.value;
		this.currentProject.getCurrentTextDraw().name = e.target.value;
		this.saveProjectsEnabled = true;
		
		this.updateControlList();
	}
};

Main.prototype.textChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().text = e.target.value;
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
	}
};

Main.prototype.xChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().x = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
	}
};

Main.prototype.yChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().y = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
	}
};

Main.prototype.letterSizeXChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().letterSizeX = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
	}
};

Main.prototype.letterSizeYChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().letterSizeY = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
	}
};

Main.prototype.textSizeXChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().textSizeX = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
	}
};

Main.prototype.textSizeYChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().textSizeY = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
	}
};

Main.prototype.alignmentChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().changeAlignment(parseInt(e.target.value));
		this.saveProjectsEnabled = true;
		
		this.updateControls();
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
	}
};

Main.prototype.colorChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().color = parseInt(e.target.value, 16);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
	}
};

Main.prototype.useBoxChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().useBox = parseInt(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
	}
};

Main.prototype.boxColorChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().boxColor = parseInt(e.target.value, 16);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
	}
};

Main.prototype.setShadowChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().setShadow = parseInt(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
	}
};

Main.prototype.setOutlineChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().setOutline = parseInt(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
	}
};

Main.prototype.backgroundColorChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().backgroundColor = parseInt(e.target.value, 16);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
	}
};

Main.prototype.fontChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().changeFont(parseInt(e.target.value));
		this.saveProjectsEnabled = true;
		
		this.updateControls();
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
	}
};

Main.prototype.setProportionalChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentTextDraw())
	{
		this.currentProject.getCurrentTextDraw().setProportional = parseInt(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
	}
};

Main.prototype.updateGuideGridControls = function()
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.controlGuideGridNameUI.element.value = this.currentProject.getCurrentGuideGrid().name
		this.controlGuideGridXUI.element.value = this.currentProject.getCurrentGuideGrid().x.toPlainString();
		this.controlGuideGridYUI.element.value = this.currentProject.getCurrentGuideGrid().y.toPlainString();
		this.controlGuideGridWidthUI.element.value = this.currentProject.getCurrentGuideGrid().width.toPlainString();
		this.controlGuideGridHeightUI.element.value = this.currentProject.getCurrentGuideGrid().height.toPlainString();
		this.controlGuideGridMarginUI.element.value = this.currentProject.getCurrentGuideGrid().margin.toPlainString();
		this.controlGuideGridPaddingUI.element.value = this.currentProject.getCurrentGuideGrid().padding.toPlainString();
		this.controlGuideGridRowsUI.element.value = this.currentProject.getCurrentGuideGrid().rows.toString();
		this.controlGuideGridColumnsUI.element.value = this.currentProject.getCurrentGuideGrid().columns.toString();
	}
	else
	{
		this.controlGuideGridNameUI.element.value = "";
		this.controlGuideGridXUI.element.value = "";
		this.controlGuideGridYUI.element.value = "";
		this.controlGuideGridWidthUI.element.value = "";
		this.controlGuideGridHeightUI.element.value = "";
		this.controlGuideGridMarginUI.element.value = "";
		this.controlGuideGridPaddingUI.element.value = "";
		this.controlGuideGridRowsUI.element.value = "";
		this.controlGuideGridColumnsUI.element.value = "";
	}
};

Main.prototype.guideGridNameChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.currentProject.getCurrentGuideGrid().nameUI.element.innerHTML = e.target.value;
		this.currentProject.getCurrentGuideGrid().name = e.target.value;
		this.saveProjectsEnabled = true;
	}
};

Main.prototype.guideGridXChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.currentProject.getCurrentGuideGrid().x = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideGridYChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.currentProject.getCurrentGuideGrid().y = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideGridWidthChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.currentProject.getCurrentGuideGrid().width = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideGridHeightChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.currentProject.getCurrentGuideGrid().height = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideGridMarginChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.currentProject.getCurrentGuideGrid().margin = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideGridPaddingChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.currentProject.getCurrentGuideGrid().padding = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideGridRowsChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.currentProject.getCurrentGuideGrid().rows = parseInt(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideGridColumnsChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideGrid())
	{
		this.currentProject.getCurrentGuideGrid().columns = parseInt(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.updateGuideLineControls = function()
{
	if(this.currentProject && this.currentProject.getCurrentGuideLine())
	{
		this.controlGuideLineNameUI.element.value = this.currentProject.getCurrentGuideLine().name
		this.controlGuideLineXUI.element.value = this.currentProject.getCurrentGuideLine().x.toPlainString();
		this.controlGuideLineYUI.element.value = this.currentProject.getCurrentGuideLine().y.toPlainString();
		this.controlGuideLineSizeUI.element.value = this.currentProject.getCurrentGuideLine().size.toPlainString();
		this.controlGuideLinePaddingUI.element.value = this.currentProject.getCurrentGuideLine().padding.toPlainString();
		this.controlGuideLineStyleUI.element.selectedIndex = this.currentProject.getCurrentGuideLine().style;
	}
	else
	{
		this.controlGuideLineNameUI.element.value = "";
		this.controlGuideLineXUI.element.value = "";
		this.controlGuideLineYUI.element.value = "";
		this.controlGuideLineSizeUI.element.value = "";
		this.controlGuideLinePaddingUI.element.value = "";
		this.controlGuideLineStyleUI.element.selectedIndex = "";
	}
}

Main.prototype.guideLineNameChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideLine())
	{
		this.currentProject.getCurrentGuideLine().nameUI.element.innerHTML = e.target.value;
		this.currentProject.getCurrentGuideLine().name = e.target.value;
		this.saveProjectsEnabled = true;
	}
};

Main.prototype.guideLineXChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideLine())
	{
		this.currentProject.getCurrentGuideLine().x = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideLineYChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideLine())
	{
		this.currentProject.getCurrentGuideLine().y = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideLineSizeChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideLine())
	{
		this.currentProject.getCurrentGuideLine().size = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideLinePaddingChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideLine())
	{
		this.currentProject.getCurrentGuideLine().padding = parseFloat(e.target.value);
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.guideLineStyleChange = function(e)
{
	if(this.currentProject && this.currentProject.getCurrentGuideLine())
	{
		this.currentProject.getCurrentGuideLine().style = e.target.selectedIndex;
		this.saveProjectsEnabled = true;
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
	}
};

Main.prototype.multipleXChange = function(e)
{
	if(this.currentProject && this.currentProject.multipleSelection.selections.length > 1)
	{
		let x = parseFloat(e.target.value);
		
		this.currentProject.multipleSelection.setX(x);
		this.saveProjectsEnabled = true;
		
		this.belowTextDrawUI.clear();
		this.boxTextDrawUI.clear();
		
		for(let i = 0; i < this.currentProject.textDrawList.length; i++)
		{
			this.belowTextDrawUI.paint(this.currentProject.textDrawList[i], this.clicked, true);
		}
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paintMultipleSelection(this.currentProject.multipleSelection, this.clickOption);
	}
};

Main.prototype.multipleYChange = function(e)
{
	if(this.currentProject && this.currentProject.multipleSelection.selections.length > 1)
	{
		let y = parseFloat(e.target.value);
		
		this.currentProject.multipleSelection.setY(y);
		this.saveProjectsEnabled = true;
		
		this.belowTextDrawUI.clear();
		this.boxTextDrawUI.clear();
		
		for(let i = 0; i < this.currentProject.textDrawList.length; i++)
		{
			this.belowTextDrawUI.paint(this.currentProject.textDrawList[i], this.clicked, true);
		}
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paintMultipleSelection(this.currentProject.multipleSelection, this.clickOption);
	}
};

Main.prototype.multipleWidthChange = function(e)
{
	if(this.currentProject && this.currentProject.multipleSelection.selections.length > 1)
	{
		let width = parseFloat(e.target.value);
		
		this.currentProject.multipleSelection.setWidth(width);
		this.saveProjectsEnabled = true;
		
		this.belowTextDrawUI.clear();
		this.boxTextDrawUI.clear();
		
		for(let i = 0; i < this.currentProject.textDrawList.length; i++)
		{
			this.belowTextDrawUI.paint(this.currentProject.textDrawList[i], this.clicked, true);
		}
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paintMultipleSelection(this.currentProject.multipleSelection, this.clickOption);
	}
};

Main.prototype.multipleHeightChange = function(e)
{
	if(this.currentProject && this.currentProject.multipleSelection.selections.length > 1)
	{
		let height = parseFloat(e.target.value);
		
		this.currentProject.multipleSelection.setHeight(height);
		this.saveProjectsEnabled = true;
		
		this.belowTextDrawUI.clear();
		this.boxTextDrawUI.clear();
		
		for(let i = 0; i < this.currentProject.textDrawList.length; i++)
		{
			this.belowTextDrawUI.paint(this.currentProject.textDrawList[i], this.clicked, true);
		}
		
		this.optionsUI.clear();
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		this.optionsUI.paintMultipleSelection(this.currentProject.multipleSelection, this.clickOption);
	}
};

Main.prototype.updateMultipleControls = function()
{
	if(this.currentProject && this.currentProject.multipleSelection.selections.length > 1)
	{
		this.controlMultipleXUI.element.value = this.currentProject.multipleSelection.getX().toPlainString();
		this.controlMultipleYUI.element.value = this.currentProject.multipleSelection.getY().toPlainString();
		this.controlMultipleWidthUI.element.value = this.currentProject.multipleSelection.getWidth().toPlainString();
		this.controlMultipleHeightUI.element.value = this.currentProject.multipleSelection.getHeight().toPlainString();
	}
	else
	{
		this.controlMultipleXUI.element.value = "";
		this.controlMultipleYUI.element.value = "";
		this.controlMultipleWidthUI.element.value = "";
		this.controlMultipleHeightUI.element.value = "";
	}
}

Main.prototype.screenshotChange = function(src)
{
	this.screenshotUI.screenshotChange(src);
};

Main.prototype.screenshotCustom = function(e)
{
	let files = e.target.files;
	
	if(files.length != 0)
	{
		let file = files[0];
		
		if(file.type.match("image.*"))
		{
			let reader = new FileReader();
			
			reader.onload = (e) =>
			{
				if(e.target.readyState == FileReader.DONE)
					this.screenshotChange(e.target.result);
			};
			
			reader.readAsDataURL(file);
		}
		else
		{
			alert("not an image");
		}
	}
};

Main.prototype.repaint = function()
{
	this.updateControls();
	this.updateGuideGridControls();
	this.updateGuideLineControls();
	this.updateMultipleControls();
	
	this.belowTextDrawUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	this.boxTextDrawUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	this.currentTextDrawUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	this.aboveTextDrawUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	
	this.optionsUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	
	if(!this.repaintedThumbnailAll)
		this.repaintThumbnailAll();
	
	this.belowTextDrawUI.clear();
	this.currentTextDrawUI.clear();
	this.aboveTextDrawUI.clear();
	
	this.optionsUI.clear();
	
	let textDrawUI = this.belowTextDrawUI;
	
	if(this.currentProject)
	{
		this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
		this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
		
		for(let i = 0; i < this.currentProject.textDrawList.length; i++)
		{
			if(this.currentProject.textDrawList[i] == this.currentProject.getCurrentTextDraw())
			{
				this.boxTextDrawUI.clear();
				
				if(this.clicked)
				{
					this.boxTextDrawUI.paintBox(this.currentProject.getCurrentTextDraw(), this.clickOption != "resize-letter");
				}
				
				textDrawUI = this.currentTextDrawUI;
				textDrawUI.paint(this.currentProject.textDrawList[i], this.clicked);
				textDrawUI = this.aboveTextDrawUI;
				
				if(this.currentProject.multipleSelection.selections.length == 1)
					this.optionsUI.paint(this.currentProject.textDrawList[i], this.clickOption);
			}
			else
			{
				textDrawUI.paint(this.currentProject.textDrawList[i], false);
			}
		}
		
		if(this.currentProject.multipleSelection.selections.length > 1)
			this.optionsUI.paintMultipleSelection(this.currentProject.multipleSelection, this.clickOption);
	}
	
	this.repaintThumbnail();
};

Main.prototype.repaintThumbnail = function()
{
	if(this.currentProject)
	{
		this.currentProject.thumbnailUI.context.clearRect(0, 0, 64, 64);
		
		if(this.belowTextDrawUI.width != 0 && this.belowTextDrawUI.height != 0)
			this.currentProject.thumbnailUI.context.drawImage(this.belowTextDrawUI.element, 0, 0, this.belowTextDrawUI.width, this.belowTextDrawUI.height, 0, 0, 64, 64);
		
		if(this.currentTextDrawUI.width != 0 && this.currentTextDrawUI.height != 0)
			this.currentProject.thumbnailUI.context.drawImage(this.currentTextDrawUI.element, 0, 0, this.currentTextDrawUI.width, this.currentTextDrawUI.height, 0, 0, 64, 64);
		
		if(this.aboveTextDrawUI.width != 0 && this.aboveTextDrawUI.height != 0)
			this.currentProject.thumbnailUI.context.drawImage(this.aboveTextDrawUI.element, 0, 0, this.aboveTextDrawUI.width, this.aboveTextDrawUI.height, 0, 0, 64, 64);
		
		if(this.currentProject.getCurrentTextDraw() && this.currentProject.getCurrentTextDraw().visibility)
		{
			this.currentProject.getCurrentTextDraw().thumbnailUI.context.clearRect(0, 0, 64, 64);
			
			if(this.currentTextDrawUI.width != 0 && this.currentTextDrawUI.height != 0)
				this.currentProject.getCurrentTextDraw().thumbnailUI.context.drawImage(this.currentTextDrawUI.element, 0, 0, this.currentTextDrawUI.width, this.currentTextDrawUI.height, 0, 0, 24, 24);
		}
	}
};

Main.prototype.repaintThumbnailAll = function()
{
	if(this.currentTextDrawUI.width != 0 && this.currentTextDrawUI.height != 0 && this.font1UI.width != 0 && this.font1UI.height != 0 && this.font2UI.width != 0 && this.font2UI.height != 0)
	{
		for(let i = 0; i < this.projects.length; i++)
		{
			this.currentTextDrawUI.clear();
			
			for(let j = 0; j < this.projects[i].textDrawList.length; j++)
			{
				this.currentTextDrawUI.paint(this.projects[i].textDrawList[j], false);
			}
			
			this.projects[i].thumbnailUI.context.clearRect(0, 0, 64, 64);
			this.projects[i].thumbnailUI.context.drawImage(this.currentTextDrawUI.element, 0, 0, this.currentTextDrawUI.width, this.currentTextDrawUI.height, 0, 0, 64, 64);
			
			for(let j = 0; j < this.projects[i].textDrawList.length; j++)
			{
				let visibility = this.projects[i].textDrawList[j].visibility;
				this.projects[i].textDrawList[j].visibility = true;
				
				this.currentTextDrawUI.clear();
				this.currentTextDrawUI.paint(this.projects[i].textDrawList[j], false);
				
				this.projects[i].textDrawList[j].visibility = visibility;
				
				this.projects[i].textDrawList[j].thumbnailUI.context.clearRect(0, 0, 24, 24);
				this.projects[i].textDrawList[j].thumbnailUI.context.drawImage(this.currentTextDrawUI.element, 0, 0, this.currentTextDrawUI.width, this.currentTextDrawUI.height, 0, 0, 24, 24);
			}
		}
		
		this.repaintedThumbnailAll = true;
	}
};

Main.prototype.getHorizontalNearestLine = function(x, y, d)
{
	let nearestLine = false;
	let nearestDist = d;
	
	if(this.currentProject)
	{
		for(let i = 0; i < this.currentProject.guideGrids.length; i++)
		{
			let guideGrid = this.currentProject.guideGrids[i];
			
			if(!guideGrid.visibility || this.currentProject.multipleSelection.isSelected(guideGrid))
				continue;
			
			let horizontalLineCount = guideGrid.getHorizontalLineCount();
			let verticalLineCount = guideGrid.getVerticalLineCount();
			
			if(horizontalLineCount >= 0 && verticalLineCount > 0)
			{
				if(guideGrid.getRectLeft() <= x && x <= guideGrid.getRectRight())
				{
					for(let j = 0; j < horizontalLineCount; j++)
					{
						let line = guideGrid.getHorizontalLine(j);
						let dist = Math.abs(line - y);
						
						if(dist < nearestDist)
						{
							nearestLine = {y: line, margin: guideGrid.margin, padding: guideGrid.padding, isFirst: j == 0, isLast: j == (horizontalLineCount - 1)};
							nearestDist = dist;
						}
					}
				}
			}
		}
		
		for(let i = 0; i < this.currentProject.guideLines.length; i++)
		{
			let guideLine = this.currentProject.guideLines[i];
			
			if(!guideLine.visibility || this.currentProject.multipleSelection.isSelected(guideLine) || guideLine.style == 1)
				continue;
			
			if(guideLine.getRectLeft() <= x && x <= guideLine.getRectRight())
			{
				let dist = Math.abs(guideLine.y - y);
				
				if(dist < nearestDist)
				{
					nearestLine = {y: guideLine.y, padding: guideLine.padding, isFirst: false, isLast: false};
					nearestDist = dist;
				}
			}
		}
	}
	
	return nearestLine;
};

Main.prototype.getVerticalNearestLine = function(x, y, d)
{
	let nearestLine = false;
	let nearestDist = d;
	
	if(this.currentProject)
	{
		for(let i = 0; i < this.currentProject.guideGrids.length; i++)
		{
			let guideGrid = this.currentProject.guideGrids[i];
			
			if(!guideGrid.visibility || this.currentProject.multipleSelection.isSelected(guideGrid))
				continue;
			
			let horizontalLineCount = guideGrid.getHorizontalLineCount();
			let verticalLineCount = guideGrid.getVerticalLineCount();
			
			if(horizontalLineCount >= 0 && verticalLineCount > 0)
			{
				if(guideGrid.getRectTop() <= y && y <= guideGrid.getRectBottom())
				{
					for(let j = 0; j < verticalLineCount; j++)
					{
						let line = guideGrid.getVerticalLine(j);
						let dist = Math.abs(line - x);
						
						if(dist < nearestDist)
						{
							nearestLine = {x: line, margin: guideGrid.margin, padding: guideGrid.padding, isFirst: j == 0, isLast: j == (verticalLineCount - 1)};
							nearestDist = dist;
						}
					}
				}
			}
		}
		
		for(let i = 0; i < this.currentProject.guideLines.length; i++)
		{
			let guideLine = this.currentProject.guideLines[i];
			
			if(!guideLine.visibility || this.currentProject.multipleSelection.isSelected(guideLine) || guideLine.style == 0)
				continue;
			
			if(guideLine.getRectTop() <= y && y <= guideLine.getRectBottom())
			{
				let dist = Math.abs(guideLine.x - x);
				
				if(dist < nearestDist)
				{
					nearestLine = {x: guideLine.x, padding: guideLine.padding, isFirst: false, isLast: false};
					nearestDist = dist;
				}
			}
		}
	}
	
	return nearestLine;
};

Main.prototype.checkMouse = function(e, buttonDown, buttonUp)
{
	if(this.contextMenuUI)
	{
		if(buttonDown)
		{
			if(!this.contextMenuUI.isInBoundingClientRect(e.clientX, e.clientY))
			{
				this.contextMenuUI.remove();
				this.contextMenuUI = null;
			}
		}
	}
	
	for(let i = 0; i < this.dialogsUI.length; i++)
	{
		let dialogUI = this.dialogsUI[i];
		
		if(dialogUI.moving)
		{
			dialogUI.move(e.clientX - dialogUI.movingX, e.clientY - dialogUI.movingY);
			
			if(buttonUp)
			{
				document.body.style.cursor = "";
				document.body.style.userSelect = "";
				
				dialogUI.moving = false;
				dialogUI.movingX = 0;
				dialogUI.movingY = 0;
			}
			
			return;
		}
	}
	
	if(this.currentProject && this.currentProject.getCurrentAnyObject())
	{
		if(this.movingAnyObject)
		{
			let moveTo = -1;
			
			for(let i = 0; i < this.movingAnyObjectList.length; i++)
			{
				if(this.movingAnyObjectIdx == i)
					continue;
				
				if(this.movingAnyObjectIdx > i)
				{
					if(this.movingAnyObjectList[i].textDrawItemUI.element.getBoundingClientRect().bottom > e.clientY)
					{
						moveTo = i;
						break;
					}
				}
				else if(this.movingAnyObjectIdx < i)
				{
					if(this.movingAnyObjectList[i].thumbnailUI.element.getBoundingClientRect().top < e.clientY)
					{
						moveTo = i;
					}
				}
			}
			
			if(moveTo != -1)
			{
				let anyObject = this.movingAnyObjectList[this.movingAnyObjectIdx];
				
				this.movingAnyObjectList.splice(this.movingAnyObjectIdx, 1);
				this.movingAnyObjectList.splice(moveTo, 0, anyObject);
				
				this.updateControlList();
				
				if(this.movingAnyObjectList == this.currentProject.textDrawList)
				{
					this.repaint();
				}
				
				this.movingAnyObjectIdx = moveTo;
			}
			
			if(buttonUp)
			{
				document.body.style.cursor = "";
				document.body.style.userSelect = "";
				
				this.movingAnyObject = false;
				this.movingAnyObjectIdx = -1;
				
				this.saveProjectsEnabled = true;
				this.saveProjects();
			}
			
			return;
		}
		
		if(buttonDown)
		{
			for(let i = 0; i < this.currentProject.textDrawList.length; i++)
			{
				if(this.currentProject.textDrawList[i].thumbnailUI.isInBoundingClientRect(e.clientX, e.clientY))
				{
					document.body.style.cursor = "move";
					document.body.style.userSelect = "none";
					
					this.movingAnyObject = true;
					this.movingAnyObjectList = this.currentProject.textDrawList;
					this.movingAnyObjectIdx = i;
					
					this.changeTextDraw(this.currentProject.textDrawList[i]);
					return;
				}
			}
			
			for(let i = 0; i < this.currentProject.guideGrids.length; i++)
			{
				if(this.currentProject.guideGrids[i].thumbnailUI.isInBoundingClientRect(e.clientX, e.clientY))
				{
					document.body.style.cursor = "move";
					document.body.style.userSelect = "none";
					
					this.movingAnyObject = true;
					this.movingAnyObjectList = this.currentProject.guideGrids;
					this.movingAnyObjectIdx = i;
					
					this.changeGuideGrid(this.currentProject.guideGrids[i]);
					return;
				}
			}
			
			for(let i = 0; i < this.currentProject.guideLines.length; i++)
			{
				if(this.currentProject.guideLines[i].thumbnailUI.isInBoundingClientRect(e.clientX, e.clientY))
				{
					document.body.style.cursor = "move";
					document.body.style.userSelect = "none";
					
					this.movingAnyObject = true;
					this.movingAnyObjectList = this.currentProject.guideLines;
					this.movingAnyObjectIdx = i;
					
					this.changeGuideLine(this.currentProject.guideLines[i]);
					return;
				}
			}
		}
	}
	
	if(this.currentProject && this.currentProject.getCurrentAnyObject())
	{
		let mouseX = e.clientX - this.screenshotUI.element.getBoundingClientRect().left;
		let mouseY = e.clientY - this.screenshotUI.element.getBoundingClientRect().top;
		
		let cursor = "";
		
		if(this.clicked)
		{
			let scaleX = this.screenshotUI.width / 640.0;
			let scaleY = this.screenshotUI.height / 448.0;
			
			if(this.clickTop)
			{
				if(this.clickOption == "resize")
				{
					let nearestLine = this.getHorizontalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleY);
					
					if(nearestLine !== false)
					{
						this.currentProject.getCurrentAnyObject().setRectTop(nearestLine.y + (nearestLine.isLast ? nearestLine.margin : nearestLine.padding));
					}
					else
					{
						this.currentProject.getCurrentAnyObject().setRectTop(mouseY / scaleY);
					}
				}
				else if(this.clickOption == "move")
				{
					let nearestLine = this.getHorizontalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleY);
					
					if(nearestLine !== false)
					{
						this.currentProject.getCurrentAnyObject().offsetRect(0, nearestLine.y + (nearestLine.isLast ? nearestLine.margin : nearestLine.padding) - this.currentProject.getCurrentAnyObject().getRectTop());
					}
					else
					{
						this.currentProject.getCurrentAnyObject().offsetRect(0, mouseY / scaleY - this.currentProject.getCurrentAnyObject().getRectTop());
					}
				}
				else if(this.clickOption == "resize-letter" && this.currentProject.getCurrentTextDraw() && this.currentProject.getCurrentTextDraw().font != 4)
				{
					let y;
					
					let nearestLine = this.getHorizontalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleY);
					
					if(nearestLine !== false)
					{
						y = nearestLine.y + (nearestLine.isLast ? nearestLine.margin : nearestLine.padding);
					}
					else
					{
						y = mouseY / scaleY;
					}
					
					let top = this.currentProject.getCurrentTextDraw().getStringRectTop();
					
					this.currentProject.getCurrentTextDraw().offsetRect(0, y - this.currentProject.getCurrentTextDraw().getRectTop());
					this.currentProject.getCurrentTextDraw().letterSizeY -= (y - top) / 9.0 / this.currentProject.getCurrentTextDraw().linesCount;
				}
				
				cursor += "n";
				
				if(buttonUp && e.button == 0)
				{
					this.clicked = false;
					this.clickTop = false;
				}
			}
			else if(this.clickBottom)
			{
				if(this.clickOption == "resize")
				{
					let nearestLine = this.getHorizontalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleY);
					
					if(nearestLine !== false)
					{
						this.currentProject.getCurrentAnyObject().setRectBottom(nearestLine.y - (nearestLine.isFirst ? nearestLine.margin : nearestLine.padding));
					}
					else
					{
						this.currentProject.getCurrentAnyObject().setRectBottom(mouseY / scaleY);
					}
				}
				else if(this.clickOption == "move")
				{
					let nearestLine = this.getHorizontalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleY);
					
					if(nearestLine !== false)
					{
						this.currentProject.getCurrentAnyObject().offsetRect(0, nearestLine.y - (nearestLine.isFirst ? nearestLine.margin : nearestLine.padding) - this.currentProject.getCurrentAnyObject().getRectBottom());
					}
					else
					{
						this.currentProject.getCurrentAnyObject().offsetRect(0, mouseY / scaleY - this.currentProject.getCurrentAnyObject().getRectBottom());
					}
				}
				else if(this.clickOption == "resize-letter" && this.currentProject.getCurrentTextDraw() && this.currentProject.getCurrentTextDraw().font != 4)
				{
					let y;
					
					let nearestLine = this.getHorizontalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleY);
					
					if(nearestLine !== false)
					{
						y = nearestLine.y - (nearestLine.isFirst ? nearestLine.margin : nearestLine.padding);
					}
					else
					{
						y = mouseY / scaleY;
					}
					
					this.currentProject.getCurrentTextDraw().letterSizeY = (y - this.currentProject.getCurrentTextDraw().getStringRectTop()) / 9.0 / this.currentProject.getCurrentTextDraw().linesCount;
				}
				
				cursor += "s";
				
				if(buttonUp && e.button == 0)
				{
					this.clicked = false;
					this.clickBottom = false;
				}
			}
			
			if(this.clickLeft)
			{
				if(this.clickOption == "resize")
				{
					let nearestLine = this.getVerticalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleX);
					
					if(nearestLine !== false)
					{
						this.currentProject.getCurrentAnyObject().setRectLeft(nearestLine.x + (nearestLine.isLast ? nearestLine.margin : nearestLine.padding));
					}
					else
					{
						this.currentProject.getCurrentAnyObject().setRectLeft(mouseX / scaleX);
					}
				}
				else if(this.clickOption == "move")
				{
					let nearestLine = this.getVerticalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleX);
					
					if(nearestLine !== false)
					{
						this.currentProject.getCurrentAnyObject().offsetRect(nearestLine.x + (nearestLine.isLast ? nearestLine.margin : nearestLine.padding) - this.currentProject.getCurrentAnyObject().getRectLeft(), 0);
					}
					else
					{
						this.currentProject.getCurrentAnyObject().offsetRect(mouseX / scaleX - this.currentProject.getCurrentAnyObject().getRectLeft(), 0);
					}
				}
				else if(this.clickOption == "resize-letter" && this.currentProject.getCurrentTextDraw() && this.currentProject.getCurrentTextDraw().font != 4)
				{
					let x;
					
					let nearestLine = this.getVerticalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleX);
					
					if(nearestLine !== false)
					{
						x = nearestLine.x + (nearestLine.isLast ? nearestLine.margin : nearestLine.padding);
					}
					else
					{
						x = mouseX / scaleX;
					}
					
					let left = this.currentProject.getCurrentTextDraw().getStringRectLeft();
					
					if(this.currentProject.getCurrentTextDraw().alignment == 1)
						this.currentProject.getCurrentTextDraw().offsetRect(x - this.currentProject.getCurrentTextDraw().getRectLeft(), 0);
					
					this.currentProject.getCurrentTextDraw().letterSizeX -= (x - left) / this.currentProject.getCurrentTextDraw().stringWidth;
				}
				
				cursor += "w";
				
				if(buttonUp && e.button == 0)
				{
					this.clicked = false;
					this.clickLeft = false;
				}
			}
			else if(this.clickRight)
			{
				if(this.clickOption == "resize")
				{
					let nearestLine = this.getVerticalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleX);
					
					if(nearestLine !== false)
					{
						this.currentProject.getCurrentAnyObject().setRectRight(nearestLine.x - (nearestLine.isFirst ? nearestLine.margin : nearestLine.padding));
					}
					else
					{
						this.currentProject.getCurrentAnyObject().setRectRight(mouseX / scaleX);
					}
				}
				else if(this.clickOption == "move")
				{
					let nearestLine = this.getVerticalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleX);
					
					if(nearestLine !== false)
					{
						this.currentProject.getCurrentAnyObject().offsetRect(nearestLine.x - (nearestLine.isFirst ? nearestLine.margin : nearestLine.padding) - this.currentProject.getCurrentAnyObject().getRectRight(), 0);
					}
					else
					{
						this.currentProject.getCurrentAnyObject().offsetRect(mouseX / scaleX - this.currentProject.getCurrentAnyObject().getRectRight(), 0);
					}
				}
				else if(this.clickOption == "resize-letter" && this.currentProject.getCurrentTextDraw() && this.currentProject.getCurrentTextDraw().font != 4)
				{
					let x;
					
					let nearestLine = this.getVerticalNearestLine(mouseX / scaleX, mouseY / scaleY, 4.0 / scaleX);
					
					if(nearestLine !== false)
					{
						x = nearestLine.x - (nearestLine.isFirst ? nearestLine.margin : nearestLine.padding);
					}
					else
					{
						x = mouseX / scaleX;
					}
					
					let left = this.currentProject.getCurrentTextDraw().getStringRectLeft();
					
					if(this.currentProject.getCurrentTextDraw().alignment == 3)
						this.currentProject.getCurrentTextDraw().offsetRect(x - this.currentProject.getCurrentTextDraw().getRectRight(), 0);
					
					this.currentProject.getCurrentTextDraw().letterSizeX = (x - left) / this.currentProject.getCurrentTextDraw().stringWidth;
				}
				
				cursor += "e";
				
				if(buttonUp && e.button == 0)
				{
					this.clicked = false;
					this.clickRight = false;
				}
			}
			
			if(this.currentProject.getCurrentTextDraw())
			{
				this.updateControls();
				
				this.boxTextDrawUI.clear();
				
				if(this.clicked)
				{
					this.boxTextDrawUI.paintBox(this.currentProject.getCurrentTextDraw(), this.clickOption != "resize-letter");
				}
				
				this.currentTextDrawUI.clear();
				this.currentTextDrawUI.paint(this.currentProject.getCurrentTextDraw(), this.clicked);
				
				this.optionsUI.clear();
				
				this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
				this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
				this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
				
				if(buttonUp)
				{
					this.repaintThumbnail();
					
					this.saveProjectsEnabled = true;
					this.saveProjects();
				}
			}
			else
			{
				this.updateGuideGridControls();
				this.updateGuideLineControls();
				this.updateMultipleControls();
				
				this.optionsUI.clear();
				this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
				this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
				
				if(buttonUp)
				{
					if(this.currentProject.multipleSelection.selections.length > 1)
					{
						this.repaintedThumbnailAll = false;
						this.repaint();
					}
					
					this.saveProjectsEnabled = true;
					this.saveProjects();
				}
				else
				{
					if(this.currentProject.multipleSelection.selections.length > 1)
					{
						this.belowTextDrawUI.clear();
						this.boxTextDrawUI.clear();
						
						for(let i = 0; i < this.currentProject.textDrawList.length; i++)
						{
							this.belowTextDrawUI.paint(this.currentProject.textDrawList[i], this.clicked, true);
						}
						
						this.optionsUI.paintMultipleSelection(this.currentProject.multipleSelection, this.clickOption);
					}
				}
			}
		}
		else if(e.target == this.optionsUI.element)
		{
			this.clickTop = false;
			this.clickBottom = false;
			this.clickLeft = false;
			this.clickRight = false;
			
			if(this.optionsUI.isInResizeRect(mouseX, mouseY))
			{
				if(buttonDown && e.button == 0)
				{
					this.clickOption = "resize";
					
					this.optionsUI.clear();
					this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
					this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
					this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
					
					if(this.currentProject.multipleSelection.selections.length > 1)
						this.optionsUI.paintMultipleSelection(this.currentProject.multipleSelection, this.clickOption);
				}
			}
			else if(this.optionsUI.isInMoveRect(mouseX, mouseY))
			{
				if(buttonDown && e.button == 0)
				{
					this.clickOption = "move";
					
					this.optionsUI.clear();
					this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
					this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
					this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
					
					if(this.currentProject.multipleSelection.selections.length > 1)
						this.optionsUI.paintMultipleSelection(this.currentProject.multipleSelection, this.clickOption);
				}
			}
			else if(this.optionsUI.isInResizeLetterRect(mouseX, mouseY))
			{
				if(buttonDown && e.button == 0)
				{
					this.clickOption = "resize-letter";
					
					this.optionsUI.clear();
					this.optionsUI.paintGuideGrids(this.currentProject.getCurrentGuideGrid(), this.currentProject.guideGrids, this.clickOption);
					this.optionsUI.paintGuideLines(this.currentProject.getCurrentGuideLine(), this.currentProject.guideLines, this.clickOption);
					this.optionsUI.paint(this.currentProject.getCurrentTextDraw(), this.clickOption);
				}
			}
			else if(this.optionsUI.isInRect(mouseX, mouseY))
			{
				if(Math.abs(mouseY - this.optionsUI.rectTop) < 4 && (!this.currentProject.getCurrentGuideLine() || this.currentProject.getCurrentGuideLine().style == 1 || this.clickOption == "move"))
				{
					cursor += "n";
					
					if(buttonDown && e.button == 0)
					{
						this.clicked = true;
						this.clickTop = true;
					}
				}
				else if(Math.abs(mouseY - this.optionsUI.rectBottom) < 4 && (!this.currentProject.getCurrentGuideLine() || this.currentProject.getCurrentGuideLine().style == 1))
				{
					cursor += "s";
					
					if(buttonDown && e.button == 0)
					{
						this.clicked = true;
						this.clickBottom = true;
					}
				}
				
				if(Math.abs(mouseX - this.optionsUI.rectLeft) < 4 && (!this.currentProject.getCurrentGuideLine() || this.currentProject.getCurrentGuideLine().style == 0 || this.clickOption == "move"))
				{
					cursor += "w";
					
					if(buttonDown && e.button == 0)
					{
						this.clicked = true;
						this.clickLeft = true;
					}
				}
				else if(Math.abs(mouseX - this.optionsUI.rectRight) < 4 && (!this.currentProject.getCurrentGuideLine() || this.currentProject.getCurrentGuideLine().style == 0))
				{
					cursor += "e";
					
					if(buttonDown && e.button == 0)
					{
						this.clicked = true;
						this.clickRight = true;
					}
				}
			}
		}
		else
		{
			this.clickTop = false;
			this.clickBottom = false;
			this.clickLeft = false;
			this.clickRight = false;
		}
		
		if(cursor.length != 0)
		{
			if(this.clickOption == "move")
			{
				cursor = "move";
			}
			else
			{
				cursor += "-resize";
			}
			
			document.body.style.cursor = cursor;
			document.body.style.userSelect = "none";
		}
		else
		{
			document.body.style.cursor = "";
			document.body.style.userSelect = "";
		}
	}
};

Main.prototype.checkScrollBars = function()
{
	if(this.scrollableTabsUI.hasScrollBar())
	{
		if(!this.tabsUI.scrollBar)
		{
			this.tabsUI.scrollBar = true;
			this.tabsUI.element.style.width = "84px";
		}
	}
	else
	{
		if(this.tabsUI.scrollBar)
		{
			this.tabsUI.scrollBar = false;
			this.tabsUI.element.style.width = "76px";
		}
	}
	
	if(this.scrollableControlsUI.hasScrollBar())
	{
		if(!this.controlsUI.scrollBar)
		{
			this.controlsUI.scrollBar = true;
			this.controlsUI.element.style.width = "258px";
		}
	}
	else
	{
		if(this.controlsUI.scrollBar)
		{
			this.controlsUI.scrollBar = false;
			this.controlsUI.element.style.width = "250px";
		}
	}
};
