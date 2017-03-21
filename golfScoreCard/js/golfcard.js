
var players = [];
var count = 1;
// Add a Player Object and make the context like this: {name: value of text, score: sum of score}

function Player(name, teeType) {
    this.name = name;
    this.score = 0;
    this.teeType = teeType;

}

function addPlayerToAdd() {

    var modalAddtoAddList = document.getElementById("addPlayerList");
    var inputList = modalAddtoAddList.getElementsByTagName("input");
    var names = [];

    for (var i = 0; i < inputList.length; i++) {
        names.push(inputList[i].value)
    }

    modalAddtoAddList.innerHTML += "<div id='playerAdding"+count+"' class='playerToAdd'>" +

        "<label>Add New Player:</label><input type='text' name='addPlayer'>"+
        "<span> <select class='teeType'></select>"+
        "<a href='#' class='modalRemove glyphicon glyphicon-remove' onclick='removePlayerToAdd(" + count+ ")'></a></span>"+

        "</div>"

    for (var i = 0; i < inputList.length - 1; i++) {
        inputList[i].value = names[i];
    }

    count++;

}

function removePlayerToAdd(index) {

    var element = document.getElementById("playerAdding"+index);
    var addList = document.getElementById("addPlayerList");
    var playerToAdd = document.getElementsByClassName("playerToAdd");
    var names = [];
    var idList = [];
    var toDelete = element.id;
    var inputList = document.getElementById("addPlayerList").getElementsByTagName("input");

    for (var i = 0; i < playerToAdd.length; i++) {
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

    for (var i = 0; i < elements.length; i++) {

        var name = elements[i].getElementsByTagName("input")[0].value;
        if (name != ""){
            var player = new Player();
            players.push(name);
        }

    }

    var playerList1 = document.querySelectorAll("div.playerContainer")[0], playerList2 = document.querySelectorAll("div.playerContainer")[1];
    var totalTable = document.getElementById("totalTable");
    playerList1.innerHTML = "";
    playerList2.innerHTML = "";
    generateHTML();
    //Make lines less complicated, add player rows then later add the players.
    var numPlayer = 1;
    for (var i = 0; i < players.length; i++) {
        playerList1.innerHTML += "<div class='player'></div>"
        playerList2.innerHTML += "<div class='player'></div>"
    }

    var addPlayerList = document.getElementById("addPlayerList");
    addPlayerList.innerHTML = "<div class='playerToAdd'>" +
        "<label>Add New Player</label> <input type='text' name='addPlayer'>" +
        "</div>";
    count = 0;

    function generateHTML() {

        var headHTML = "", bodyHTML = "";
        headHTML += "<tr>";
        bodyHTML += "<tr>";
        for (var i = 0; i < players.length; i++){
            headHTML += "<td>" + players[i] + "</td>";
            bodyHTML += "<td>0</td>";
        }
        headHTML += "</tr>";
        bodyHTML += "</tr>";
        totalHead.innerHTML += headHTML;
        totalBody.innerHTML += bodyHTML;

    }


}