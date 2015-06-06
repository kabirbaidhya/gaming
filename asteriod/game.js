;(function () {
	'use strict';

	function getRandom (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function hasColided(obj1, obj2) {

		var c1, c2, c3, c4;
		
		var condition = (
			(c1 = (obj1.x >= obj2.x && obj1.x <= obj2.right)) ||
			(c2 = (obj1.bottom >= obj2.y && obj1.bottom <= obj2.bottom)) ||
			(c3 = (obj1.right >= obj2.x && obj1.x <= obj2.right)) ||
			(c4 = (obj1.y >= obj2.y && obj1.y <= obj2.bottom))
		);

		if(condition) {
			console.log(obj1, obj2);
			console.log('conditions', c1, c2, c3, c4);
		}

		return condition;
	}

	function Game () {
		
		container.style.height = containerHeight + 'px';
		container.style.width = containerWidth + 'px';

		var balls = [];
		var that = this;

		this.init = function() {

			var noOfBalls = 20;

			for(var i =0; i < noOfBalls; i++) {
				var b = new Ball();
				b.init();
				b.addToDom();
				balls[i]= b;
			}

			setInterval(that.gameloop, 20);
		};

		this.gameloop = function() {

			for(var i =0; i < balls.length; i++) {
				balls[i].updateFrame();
			}

			for(var i =0; i < balls.length; i++) {
				var ball = balls[i];

				for(var j =0; j < balls.length; j++) {
					if (i == j)
						continue;

					var enemy = balls[j];

					ball.checkCollision(enemy);
				}
			}

			for(var i =0; i < balls.length; i++) {
				var ball = balls[i];

				if (ball.dead) {
					// slice array
				}
			}
		};
	}

})();
