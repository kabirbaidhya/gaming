;
(function () {

    var game;

    function Container(id, w, h) {

        var slidingClass = 'sliding-bg';
        var self = this;

        this.pushSlide = function () {
            var newslide = document.createElement('div');
            newslide.className = slidingClass;

            self.element.appendChild(newslide);
        };

        this.popSlide = function () {
            self.element.removeChild(self.element.children[0]);
        };

        this.topSlide = function () {
            self.element.children[0];
        };

        this.setup = function () {
            self.width = w;
            self.height = h;

            var element = document.getElementById(id);
            element.style.height = this.height + 'px';
            element.style.width = this.width + 'px';
            self.element = element;

            for (var i = 0; i < 3; i++) {
                this.pushSlide();
            }
        };
    }

    function Mario() {

        var self = this;
        var runningSprite = 0;
        var element = document.getElementById('mario');
        var jumpingMagnitude = 0;
        var jumpPending = false;
        var jumpIndex = 1;

        var top = 161;

        this.run = function () {

            if (game.timer % 150 === 0) {

                runningSprite = ((runningSprite + 1) % 6);
                element.className = 'mario run-' + runningSprite;

            }

            if (game.timer % 100 === 0) {
                if (jumpPending) {
                    continueJump();
                }
            }
        };

        this.jump = function () {
            jumpPending = true;
            continueJump();
        };

        this.isJumpPending = function () {
            return jumpPending;
        };

        function continueJump() {

            // console.log('jumpIndex', jumpIndex, jumpPending);
            if (jumpIndex == 10) {
                jumpIndex = 0;
                jumpingMagnitude = 0;
            } else {
                jumpingMagnitude += (jumpIndex <= 5) ? 1 : -1;
            }

            console.log('JUMP M: ', jumpingMagnitude);
            element.style.top = (top - (jumpingMagnitude * 15)) + 'px';


            if (jumpIndex === 0) {
                jumpPending = false;
            }

            jumpIndex++;
        }

    }

    function Game() {

        var self = this;
        this.timer = 0;

        var container = new Container('container', 1000, 500);
        container.setup();

        var x = 0;
        var delta = 10;
        var interval;
        var ms = 50;
        var mario = new Mario();

        function slideBackground() {
            var slidingBg = container.element.children[0];

            if ((Math.abs(x) + delta) >= container.width) {
                container.popSlide();
                container.pushSlide();

                slidingBg = container.topSlide();

                x = 0;

            } else {
                x -= delta;
            }

            if (slidingBg) {
                slidingBg.style.marginLeft = x + 'px';
            }
        }

        function loop() {
            slideBackground();
            mario.run();

            self.timer += ms;
        }

        this.start = function () {
            interval = setInterval(loop, ms);

            document.onkeydown = function (e) {

                // up key
                if (e.which === 38) {
                    console.log('JUMP');

                    if (!mario.isJumpPending()) {
                        mario.jump();
                    } else {
                        console.log('Can not jump');
                    }
                }
            };
        };

        this.stop = function () {
            clearInterval(interval);
        };

    }

    game = new Game();
    game.start();

})();
