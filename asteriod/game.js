;(function () {
	function Ball() {

		var that = this;

		that.left = getRandom(0 , containerWidth - size.width);
		that.top = getRandom(0 , containerHeight - size.height);
		that.right = that.left + size.width;
		that.bottom = that.top + size.height;

		that.dead = false;
		

		var element = createBall();

		that.init = function() {
			that.dX = that.getRandomDirection();
			that.dY = that.getRandomDirection();
		};

		that.getElement = function() {
			return element;
		};

		that.addToDom = function() {
			container.appendChild(element);
		};

		that.remove = function() {
			container.removeChild(element);
		};

		that.updateFrame = function() {
			moveHorizontal();
			moveVertical();
		};

		function moveHorizontal() {

			if(that.right >= containerWidth || that.left <= 0) {
				that.dX = -that.dX;
			}

			that.left += that.dX * delta;
			that.right = that.left + size.width;
			element.style.left = that.left + 'px';
		}

		function moveVertical () {
			if(that.bottom >= containerHeight || that.top <= 0) {
				that.dY = -that.dY;
			}

			that.top += that.dY * delta;
			that.bottom = that.top + size.height;
			element.style.top = that.top + 'px';
		}

		function createBall() {
			var element = document.createElement('div');
			element.style.height = size.height + 'px';
			element.style.width = size.width + 'px';
			element.style.top = that.top + 'px';
			element.style.left = that.left + 'px';
			element.style.borderRadius = '50%';
			element.style.backgroundColor = '#666';
			element.style.position = 'absolute';

			return element;
		}

		that.getRandomDirection = function() {
			return directions[getRandom(0, 1)];
		};

		function hasColided(obj1, obj2) {

			var c1, c2, c3, c4;
			
			var condition = (
				/*(c1 = (obj1.right >= obj2.left && obj1.right <= obj2.right)) ||
				(c2 = (obj1.top <= obj2.bottom && obj2.top <= obj1.top)) ||
				(c3 = (obj1.bottom >= obj2.top && obj1.top <= obj2.top)) ||
				(c4 = (obj1.left <= obj2.right && obj2.left <= obj1.left))*/
				(c1 = (obj1.left >= obj2.left && obj1.left <= obj2.right)) ||
				(c2 = (obj1.bottom >= obj2.top && obj1.bottom <= obj2.bottom)) ||
				(c3 = (obj1.right >= obj2.left && obj1.left <= obj2.right)) ||
				(c4 = (obj1.top >= obj2.top && obj1.top <= obj2.bottom))
			);

			if(condition) {
				console.log(obj1, obj2);
				console.log('conditions', c1, c2, c3, c4);
			}

			return condition;
		}

		this.checkCollision = function(enemy) {
			if (that.dead) return;
			if (enemy.dead) return;

			var val = hasColided(that, enemy);

			if (val) {
				console.log("collided");
				enemy.dead = true;
				that.dead = true;

				that.remove();
				enemy.remove();
			}

			return val;
		}
	}

	function Game() {
		
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
				// balls[i].updateFrame();
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

	function getRandom(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	var containerHeight = 400;
	var containerWidth = 900;
	var container = document.getElementById('container');

	var directions = [-1, 1];
	var size = {
		height: 20,
		width: 20
	};

	var delta = 1;

	var game = new Game();
	game.init();

	// var b1 = new Ball();
	// b1.top = 10;

	// var b2 = new Ball();
	// b2.left = 10;

	// var val = b1.checkCollision(b2);
	// console.log(val);
})();

function hasColided(obj1, obj2) {
			var c1, c2, c3, c4;
			var condition = (
				/*(c1 = (obj1.right >= obj2.left && obj1.right <= obj2.right)) ||
				(c2 = (obj1.top <= obj2.bottom && obj2.top <= obj1.top)) ||
				(c3 = (obj1.bottom >= obj2.top && obj1.top <= obj2.top)) ||
				(c4 = (obj1.left <= obj2.right && obj2.left <= obj1.left))
				*/
				(c1 = (obj1.left >= obj2.left && obj1.left <= obj2.right)) ||
				(c2 = (obj1.bottom >= obj2.top && obj1.bottom <= obj2.bottom)) ||
				(c3 = (obj1.right >= obj2.left && obj1.left <= obj2.right)) ||
				(c4 = (obj1.top >= obj2.top && obj1.top <= obj2.bottom))
			);

			console.log('colided', condition, obj1, obj2);
			console.log('conditions', c1, c2, c3, c4);

			return condition;
		}

// var b1 = {left: 20, top: 20, right: 30, bottom: 30};
// var b2 = {left: 31, top: 30, right: 41, bottom: 40};


// hasColided(b2, b1);

// var that = {top:10, bottom:20, right: 2, left:45};
// var enemy = {top:10, right:50};
// var val = (
// 		that.top === enemy.bottom ||
// 		that.right === enemy.left ||
// 		that.bottom === enemy.top ||
// 		that.left === enemy.right
// 	);
// console.log(val);


