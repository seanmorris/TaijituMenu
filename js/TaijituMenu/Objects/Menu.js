function Menu(canvas, input)
{
	this.cacheBg				= null;
	this.ignoreInput			= 0;
	this.ignoreInputTime		= 5;
	this.maxMag					= 250;
	this.options				= {};

	this.selected = 0;
	this.selectedOption;
	this.textColor				= '#A65560';
	this.boxColor				= '#280212';

	this.selectedTextColor		= '#F8435C';
	this.selectedBoxColor		= '#652931';

	this.leftMargin				= -180;
	this.leftTextMargin			= 10;

	this.topMargin				= 150;

	this.boxSpacing				= 10;
	this.mainBoxExtraSpacing	= 10;

	this.boxSize				= 50;
	this.mainBoxExtraSize		= 10;

	this.textMargin				= 35;

	this.context				= canvas[0].getContext('2d');

	this.jqdoc					= $(document);

	this.lastMouseX				= 0;
	this.lastMouseY				= 0;

	this.age = 0;

	this.update = function()
	{
		if(this.ignoreInput < 0)
		{
			this.ignoreInput = 0;
		}

		this.age++;

		//this.mouseSelect = [0,0];

		if(window.mouseX != this.lastMouseX || window.mouseY != this.lastMouseY)
		{
			console.log(window.mouseX, this.lastMouseX)
			this.mouseSelect = [
				window.mouseX - this.jqdoc.scrollLeft()
				,window.mouseY -  this.jqdoc.scrollTop()
			];
		}

		if(!this.ignoreInput
			|| input.scrollStates[0]
			|| input.scrollStates[1]
			|| (
				input.clickVectors[0]
				&& input.clickVectors[0].undragged
			)
		){
			if(this.used)
			{
				this.used();
				this.used = null;
			}

			var tickDelay = 0;

			if(input.clickVectors
				&& input.clickVectors[0]
				&& input.clickVectors[0].magnitude
			){
				var mag = input.clickVectors[0].magnitude;

				if(mag > this.maxMag)
				{
					mag = this.maxMag;
				}

				tickDelay = (this.maxMag/20)-(mag/20);
			}

			if(
			   input.keyStates[38]
			   || input.keyStates[87]
			   || input.scrollStates[1]
			   || (input.clickVectors[0]
					&& input.clickVectors[0].active()
					&& input.clickVectors[0].cardinal()
						== input.clickVectors[0].UP
				)
			){
				this.selected--;
				this.mouseSelect = [0,0];
				this.ignoreInput = this.ignoreInputTime + tickDelay;
			}
			else if(
				input.keyStates[40]
				|| input.keyStates[83]
				|| input.scrollStates[0]
				|| (input.clickVectors[0]
					&& input.clickVectors[0].active()
					&& input.clickVectors[0].cardinal()
						== input.clickVectors[0].DOWN
				)
			){
				this.selected++;
				this.mouseSelect = [0,0];
				this.ignoreInput = this.ignoreInputTime + tickDelay;
			}
			else if(
				input.keyStates[32] === 0
				|| input.keyStates[13] === 0
				|| (input.clickVectors[0]
					&& input.clickVectors[0].undragged
					&& input.clickVectors[0].released
					&& input.clickVectors[0].age
						< this.age
				)
			){
				console.log(input.mouseStates[0][2], this.age);
				this.select(this.mouseSelected || this.selected);
			}

			var opLen = 0;

			for(var i in this.options)
			{
				opLen++;
			}

			if(this.selected < 0)
			{
				this.selected = opLen -1;
			}
			else if(this.selected >= opLen)
			{
				this.selected = 0;
			}
		}
		else
		{
			this.ignoreInput--;
		}

		this.lastMouseX = window.mouseX;
		this.lastMouseY = window.mouseY;
	}

	this.flushBg = function()
	{
		this.cacheBg = null;
	}

	this.render = function(noBg)
	{
		var width   = canvas.width();
		var height  = canvas.height();
		var center	= [width/2,height/2];
		this.context.textAlign = 'left';
		this.context.font = '18pt monospace';

		var j = 0;
		for(var i in this.options)
		{
			offset = (
				(this.boxSpacing+this.boxSize)
				* (j-this.selected+1)
			);

			var textOffset = 0;
			var boxOffset = 0;

			if(j == this.selected)
			{
				this.context.fillStyle = this.selectedBoxColor;
				this.context.fillRect(
					center[0]
					-(this.mainBoxExtraSize+this.boxSize)
					+this.leftMargin
					, offset + this.topMargin
					, (this.mainBoxExtraSize+this.boxSize)
					, (this.mainBoxExtraSize+this.boxSize)
				);

				this.context.fillStyle = this.selectedTextColor;

				this.context.fillText(
					i
					, center[0]+this.leftTextMargin+this.leftMargin
					,  offset + this.topMargin + this.textMargin
					+ this.mainBoxExtraSpacing
				);
			}
			else
			{
				if(j > this.selected)
				{
					boxOffset = this.boxSpacing*2;
					textOffset = this.textMargin
					+ this.mainBoxExtraSpacing;
				}
				else
				{
					boxOffset = this.boxSpacing*-1;
					textOffset = this.textMargin;
				}

				this.context.fillStyle = this.boxColor;

				if((this.leftMargin + width/2) - this.boxSize < this.mouseSelect[0]){
				if(offset + this.topMargin + boxOffset < this.mouseSelect[1]){
				if(offset + this.topMargin + boxOffset + this.boxSize > this.mouseSelect[1]){
					this.context.fillStyle = this.selectedBoxColor;
				}}}

				this.context.fillRect(
					center[0] - this.boxSize+this.leftMargin
					, offset + this.topMargin + boxOffset
					, this.boxSize
					, this.boxSize
				);

				this.context.fillStyle = this.textColor;

				if((this.leftMargin + width/2) - this.boxSize < this.mouseSelect[0]){
				if(offset + this.topMargin + boxOffset < this.mouseSelect[1]){
				if(offset + this.topMargin + boxOffset + this.boxSize > this.mouseSelect[1]){
					this.context.fillStyle = this.selectedTextColor;
				}}}

				this.context.fillText(
					i
					, center[0]+this.leftTextMargin+this.leftMargin
					, offset + this.topMargin + textOffset
				);
			}

			j++;
		}
	}

	this.used = null;

	this.select	= function(option)
	{
		var width   = canvas.width();
		for(var i in this.options)
		{
			if(!option--)
			{
				//console.log(i);
				this.used = this.options[i];
			}
		}
		var j = 0;
		for(var i in this.options)
		{
			offset = (
				(this.boxSpacing+this.boxSize)
				* (j-this.selected+1)
			);

			if(j > this.selected)
			{
				boxOffset = this.boxSpacing*2;
			}
			else
			{
				boxOffset = this.boxSpacing*-1;
			}

			if((this.leftMargin + width/2) - this.boxSize < this.mouseSelect[0]){
			if(offset + this.topMargin + boxOffset < this.mouseSelect[1]){
			if(offset + this.topMargin + boxOffset + this.boxSize > this.mouseSelect[1]){
				this.used = this.options[i];
				this.mouseSelected = j;
			}}}
			j++;
		}
	}
}
