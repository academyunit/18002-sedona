document.addEventListener('DOMContentLoaded', (e) => {
    /**
     * Menu show/hide functionality.
     */
    (() => {
        const mobileMenu = document.querySelector('.js-navigation');
        if(!mobileMenu) {
            console.log('Main menu\'s selector is not found! Check your DOM tree!');
            return;
        }

        const sandwichButton = document.querySelector('.navigation__sandwich-control');
        if (!sandwichButton) {
            console.log('Main menu\'s sandwich selector is not found! Check your DOM tree!');
            return;
        }

        sandwichButton.addEventListener('click', (e) => {
            mobileMenu.classList.toggle('navigation__list--show');
        });
    })();

    /**
     * Tour's progress bar functionality.
     *
     * @type {Element}
     */
    (() => {
        const tourProgressBarContainer = document.querySelector('.js-tour');
        if (!tourProgressBarContainer) {
            console.log('Progress bar\'s selector is not found! Check your DOM tree!');
            return;
        }

        const tourProgressBar = tourProgressBarContainer.querySelector('.tour__line');
        const tourProgressBarIndicator = tourProgressBarContainer.querySelector('.tour__indicator');

        if (tourProgressBarContainer && tourProgressBarIndicator) {
            tourProgressBarContainer.addEventListener('mousedown', (e) => {
                startMoving();
                startHighlighting();
                console.log('start moving');
            });
            tourProgressBarContainer.addEventListener('mouseup', (e) => {
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
            function initiateHighlighting(revertChanges = false) {
                let bgColor = 'rgba(255, 165, 0, 0.45)';
                let width = '20px';
                let height = '20px';
                let marginTop = '-9px';

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
                const currentCoordinate = getCoordinate(e.clientX);
                const startProgressBarLength = getStartProgressBarLength();
                const totalProgressBarLength = getTotalProgressBarLength();

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
                const parentContainerCoordinates = tourProgressBar.getBoundingClientRect();
                const indicatorHalfSize = (parseInt(tourProgressBarIndicator.style.width) / 2);

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
