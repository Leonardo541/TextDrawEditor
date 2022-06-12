
function DialogUI(parent, title)
{
	EntityUI.call(this, parent, "div", {class: "dialog"});
	
	this.moving = false;
	this.movingX = 0;
	this.movingY = 0;
	
	this.titleBarUI = new EntityUI(this, "div", {innerText: title, class: "dialogTitleBar", mousedown: (e) => { this.startMoving(e); }});
	this.contentUI = new EntityUI(this, "div", {class: "dialogContent"});
	this.buttonsUI = new EntityUI(this, "div", {class: "dialogButtons"});
}

DialogUI.prototype = Object.create(EntityUI.prototype);

DialogUI.prototype.startMoving = function(e)
{
	this.moving = true;
	this.movingX = e.clientX - this.element.getBoundingClientRect().left;
	this.movingY = e.clientY - this.element.getBoundingClientRect().top;
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
