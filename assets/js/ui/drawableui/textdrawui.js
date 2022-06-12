
function TextDrawUI(parent, setting)
{
	DrawableUI.call(this, parent, setting);
	
	this.width = 0;
	this.height = 0;
}

TextDrawUI.prototype = Object.create(DrawableUI.prototype);

TextDrawUI.prototype.resize = function(width, height)
{
	this.width = width;
	this.height = height;
	
	this.element.width = width;
	this.element.height = height;
	
	this.element.style.width = "";
	this.element.style.height = "";
};

TextDrawUI.prototype.clear = function()
{
	this.context.clearRect(0, 0, this.width, this.height);
}

TextDrawUI.prototype.paintBox = function(textDraw, detectLines)
{
	let fontUI = null;
	
	if(textDraw.font == 0)
	{
		fontUI = textDraw.main.font2UI;
	}
	else if(textDraw.font == 1)
	{
		fontUI = textDraw.main.font1UI;
	}
	else if(textDraw.font == 2)
	{
		fontUI = textDraw.main.font2UI;
	}
	else if(textDraw.font == 3)
	{
		fontUI = textDraw.main.font1UI;
	}
	
	if(detectLines)
	{
		if(fontUI != null)
		{
			this.drawString(textDraw, fontUI, 0, 0, textDraw.text, false, true);
		}
		else
		{
			textDraw.linesWidth = [0];
			textDraw.linesCount = 1;
			
			textDraw.stringWidth = 0;
			textDraw.stringHeight = 0;
		}
	}
	
	let scaleX = textDraw.main.screenshotUI.width / 640.0;
	let scaleY = textDraw.main.screenshotUI.height / 448.0;
	
	let left = textDraw.getRectLeft() * scaleX - 4.0;
	let top = textDraw.getRectTop() * scaleY - 4.0;
	let right = textDraw.getRectRight() * scaleX + 4.0;
	let bottom = textDraw.getStringRectBottom() * scaleY + 4.0;
	
	this.context.fillStyle = textDraw.boxColor.toRGBA();
	this.context.fillRect(left, top, right - left, bottom - top);
};

