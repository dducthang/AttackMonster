const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_GAME_OVER = 'GAME_OVER';


const enteredNumber = prompt("Maximum life for you and the monster", "100");
let maxLife = parseInt(enteredNumber);

if(isNaN(maxLife)||maxLife<=0)
    maxLife = 100;

let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;
let hasBonusLife = true;
let initialHealth;
let battleLog =[];

adjustHealthBars(maxLife);

function writeToLog(ev, val, playerHealth , monsterHealth, target)
{
    let entry= {
        event: ev,
        value: val,
        target: target,
        finalPlayerHealth:playerHealth,
        finalMonsterHealth: monsterHealth
    };
    battleLog.push(entry);
}

function showLog()
{
    console.log(battleLog);
}

function reset()
{
    currentMonsterHealth=maxLife;
    currentPlayerHealth=maxLife;
    hasBonusLife=true;
    resetGame(maxLife);
}

function endRound()
{
    
    if(currentPlayerHealth > 0 && currentMonsterHealth <=0 )
    {
        alert("YOU WON!!!");
        writeToLog(LOG_GAME_OVER, 'PLAYER WON', currentPlayerHealth, currentMonsterHealth,'');
    }
         else if(currentPlayerHealth <=0)
    {
        if(hasBonusLife)
        {
            removeBonusLife();
            hasBonusLife=false;
            alert("bonus life saved you");
            currentPlayerHealth = initialHealth;
            setPlayerHealth(initialHealth)
        }
        else if(currentMonsterHealth>0)
        {
            alert("xxxxx YOU LOST xxxxx");
            writeToLog(LOG_GAME_OVER, 'MONSTER WON', currentPlayerHealth, currentMonsterHealth, '');
        }
        else if(currentMonsterHealth<=0)
        {
            alert("xxxxx WE HAVE A DRAW xxxxx");
            writeToLog(LOG_GAME_OVER, 'A DRAW', currentPlayerHealth, currentMonsterHealth, '');                
        }
            
    }
    
    if(currentMonsterHealth<=0||currentPlayerHealth<=0){
        reset();
    }
}

function attackMode(mode)
{
    let maxDamage;
    let logAttack;
    if(mode==='ATTACK')
    {
        maxDamage = ATTACK_VALUE;
        logAttack = LOG_PLAYER_ATTACK;
    }
    else if(mode==='STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE;
        logAttack=LOG_PLAYER_STRONG_ATTACK;
    }

    let monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamage;
    writeToLog(logAttack, monsterDamage, currentPlayerHealth, currentMonsterHealth, 'MONSTER');
    let playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    initialHealth = currentPlayerHealth;
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_MONSTER_ATTACK, playerDamage, currentPlayerHealth, currentMonsterHealth, 'PLAYER');
    endRound();
}

function attackHandler()
{
    attackMode("ATTACK");
}

function strongAttackHandler()
{
    attackMode("STRONG_ATTACK");
}

function healHandler()
{
    let healValue;
    if(currentPlayerHealth>= maxLife-HEAL_VALUE)
        healValue =maxLife-currentPlayerHealth;
    else
        healValue= HEAL_VALUE;
    writeToLog(LOG_PLAYER_HEAL, healValue, currentPlayerHealth, currentMonsterHealth, '');
    increasePlayerHealth(healValue);
    currentPlayerHealth+=healValue;
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click",healHandler);
logBtn.addEventListener('click', showLog);