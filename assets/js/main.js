
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
	this.scrollableControlsUI.appendStaticText("Name");
	this.scrollableControlsUI.appendLineBreak();
	this.controlNameUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.nameChange(e); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Text");
	this.scrollableControlsUI.appendLineBreak();
	this.controlTextUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.textChange(e); }, focusout : (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Position");
	this.scrollableControlsUI.appendLineBreak();
	this.controlXUI = new TextBoxUI(this.scrollableControlsUI, {class: "textBoxLeft", keyup: (e) => { this.xChange(e); }, focusout : (e) => { this.repaintThumbnail(); }});
	this.controlYUI = new TextBoxUI(this.scrollableControlsUI, {class: "textBoxRight", keyup: (e) => { this.yChange(e); }, focusout : (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Letter Size");
	this.scrollableControlsUI.appendLineBreak();
	this.controlLetterSizeXUI = new TextBoxUI(this.scrollableControlsUI, {class: "textBoxLeft", keyup: (e) => { this.letterSizeXChange(e); }, focusout : (e) => { this.repaintThumbnail(); }});
	this.controlLetterSizeYUI = new TextBoxUI(this.scrollableControlsUI, {class: "textBoxRight", keyup: (e) => { this.letterSizeYChange(e); }, focusout : (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Text Size");
	this.scrollableControlsUI.appendLineBreak();
	this.controlTextSizeXUI = new TextBoxUI(this.scrollableControlsUI, {class: "textBoxLeft", keyup: (e) => { this.textSizeXChange(e); }, focusout : (e) => { this.repaintThumbnail(); }});
	this.controlTextSizeYUI = new TextBoxUI(this.scrollableControlsUI, {class: "textBoxRight", keyup: (e) => { this.textSizeYChange(e); }, focusout : (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Alignment");
	this.scrollableControlsUI.appendLineBreak();
	this.controlAlignmentUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.alignmentChange(e); }, focusout : (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Color");
	this.scrollableControlsUI.appendLineBreak();
	this.controlColorUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.colorChange(e); }, focusout: (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Use Box");
	this.scrollableControlsUI.appendLineBreak();
	this.controlUseBoxUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.useBoxChange(e); }, focusout: (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Box Color");
	this.scrollableControlsUI.appendLineBreak();
	this.controlBoxColorUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.boxColorChange(e); }, focusout: (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Set Shadow");
	this.scrollableControlsUI.appendLineBreak();
	this.controlSetShadowUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.setShadowChange(e); }, focusout: (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Set Outline");
	this.scrollableControlsUI.appendLineBreak();
	this.controlSetOutlineUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.setOutlineChange(e); }, focusout: (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Background Color");
	this.scrollableControlsUI.appendLineBreak();
	this.controlBackgroundColorUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.backgroundColorChange(e); }, focusout: (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Font");
	this.scrollableControlsUI.appendLineBreak();
	this.controlFontUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.fontChange(e); }, focusout: (e) => { this.repaintThumbnail(); }});
	this.scrollableControlsUI.appendLineBreak();
	this.scrollableControlsUI.appendStaticText("Set Proportional");
	this.scrollableControlsUI.appendLineBreak();
	this.controlSetProportionalUI = new TextBoxUI(this.scrollableControlsUI, {keyup: (e) => { this.setProportionalChange(e); }, focusout: (e) => { this.repaintThumbnail(); }});
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
	
	this.addProject();
	
	this.movingTextDraw = false;
	this.movingTextDrawIdx = -1;
	
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
}

Main.prototype.addProject = function()
{
	let project = new Project(this);
	
	this.projects.push(project);
	
	this.changeProject(project);
	this.changeTextDraw(project.currentTextDraw);
	
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
	if(this.currentProject != null)
		this.currentProject.projectTabUI.element.classList.remove("currentProjectTab");
	
	this.currentProject = project;
	
	if(this.currentProject != null)
		this.currentProject.projectTabUI.element.classList.add("currentProjectTab");
	
	this.updateControlList();
	this.updateControls();
	
	this.repaint();
};

Main.prototype.createTextDraw = function(x, y)
{
	let scaleX = this.screenshotUI.width / 640.0;
	let scaleY = this.screenshotUI.height / 448.0;
	
	let mouseX = x * scaleX + this.screenshotUI.element.getBoundingClientRect().left;
	let mouseY = y * scaleY + this.screenshotUI.element.getBoundingClientRect().top;
	
	let dialogUI = new DialogUI("body", "Create TextDraw");
	
	dialogUI.contentUI.appendStaticText("Text");
	dialogUI.contentUI.appendLineBreak();
	
	let textUI = new TextBoxUI(dialogUI.contentUI, {value: "Example"});
	
	dialogUI.contentUI.appendLineBreak();
	dialogUI.contentUI.appendStaticText("Position");
	dialogUI.contentUI.appendLineBreak();
	
	let xUI = new TextBoxUI(dialogUI.contentUI, {value: x.toPlainString(), class: "textBoxLeft"});
	let yUI = new TextBoxUI(dialogUI.contentUI, {value: y.toPlainString(), class: "textBoxRight"});
	
	dialogUI.contentUI.appendStaticLine();
	
	new ButtonUI(dialogUI.buttonsUI, {innerText: "Accept", click: () => { let textDraw = this.currentProject.createTextDraw(textUI.element.value, parseInt(xUI.element.value), parseInt(yUI.element.value)); this.updateControlList(); this.changeTextDraw(textDraw); dialogUI.remove(); this.dialogsUI.splice(this.dialogsUI.indexOf(dialogUI), 1); }});
	new ButtonUI(dialogUI.buttonsUI, {innerText: "Cancel", click: () => { dialogUI.remove(); this.dialogsUI.splice(this.dialogsUI.indexOf(dialogUI), 1); }});
	
	dialogUI.move(mouseX - dialogUI.element.clientWidth / 2, mouseY - dialogUI.element.clientHeight / 2);
	
	this.dialogsUI.push(dialogUI);
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
	
	if(this.currentProject.currentTextDraw == textDraw)
	{
		this.changeTextDraw(null);
	}
	else
	{
		this.repaint();
	}
};

Main.prototype.changeTextDraw = function(textDraw)
{
	if(this.currentProject.currentTextDraw != null)
		this.currentProject.currentTextDraw.textDrawItemUI.element.classList.remove("currentTextDrawItem");
	
	this.currentProject.currentTextDraw = textDraw;
	
	if(this.currentProject.currentTextDraw != null)
		this.currentProject.currentTextDraw.textDrawItemUI.element.classList.add("currentTextDrawItem");
	
	this.updateControls();
	
	this.repaint();
};

Main.prototype.contextMenuProject = function(project, x, y)
{
	if(this.contextMenuUI)
		this.contextMenuUI.remove();
	
	this.contextMenuUI = new ContextMenuUI("body", x, y);
	this.contextMenuUI.appendItem("Remove Project", () => { this.removeProject(project) });
	
	this.changeProject(project);
};

Main.prototype.contextMenuTextDraw = function(textDraw, x, y)
{
	if(this.contextMenuUI)
		this.contextMenuUI.remove();
	
	this.contextMenuUI = new ContextMenuUI("body", x, y);
	this.contextMenuUI.appendItem("Remove " + textDraw.name, () => { this.removeTextDraw(textDraw) });
	
	this.changeTextDraw(textDraw);
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
	this.contextMenuUI.appendItem("Create TextDraw", () => { this.createTextDraw(mouseX / scaleX, mouseY / scaleY); });
	
	let firstItem = true;
	
	for(let i = 0; i < this.currentProject.textDrawList.length; i++)
	{
		let left = this.currentProject.textDrawList[i].getRectLeft() * scaleX;
		let top = this.currentProject.textDrawList[i].getRectTop() * scaleY;
		let right = this.currentProject.textDrawList[i].getRectRight() * scaleX;
		let bottom = this.currentProject.textDrawList[i].getStringRectBottom() * scaleY;
		
		if(left <= mouseX && mouseX < right && top <= mouseY && mouseY < bottom)
		{
			if(firstItem)
			{
				this.contextMenuUI.appendStaticLine();
				firstItem = false;
			}
			
			let contextItemUI = this.contextMenuUI.appendItem(this.currentProject.textDrawList[i].name, () => {});
			let contextSubMenuUI = new ContextMenuUI(contextItemUI, 0, 0);
			
			contextSubMenuUI.appendItem("Select", () => { this.changeTextDraw(this.currentProject.textDrawList[i]); });
			contextSubMenuUI.appendStaticLine();
			contextSubMenuUI.appendItem("Remove", () => { this.removeTextDraw(this.currentProject.textDrawList[i]); });
		}
	}
	
	this.contextMenuUI.updateSubMenuPosition();
};

Main.prototype.updateControlList = function()
{
	this.controlListUI.element.innerHTML = "";
	
	if(this.currentProject)
	{
		for(let i = 0; i < this.currentProject.textDrawList.length; i++)
		{
			this.controlListUI.element.appendChild(this.currentProject.textDrawList[i].textDrawItemUI.element);
		}
	}
}

Main.prototype.updateControls = function(updateList)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.controlNameUI.element.value = this.currentProject.currentTextDraw.name;
		this.controlTextUI.element.value = this.currentProject.currentTextDraw.text;
		this.controlXUI.element.value = this.currentProject.currentTextDraw.x.toPlainString();
		this.controlYUI.element.value = this.currentProject.currentTextDraw.y.toPlainString();
		this.controlLetterSizeXUI.element.value = this.currentProject.currentTextDraw.letterSizeX.toPlainString();
		this.controlLetterSizeYUI.element.value = this.currentProject.currentTextDraw.letterSizeY.toPlainString();
		this.controlTextSizeXUI.element.value = this.currentProject.currentTextDraw.textSizeX.toPlainString();
		this.controlTextSizeYUI.element.value = this.currentProject.currentTextDraw.textSizeY.toPlainString();
		this.controlAlignmentUI.element.value = this.currentProject.currentTextDraw.alignment.toString();
		this.controlColorUI.element.value = this.currentProject.currentTextDraw.color.toString(16).toUpperCase().padZero(8);
		this.controlUseBoxUI.element.value = this.currentProject.currentTextDraw.useBox.toString();
		this.controlBoxColorUI.element.value = this.currentProject.currentTextDraw.boxColor.toString(16).toUpperCase().padZero(8);
		this.controlSetShadowUI.element.value = this.currentProject.currentTextDraw.setShadow.toString();
		this.controlSetOutlineUI.element.value = this.currentProject.currentTextDraw.setOutline.toString();
		this.controlBackgroundColorUI.element.value = this.currentProject.currentTextDraw.backgroundColor.toString(16).toUpperCase().padZero(8);
		this.controlFontUI.element.value = this.currentProject.currentTextDraw.font.toString();
		this.controlSetProportionalUI.element.value = this.currentProject.currentTextDraw.setProportional.toString();
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
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.nameUI.element.innerHTML = e.target.value;
		this.currentProject.currentTextDraw.name = e.target.value;
		
		this.updateControlList();
	}
};

Main.prototype.textChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.text = e.target.value;
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
	}
};

Main.prototype.xChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.x = parseFloat(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
	}
};

Main.prototype.yChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.y = parseFloat(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
	}
};