TextDrawUI.prototype.paint = function(textDraw, faster)
{
	let fontUI = null;
	
	if(textDraw.font == 0)
	{
		fontUI = textDraw.main.font2UI;
	}
	else if(textDraw.font == 1)
	{
		fontUI = textDraw.main.font1UI;
	}
	else if(textDraw.font == 2)
	{
		fontUI = textDraw.main.font2UI;
	}
	else if(textDraw.font == 3)
	{
		fontUI = textDraw.main.font1UI;
	}
	
	let scaleX;
	let scaleY;
	
	if(faster)
	{
		if(this.width != 640 || this.height != 448)
		{
			this.resize(640, 448);
			this.element.style.width = textDraw.main.screenshotUI.width + "px";
			this.element.style.height = textDraw.main.screenshotUI.height + "px";
		}
		
		scaleX = 1.0;
		scaleY = 1.0;
	}
	else
	{
		if(fontUI != null)
		{
			this.drawString(textDraw, fontUI, 0, 0, textDraw.text, false, true);
		}
		else
		{
			textDraw.linesWidth = [0];
			textDraw.linesCount = 1;
			
			textDraw.stringWidth = 0;
			textDraw.stringHeight = 0;
		}
		
		if(this.width != textDraw.main.screenshotUI.width || this.height != textDraw.main.screenshotUI.height)
		{
			this.resize(textDraw.main.screenshotUI.width, textDraw.main.screenshotUI.height);
		}
		
		scaleX = textDraw.main.screenshotUI.width / 640.0;
		scaleY = textDraw.main.screenshotUI.height / 448.0;
	}
	
	let letterSizeX = textDraw.letterSizeX * scaleX;
    let letterSizeY = textDraw.letterSizeY * scaleY;
	
    let x = textDraw.getRectLeft() * scaleX;
	let y = textDraw.getRectTop() * scaleY;
    
	if(!faster)
	{
		let left = textDraw.getRectLeft() * scaleX - 4.0;
		let top = textDraw.getRectTop() * scaleY - 4.0;
		let right = textDraw.getRectRight() * scaleX + 4.0;
		let bottom = textDraw.getStringRectBottom() * scaleY + 4.0;
		
		this.context.fillStyle = textDraw.boxColor.toRGBA();
		this.context.fillRect(left, top, right - left, bottom - top);
	}
	
	if(fontUI != null)
	{
		if(textDraw.backgroundColor != 0x00000000)
		{
			fontUI.setColor(textDraw.backgroundColor);
			
			if(textDraw.setOutline != 0)
			{
				let setOutlineX = textDraw.setOutline * scaleX;
				let setOutlineY = textDraw.setOutline * scaleY;
				
				this.context.save();
				this.context.translate(x - setOutlineX, y + setOutlineY);
				this.context.scale(letterSizeX, letterSizeY * 0.25);
				this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, true);
				this.context.restore();
				
				this.context.save();
				this.context.translate(x - setOutlineX, y - setOutlineY);
				this.context.scale(letterSizeX, letterSizeY * 0.25);
				this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, true);
				this.context.restore();
				
				this.context.save();
				this.context.translate(x + setOutlineX, y + setOutlineY);
				this.context.scale(letterSizeX, letterSizeY * 0.25);
				this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, true);
				this.context.restore();
				
				this.context.save();
				this.context.translate(x + setOutlineX, y - setOutlineY);
				this.context.scale(letterSizeX, letterSizeY * 0.25);
				this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, true);
				this.context.restore();
				
				this.context.save();
				this.context.translate(x + setOutlineX, y);
				this.context.scale(letterSizeX, letterSizeY * 0.25);
				this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, true);
				this.context.restore();
				
				this.context.save();
				this.context.translate(x - setOutlineX, y);
				this.context.scale(letterSizeX, letterSizeY * 0.25);
				this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, true);
				this.context.restore();
				
				this.context.save();
				this.context.translate(x,  y + setOutlineY);
				this.context.scale(letterSizeX, letterSizeY * 0.25);
				this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, true);
				this.context.restore();
				
				this.context.save();
				this.context.translate(x,  y - setOutlineY);
				this.context.scale(letterSizeX, letterSizeY * 0.25);
				this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, true);
				this.context.restore();
			}
			else
			{
				let setShadowX = textDraw.setShadow * scaleX;
				let setShadowY = textDraw.setShadow * scaleY;
				
				this.context.save();
				this.context.translate(x + setShadowX, y + setShadowY);
				this.context.scale(letterSizeX, letterSizeY * 0.25);
				this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, true);
				this.context.restore();
			}
		}
		
		fontUI.setColor(textDraw.color);
		
		this.context.save();
		this.context.translate(x, y);
		this.context.scale(letterSizeX, letterSizeY * 0.25);
		this.drawString(textDraw, fontUI, 0, 0, textDraw.text, true, false);
		this.context.restore();
	}
};

