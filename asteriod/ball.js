;(function () {
	'use strict';

	function Ball(w, h) {

		var that = this;

		this.width = w;
		this.height = h;

		this.x = getRandom(0 , containerWidth - this.width);
		this.y = getRandom(0 , containerHeight - this.height);

		this.dead = false;

		var element = createBall();

		this.init = function() {
			that.dX = that.getRandomDirection();
			that.dY = that.getRandomDirection();
		};

		this.getRight = function() {
			return that.x + that.width;
		};

		this.getBottom = function() {
			return that.y + that.height;
		};

		this.getElement = function() {
			return element;
		};

		this.addToDom = function() {
			container.appendChild(element);
		};

		this.remove = function() {
			container.removeChild(element);
		};

		this.updateFrame = function() {
			moveHorizontal();
			moveVertical();
		};

		function moveHorizontal() {

			if(that.getRight() >= containerWidth || that.x <= 0) {
				that.dX = -that.dX;
			}

			that.x += that.dX * delta;
			element.style.left = that.x + 'px';
		}

		function moveVertical () {
			if(that.getBottom() >= containerHeight || that.y <= 0) {
				that.dY = -that.dY;
			}

			that.y += that.dY * delta;
			element.style.top = that.y + 'px';
		}

		function createBall() {
			var element = document.createElement('div');

			element.style.height = that.height + 'px';
			element.style.width = that.width + 'px';
			element.style.left = that.x + 'px';
			element.style.top = that.y + 'px';
			element.style.borderRadius = '50%';
			element.style.backgroundColor = '#666';
			element.style.position = 'absolute';

			return element;
		}

		that.getRandomDirection = function() {
			return directions[getRandom(0, 1)];
		};

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
	};
})();
