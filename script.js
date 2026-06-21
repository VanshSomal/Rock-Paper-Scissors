// Defining the score object
let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
}
updateScoreElement();
totalMatches();
// Function for play game
function playGame(playerMove){
    const computerMove=pickComputerMove();
    let result='';
    if(playerMove==='Scissors'){
        if(computerMove==='Rock'){
            result='You Lose';
        }
        else if(computerMove==='Paper'){
            result='You Win';
        }
        else if(computerMove==='Scissors'){
            result='Tie';
        }
    }
    else if(playerMove==='Paper'){
        if(computerMove==='Rock'){
            result='You Win';
        }
        else if(computerMove==='Paper'){
            result='Tie';
        }
        else if(computerMove==='Scissors'){
            result='You Lose';
        }
    }
    else if(playerMove==='Rock'){
        if(computerMove==='Paper'){
            result='You Lose';
        }
        else if(computerMove==='Rock'){
            result='Tie';
        }
        else if(computerMove==='Scissors'){
            result='You Win';
        }
    }

    if(result==='You Win'){
        score.wins++;
    }else if(result==='You Lose'){
        score.losses++;
    }else if(result==='Tie'){
        score.ties++;
    }
    // Store the score in local storage
    localStorage.setItem('score',JSON.stringify(score));
    updateScoreElement();
    totalMatches();
    document.querySelector('.js-result').innerHTML=result;

    // injecting the result inside the js-reslut
    document.querySelector('.js-moves').innerHTML=`
    <!-- Player Move Stack -->
    <div class="flex flex-col items-center gap-2">
        <img src="${moveIcons[playerMove]}" class="w-16 h-16 bg-white/10 p-3 rounded-full border border-white/20 shadow-lg">
        <span class="text-sm font-semibold uppercase tracking-wider">You</span>
    </div>
    <!-- VS Divider -->
    <div class="flex items-center justify-center">
        <span class="font-black text-2xl text-gray-400 mx-4">VS</span>
    </div>
    <!-- Computer Move Stack -->
    <div class="flex flex-col items-center gap-2">
        <img src="${moveIcons[computerMove]}" class="w-16 h-16 bg-white/10 p-3 rounded-full border border-white/20 shadow-lg">
        <span class="text-sm font-semibold uppercase tracking-wider">Computer</span>
    </div>
    `;
}



function pickComputerMove(){
    let computerMove='';
    const randomNumber=Math.random();
    if(randomNumber>=0 && randomNumber<1/3){
        computerMove='Rock';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3){
        computerMove='Paper';
    }else if(randomNumber>=2/3 && randomNumber<1){
        computerMove='Scissors';
    }
    return computerMove;
}

function totalMatches(){
    document.querySelector('.js-totalMatches').innerHTML=`Total Matches: ${score.wins+score.losses+score.ties}`;
}
function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

const moveIcons={
    'Rock':'images/rock-icon.png',
    'Paper':'images/hand-icon.png',
    'Scissors':'images/scissors-icon.png'
}
// Statement to run tailwind css
// npx @tailwindcss/cli -i ./input.css -o ./output.css --watch