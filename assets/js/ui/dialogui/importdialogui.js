
function ImportDialogUI(parent, title, importType, clickAccept, clickCancel)
{
	DialogUI.call(this, parent, title);
	
	this.contentUI.appendStaticText("Input");
	this.contentUI.appendLineBreak();
	this.inputUI = new ListBoxUI(this.contentUI, {change: (e) => { this.changeOption(); }});
	this.inputUI.appendOption("Load input from a file");
	this.inputUI.appendOption("View input as text");
	this.contentUI.appendStaticLine();
	this.fileInputUI = new FileBoxUI(this.contentUI, {accept: "*/*", onchange: (e) => { this.inputFromAFile(e);  }});
	this.viewInputUI = null;
	this.contentUI.appendStaticLine();
	this.buttonAcceptUI = new ButtonUI(this.buttonsUI, {innerText: "Accept", click: () => { clickAccept(this.inputUI.element.selectedIndex); }});
	this.buttonCancelUI = new ButtonUI(this.buttonsUI, {innerText: "Cancel", click: () => { clickCancel(); }});
	
	this.resizeObserver = new ResizeObserver(() => { this.sizeChanged(); });
	
	this.importType = importType;
	
	this.savedData = "";
	this.textDraws = [];
}

ImportDialogUI.prototype = Object.create(DialogUI.prototype);

ImportDialogUI.prototype.sizeChanged = function()
{
	this.inputUI.element.style.width = this.viewInputUI.element.offsetWidth + "px";
};

ImportDialogUI.prototype.changeOption = function()
{
	let oldWidth = this.element.offsetWidth;
	let oldHeight = this.element.offsetHeight;
	
	let input = this.inputUI.element.selectedIndex;
	
	if(input == 0)
	{
		if(!this.fileInputUI)
		{
			this.fileInputUI = new FileBoxUI(this.contentUI, {accept: "*/*", onchange: (e) => { this.inputFromAFile(e); }});
			this.contentUI.appendStaticLine();
		}
		
		if(this.viewInputUI)
		{
			this.resizeObserver.unobserve(this.viewInputUI.element);
			
			this.inputUI.element.style.width = "";
			
			if(this.viewInputUI.element.nextSibling && this.viewInputUI.element.nextSibling.entityUI)
				this.viewInputUI.element.nextSibling.entityUI.remove();
			
			this.viewInputUI.remove();
			this.viewInputUI = null;
			
			this.savedData = "";
			this.textDraws = [];
		}
	}
	else
	{
		if(this.fileInputUI)
		{
			if(this.fileInputUI.element.nextSibling && this.fileInputUI.element.nextSibling.entityUI)
				this.fileInputUI.element.nextSibling.entityUI.remove();
			
			this.fileInputUI.remove();
			this.fileInputUI = null;
			
			this.savedData = "";
			this.textDraws = [];
		}
		
		if(!this.viewInputUI)
		{
			this.viewInputUI = new EntityUI(this.contentUI, "textarea", {});
			this.contentUI.appendStaticLine();
			
			this.resizeObserver.observe(this.viewInputUI.element);
		}
	}
	
	let newWidth = this.element.offsetWidth;
	let newHeight = this.element.offsetHeight;
	
	if(oldWidth != newWidth || oldHeight != newHeight)
		this.move(this.element.offsetLeft + (oldWidth - newWidth) / 2, this.element.offsetTop + (oldHeight - newHeight) / 2);
};

