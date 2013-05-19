Useage of TaijituMenu is very simple. Just use the HTML between the comments
from the index.html file, along with jquery (tested with 1.7.2) and the minified
TaijituMenu.min.js.

Once you've got that, just create the TaijituMenu object
with the canvas selector as the first parameter and an object containing the
callbacks keyed by the menu option titles, like so:

var tm = new TaijituMenu(
	'canvas#TaijituMenu'
	, {
		'resume browsing': function()
		{
			tm.close();
		}
		, 'spawn alert': function()
		{
			tm.close();
			alert('ALERT');
		}
	}
);
