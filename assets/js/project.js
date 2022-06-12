
function Project(main)
{
	this.main = main;
	
	this.projectTabUI = new EntityUI(main.scrollableTabsUI, "div", {class: "projectTab", onclick: () => { main.changeProject(this); }, contextmenu: (e) => { main.contextMenuProject(this, e.clientX, e.clientY); e.preventDefault(); }});
	this.thumbnailUI = new DrawableUI(this.projectTabUI, { width: "64", height: "64" });
	
	this.textDrawList = [];
	this.textDrawCount = 0;
	this.currentTextDraw = this.createTextDraw("Example", 10, 10);
}

Project.prototype.createTextDraw = function(text, x, y)
{
	let textDraw = new TextDraw(this.main, "TextDraw" + ++this.textDrawCount + "", text, x, y);
	this.textDrawList.push(textDraw);
	return textDraw;
};
