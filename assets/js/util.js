
String.prototype.padZero = function(len)
{
	let pad = "";
	
	while((pad.length + this.length) < len)
		pad += "0";
	
	return pad + this;
};

Number.prototype.toPlainString = function()
{
	let num = this.valueOf();
	let str = this.toString();

	if(Math.abs(num) < 1.0)
	{
		let e = parseInt(num.toString().split("e-")[1]);
		
		if(e)
		{
			let negative = num < 0;
			
			if(negative)
				num *= -1;
			
			num *= Math.pow(10, e - 1);
			str = '0.' + (new Array(e)).join("0") + num.toString().substring(2);
			
			if(negative)
				str = "-" + str;
		}
	}
	else
	{
		let e = parseInt(num.toString().split("+")[1]);
		
		if(e > 20)
		{
			e -= 20;
			num /= Math.pow(10, e);
			str = num.toString() + (new Array(e + 1)).join("0");
		}
	}
	
	if(str.indexOf(".") != -1)
	{
		str = str.split(".");
		
		if(str[1].length > 6)
			str[1] = str[1].substring(0, 6);
		
		while(str[1].length != 0)
		{
			if(str[1].slice(-1) != "0")
				break;
			
			str[1] = str[1].slice(0, -1);
		}
		
		if(str[1].length == 0)
			str.pop();
		
		str = str.join(".");
	}
	
	return str;
};

Number.prototype.toRGBA = function()
{
	let color = this.valueOf();
	
	let red = (color >> 24) & 0xFF;
	let green = (color >> 16) & 0xFF;
	let blue = (color >> 8) & 0xFF;
	let alpha = (color & 0xFF) / 0xFF;
	
	return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
};

Number.prototype.toRGB = function()
{
	let color = this.valueOf();
	
	let red = (color >> 24) & 0xFF;
	let green = (color >> 16) & 0xFF;
	let blue = (color >> 8) & 0xFF;
	
	return "rgb(" + red + ", " + green + ", " + blue + ")";
};

Number.prototype.getRGB = function()
{
	let color = this.valueOf();
	return (color >> 8) & 0xFFFFFF;
};

Number.prototype.getAlpha = function()
{
	let color = this.valueOf();
	return (color & 0xFF) / 0xFF;
};

Number.prototype.getPercentOf = function(min, max)
{
	let val = this.valueOf();
	
	let total = max - min;
	let value = val - min;
	
	if(total == 0)
		return 0;
	
	return value * 100 / total;
};
