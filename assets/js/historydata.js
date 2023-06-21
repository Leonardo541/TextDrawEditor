
function HistoryData(type, project, anyObject)
{
	this.type = type;
	
	if(anyObject.type !== undefined && anyObject.data !== undefined)
	{
		this.internalId = anyObject.data[0];
		this.oldValue = anyObject.data[1];
		this.newValue = anyObject.data[2];
		this.selections = anyObject.data[3];
	}
	else
	{
		this.internalId = anyObject.internalId;
		this.updateOldValue(project, anyObject);
		this.updateNewValue(project, anyObject);
		this.selections = [];
	}
}

HistoryData.prototype.copyHistoryData = function(historyData)
{
	historyData.type = this.type.id;
	historyData.data = [this.internalId, this.oldValue, this.newValue, this.selections];
};

HistoryData.prototype.updateOldValue = function(project, anyObject)
{
	this.oldValue = [];
	
	for(let i = 0; i < this.type.actions.length; i++)
	{
		let action = this.type.actions[i];
		
		if(anyObject[action] instanceof Function)
		{
			this.oldValue.push(anyObject[action](project, "updateOldValue"));
		}
		else
		{
			this.oldValue.push(anyObject[action]);
		}
	}
};

HistoryData.prototype.updateNewValue = function(project, anyObject)
{
	this.newValue = [];
	
	for(let i = 0; i < this.type.actions.length; i++)
	{
		let action = this.type.actions[i];
		
		if(anyObject[action] instanceof Function)
		{
			this.newValue.push(anyObject[action](project, "updateNewValue"));
		}
		else
		{
			this.newValue.push(anyObject[action]);
		}
	}
};

HistoryData.prototype.applyOldValue = function(project)
{
	let anyObject = project.findInternalId(this.internalId);
	
	if(anyObject)
	{
		for(let i = 0; i < this.type.actions.length; i++)
		{
			let action = this.type.actions[i];
			
			if(anyObject[action] instanceof Function)
			{
				anyObject[action](project, "applyOldValue", this.newValue[i], this.oldValue[i]);
			}
			else
			{
				anyObject[action] = this.oldValue[i];
			}
		}
	}
	else
	{
		for(let i = 0; i < this.type.actions.length; i++)
		{
			let action = this.type.actions[i];
			
			if(project[action] instanceof Function)
			{
				project[action](this.internalId, "applyOldValue", this.newValue[i], this.oldValue[i]);
			}
		}
	}
};

HistoryData.prototype.applyNewValue = function(project)
{
	let anyObject = project.findInternalId(this.internalId);
	
	if(anyObject)
	{
		for(let i = 0; i < this.type.actions.length; i++)
		{
			let action = this.type.actions[i];
			
			if(anyObject[action] instanceof Function)
			{
				anyObject[action](project, "applyNewValue", this.oldValue[i], this.newValue[i]);
			}
			else
			{
				anyObject[action] = this.newValue[i];
			}
		}
	}
	else
	{
		for(let i = 0; i < this.type.actions.length; i++)
		{
			let action = this.type.actions[i];
			
			if(project[action] instanceof Function)
			{
				project[action](this.internalId, "applyNewValue", this.oldValue[i], this.newValue[i]);
			}
		}
	}
};

HistoryData.prototype.isValueChanged = function()
{
	function isChanged(value1, value2)
	{
		if(value1 instanceof Array)
		{
			if(value1.length != value2.length)
				return true;
			
			for(idx in value1)
			{
				if(isChanged(value1[idx], value2[idx]))
					return true;
			}
			
			return false;
		}
		else
		{
			return value1 !== value2;
		}
	}
	
	return isChanged(this.oldValue, this.newValue);
};
