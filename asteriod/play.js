;(function () {

	var containerHeight = 400;
	var containerWidth = 900;
	var container = document.getElementById('container');

	var directions = [-1, 1];
	var size = {
		height: 20,
		width: 20
	};

	var delta = 1;

	var g = new game.Game(containerWidth, containerHeight);
	g.init();

})();
