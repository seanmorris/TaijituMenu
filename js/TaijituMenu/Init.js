$(document).ready(
	function()
	{
		var tm = new TaijituMenu(
			'canvas#TaijituMenu'
			, {
				'resume browsing': function()
				{
					tm.close();
				}
				, 'home': function()
				{
					location.href = '#top';
					tm.close();
				}
				, 'anchor 1': function()
				{
					location.href = '#anchor1';
					tm.close();
				}
				, 'anchor 2': function()
				{
					location.href = '#anchor2';
					tm.close();
				}
				, 'anchor 3': function()
				{
					location.href = '#anchor3';
					tm.close();
				}
				, 'spawn alert': function()
				{
					tm.close();
					alert('Alert');
				}
			}
		);
	}
);
