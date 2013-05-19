var TaijituMenu = Class.extend({
	init: function(canvasSelector, options)
	{
		this.canvas = $(canvasSelector);
		this.context = this.canvas[0].getContext('2d');
		this.options = [];

		this.states = {
			CLOSED: 1
			, OPEN: 2
		}

		this.t = new Taijitu([0, 0], 1, Math.PI/2);

		this.state = this.states.CLOSED;
		this.input = new Input();
		this.menu = new Menu(this.canvas, this.input);

		this.menu.options = options;

		var _this = this;

		setInterval(
			function()
			{
				_this.canvas[0].setAttribute(
					'width'
					, $('html').width()
				);
				_this.canvas[0].setAttribute(
					'height'
					, $('html').height()
				);

				_this.update();
			}
			, 50
		);
	}
	, update: function()
	{
		this.context.clearRect(0,0,this.canvas.width(),this.canvas.height());

		this.context.fillStyle = '#000';
		this.context.fillRect(0,0,this.canvas.width(),this.canvas.height());

		this.t.update(
			[this.canvas.width()/2, this.canvas.height()/2]
			, this.canvas.height()*0.75, 0
			, 0.02
		);

		this.t.render(this.context);

		this.input.update();

		var triggered = false;

		if(this.input.mouseStates[2]
			&& this.input.mouseStates[2][2] === 0
		){
			this.menu.age = 0;
			triggered = true;
		}

		if(this.input.mouseStates[0]
			&& this.input.mouseStates[0][2] === 30
			&& this.input.clickVectors[0].undragged
		){
			this.menu.age = 0;
			triggered = true;
		}

		if(triggered && this.state !== this.states.OPEN)
		{
			this.open();
		}
		else if(triggered)
		{
			this.close();
		}

		if(this.state == this.states.OPEN)
		{
			this.menu.update();
			this.menu.render();
		}
	}
	, open: function()
	{
		console.log('Open menu');
		this.menu.selected = 0;
		$('#TaijituMenuLayer').show();
		this.state = this.states.OPEN;
		this.input.preventScroll = true;
		this.age = 1;
	}
	, close: function()
	{
		console.log('Close menu');
		$('#TaijituMenuLayer').hide();
		this.state = this.states.CLOSED;
		this.input.preventScroll = false;
	}
});