ImportDialogUI.prototype.inputAsText = function(text)
{
	this.textDraws = [];
	
	let lines = text.match(/[^\r\n]+/g);
	
	for(let i = 0; i < lines.length; i++)
	{
		let name = "";
		let line = lines[i];
		
		let matches = [...line.matchAll(/([^\=]+)\=([^;]+);/g)];
		
		if(matches.length != 0)
		{
			name = matches[0][1].trim().split(" ").filter(n => n).pop().split(":").pop();
			line = matches[0][2].trim();
		}
		
		matches = [...line.matchAll(/([^\(]+)\(([^\)]+)\)/g)];
		
		if(matches.length != 0)
		{
			let func = matches[0][1].trim();
			let params = this.splitParams(matches[0][2]);
			
			if(func == "TextDrawCreate")
			{
				if(name.length != 0 && params.length == 3)
				{
					let paramX = Number(params[0]);
					let paramY = Number(params[1]);
					let paramText = JSON.parse(params[2]);
					
					if(typeof paramX == "number" && typeof paramY == "number" && typeof paramText == "string")
					{
						let textDraw = {};
						
						textDraw.name = name;
						textDraw.text = paramText;
						textDraw.x = paramX;
						textDraw.y = paramY;
						textDraw.letterSizeX = 0.48;
						textDraw.letterSizeY = 1.12;
						textDraw.textSizeX = 1280.0;
						textDraw.textSizeY = 1280.0;
						textDraw.alignment = 1;
						textDraw.color = 0xE1E1E1FF;
						textDraw.useBox = 0;
						textDraw.boxColor = 0x80808080;
						textDraw.setShadow = 2;
						textDraw.setOutline = 0;
						textDraw.backgroundColor = 0x000000FF;
						textDraw.font = 1;
						textDraw.setProportional = 1;
						
						this.textDraws.push(textDraw);
					}
				}
			}
			else if(func == "TextDrawLetterSize")
			{
				if(params.length == 3)
				{
					let paramName = params[0];
					let paramLetterSizeX = Number(params[1]);
					let paramLetterSizeY = Number(params[2]);
					
					if(typeof paramLetterSizeX == "number" && typeof paramLetterSizeY == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
						{
							textDraw.letterSizeX = paramLetterSizeX;
							textDraw.letterSizeY = paramLetterSizeY;
						}
					}
				}
			}
			else if(func == "TextDrawTextSize")
			{
				if(params.length == 3)
				{
					let paramName = params[0];
					let paramTextSizeX = Number(params[1]);
					let paramTextSizeY = Number(params[2]);
					
					if(typeof paramTextSizeX == "number" && typeof paramTextSizeY == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
						{
							textDraw.textSizeX = paramTextSizeX;
							textDraw.textSizeY = paramTextSizeY;
						}
					}
				}
			}
			else if(func == "TextDrawAlignment")
			{
				if(params.length == 2)
				{
					let paramName = params[0];
					let paramAlignment = Number(params[1]);
					
					if(typeof paramAlignment == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
							textDraw.alignment = paramAlignment;
					}
				}
			}
			else if(func == "TextDrawColor")
			{
				if(params.length == 2)
				{
					let paramName = params[0];
					let paramColor = Number(params[1]);
					
					if(typeof paramColor == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
							textDraw.color = paramColor;
					}
				}
			}
			else if(func == "TextDrawUseBox")
			{
				if(params.length == 2)
				{
					let paramName = params[0];
					let paramUseBox = Number(params[1]);
					
					if(typeof paramUseBox == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
							textDraw.useBox = paramUseBox;
					}
				}
			}
			else if(func == "TextDrawBoxColor")
			{
				if(params.length == 2)
				{
					let paramName = params[0];
					let paramBoxColor = Number(params[1]);
					
					if(typeof paramBoxColor == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
							textDraw.boxColor = paramBoxColor;
					}
				}
			}
			else if(func == "TextDrawSetShadow")
			{
				if(params.length == 2)
				{
					let paramName = params[0];
					let paramSetShadow = Number(params[1]);
					
					if(typeof paramSetShadow == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
							textDraw.setShadow = paramSetShadow;
					}
				}
			}
			else if(func == "TextDrawSetOutline")
			{
				if(params.length == 2)
				{
					let paramName = params[0];
					let paramSetOutline = Number(params[1]);
					
					if(typeof paramSetOutline == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
							textDraw.setOutline = paramSetOutline;
					}
				}
			}
			else if(func == "TextDrawBackgroundColor")
			{
				if(params.length == 2)
				{
					let paramName = params[0];
					let paramBackgroundColor = Number(params[1]);
					
					if(typeof paramBackgroundColor == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
							textDraw.backgroundColor = paramBackgroundColor;
					}
				}
			}
			else if(func == "TextDrawFont")
			{
				if(params.length == 2)
				{
					let paramName = params[0];
					let paramFont = Number(params[1]);
					
					if(params[1] == "TEXT_DRAW_FONT_SPRITE_DRAW")
					{
						paramFont = 4;
					}
					else if(params[1] == "TEXT_DRAW_FONT_MODEL_PREVIEW")
					{
						paramFont = 5;
					}
					
					if(typeof paramFont == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
							textDraw.font = paramFont;
					}
				}
			}
			else if(func == "TextDrawSetProportional")
			{
				if(params.length == 2)
				{
					let paramName = params[0];
					let paramSetProportional = Number(params[1]);
					
					if(typeof paramSetProportional == "number")
					{
						let textDraw = this.getTextDrawAt(paramName);
						
						if(textDraw)
							textDraw.setProportional = paramSetProportional;
					}
				}
			}
		}
	}
};

ImportDialogUI.prototype.inputFromAFile = function(e)
{
	let files = e.target.files;
	
	if(files.length != 0)
	{
		let file = files[0];
		
		let reader = new FileReader();
		
		reader.onload = (e) =>
		{
			if(e.target.readyState == FileReader.DONE)
			{
				if(this.importType == "json")
				{
					this.savedData = e.target.result;
				}
				else if(this.importType == "pawn")
				{
					this.inputAsText(e.target.result);
				}
			}
		};
		
		reader.readAsText(file);
	}
};

ImportDialogUI.prototype.splitParams = function(text)
{
	let params = [];
	let param = "";
	
	let isEscape = false;
	let isDoubleQuote = false;
	let isSingleQuote = false;
	
	for(let i = 0; i < text.length; i++)
	{
		let chr = text.charAt(i);
		
		if(isEscape)
		{
			param += chr;
			
			isEscape = false;
			continue;
		}
		
		if(isDoubleQuote)
		{
			param += chr;
			
			if(chr == '"')
				isDoubleQuote = false;
			
			continue;
		}
		
		if(isSingleQuote)
		{
			param += chr;
			
			isSingleQuote = false;
			continue;
		}
		
		if(chr == '"')
		{
			param += chr;
			
			isDoubleQuote = true;
			continue;
		}
		
		if(chr == '\'')
		{
			param += chr;
			
			isSingleQuote = true;
			continue;
		}
		
		if(chr == ',')
		{
			param = param.trim();
			
			if(param.length != 0)
			{
				params.push(param);
				param = "";
			}
			
			continue;
		}
		
		param += chr;
	}
	
	param = param.trim();
	
	if(param.length != 0)
		params.push(param);
	
	return params;
};

ImportDialogUI.prototype.getTextDrawAt = function(name)
{
	for(let i = 0; i < this.textDraws.length; i++)
	{
		if(this.textDraws[i].name == name)
			return this.textDraws[i];
	}
	
	return null;
};

ImportDialogUI.prototype.remove = function()
{
	this.resizeObserver.disconnect();
	DialogUI.prototype.remove.call(this);
};
