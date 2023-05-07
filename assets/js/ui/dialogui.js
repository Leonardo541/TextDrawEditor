
function DialogUI(parent, title)
{
	EntityUI.call(this, parent, "div", {class: "dialog", mousedown: () => { this.focus(); }});
	
	this.moving = false;
	this.movingX = 0;
	this.movingY = 0;
	
	this.titleBarUI = new EntityUI(this, "div", {innerText: title, class: "dialogTitleBar", mousedown: (e) => { this.startMoving(e); }});
	this.contentUI = new EntityUI(this, "div", {class: "dialogContent"});
	this.buttonsUI = new EntityUI(this, "div", {class: "dialogButtons"});
	
	this.focus();
}

DialogUI.prototype = Object.create(EntityUI.prototype);

DialogUI.prototype.startMoving = function(e)
{
	main.overrideCursor(true);
	
	document.body.style.cursor = "move";
	document.body.style.userSelect = "none";
	
	this.moving = true;
	this.movingX = e.clientX - this.element.getBoundingClientRect().left;
	this.movingY = e.clientY - this.element.getBoundingClientRect().top;
};

DialogUI.prototype.stopMoving = function(e)
{
	main.overrideCursor(false);
	
	document.body.style.cursor = "";
	document.body.style.userSelect = "";
	
	this.moving = false;
	this.movingX = 0;
	this.movingY = 0;
};

DialogUI.prototype.move = function(x, y)
{
	if(x < 0)
	{
		x = 0;
	}
	else if(x >= (window.innerWidth - this.element.offsetWidth))
	{
		x = window.innerWidth - this.element.offsetWidth - 1;
	}
	
	if(y < 0)
	{
		y = 0;
	}
	else if(y >= (window.innerHeight - this.element.offsetHeight))
	{
		y = window.innerHeight - this.element.offsetHeight - 1;
	}
	
	this.element.style.left = x + "px";
	this.element.style.top = y + "px";
	this.element.style.transform = "translate(0px)";
};

DialogUI.prototype.focus = function()
{
	let zIndex = 1;
	
	let elements = document.querySelectorAll(".dialog");
	
	for(let i = 0; i < elements.length; i++)
	{
		if(this.element == elements[i])
			continue;
		
		if(elements[i].style.zIndex && parseInt(elements[i].style.zIndex) >= zIndex)
			zIndex = parseInt(elements[i].style.zIndex) + 1;
	}
	
	if(!this.element.style.zIndex || parseInt(this.element.style.zIndex) < zIndex)
		this.element.style.zIndex = zIndex.toString();
};
