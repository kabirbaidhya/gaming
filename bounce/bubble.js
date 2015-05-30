;(function () {
	
	var bubble = document.getElementById('bubble');
	var container = document.getElementById('container');

	var delta = 2;

	var dX = +1;
	var dY = +1;

	var containerHeight = 400;
	var containerWidth = 900;
	container.style.height = containerHeight + 'px';
	container.style.width = containerWidth + 'px';

	var size = {
		height: 50,
		width: 50
	};	

	bubble.style.height= size.height + 'px';
	bubble.style.width= size.width + 'px';

	var pos = {
		left: 1,
		top: 250,
		right: 0,
		bottom: 0
	};

	function gameloop() {

		moveHorizontal();
		moveVertical();

		console.log(pos);
	}

	function moveHorizontal() {

		if(pos.right >= containerWidth || pos.left <= 0) {
			dX = -dX;
		}

		pos.left += dX*delta;
		pos.right = pos.left + size.width;
		bubble.style.left = pos.left + 'px';
	}

	function moveVertical() {
		if(pos.bottom >= containerHeight || pos.top <= 0) {
			dY = -dY;
		}

		pos.top += dY*delta;
		pos.bottom = pos.top + size.height;
		bubble.style.top = pos.top + 'px';
	}


	setInterval(gameloop, 20);
})();