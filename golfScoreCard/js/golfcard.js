
var players = [];
var count = 1;
// Add a Player Object and make the context like this: {name: value of text, score: sum of score}

//TODO Make sure that you append necessary html to container and when removing unwanted number of players just remove that element that contains that player.

function Player(name, teeType) {
    this.name = name;
    this.teeType = teeType;
    this.holePoints = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.score = 0;
    this.out = 0;
    this.in = 0;

}

function addPlayerToAdd() {


    $("#addPlayerList").append("<div id='player" + count + "' class='playerToAdd'>"+
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

        "</div>");

    count++;

}

function removePlayerToAdd(index) {

    $("#player"+index).css("display", "none");

}

function addPlayers() {

    var names = [];
    var tee_types = [];
    var inputList = [];
    var selectList = $(".selectTee")
    var displayedList = [];

    for (var i = 0; i < $(".playerToAdd").length; i++) {
        if ($(".playerToAdd")[i].style.display != "none") {
            displayedList.push($(".playerToAdd")[i]);
        }
    }

    for (var index = 0; index < displayedList.length; index++) {
        inputList.push(displayedList[index].getElementsByTagName("input")[0])
    }


    for (var nameInd = 0; nameInd < inputList.length; nameInd++) {
        if (inputList[nameInd].value.trim() != "") {
            names.push(inputList[nameInd].value.trim());
        }
    }
    for (var tee_typeInd = 0; tee_typeInd < selectList.length; tee_typeInd++){
        if (selectList[tee_typeInd].value != "") {
            tee_types.push(selectList[tee_typeInd].value);
        }
    }

    if (names.length == inputList.length) {
        for (var playerInd = 0; playerInd < names.length; playerInd++) {
            players.push(new Player(names[playerInd], tee_types[playerInd]));
        }

        var playerContainer1 = $(".playerContainer")[0], playerContainer2 = $(".playerContainer")[1];

        for (var playerInd = 0; playerInd < names.length; playerInd++) {
            playerContainer1.innerHTML += "<div class='row player'></div>";
            playerContainer2.innerHTML += "<div class='row player'></div>";
        }

        var playerList1 = playerContainer1.getElementsByClassName("player");
        var playerList2 = playerContainer2.getElementsByClassName("player");

        for (var playerInd = 0; playerInd < playerList1.length; playerInd++) {
            if (playerList1[playerInd].innerHTML == "" && playerList2[playerInd].innerHTML == "") {

                //Start adding content.
                var playerRow1 = playerList1[playerInd];
                var playerRow2 = playerList2[playerInd];
                playerRow1.className += " "+players[playerInd].teeType;
                playerRow2.className += " "+players[playerInd].teeType;
                playerRow1.innerHTML += "<div class='labelText col-sm-12 col-md-2'>" + players[playerInd].name + "</div>";
                playerRow2.innerHTML += "<div class='labelText col-sm-12 col-md-2'>" + players[playerInd].name + "</div>";

                for (var i = 0; i < 9; i++) {
                    playerRow1.innerHTML += "<div class='cellLabel showXS col-xs-6'>Hole " + (i + 1) +":</div>";
                    playerRow2.innerHTML += "<div class='cellLabel showXS col-xs-6'>Hole " + (i + 9) +":</div>";
                    playerRow1.innerHTML += "<div class='col-sm-1 col-xs-6'><input type='number' data-hole-type='out' data-player-name='" + players[playerInd].name +"' onkeyup='updateScore(data-player-name, value, data-hole-type, " + i + ")'></div>";
                    playerRow2.innerHTML += "<div class='col-sm-1 col-xs-6'><input type='number' data-hole-type='in' data-player-name='" + players[playerInd].name +"' onkeyup='updateScore(data-player-name, value, data.hole-type, " + (i+9) + ")'></div>";
                }
                playerRow1.innerHTML += "<div class='cellLabel showXS col-xs-6'>Out:</div>";
                playerRow2.innerHTML += "<div class='cellLabel showXS col-xs-6'>In:</div>";
                playerRow1.innerHTML += "<div class='playerOut'>0</div>";
                playerRow2.innerHTML += "<div class='playerIn'>0</div>";


            }
        }

        var totalContainer = $("#totalContainer");

        totalContainer.innerHTML


    }
    else {
        $("#anotherName").css("display", "block");
        setTimeout(function () {
            $("#anotherName").css("display", "none");
        }, 3000)
        return;
    }


    $("#addPlayerList").html("<div class='playerToAdd'>"+
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

        "</div>");

    count = 1;

    $("#addPlayer").modal("hide");

}

function updateScore(name, value, type, index) {

    var playerRow1, playerRow2;
    var player;

    for (var playerIndex = 0; playerIndex < players.length; playerIndex++) {
        if ($(".playerContainer")[0].getElementsByClassName("player")[playerIndex].getElementsByClassName("labelText")[0].innerHTML == name) {
            playerRow1 = $(".playerContainer")[0].getElementsByClassName("player")[playerIndex];
            playerRow2 = $(".playerContainer")[1].getElementsByClassName("player")[playerIndex];
            player = players[playerIndex];
            break;
        }
    }

    player.holePoints[index] = value;

    var outPoints = 0, inPoints = 0;

    for (var pointInd = 0; pointInd < player.holePoints.length; pointInd++) {
        if (pointInd) {

        }
    }

    if (index == holes.length) {

    }


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
        }, 3000);
    }

    if (previousNameExists()) {
        $("#prevName").css("display", "block");
        setTimeout(function () {
           $("#prevName").css("display", "none")
        }, 3000);
    }

    if (sameNameExists() || previousNameExists()) {
        return false;
    }

    return true;

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

    function previousNameExists() {

        for (var i = 0; i < names.length; i++) {
            for (var j = 0; j < players.length; j++) {
                if (names[i] == players[j].name) {
                    return true;
                }
            }
        }

        return false;

    }

}

function updateMeasRows(value) {

    if (value == "meters") {
        $(".meterRow").css("display", "block");
        $(".yardageRow").css("display", "none");
    }
    else if (value == "yards") {
        $(".meterRow").css("display", "none");
        $(".yardageRow").css("display", "block")
    }

}
