$(document).ready(function () {
    var BasicCard = function (Front, Back) {
        this.front = Front;
        this.back = Back;
    }
    var ClozeCard = function (Text, Cloze) {
        this.fullText = function () {
            console.log(Text);
            return Text
        };
        this.back = function () {
            console.log(Cloze);
            return Cloze
        };
        this.front = function () {
            var numChar = Cloze.length;
            var finalString = [];
            for (var i = 0; i < numChar; i++) {
                finalString.push("_");
            }
            console.log(Text.replace(Cloze, finalString.join("")));
            return Text.replace(Cloze, finalString.join(""));
        };
        this.oops = function () {
            if (!Text.includes(Cloze)) {
                console.log("Error! " + Text + " does not contain the word " + Cloze + " to remove. Please try again");
                var newDialog = $("<dialog>");
                newDialog.attr("id", "dialog-box");
                newDialog.html("Error! " + Text + " does not contain the word " + Cloze + " to remove. Please try again");
                $("#flashcard-jumbo").append(newDialog);
                $("#basic-section").hide();
                $("#cloze-section").hide();
                newDialog.show();
                setTimeout(function () {
                    newDialog.hide();
                    newDialog.empty();
                    $("#basic-section").show();
                    $("#cloze-section").show();
                }, 4000);
            }
        };
    }

    //Actual Program
    var initialAction = $(".initialAction");
    var initialActionValue;
    var basicArray = [];
    var clozeArray = [];
    var newBasicCard;
    var newClozeCard;
    var cardSide;

    initialAction.on("click", function (event) {
        initialActionValue = event.target.innerHTML;
        if (initialActionValue === "Basic FlashCards") {
            $("#card-selection").html("Basic FlashCards");
            $("span[for='firstInput']").html("Front Value");
            $("span[for='secondInput']").html("Back Value");
        }
        else if (initialActionValue === "Cloze-Deleted FlashCards") {
            $("#card-selection").html("Cloze-Deleted FlashCards");
            $("span[for='firstInput']").html("Full Text");
            $("span[for='secondInput']").html("Value to Remove");
        }
    });

    $("#submitBTN").on("click", function (event) {
        //New methods to call on functions to create new cards
        newBasicCard = new BasicCard($("#firstInput").val().trim(), $("#secondInput").val().trim());
        newClozeCard = new ClozeCard($("#firstInput").val().trim(), $("#secondInput").val().trim());
        event.preventDefault();
        if (initialActionValue === "Basic FlashCards") {
            basicArray.push(newBasicCard);
        }
        else if (initialActionValue === "Cloze-Deleted FlashCards") {
            newClozeCard.oops();
            if ($("#firstInput").val().trim().includes($("#secondInput").val().trim())) {
                clozeArray.push(newClozeCard);
            }
        }
        $("#firstInput").val("");
        $("#secondInput").val("");
        $("#number-basic").html(basicArray.length);
        $("#number-cloze").html(clozeArray.length);
    });

    //Flashcard Applications
    var i;
    $("#startBTN").on("click", function (event) {
        if (initialActionValue === "Basic FlashCards") {
            i = 0;
            cardSide = "front";
            startCards(basicArray, i);
        }
        else if (initialActionValue === "Cloze-Deleted FlashCards") {
            i = 0;
            cardSide = "front";
            startCards(clozeArray, i);
        }
    });

    $("#flipBTN").on("click", function (event) {
        if (initialActionValue === "Basic FlashCards") {
            cardSide = flipCard(basicArray, i, cardSide);
            cardSide;
        }
        else if (initialActionValue === "Cloze-Deleted FlashCards") {
            cardSide = flipCard(clozeArray, i, cardSide);
            cardSide;
        }
    });

    $("#nextBTN").on("click", function (event) {
        if (initialActionValue === "Basic FlashCards") {
            i++;
            if (i >= basicArray.length) {
                i = 0;
            }
            console.log(i);
            cardSide = "front";
            startCards(basicArray, i);
        }
        else if (initialActionValue === "Cloze-Deleted FlashCards") {
            i++;
            if (i >= clozeArray.length) {
                i = 0;
            }
            console.log(i);
            cardSide = "front";
            startCards(clozeArray, i);
        }
    });

    //Function for starting the Flashcards
    function startCards(array, i) {
        $("#card-text").html(array[i].front)
    }

    //Function for Flip Cards
    function flipCard(array, i, side) {
        if(side === "front" || side == null){
            $("#card-text").html(array[i].back)
            side = "back";
            return side;
        }
        else if (side === "back") {
            console.log(side);
            $("#card-text").html(array[i].front);
            side = "front";
            return side;
        }
    }

});


