document.addEventListener('DOMContentLoaded', function(e) {
    /**
     * Menu show/hide functionality.
     */
    (function() {
        var viewPort = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var mobileMenu = document.querySelector('.js-navigation');

        if(!mobileMenu) {
            console.log('Main menu\'s selector is not found! Check your DOM tree!');
            return;
        }

        // Hide menu on mobile by default if JS is available.
        if (viewPort < 768) {
            mobileMenu.classList.remove('navigation--show'); // Hide the menu by default on mobile
        }

        var sandwichButton = document.querySelector('.navigation__sandwich-control');
        if (!sandwichButton) {
            console.log('Main menu\'s sandwich selector is not found! Check your DOM tree!');
            return;
        }

        sandwichButton.classList.remove('navigation__sandwich-control--hidden');
        sandwichButton.addEventListener('click', function(e) {
            mobileMenu.classList.toggle('navigation--show');
        });

        /*
         If a user decides to "play with a window" we've got him covered here for all version: mobile/tablet/desktop!
         */
        window.addEventListener("resize", menuWatcher);

        function menuWatcher() {
            var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            if (viewPortWidth < 768) {
                mobileMenu.classList.remove('navigation--show');
            } else {
                mobileMenu.classList.add('navigation--show');
            }
        }
    })();

    /**
     * Tour's progress bar functionality.
     *
     * @type {Element}
     */
    (function() {
        var tourProgressBarContainer = document.querySelector('.js-tour');
        if (!tourProgressBarContainer) {
            console.log('Progress bar\'s selector is not found! Check your DOM tree!');
            return;
        }

        var tourProgressBar = tourProgressBarContainer.querySelector('.tour__line');
        var tourProgressBarIndicator = tourProgressBarContainer.querySelector('.tour__indicator');

        if (tourProgressBarContainer && tourProgressBarIndicator) {
            tourProgressBarContainer.addEventListener('mousedown', function(e) {
                startMoving();
                startHighlighting();
                console.log('start moving');
            });
            tourProgressBarContainer.addEventListener('mouseup', function(e) {
                stopMoving();
                stopHighlighting();
                console.log('stop moving');
            });

            function startHighlighting() {
                initiateHighlighting();
            }

            function stopHighlighting() {
                initiateHighlighting(true);
            }

            /**
             * Start/stop highlighting the progress bar.
             *
             * @param revertChanges
             */
            function initiateHighlighting(revertChanges) {
                revertChanges = revertChanges || false;

                var bgColor = 'rgba(255, 165, 0, 0.45)';
                var width = '20px';
                var height = '20px';
                var marginTop = '-9px';

                if (revertChanges) {
                    bgColor = 'rgba(255, 255, 255, 0.2)';
                    width = '10px';
                    height = '10px';
                    marginTop = '-3px';
                }

                tourProgressBar.style.backgroundColor = bgColor;

                tourProgressBarIndicator.style.width = width;
                tourProgressBarIndicator.style.height = height;
                tourProgressBarIndicator.style.marginTop = marginTop;
            }

            function startMoving() {
                tourProgressBarContainer.addEventListener('mousemove', moveTourControl);
            }

            function stopMoving() {
                tourProgressBarContainer.removeEventListener('mousemove', moveTourControl);
            }

            /**
             * Move control on the progress bar.
             * @param e
             */
            function moveTourControl(e) {
                var currentCoordinate = getCoordinate(e.clientX);
                var startProgressBarLength = getStartProgressBarLength();
                var totalProgressBarLength = getTotalProgressBarLength();

                /**
                 * It can't go beyond its start position...
                 */
                if (currentCoordinate < startProgressBarLength) {
                    tourProgressBarIndicator.style.marginLeft = 0;
                /**
                 * ...neither its end position
                 */
                } else if (currentCoordinate > totalProgressBarLength) {
                    tourProgressBarIndicator.style.marginLeft = totalProgressBarLength + 'px';
                /**
                 * We're good here :)
                 */
                } else {
                    tourProgressBarIndicator.style.marginLeft = currentCoordinate + 'px';
                }
            }

            /**
             * Get current control's coordinate.
             *
             * We need to subtract parent's container coordinates from what we
             * have to get an actual position of the control.
             *
             * @param coordinate
             * @returns {number}
             */
            function getCoordinate(coordinate) {
                var parentContainerCoordinates = tourProgressBar.getBoundingClientRect();
                var indicatorHalfSize = (parseInt(tourProgressBarIndicator.style.width) / 2);

                return (coordinate - parseInt(parentContainerCoordinates.left) - indicatorHalfSize);
            }

            /**
             * Start position for the progress bar.
             *
             * @returns {number}
             */
            function getStartProgressBarLength() {
                return 0;
            }

            /**
             * End position for the progress bar.
             *
             * @returns {Number}
             */
            function getTotalProgressBarLength() {
                return parseInt(getComputedStyle(tourProgressBar).width);
            }
        }
    })();
});
