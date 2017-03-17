
var players = [];
var count = 1;
// Add a Player Object and make the context like this: {name: value of text, score: sum of score}

function addPlayerToAdd() {

    var modalAddtoAddList = document.getElementById("addPlayerList");
    var inputList = modalAddtoAddList.getElementsByTagName("input");
    var names = [];

    for (var i = 0; i < inputList.length; i++) {
        names.push(inputList[i].value)
    }

    modalAddtoAddList.innerHTML += "<div id='playerAdding"+count+"' class='playerToAdd'>" +

        "<label>Add New Player:</label><input type='text' name='addPlayer'><span><a href='#' class='modalRemove glyphicon glyphicon-remove' onclick='removePlayerToAdd(" + count+ ")'></a></span>"+

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
            players.push(name);
        }

    }

    var playerList1 = document.querySelectorAll(".playerList table tbody")[0], playerList2 = document.querySelectorAll(".playerList table tbody")[1];
    var totalTable = document.getElementById("totalTable");
    playerList1.innerHTML = "";
    playerList2.innerHTML = "";
    totalTable.opacity = "1";
    var totalHead = document.getElementById("playerTotalHead");
    var totalBody = document.getElementById("playerTotalBody");
    totalHead.innerHTML = "";
    totalBody.innerHTML = "";
    generateHTML();
    for (var i = 0; i < players.length; i++) {
        playerList1.innerHTML += "<tr class='player'>" +
            "<td> " + players[i] +
            "</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "</tr>";
        playerList2.innerHTML += "<tr class='player'>" +
            "<td> " + players[i] +
            "</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "<td>0</td>" +
            "</tr>";
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