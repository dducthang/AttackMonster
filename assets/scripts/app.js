const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let maxLife = 100;
let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;
let hasBonusLife = true;
let initialHealth;
adjustHealthBars(maxLife);

function endRound()
{
    
    if(currentPlayerHealth > 0 && currentMonsterHealth <=0 )
        alert("YOU WON!!!");
    else if(currentPlayerHealth <=0)
    {
        if(hasBonusLife)
        {
            removeBonusLife();
            alert("bonus life saved you");
            currentPlayerHealth = initialHealth;
            setPlayerHealth(initialHealth)
        }
        else if(currentMonsterHealth>0)
            alert("xxxxx YOU LOST xxxxx");
        else if(currentMonsterHealth==0)
            alert("xxxxx WE HAVE A DRAW xxxxx");
    }
    
}

function attackMode(mode)
{
    let maxDamage;

    if(mode==='ATTACK')
        maxDamage = ATTACK_VALUE
    else if(mode==='STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE
    }

    let monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamage;
    let playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    initialHealth = currentPlayerHealth;
    currentPlayerHealth -= playerDamage;
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

    increasePlayerHealth(healValue);
    currentPlayerHealth+=healValue;
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click",healHandler)