TextDrawUI.prototype.drawString = function(textDraw, fontUI, x, y, str, draw, bg)
{
	let sign = false;
	
	let linesWidth = [];
	let linesCount = 1;
	
	let stringWidth = 0;
	let stringHeight = 0;
	
	let stringWidthMax = 0;
	
	let paddingLeft = 0;
	
	if(draw && textDraw.linesWidth.length >= 1)
		paddingLeft = this.getPaddingLeft(textDraw, 0);
	
	let drawed = false;
	
	for(let i = 0; i < str.length; i++)
	{
		if(sign)
		{
			if(str[i] == 'n')
			{
				if(stringWidth != 0)
					stringWidth -= textDraw.setOutline;
				
				if(stringWidth > stringWidthMax)
					stringWidthMax = stringWidth;
				
				linesWidth.push(stringWidth);
				linesCount++;
				
				stringWidth = x;
				stringHeight += 34;
				
				if(draw && textDraw.linesWidth.length >= linesCount)
					paddingLeft = this.getPaddingLeft(textDraw, linesCount - 1);
			}
			else if(str[i] == 'r')
			{
				if(!bg)
					fontUI.setColor(0xB4191DFF);
			}
			else if(str[i] == 'g')
			{
				if(!bg)
					fontUI.setColor(0x36682CFF);
			}
			else if(str[i] == 'b')
			{
				if(!bg)
					fontUI.setColor(0x323C7FFF);
			}
			else if(str[i] == 'w')
			{
				if(!bg)
					fontUI.setColor(0xE1E1E1FF);
			}
			else if(str[i] == 'p')
			{
				if(!bg)
					fontUI.setColor(0xA86EFCFF);
			}
			else if(str[i] == '~')
			{
				sign = false;
			}
		}
		else
		{
			if(str[i] == '~')
			{
				sign = true;
				continue;
			}
			
			if(str[i] == ' ' && (x + (this.getStringWidth(textDraw, fontUI, str.substring(i)) + stringWidth) * textDraw.letterSizeX) > (textDraw.getRectRight() - textDraw.getRectLeft()))
			{
				if(stringWidth != 0)
					stringWidth -= textDraw.setOutline;
				
				if(stringWidth > stringWidthMax)
					stringWidthMax = stringWidth;
				
				linesWidth.push(stringWidth);
				linesCount++;
				
				stringWidth = 0;
				stringHeight += 36;
				
				if(draw && textDraw.linesWidth.length >= linesCount)
					paddingLeft = this.getPaddingLeft(textDraw, linesCount - 1);
				
				continue;
			}
			
			stringWidth += this.drawLetter(textDraw, fontUI, x + paddingLeft + stringWidth, y + stringHeight, str[i], draw);
			stringWidth += textDraw.setOutline;
			
			drawed = true;
		}
	}
	
	if(!draw)
	{
		if(stringWidth != 0)
			stringWidth -= textDraw.setOutline;
		
		if(stringWidth > stringWidthMax)
			stringWidthMax = stringWidth;
		
		if(drawed)
		{
			stringHeight += 36;
			
			linesWidth.push(stringWidth);
		}
		
		textDraw.linesWidth = linesWidth;
		textDraw.linesCount = linesCount;
		
		textDraw.stringWidth = stringWidthMax;
		textDraw.stringHeight = stringHeight;
	}
};

TextDrawUI.prototype.drawLetter = function(textDraw, fontUI, x, y, chr, draw)
{
	let idx = this.getLetterIndex(textDraw, chr);
	
	if(chr != ' ' && draw)
		this.context.drawImage(fontUI.colorUI.element, (idx % 16) * 32, Math.floor(idx / 16) * 40, 32, 40, x, y, 32, 40);
	
	return textDraw.setProportional ? fontUI.prop[idx] : fontUI.unprop;
};

TextDrawUI.prototype.getStringWidth = function(textDraw, fontUI, str)
{
	let stringWidth = 0;
	
	let sign = false;
	
	for(let i = 0; i < str.length; i++)
	{
		if(sign)
		{
			if(str[i] == 'n')
				break;
			
			if(str[i] == '~')
			{
				sign = false;
			}
		}
		else
		{
			if(str[i] == '~')
			{
				sign = true;
				continue;
			}
			
			if(str[i] == ' ' && i != 0)
				break;
			
			stringWidth += this.getLetterWidth(textDraw, fontUI, str[i]);
			stringWidth += textDraw.setOutline;
		}
	}
	
	if(stringWidth != 0)
		stringWidth -= textDraw.setOutline;
	
	return stringWidth;
};

TextDrawUI.prototype.getLetterWidth = function(textDraw, fontUI, chr)
{
	let idx = this.getLetterIndex(textDraw, chr);
	
	return textDraw.setProportional ? fontUI.prop[idx] : fontUI.unprop;
};

