
var players = [];
var count = 1;
// Add a Player Object and make the context like this: {name: value of text, score: sum of score}

function Player(name, teeType) {
    this.name = name;
    this.score = 0;
    this.teeType = teeType;

}

function addPlayerToAdd() {

    var addPlayerList = document.getElementById("addPlayerList");
    var inputList = addPlayerList.getElementsByTagName("input");
    var names = [];
    //Use the following variables
    var before = 0;
    var after = 0;

    for (var i = 0; i < inputList.length; i++) {
        if (inputList[i].value != "") {
            names.push(inputList[i].value.trim())
        }
    }

    addPlayerList = document.getElementById("addPlayerList");

    addPlayerList.innerHTML = "";


    for (var i = 0; i < inputList.length - 1; i++) {
        if (names[i] != undefined) {
            inputList[i].value = names[i];
        }
    }

    count = 1;

}

function removePlayerToAdd(index) {

    var element = document.getElementById("playerAdding"+index);
    var addList = document.getElementById("addPlayerList");
    var playerToAdd = document.getElementsByClassName("playerToAdd");
    var names = [];
    var idList = [];
    var toDelete = element.id;
    var inputList = addList.getElementsByTagName("input");

    for (var i = 0; i < inputList.length; i++) {
        names.push(inputList[i].value);
        if (i > 0) {
            idList.push(playerToAdd[i].id);
        }
    }

    addList.innerHTML = removeHTMLElement(playerToAdd, toDelete);

    for (var i = 0; i < inputList.length; i++) {
        inputList[i].value = names[i];
    }

    function removeHTMLElement(array, id) {
        var string = "";
        var newNames = [];

        for (var i = 0; i < array.length; i++){
            if (array[i].id != id) {
                string += array[i].outerHTML;
                newNames.push(names[i]);
            }
        }

        names = newNames;
        return string;
    }

}

function addPlayers() {

    var elements = document.getElementsByClassName("playerToAdd");
    var selectTee = $(".selectTee")

    for (var i = 0; i < elements.length; i++) {

        var name = elements[i].getElementsByTagName("input")[0].value;
        if (name != ""){
            var player = new Player(name, selectTee[i].value);
            players.push(player);
        }

    }

    var playerList1 = document.querySelectorAll("div.playerContainer")[0], playerList2 = document.querySelectorAll("div.playerContainer")[1];
    var totalName = document.getElementById("totalTable");
    var totalScore = document.getElementById("totalTable");
    playerList1.innerHTML = "";
    playerList2.innerHTML = "";
    //Make lines less complicated, add player rows then later add the players.



    for (var i = 0; i < players.length; i++) {
        playerList1.innerHTML += "<div class='player' id='section1" + players[i].name.trim().split(" ")[0] + (i+1) +"'></div>";
        playerList2.innerHTML += "<div class='player' id='section2" + players[i].name.trim().split(" ")[0] + (i+1) +"'></div>";
    }

    var addPlayerList = document.getElementById("addPlayerList");
    addPlayerList.innerHTML = "";
    count = 1;

}
