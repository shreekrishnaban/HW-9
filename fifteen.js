$(document).ready(function() {



    let emptyDivPosition = { x: 0, y: 0 };

    let classMovablePlace = "movablepiece";
    let divs = [];



    init(undefined, true);

    $("#shufflebutton").click(shuffleClicked);


    //Main initialization with skipPosition : where to put empty space
    function init(skipPosition, initial) {
        $("#puzzlearea div").each(function(index) {
            divs[index] = $(this);

        });

        if (!skipPosition)
            skipPosition = divs.length;

        var x, y;
        let counter = 0;
        let set = new Set();
        let i = 0;


        while (set.size <= divs.length) {

            i = initial ? i : generateRandomNum(divs.length + 1);
            if (set.has(i))
                continue;

            if (skipPosition == i) {
                emptyDivPosition.x = calculateX(i);
                emptyDivPosition.y = calculateY(i - 1);
                set.add(i);
                i++;
                console.log(emptyDivPosition);
                continue;
            }

            const div = divs[counter];
            x = calculateX(i);
            y = calculateY(i);

            // set basic style and background
            div.addClass("puzzlepiece");
            if (initial) {
                placeDiv(div, x, y);
            } else {
                moveDiv(div, x, y);

            }


            div.off("mouseenter").on('mouseenter', function() {
                addMovableHint(div);
            });

            div.off("mouseleave").on('mouseleave', function() {
                removeMovableHint(div);
            });
            div.off('click').on('click', function() {
                moveToEmptySpace(div);

            })
            set.add(i);
            counter++;
            i++;
        }
    }
    //Calculate based on index : X
    function calculateX(index) {
        return (index % 4) * 100;
    }

    //Calculate based on index : Y
    function calculateY(index) {
        return (Math.floor(index / 4) * 100);
    }

    //Place div in specified position
    function placeDiv(div, x, y) {
        div.css({
            "background-image": "url('background_given.jpg')",
            "background-position": -x + 'px ' + (-y) + 'px'
        });
        moveDiv(div, x, y);
    }


    //Additional re-usable method for placing div
    function moveDiv(div, x, y) {
        div.css({
            "left": x + "px",
            "top": y + "px",
        });
        // store x and y for later
        div.x = x;
        div.y = y;
    }

    // Add class movable if eligible
    function addMovableHint(div) {
        if (isMovable(div)) {
            div.addClass(classMovablePlace);
        }
    }

    //Swap clicked div without & keep track of current empty space
    function moveToEmptySpace(div) {
        console.log(div);

        if (div.hasClass(classMovablePlace)) {
            let currentEmptyX = emptyDivPosition.x;
            let currentEmptyY = emptyDivPosition.y;

            emptyDivPosition.x = div.x;
            emptyDivPosition.y = div.y;

            moveDiv(div, currentEmptyX, currentEmptyY);
        }
        console.log(emptyDivPosition)

    }

    //Remove hint class
    function removeMovableHint(div) {
        div.removeClass(classMovablePlace);
    }

    function isMovable(div) {
        let currentDivPosition = getDivPosition(div);
        let currentEmptyDivPosition = getDivPosition(emptyDivPosition);
        let probableX = [currentEmptyDivPosition.x, currentEmptyDivPosition.x + 1, currentEmptyDivPosition.x - 1];
        let probableY = [currentEmptyDivPosition.y, currentEmptyDivPosition.y + 1, currentEmptyDivPosition.y - 1];

        // let sameDiv = currentDivPosition.x == currentEmptyDivPosition.x && currentDivPosition.y == currentEmptyDivPosition.y;
        let isCurrentDivEven = (currentDivPosition.x + currentDivPosition.y) % 2 == 0;
        let isEmptyDivEven = (currentEmptyDivPosition.x + currentEmptyDivPosition.y) % 2 == 0;
        let isCrossValid = isCurrentDivEven == isEmptyDivEven;

        if (probableX.indexOf(currentDivPosition.x) > -1 && probableY.indexOf(currentDivPosition.y) > -1 &&
            ((currentEmptyDivPosition.x == currentDivPosition.x || currentEmptyDivPosition.y == currentDivPosition.x || currentDivPosition.y == currentEmptyDivPosition.y)) &&
            !isCrossValid
            // && !sameDiv

        )
            return true;



    }

    //Get div position : divided by base 100
    function getDivPosition(div) {
        let x = parseInt(div.x) / 100;
        let y = parseInt(div.y) / 100;
        return { x: x, y: y };
    }

    function shuffleClicked() {
        reset();
        let randomNum = generateRandomNum(15);
        init(randomNum, false);
    }

    //Reset variables, All reset goes here
    function reset() {
        divs = [];
        emptyDivPosition = { x: 0, y: 0 };
    }






    function generateRandomNum(n) {
        return parseInt(Math.random() * n)
    }

});

// init = function() {
//     var puzzleArea = document.getElementById('puzzlearea');
//     var divs = puzzleArea.getElementsByTagName("div");

//     // initialize each piece
//     for (var i = 0; i < divs.length; i++) {
//         var div = divs[i];

//         // calculate x and y for this piece
//         var x = ((i % 4) * 100);
//         var y = (Math.floor(i / 4) * 100);

//         // set basic style and background
//         div.className = "puzzlepiece";
//         div.style.left = x + 'px';
//         div.style.top = y + 'px';
//         div.style.backgroundImage = 'url("background.jpg")';
//         div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';

//         // store x and y for later
//         div.x = x;
//         div.y = y;
//     }
// };