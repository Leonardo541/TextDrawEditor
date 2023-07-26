
function DialogUI(parent, title)
{
	EntityUI.call(this, parent, "div", {class: "dialog", mousedown: () => { this.focus(); }});
	
	this.moving = false;
	this.movingX = 0;
	this.movingY = 0;
	
	this.boundings = null;
	
	this.position = {};
	
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
	
	this.boundings = [];
	
	let elements = document.querySelectorAll(".dialog");
	
	for(let i = 0; i < elements.length; i++)
	{
		if(this.element == elements[i])
			continue;
		
		this.boundings.push(elements[i].getBoundingClientRect());
	}
};

DialogUI.prototype.stopMoving = function(e)
{
	main.overrideCursor(false);
	
	document.body.style.cursor = "";
	document.body.style.userSelect = "";
	
	this.moving = false;
	this.movingX = 0;
	this.movingY = 0;
	
	this.boundings = null;
};

DialogUI.prototype.move = function(x, y)
{
	if(x < 0 || this.element.offsetWidth >= window.innerWidth)
	{
		x = 0;
	}
	else if(x >= (window.innerWidth - this.element.offsetWidth))
	{
		x = window.innerWidth - this.element.offsetWidth - 1;
	}
	
	if(y < 0 || this.element.offsetHeight >= window.innerHeight)
	{
		y = 0;
	}
	else if(y >= (window.innerHeight - this.element.offsetHeight))
	{
		y = window.innerHeight - this.element.offsetHeight - 1;
	}
	
	if(this.boundings)
	{
		let sizeX = this.element.offsetWidth;
		let sizeY = this.element.offsetHeight;
		
		let centerX = x + sizeX / 2;
		let centerY = y + sizeY / 2;
		
		let left = x;
		let top = y;
		let right = x + sizeX;
		let bottom = y + sizeY;
		
		for(let i = 0; i < this.boundings.length; i++)
		{
			let sizeX2 = this.boundings[i].right - this.boundings[i].left;
			let sizeY2 = this.boundings[i].bottom - this.boundings[i].top;
			
			let centerX2 = this.boundings[i].left + sizeX2 / 2;
			let centerY2 = this.boundings[i].top + sizeY2 / 2;
			
			if((this.boundings[i].left < centerX && centerX < this.boundings[i].right) || (left < centerX2 && centerX2 < right))
			{
				if(Math.abs(this.boundings[i].top - bottom) <= 4)
				{
					y = this.boundings[i].top - sizeY + 1;
				}
				else if(Math.abs(this.boundings[i].bottom - top) <= 4)
				{
					y = this.boundings[i].bottom - 1;
				}
				else
				{
					continue;
				}
				
				if(Math.abs(this.boundings[i].left - left) <= 4)
				{
					x = this.boundings[i].left;
				}
				else if(Math.abs(this.boundings[i].right - right) <= 4)
				{
					x = this.boundings[i].right - sizeX;
				}
				
				break;
			}
			else if((this.boundings[i].top < centerY && centerY < this.boundings[i].bottom) || (top < centerY2 && centerY2 < bottom))
			{
				if(Math.abs(this.boundings[i].left - right) <= 4)
				{
					x = this.boundings[i].left - sizeX + 1;
				}
				else if(Math.abs(this.boundings[i].right - left) <= 4)
				{
					x = this.boundings[i].right - 1;
				}
				else
				{
					continue;
				}
				
				if(Math.abs(this.boundings[i].top - top) <= 4)
				{
					y = this.boundings[i].top;
				}
				else if(Math.abs(this.boundings[i].bottom - bottom) <= 4)
				{
					y = this.boundings[i].bottom - sizeY;
				}
				
				break;
			}
		}
	}
	
	this.element.style.left = x + "px";
	this.element.style.top = y + "px";
	this.element.style.transform = "translate(0px)";
	
	this.position.x = x;
	this.position.y = y;
};

DialogUI.prototype.size = function(width, height)
{
	this.element.style.width = width + "px";
	this.element.style.height = height + "px";
	
	this.position.width = width;
	this.position.height = height;
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

DialogUI.prototype.checkPosition = function()
{
	if(this.position.x !== undefined && this.position.y !== undefined)
	{
		let x = this.position.x;
		let y = this.position.y;
		
		this.move(x, y);
		
		this.position.x = x;
		this.position.y = y;
	}
};
