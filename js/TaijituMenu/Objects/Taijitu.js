var Taijitu = Class.extend({
	init: function(position, size, rotation, alpha)
	{
		this.position	= position;
		this.size		= size;
		this.rotation	= rotation;
		this.alpha		= alpha;
	}
	, update: function(position, size, rotation, alpha)
	{
		this.position	= position;
		this.size		= size;
		this.rotation	= rotation;
		this.alpha		= alpha;
	}
	, render: function(context)
	{
		var origAlpha = context.globalAlpha;
		context.globalAlpha = this.alpha;

		context.globalCompositeOperation = 'source-over';

		//Yang
		context.beginPath();
		context.fillStyle = '#000';
		context.arc(
			this.position[0]
				- Math.sin(this.rotation)
				* this.size / 2
			, this.position[1]
				- Math.cos(this.rotation)
				* this.size / 2
			, this.size / 2
			, (Math.PI * 1.5) - this.rotation
			, (Math.PI * 2.5) - this.rotation
			, true
		);

		context.arc(
			this.position[0]
				+ Math.sin(this.rotation)
				* this.size / 2
			, this.position[1]
				+ Math.cos(this.rotation)
				* this.size / 2
			, this.size / 2
			, (Math.PI * 1.5) - this.rotation
			, (Math.PI * 2.5) - this.rotation
		);

		context.arc(
			this.position[0]
			, this.position[1]
			, this.size
			, (Math.PI * 0.5) - this.rotation
			, (Math.PI * 1.5) - this.rotation
			, true
		);

		context.closePath();
		context.fill();

		//Yin
		context.beginPath();
		context.fillStyle = '#FFF';
		context.arc(
			this.position[0]
				+ Math.sin(this.rotation)
				* this.size / 2
			, this.position[1]
				+ Math.cos(this.rotation)
				* this.size / 2
			, this.size / 2
			, (Math.PI * 1.5) - this.rotation
			, (Math.PI * 2.5) - this.rotation
		);

		context.arc(
			this.position[0]
				- Math.sin(this.rotation)
				* this.size / 2
			, this.position[1]
				- Math.cos(this.rotation)
				* this.size / 2
			, this.size / 2
			, (Math.PI * 1.5) - this.rotation
			, (Math.PI * 2.5) - this.rotation
			, true
		);

		context.arc(
			this.position[0]
			, this.position[1]
			, this.size
			, (Math.PI * 0.5) - this.rotation
			, (Math.PI * 1.5) - this.rotation
		);

		context.closePath();
		context.fill();

		context.globalCompositeOperation = 'destination-out';

		//Little Yang
		context.fillStyle = '#000';
		context.beginPath();
		context.arc(
			this.position[0]
				+ Math.sin(this.rotation)
				* this.size / 2
			, this.position[1]
				+ Math.cos(this.rotation)
				* this.size / 2
			, this.size / 8
			, 0
			, Math.PI * 2
		);
		context.closePath();
		context.fill();

		//Little Yin
		context.fillStyle = '#FFF';
		context.beginPath();
		context.arc(
			this.position[0]
				- Math.sin(this.rotation)
				* this.size / 2
			, this.position[1]
				- Math.cos(this.rotation)
				* this.size / 2
			, this.size / 8
			, 0
			, Math.PI * 2
		);
		context.closePath();
		context.fill();

		context.globalCompositeOperation = 'source-over';

		//Little Yang
		context.fillStyle = '#000';
		context.beginPath();
		context.arc(
			this.position[0]
				+ Math.sin(this.rotation)
				* this.size / 2
			, this.position[1]
				+ Math.cos(this.rotation)
				* this.size / 2
			, this.size / 8
			, 0
			, Math.PI * 2
		);
		context.closePath();
		context.fill();

		//Little Yin
		context.fillStyle = '#FFF';
		context.beginPath();
		context.arc(
			this.position[0]
				- Math.sin(this.rotation)
				* this.size / 2
			, this.position[1]
				- Math.cos(this.rotation)
				* this.size / 2
			, this.size / 8
			, 0
			, Math.PI * 2
		);
		context.closePath();
		context.fill();

		context.globalAlpha = origAlpha;
	}
});
