$(document).ready(function () {
    var BasicCard = function (Front, Back) {
        this.front = Front;
        this.back = Back;
    }
    //Testing of BasicCard constructor
    var president = new BasicCard("Who is the current President?", "Donald Trump");
    console.log(president.front);
    console.log(president.back);


    var ClozeCard = function (Text, Cloze) {
        this.fullText = function () {
            console.log(Text);
            return Text
        };
        this.back = function () {
            console.log(Cloze);
            return Cloze
        };

        //Function will insert a breakpoint of string to show where text would usually be with a certain character matching the original lengh of the text removed
        this.repeatChar = function (char) {
            var numChar = Cloze.length;
            var finalString = [];
            for (var i = 0; i < numChar; i++) {
                finalString.push(char);
            }
            return finalString.join("");
        };
        this.front = function () {
            console.log(Text.replace(Cloze, this.repeatChar("_")));
            return (Text.replace(Cloze, this.repeatChar("_")));
        };
        this.oops = function () {
            if (!Text.includes(Cloze)) {
                console.log("Error! " + Text + " does not contain the word " + Cloze + " to remove. Please try again");
            }
            else {
                console.log("There are no issues with your current setup.");
            }
        };
    }

    //Testing of ClozeCard
    var presidentCloze = new ClozeCard("A terrible president, Donald Trump, he is", "Obama");
    presidentCloze.oops();
    presidentCloze.back();
    presidentCloze.front();

    //Actual Program
    var initialAction = $(".initialAction");
    var initialActionValue;
    var basicArray = [];
    var clozeArray = [];
    var newBasicCard;
    var newClozeCard;
    var cardSide;

    initialAction.on("click", function (event) {
        console.log(event);
        //console.log(initialAction.html());
        initialActionValue = event.target.innerHTML;
        if (initialActionValue === "Basic FlashCards") {
            $("span[for='firstInput']").html("Front Value");
            $("span[for='secondInput']").html("Back Value");
        }
        else if (initialActionValue === "Cloze-Deleted FlashCards") {
            $("span[for='firstInput']").html("Full Text");
            $("span[for='secondInput']").html("Value to Remove");
        }
    });


    $("#initialSubmit").on("click", function (event) {
        newBasicCard = new BasicCard($("#firstInput").val().trim(), $("#secondInput").val().trim());
        newClozeCard = new ClozeCard($("#firstInput").val().trim(), $("#secondInput").val().trim());
        event.preventDefault();
        if (initialActionValue === "Basic FlashCards") {
            console.log(newBasicCard.front);
            basicArray.push(newBasicCard);
        }
        else if (initialActionValue === "Cloze-Deleted FlashCards") {
            clozeArray.push(newClozeCard);
        }
        console.log(basicArray);
        console.log(clozeArray);
        console.log(event);
        $("#firstInput").val("");
        $("#secondInput").val("");
    });

    
    //Flashcard Applications
    var i;
    $("#startBTN").on("click", function (event) {
        i = 0;
        cardSide = "front";
        startCards(basicArray, i);
    });
    $("#flipBTN").on("click", function (event) {
        cardSide = flipCard(basicArray, i, cardSide);
        cardSide;
    });
    $("#nextBTN").on("click", function (event) {
        i++;
        cardSide = "front";
        startCards(basicArray, i);
    });


    function startCards(array, i) {
        $("#card-text").html(array[i].front)
    }
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