Main.prototype.letterSizeXChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.letterSizeX = parseFloat(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
	}
};

Main.prototype.letterSizeYChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.letterSizeY = parseFloat(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
	}
};

Main.prototype.textSizeXChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.textSizeX = parseFloat(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
	}
};

Main.prototype.textSizeYChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.textSizeY = parseFloat(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
	}
};

Main.prototype.alignmentChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.changeAlignment(parseInt(e.target.value));
		
		this.updateControls();
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
		
		this.optionsUI.clear();
		this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
	}
};

Main.prototype.colorChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.color = parseInt(e.target.value, 16);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
	}
};

Main.prototype.useBoxChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.useBox = parseInt(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
	}
};

Main.prototype.boxColorChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.boxColor = parseInt(e.target.value, 16);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
	}
};

Main.prototype.setShadowChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.setShadow = parseInt(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
	}
};

Main.prototype.setOutlineChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.setOutline = parseInt(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
	}
};

Main.prototype.backgroundColorChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.backgroundColor = parseInt(e.target.value, 16);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
	}
};

Main.prototype.fontChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.font = parseInt(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
	}
};

Main.prototype.setProportionalChange = function(e)
{
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		this.currentProject.currentTextDraw.setProportional = parseInt(e.target.value);
		
		this.currentTextDrawUI.clear();
		this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
	}
};

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
		
		if(file.type.match('image.*'))
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
	
	this.belowTextDrawUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	this.boxTextDrawUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	this.currentTextDrawUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	this.aboveTextDrawUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	
	this.optionsUI.resize(this.screenshotUI.width, this.screenshotUI.height);
	
	this.belowTextDrawUI.clear();
	this.currentTextDrawUI.clear();
	this.aboveTextDrawUI.clear();
	
	this.optionsUI.clear();
	
	let textDrawUI = this.belowTextDrawUI;
	
	if(this.currentProject)
	{
		for(let i = 0; i < this.currentProject.textDrawList.length; i++)
		{
			if(this.currentProject.textDrawList[i] == this.currentProject.currentTextDraw)
			{
				this.boxTextDrawUI.clear();
				
				if(this.clicked)
				{
					this.boxTextDrawUI.paintBox(this.currentProject.currentTextDraw, this.clickOption != "resize-letter");
				}
				
				textDrawUI = this.currentTextDrawUI;
				textDrawUI.paint(this.currentProject.textDrawList[i], this.clicked);
				textDrawUI = this.aboveTextDrawUI;
				
				this.optionsUI.paint(this.currentProject.textDrawList[i], this.clickOption);
			}
			else
			{
				textDrawUI.paint(this.currentProject.textDrawList[i], false);
			}
		}
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
		
		if(this.currentProject.currentTextDraw)
		{
			this.currentProject.currentTextDraw.thumbnailUI.context.clearRect(0, 0, 64, 64);
			
			if(this.currentTextDrawUI.width != 0 && this.currentTextDrawUI.height != 0)
				this.currentProject.currentTextDraw.thumbnailUI.context.drawImage(this.currentTextDrawUI.element, 0, 0, this.currentTextDrawUI.width, this.currentTextDrawUI.height, 0, 0, 24, 24);
		}
	}
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
	
	if(this.currentProject && this.currentProject.currentTextDraw)
	{
		if(this.movingTextDraw)
		{
			let moveTo = -1;
			
			for(let i = 0; i < this.currentProject.textDrawList.length; i++)
			{
				if(this.movingTextDrawIdx == i)
					continue;
				
				if(this.movingTextDrawIdx > i)
				{
					if(this.currentProject.textDrawList[i].textDrawItemUI.element.getBoundingClientRect().bottom > e.clientY)
					{
						moveTo = i;
						break;
					}
				}
				else if(this.movingTextDrawIdx < i)
				{
					if(this.currentProject.textDrawList[i].thumbnailUI.element.getBoundingClientRect().top < e.clientY)
					{
						moveTo = i;
					}
				}
			}
			
			if(moveTo != -1)
			{
				let textDraw = this.currentProject.textDrawList[this.movingTextDrawIdx];
				
				this.currentProject.textDrawList.splice(this.movingTextDrawIdx, 1);
				this.currentProject.textDrawList.splice(moveTo, 0, textDraw);
				
				this.updateControlList();
				
				this.movingTextDrawIdx = moveTo;
			}
			
			if(buttonUp)
			{
				document.body.style.cursor = "";
				document.body.style.userSelect = "";
				
				this.movingTextDraw = false;
				this.movingTextDrawIdx = -1;
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
					
					this.movingTextDraw = true;
					this.movingTextDrawIdx = i;
					
					this.changeTextDraw(this.currentProject.textDrawList[i]);
					return;
				}
			}
		}
		
		let mouseX = e.clientX - this.screenshotUI.element.getBoundingClientRect().left;
		let mouseY = e.clientY - this.screenshotUI.element.getBoundingClientRect().top;
		
		let cursor = "";
		
		if(this.clicked)
		{
			let scaleX = this.screenshotUI.width / 640.0;
			let scaleY = this.screenshotUI.height / 448.0;
			
			let x = this.currentProject.currentTextDraw.getStringRectLeft() * scaleX;
			let y = this.currentProject.currentTextDraw.getStringRectTop() * scaleY;
			
			if(this.clickTop)
			{
				if(this.clickOption == "resize")
				{
					this.currentProject.currentTextDraw.setRectTop(mouseY / scaleY);
				}
				else if(this.clickOption == "move")
				{
					this.currentProject.currentTextDraw.offsetRect(0, mouseY / scaleY - this.currentProject.currentTextDraw.getRectTop());
				}
				else if(this.clickOption == "resize-letter")
				{
					this.currentProject.currentTextDraw.offsetRect(0, mouseY / scaleY - this.currentProject.currentTextDraw.getRectTop());
					this.currentProject.currentTextDraw.letterSizeY -= (mouseY - y) / scaleY / 9.0 / this.currentProject.currentTextDraw.linesCount;
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
					this.currentProject.currentTextDraw.setRectBottom(mouseY / scaleY);
				}
				else if(this.clickOption == "move")
				{
					this.currentProject.currentTextDraw.offsetRect(0, mouseY / scaleY - this.currentProject.currentTextDraw.getRectBottom());
				}
				else if(this.clickOption == "resize-letter")
				{
					this.currentProject.currentTextDraw.letterSizeY = (mouseY - y) / scaleY / 9.0 / this.currentProject.currentTextDraw.linesCount;
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
					this.currentProject.currentTextDraw.setRectLeft(mouseX / scaleX);
				}
				else if(this.clickOption == "move")
				{
					this.currentProject.currentTextDraw.offsetRect(mouseX / scaleX - this.currentProject.currentTextDraw.getRectLeft(), 0);
				}
				else if(this.clickOption == "resize-letter")
				{
					if(this.currentProject.currentTextDraw.alignment == 1)
						this.currentProject.currentTextDraw.offsetRect(mouseX / scaleX - this.currentProject.currentTextDraw.getRectLeft(), 0);
					
					this.currentProject.currentTextDraw.letterSizeX -= (mouseX - x) / scaleX / this.currentProject.currentTextDraw.stringWidth;
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
					this.currentProject.currentTextDraw.setRectRight(mouseX / scaleX);
				}
				else if(this.clickOption == "move")
				{
					this.currentProject.currentTextDraw.offsetRect(mouseX / scaleX - this.currentProject.currentTextDraw.getRectRight(), 0);
				}
				else if(this.clickOption == "resize-letter")
				{
					if(this.currentProject.currentTextDraw.alignment == 3)
						this.currentProject.currentTextDraw.offsetRect(mouseX / scaleX - this.currentProject.currentTextDraw.getRectRight(), 0);
					
					this.currentProject.currentTextDraw.letterSizeX = (mouseX - x) / scaleX / this.currentProject.currentTextDraw.stringWidth;
				}
				
				cursor += "e";
				
				if(buttonUp && e.button == 0)
				{
					this.clicked = false;
					this.clickRight = false;
				}
			}
			
			this.updateControls();
			
			this.boxTextDrawUI.clear();
			
			if(this.clicked)
			{
				this.boxTextDrawUI.paintBox(this.currentProject.currentTextDraw, this.clickOption != "resize-letter");
			}
			
			this.currentTextDrawUI.clear();
			this.currentTextDrawUI.paint(this.currentProject.currentTextDraw, this.clicked);
			
			this.optionsUI.clear();
			this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
			
			if(buttonUp)
				this.repaintThumbnail();
		}
		else
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
					this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
				}
			}
			else if(this.optionsUI.isInMoveRect(mouseX, mouseY))
			{
				if(buttonDown && e.button == 0)
				{
					this.clickOption = "move";
					
					this.optionsUI.clear();
					this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
				}
			}
			else if(this.optionsUI.isInResizeLetterRect(mouseX, mouseY))
			{
				if(buttonDown && e.button == 0)
				{
					this.clickOption = "resize-letter";
					
					this.optionsUI.clear();
					this.optionsUI.paint(this.currentProject.currentTextDraw, this.clickOption);
				}
			}
			else if(this.optionsUI.isInRect(mouseX, mouseY))
			{
				if(Math.abs(mouseY - this.optionsUI.rectTop) < 4)
				{
					cursor += "n";
					
					if(buttonDown && e.button == 0)
					{
						this.clicked = true;
						this.clickTop = true;
					}
				}
				else if(Math.abs(mouseY - this.optionsUI.rectBottom) < 4)
				{
					cursor += "s";
					
					if(buttonDown && e.button == 0)
					{
						this.clicked = true;
						this.clickBottom = true;
					}
				}
				
				if(Math.abs(mouseX - this.optionsUI.rectLeft) < 4)
				{
					cursor += "w";
					
					if(buttonDown && e.button == 0)
					{
						this.clicked = true;
						this.clickLeft = true;
					}
				}
				else if(Math.abs(mouseX - this.optionsUI.rectRight) < 4)
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
