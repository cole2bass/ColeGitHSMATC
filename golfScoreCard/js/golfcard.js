
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
            names.push(inputList[i].value)
        }
    }

    before = $(".playerToAdd").length;

    addPlayerList = document.getElementById("addPlayerList");

    addPlayerList.innerHTML = "<div class='playerToAdd'>" +
        "<label>Add New Player</label> <input type='text' name='addPlayer'><select class='selectTee'>"+
        "<option selected>Select a Tee Type Please</option>"+
        "<option>Pro</option>"+
        "<option>Champion</option>"+
        "<option>Men</option>"+
        "<option>Women</option>"+
        "<!-- <option>Select a Tee Type Please</option> -->"+
        "</select>" +
        "</div>";

    for (var i = 1; i < names.length; i++) {
        addPlayerList.innerHTML += "<div id='playerAdding" + count + "' class='playerToAdd'>" +
            "<label>Add New Player</label> <input type='text' name='addPlayer'><select class='selectTee'>" +
            "<option selected>Select a Tee Type Please</option>" +
            "<option>Pro</option>" +
            "<option>Champion</option>" +
            "<option>Men</option>" +
            "<option>Women</option>" +
            "<!-- <option>Select a Tee Type Please</option> -->" +
            "</select>" +
            "<span>" +
            "<a href='#' class='modalRemove glyphicon glyphicon-remove' onclick='removePlayerToAdd(" + count + ")'></a></span>" +

            "</div>"
        count++;
    }


    addPlayerList.innerHTML += "<div id='playerAdding" + count + "' class='playerToAdd'>" +
        "<label>Add New Player</label> <input type='text' name='addPlayer'><select class='selectTee'>" +
        "<option selected>Select a Tee Type Please</option>" +
        "<option>Pro</option>" +
        "<option>Champion</option>" +
        "<option>Men</option>" +
        "<option>Women</option>" +
        "<!-- <option>Select a Tee Type Please</option> -->" +
        "</select>" +
        "<span>" +
        "<a href='#' class='modalRemove glyphicon glyphicon-remove' onclick='removePlayerToAdd(" + count + ")'></a></span>" +

        "</div>"

    after = $(".playerToAdd").length;

    if (before == after) {
        $("#addPlayerBody").prepend("")
    }

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
    var totalTable = document.getElementById("totalTable");
    playerList1.innerHTML = "";
    playerList2.innerHTML = "";
    //Make lines less complicated, add player rows then later add the players.
    var numPlayer = 1;
    for (var i = 0; i < players.length; i++) {
        playerList1.innerHTML += "<div class='player row'></div>"
        playerList2.innerHTML += "<div class='player row'></div>"
    }
    var players1 = playerList1.getElementsByClassName("player");
    var players2 = playerList2.getElementsByClassName("player");

    for (var i = 0; i < players.length; i++) {

        players1[i].innerHTML = "<div class='cell'>" + players[i].name + "</div>";
        players2[i].innerHTML = "<div class='cell'> " + players[i].name + "</div>";

        for (var j = 0; j < 9; j++) {
            players1[i].innerHTML += "<div class='cell points'>0</div>";
            players2[i].innerHTML += "<div class='cell points'>0</div>";
        }
        players1[i].innerHTML += "<div class='cell totalOut'>0</div>";
        players2[i].innerHTML += "<div class='cell totalIn'>0</div>";
    }

    var addPlayerList = document.getElementById("addPlayerList");
    addPlayerList.innerHTML = "<div class='playerToAdd'>" +
        "<label>Add New Player</label> <input type='text' name='addPlayer'><select class='selectTee'>"+
    "<option selected>Select a Tee Type Please</option>"+
    "<option>Pro</option>"+
    "<option>Champion</option>"+
    "<option>Men</option>"+
    "<option>Women</option>"+
    "<!-- <option>Select a Tee Type Please</option> -->"+
    "</select>" +
        "</div>";
    count = 1;

    updatePlayers();

}

function updatePlayers() {

    $(".player").removeClass("type1");
    $(".player").removeClass("type2");
    var playerList = $(".player")

    for (var i = 0; i < playerList.length; i++) {
        if (i % 2 == 0) {
            playerList[i].setAttribute("class", playerList[i].getAttribute("class") + " type1");
        }
        else {
            playerList[i].setAttribute("class", playerList[i].getAttribute("class") + " type2");
        }
    }




}