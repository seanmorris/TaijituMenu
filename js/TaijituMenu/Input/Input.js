var Input = Class.extend({
	init: function()
	{
		this.lastKeyStates = [];
		this.keyStates = [];
		this.lastMouseStates = [];
		this.mouseStates = [];
		this.clickVectors = [];
		this.scrollStates = [];

		this.preventScroll = false;

		var _this = this;

		$(document).keydown(
			function(e)
			{
				if(_this.keyStates[ e.keyCode || e.which ])
				{
					//NOOP
				}
				else
				{
					_this.keyStates[ e.keyCode || e.which ] = 1;
				}
			}
		);

		$(document).keyup(
			function(e)
			{
				_this.keyStates[ e.keyCode || e.which] = 0;
			}
		);

		$(document).bind(
			"contextmenu"
			, function(e)
			{
				e.preventDefault();
			}
		);

		$(document).mousedown(
			function(e)
			{
				if(
					_this.mouseStates[ e.button ]
					&& _this.mouseStates[ e.button ].length == 3
					&& _this.mouseStates[ e.button ][2]
				){
					//NOOP
				}
				else
				{
					console.log(e.button + ' mouse button down.');
					_this.mouseStates[ e.button ] = [e.pageX, e.pageY, 1];
				}
			}
		);

		$(document).bind(
			"touchstart"
			, function(e)
			{
				var touches = e.originalEvent.changedTouches;
				var i = 0;
				while(i < touches.length)
				{
					var ii = i;

					if(i == 1)
					{
						ii = 2;
					}
					else if(i == 2)
					{
						ii = 1;
					}


					if(
						_this.mouseStates[ ii ]
						&& _this.mouseStates[ ii ].length == 3
						&& _this.mouseStates[ ii ][2]
					){
						//NOOP
					}
					else
					{
						_this.mouseStates[ ii ] = [
							touches[ ii ].pageX
							, touches[ ii ].pageY
							, 1
						];
					}

					i++;
				}
			}
		);

		$(document).mouseup(
			function(e)
			{
				console.log(e.button + ' mouse button up.');
				_this.mouseStates[ e.button ] = [e.pageX, e.pageY, 0];
			}
		);

		window.mouseX = 0;
		window.mouseY = 0;

		$(document).bind(
			"touchmove"
			, function(e)
			{
				var touches = e.originalEvent.changedTouches;
				var i = 0;
				while(i < touches.length)
				{
					var ii = i;

					if(i == 1)
					{
						ii = 2;
					}

					window.mouseX = touches[ ii ].pageX;
					window.mouseY = touches[ ii ].pageY;

					i++;
				}
			}
		);

		$(document).mousemove(
			function(e)
			{
				window.mouseX = e.pageX;
				window.mouseY = e.pageY;
			}
		);

		$(document).bind(
			"touchend"
			, function(e)
			{
				var touches = e.originalEvent.changedTouches;
				var i = 0;
				while(i < touches.length)
				{
					var ii = i;

					if(i == 1)
					{
						ii = 2;
					}
					else if(i == 2)
					{
						ii = 1;
					}

					_this.mouseStates[ ii ] = [
						touches[ ii ].pageX
						, touches[ ii ].pageY
						, 0
					];

					i++;
				}
			}
		);

		$(document).bind(
			'mousewheel DOMMouseScroll'
			, function(e)
			{
				if(e.originalEvent.wheelDelta /120 > 0)
				{
					console.log(
						"scrollUp at ("
						+ window.mouseX + ", "
						+ window.mouseY + ")"
					);
					_this.scrollStates[1] = 2;
				}
				else
				{
					console.log(
						"scrollDown at ("
						+ window.mouseX + ", "
						+ window.mouseY + ")"
					);
					_this.scrollStates[0] = 2;
				}

				if(_this.preventScroll)
				{
					e.preventDefault();
				}
			}
		);
	}
	, update: function()
	{
		for(var i in this.keyStates)
		{
			if(
			   this.keyStates[i] === 0
			   && this.keyStates[i] === this.lastKeyStates[i]
			){
				delete this.keyStates[i];
				delete this.lastKeyStates[i];
			}
			else if(i in this.keyStates)
			{
				this.lastKeyStates[i] = this.keyStates[i];
			}

			if(i in this.keyStates && this.keyStates[i])
			{
				this.keyStates[i]++;
			}
		}

		for(var i in this.mouseStates)
		{
			if(
				this.mouseStates[i]
				&& this.lastMouseStates[i]
				&& this.mouseStates[i].length == 3
				&& this.lastMouseStates[i].length == 3
				&& this.mouseStates[i][2] === 0
				&& this.mouseStates[i][2] === this.lastMouseStates[i][2]
			){
				delete this.mouseStates[i];
				delete this.lastMouseStates[i];
			}
			else if(
				this.mouseStates[i]
				&& this.mouseStates[i].length == 3
			){
				this.lastMouseStates[i] = this.mouseStates[i];
			}

			if(
				this.mouseStates[i]
				&& this.mouseStates[i].length == 3
				&& this.mouseStates[i][2]
			){
				this.mouseStates[i][2]++;
			}

			if(this.clickVectors[i] && this.clickVectors[i].released)
			{
				delete this.clickVectors[i];
			}

			if(this.mouseStates[i] && this.mouseStates[i][2])
			{
				if(this.clickVectors[i])
				{
					this.clickVectors[i].update(this.mouseStates[i]);
				}
				else
				{
					this.clickVectors[i] = new ClickVector(this.mouseStates[i]);
				}
			}
			else if(this.clickVectors[i])
			{
				this.clickVectors[i].release();
			}
		}

		for(var i in this.scrollStates)
		{
			if(this.scrollStates[i])
			{
				this.scrollStates[i]--;
			}

			if(this.scrollStates[i] === 0)
			{
				delete this.scrollStates[i];
			}
		}


	}
});