TextDrawUI.prototype.getLetterIndex = function(textDraw, chr)
{
	let idx = chr.charCodeAt(0);
	
	if(idx == 192) idx = 128;
	else if(idx == 193) idx = 129;
	else if(idx == 194) idx = 130;
	else if(idx == 196) idx = 131;
	else if(idx == 199) idx = 133;
	else if(idx == 200) idx = 134;
	else if(idx == 201) idx = 135;
	else if(idx == 202) idx = 136;
	else if(idx == 203) idx = 137;
	else if(idx == 204) idx = 138;
	else if(idx == 205) idx = 139;
	else if(idx == 206) idx = 140;
	else if(idx == 207) idx = 141;
	else if(idx == 210) idx = 142;
	else if(idx == 211) idx = 143;
	else if(idx == 212) idx = 144;
	else if(idx == 214) idx = 145;
	else if(idx == 217) idx = 146;
	else if(idx == 218) idx = 147;
	else if(idx == 219) idx = 148;
	else if(idx == 220) idx = 149;
	else if(idx == 224) idx = 151;
	else if(idx == 225) idx = 152;
	else if(idx == 226) idx = 153;
	else if(idx == 228) idx = 154;
	else if(idx == 231) idx = 156;
	else if(idx == 232) idx = 157;
	else if(idx == 233) idx = 158;
	else if(idx == 234) idx = 159;
	else if(idx == 235) idx = 160;
	else if(idx == 236) idx = 161;
	else if(idx == 237) idx = 162;
	else if(idx == 238) idx = 163;
	else if(idx == 239) idx = 164;
	else if(idx == 242) idx = 165;
	else if(idx == 243) idx = 166;
	else if(idx == 244) idx = 167;
	else if(idx == 246) idx = 168;
	else if(idx == 249) idx = 169;
	else if(idx == 250) idx = 170;
	else if(idx == 251) idx = 171;
	else if(idx == 252) idx = 172;
	else if(idx == 209) idx = 173;
	else if(idx == 241) idx = 174;
	else if(idx == 191) idx = 175;
	
	if(textDraw.font == 0 || textDraw.font == 1)
	{
		if(32 <= idx && idx <= 175)
		{
			idx -= 32;
		}
		else
		{
			idx = 10;
		}
		
		if(textDraw.font == 0 && idx == 6) // &
			idx = 10;
	}
	else
	{
		if(32 <= idx && idx <= 47)
		{
			idx -= 32;
		}
		else if(48 <= idx && idx <= 58) // 0-9
		{
			idx += 96;
		}
		else if(59 <= idx && idx <= 64)
		{
			idx -= 32;
		}
		else if(65 <= idx && idx <= 90) // A-Z
		{
			idx += 90;
		}
		else if(91 <= idx && idx <= 96)
		{
			idx -= 32;
		}
		else if(97 <= idx && idx <= 122) // a-z
		{
			idx += 58;
		}
		else if(123 <= idx && idx <= 150)
		{
			idx -= 32;
		}
		else if(151 <= idx && idx <= 175)
		{
			idx += 30;
		}
		else
		{
			idx = 10;
		}
		
		if(textDraw.font == 2 && idx == 6) // &
			idx = 10;
	}
	
	return idx;
};

TextDrawUI.prototype.getPaddingLeft = function(textDraw, lineNumber)
{
	let paddingLeft = 0;
	
	switch(textDraw.alignment)
	{
		case 2:
			paddingLeft += textDraw.textSizeY / 2 / textDraw.letterSizeX;
			paddingLeft -= textDraw.linesWidth[lineNumber] / 2;
			paddingLeft -= textDraw.letterSizeX / 2;
			break;
		
		case 3:
			paddingLeft += (textDraw.getRectRight() - textDraw.getRectLeft()) / textDraw.letterSizeX;
			paddingLeft -= textDraw.linesWidth[lineNumber];
			paddingLeft -= textDraw.letterSizeX;
			break;
	}
	
	return paddingLeft;
}