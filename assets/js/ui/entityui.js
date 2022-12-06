
function EntityUI(parent, tagName, setting)
{
	this.element = document.createElement(tagName);
	
	for(key in setting)
	{
		if(key == "class")
		{
			if(typeof setting.class === "string")
			{
				this.element.classList.add(setting.class);
			}
			else
			{
				for(cls in setting.class)
				{
					this.element.classList.add(setting.class[cls]);
				}
			}
			
			continue;
		}
		
		if(key == "style")
		{
			for(sty in setting.style)
			{
				this.element.style[sty] = setting.style[sty];
			}
			
			continue;
		}
		
		if(key == "keydown" || key == "keyup" || key == "mousedown" || key == "mouseup" || key == "mousemove" || key == "click" || key == "contextmenu" || key == "focusin" || key == "focusout" || key == "change")
		{
			this.element.addEventListener(key, setting[key]);
			continue;
		}
		
		this.element[key] = setting[key];
	}
	
	if(parent)
	{
		if(parent instanceof EntityUI)
		{
			parent.element.appendChild(this.element);
		}
		else if(parent instanceof HTMLElement)
		{
			parent.appendChild(this.element);
		}
		else if(typeof parent === "string")
		{
			document.querySelector(parent).appendChild(this.element);
		}
	}
	
	Object.defineProperty(this.element, "entityUI", {value: this, writable: false});
}

EntityUI.prototype.appendSpacing = function()
{
	return new EntityUI(this, "div", {class: "spacing"});
};

EntityUI.prototype.appendLineBreak = function()
{
	return new EntityUI(this, "br", {});
};

EntityUI.prototype.appendStaticLine = function()
{
	return new EntityUI(this, "hr", {});
};

EntityUI.prototype.appendStaticText = function(text)
{
	return new EntityUI(this, "span", {innerText: text});
};

EntityUI.prototype.remove = function()
{
	if(this.element.parentNode)
		this.element.parentNode.removeChild(this.element);
};

EntityUI.prototype.isInBoundingClientRect = function(x, y)
{
	let rect = this.element.getBoundingClientRect();
	
	return rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom;
};

EntityUI.prototype.hasScrollBar = function()
{
	return this.element.scrollHeight > this.element.clientHeight;
};
