
var players = [];
var count = 1;
// Add a Player Object and make the context like this: {name: value of text, score: sum of score}

function Player(name, teeType) {
    this.name = name;
    this.teeType = teeType;
    this.score = 0;
    this.out = 0;
    this.in = 0;

}

function addPlayerToAdd() {

    var addPlayerList = document.getElementById("addPlayerList");
    var inputList = document.getElementById("addPlayerBody").getElementsByTagName("input");
    var teeSelect = document.querySelectorAll("selectTee");
    var names = [];
    var tee = [];

    for (var i = 0; i < inputList.length; i++) {
        if (inputList[i].value != "") {
            names.push(inputList[i].value.trim())
        }
    }

    for (var i = 0; i < teeSelect.length; i++) {
        if (teeSelect[i].value != "") {
            tee.push(teeSelect[i].value)
        }
    }

    if (names.length == inputList.length) {
        addPlayerList.innerHTML = "";
        for (var i = 1; i < names.length; i++) {

            var id = "potentPlay"+count;

            addPlayerList.innerHTML += "<div id='" + id + "' class='playerToAdd'>"+
            "<label>Add New Player:</label>"+
            "<input title='name' type='text' name='addPlayer' onkeyup='validateName()'>"+
                "<select class='selectTee'>"+
                "<option selected>Select a Tee Type Please</option>"+
                "<option value='pro'>Pro</option>"+
                "<option value='champion'>Champion</option>"+
                "<option value='men'>Men</option>"+
                "<option value='women'>Women</option>"+
                "<!-- <option>amateur</option> -->"+
                "</select>" +
                "<span><a onclick='removePlayerToAdd(" + count + ")' class='modalRemove glyphicon glyphicon-remove' href='#'></a></span>" +

                "</div>";

            count++;
        }

        var id = "potentPlay"+count;

        addPlayerList.innerHTML += "<div id='" + id + "' class='playerToAdd'>"+
            "<label>Add New Player:</label>"+
            "<input title='name' type='text' name='addPlayer' onkeyup='validateName()'>"+
            "<select class='selectTee'>"+
            "<option selected>Select a Tee Type Please</option>"+
            "<option value='pro'>Pro</option>"+
            "<option value='champion'>Champion</option>"+
            "<option value='men'>Men</option>"+
            "<option value='women'>Women</option>"+
            "<!-- <option>amateur</option> -->"+
            "</select>"+
            "<span><a onclick='removePlayerToAdd(" + count +")' class='modalRemove glyphicon glyphicon-remove' href='#'></a></span>" +

            "</div>";

        count += 1;

    }
    else if (names.length < inputList.length) {
        $("#anotherName").css("display", "block");
        setTimeout(function () {
            $("#anotherName").css("display", "none");
        }, 3000)
    }

    for (var i = 0; i < inputList.length - 1; i++) {
        if (names[i] != undefined) {
            inputList[i].value = names[i];
        }
    }

    for (var i = 0; i < teeSelect.length; i++) {
        if (tee[i] != undefined) {
            teeSelect[i].value = tee[i];
        }
    }

    count = 1;

}

function removePlayerToAdd(index) {

    var addList = document.getElementById("addPlayerList");
    var playerToAdd = document.getElementsByClassName("playerToAdd");
    var array = "";
    var names = [];
    var idList = [];
    var toDelete = "potentPlay"+index;
    var inputList = addList.getElementsByTagName("input");

    for (var i = 0; i < inputList.length; i++) {
        names.push(inputList[i].value);
        if (playerToAdd[i].id != "") {
            idList.push(playerToAdd[i].id);
        }
    }



    addList.innerHTML = removeHTMLElement(addList.getElementsByClassName("playerToAdd"), toDelete);

    for (var i = 0; i < inputList.length; i++) {
        inputList[i].value = names[i];
    }

    function removeHTMLElement(array, id) {
        var string = "";
        var newNames = [];

        for (var i = 0; i < array.length; i++){
            if (array[i].id != id && id != "") {
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
        playerList1.innerHTML += "<div class='row player'></div>";
        playerList2.innerHTML += "<div class='row player'></div>";
    }

    var playerSet1 = playerList1.querySelectorAll(".player"), playerSet2 = playerList2.querySelectorAll(".player");

    for (var i = 0; i < players.length; i++) {
        playerSet1[i].innerHTML = "<div class='playerName col-sm-12 col-md-2 col-xs-12'>" + players[i].name + "</div>";
        playerSet2[i].innerHTML = "<div class='playerName col-sm-12 col-md-2 col-xs-12'>" + players[i].name + "</div>";
        for (var j = 0; j < 9; j++) {
            playerSet1[i];
            playerSet2[i];
        }
    }

    var addPlayerList = document.getElementById("addPlayerList");
    addPlayerList.innerHTML = "";
    count = 1;

}

function validateName() {
    var names = [];

    var inputList = document.getElementById("addPlayerBody").getElementsByTagName("input");

    for (var i = 0; i < inputList.length; i++
    ) {
        if (inputList[i].value != "") {
            names.push(inputList[i].value.trim())
        }
    }

    if (sameNameExists()) {
        $("#sameName").css("display", "block");
        setTimeout(function () {
            $("#sameName").css("display", "none");
        }, 3000)
    }

    function sameNameExists() {

        for (var i = 0; i < names.length; i++) {
            for (var j = 0; j < names.length; j++) {
                if (i == j) {
                    continue;
                }
                else {
                    if (names[i] == names[j]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

}
