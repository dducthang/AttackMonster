const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
let maxLife = 100;
let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;
adjustHealthBars(maxLife);

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
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth > 0 && monsterDamage <=0 )
        alert("YOU WON!!!");
    else if(currentPlayerHealth <=0 && monsterDamage >0)
        alert("xxxxx YOU LOST xxxxx");
    else if(currentPlayerHealth ==0 && currentMonsterHealth == 0)
        alert("xxxxx WE HAVE A DRAW xxxxx");

}

function attackHandler()
{
    attackMode("ATTACK");
}

function strongAttackHandler()
{
    attackMode("STRONG_ATTACK");
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);