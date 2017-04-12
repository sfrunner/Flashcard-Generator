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
    };
    this.cloze = function () {
        console.log(Cloze);
    };

    //Function will insert a breakpoint of string to show where text would usually be with a certain character matching the original lengh of the text removed
    this.repeatChar = function(char){
        var numChar = Cloze.length;
        var finalString = [];
        for (var i = 0; i < numChar; i++) {
            finalString.push(char);
        }
        return finalString.join("");
    };
    this.partial = function () {
        console.log(Text.replace(Cloze, this.repeatChar("_")));
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
var presidentCloze = new ClozeCard("A terrible president, Donald Trump, he is","Obama");
presidentCloze.oops();
presidentCloze.partial();
presidentCloze.cloze();
