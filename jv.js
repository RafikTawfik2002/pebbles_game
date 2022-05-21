
window.onload = function(){
    start();
}

var ls = [];
var count = 15;
var line = 1;
var score_player= 0;
var score_cp = 0;

function start(score = 0){
    ls = [];
    count = 15;
    line = 1;
    var remove = 3;
    for (let i = 0; i < 15; i++){
    if (i > 11) {
        ls.push(`<p onclick='remove(${remove}11)'class='circle hoo' id=p0${i}>${i}</p>`);
        remove--;        
                }
    else {ls.push("<p class='circle' id="+ "p0" + i +">"+ i +"</p>");}
    }
    ele = ls.toString();
    ele = ele.replace(/,/g, "");
    document.getElementById("line1").innerHTML = ele;
    document.getElementById("count1").innerHTML = "15 Pebbles<hr><hr>";
}



function render(sub){
    let a = ls.length;
    let turn = line%2==1;
        
    let player = turn?"CP":"YOU";

    let turn_msg = turn?"<p class=turn>Your turn</p>":"";

    if (a > 3)
    { 
        ls[a-1] = `<p onclick='remove(${1}${line}1)'class='circle hoo' </p>`;
        ls[a-2] = `<p onclick='remove(${2}${line}1)'class='circle hoo' </p>`;
        ls[a-3] = `<p onclick='remove(${3}${line}1)'class='circle hoo' </p>`;
    }
    else {
        for(let i = 0; i < a; i++){
            ls[i] = `<p class='circle' </p>`;
        }
    }

    console.log(line);
    console.log(turn);
    ele = ls.toString();
    ele = ele.replace(/,/g, "");
    document.getElementById(`line1`).innerHTML = ele;
    
 

    document.getElementById(`count1`).innerHTML = `${player} took ${sub}<br><span>${ls.length} Pebbles Left</span><hr><hr>`;
    console.log(ls);
    console.log(line);
    if (a <=3){winner(turn);return;}
    if(!turn){computer_turn();}
}
 

function remove(a){
    a = a.toString();
    if (line > 1 && line%2==0 && a[2] == "1") {return;};
    let curr_line = Number(a[1]);
    let curr_delt = Number(a[0]);

    if (curr_line < line) {alert("invalid"); return;}
    // alert(`remove: ${a[0]} Line: ${a[1]}`);
    line +=1;
    count -= curr_delt;
    for (let i = 0; i < curr_delt; i++){
        ls.pop();
    }
    render(curr_delt);
}


function computer_turn(){
    setTimeout(function () {
        let num;
        let left = ls.length;
        switch (left){
            case 12:
            case 8: 
                num = getRandomInt(2);
                break;
            case 4:
                num = getRandomInt(3);
                break;
            case 11:
            case 7:
                num = 3;
                break;
            case 14:
            case 10:
            case 6:
                num = 2;
                break;
            case 13:
            case 9:
            case 5:
                num = 1;
                break;

        }

        remove(`${num}${line}0`);
    }, 2000);
}


function winner(turn){
    document.getElementById(`count1`).innerHTML += turn?"<p class='win'>You Win 😁</p>":"<p class='win'>You Lose 😭</p>";
    let lose = "Opponent has 3 or fewer left, meaning they can clear the table!";
    let win = "You have 3 or fewer left, meaning you can clear the table!";
    document.getElementById(`count2`).innerHTML += turn?win:lose;
    turn?score_player++:score_cp++;
    document.getElementById(`score`).innerHTML = `YOU: ${score_player} - CP: ${score_cp}`;
    setTimeout( function() {document.getElementById(`again`).innerHTML =
         "<button onclick='play_again()' class='again'>Play Again ?!</button>";}, 1500);

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }



function play_again(){
    document.getElementById(`count1`).innerHTML = '';
    document.getElementById(`count2`).innerHTML = '';
    document.getElementById(`again`).innerHTML = '';
    start();

}






