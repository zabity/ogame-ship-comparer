/*
TODO

ships/def
ui
  - 2x formulaż z galerii klikalnych obrazków
  - 2x foto wybrańca
  - 2x tabele z danymi/wynikami wybrańców

(
  techy alienów pod uwagę wziąć
  
)

  'hp',
  'shield',
  'power',
  'speed',
  'fuel',
  'capacity',
  'metal',
  'crystal',
  'deuter'

  'shield left',
  'hp left',
  'explosion chance',
  'to trigger explosion',
  'shots to kill',
  
  'rapid fire',
  'shots fired',
  
  



*/

// let selects = [...form.children];



// object holding all the ships and defence
const _units = deepMergeObjects(_ships, _defence);

// add an update function to each unit to handle tech changes
for (const [keyName,unit] of Object.entries(_units)){
  unit.update = (tech, value) => {

    console.log('updating.. ' + tech + ' : ' + value)

    // handle turrets - no drive
    if(!unit.drive){
      console.log(' no drive')
      if(tech === "combustionDrive" || tech === "impulseDrive" || tech === "hyperspaceDrive"){
        return;
      }
    }

    // handle drive update on small cargo
    if (tech === "impulseDrive" && value >= 5 && unit.name === "Small Cargo"){
      unit.drive = "impulseDrive";
      console.log(unit.name + " = " + unit.drive)
    } else if (tech === "impulseDrive" && value < 5 && unit.name === "Small Cargo"){
      unit.drive = "combustionDrive";
    }

    // handle drive update on recycler
    if (tech === "impulseDrive" && value >= 17 && unit.name === "Recycler" && unit.drive != "hyperspaceDrive"){
      unit.drive = "impulseDrive";
    } else if (tech === "impulseDrive" && value < 17 && unit.name === "Recycler"){
      unit.drive = "combustionDrive";
    }

    // handle drive update on bomber
    if (tech === "hyperspaceDrive" && value >= 8 && unit.name === "Bomber"){
      unit.drive = "hyperspaceDrive";
    } else if (tech === "hyperspaceDrive" && value < 8 && unit.name === "Bomber"){
      unit.drive = "impulseDrive";
    }

    // handle hyper drive update on recycler
    if (tech === "hyperspaceDrive" && value >= 15 && unit.name === "Recycler"){
      unit.drive = "hyperspaceDrive";
    } else if (tech === "hyperspaceDrive" && value < 15 && unit.name === "Recycler"){
      unit.drive = "combustionDrive"; /////////////////////////////////////////
    }

      

    switch (tech) {
      case 'weapon':
        unit.power = unit.basePower + (value * 0.1 * unit.basePower);
        break;
      case 'armour':
        unit.hp = unit.baseHp + (value * 0.1 * unit.baseHp);
        break;
      case 'shielding':
        unit.shield = unit.baseShield + (value * 0.1 * unit.baseShield);
        break;
      case 'combustionDrive':
        if(unit.drive === 'combustionDrive'){
          unit.speed = unit.baseSpeed + (value * 0.1 * unit.baseSpeed);
        }
        break;
      case 'impulseDrive':
        if(unit.drive === 'impulseDrive'){
          unit.speed = unit.baseSpeed + (value * 0.1 * unit.baseSpeed);
        }
        break;
      case 'hyperspaceDrive':
        if(unit.drive === 'hyperspaceDrive'){
          unit.speed = unit.baseSpeed + (value * 0.1 * unit.baseSpeed);
        }
        break;
    }
  }
}

// forms (stats, drives, techs, etc.)
const _forms = [...document.querySelectorAll('form.player-form')];

// tile area container to populate with ship/def tiles
const _tileArea = document.getElementsByClassName("tile-area");

// photos of chosen units
const _photo1 = document.querySelector('#player_one .results-picture img');
const _photo2 = document.querySelector('#player_two .results-picture img');

// two result sheets for each player
const _sheets = [...document.querySelectorAll('.results-sheet')];


// stat names array to populate results table with
const pContent = [
  'hp',
  'shield',
  'power',
  'speed',
  'fuel',
  'capacity',
  'metal',
  'crystal',
  'deuter',

  'shield left',
  'hp left',
  'explosion chance',
  'to trigger explosion',
  'shots to kill',

  'rapid fire',
  'shots fired',

  'rapid fire to:'
]


// players
const _player1 = {
  unit: undefined,
  count: 0,
  tech: {}
}

const _player2 = {
  unit: undefined,
  count: 0,
  tech: {}
}


// populate tile-area with tiles
for (let i = 0; i < 2; i++) {
  for (const [key, value] of Object.entries(_ships)) {
    let tile = document.createElement('img');
    tile.classList.add('tile');
    tile.classList.add(`player-${i + 1}-tile`);
    tile.setAttribute('src', value.pic);
    tile.dataset.name = key;

    _tileArea[i].appendChild(tile);
  }

  for (const [key, value] of Object.entries(_defence)) {
    let tile = document.createElement('img');
    tile.classList.add('tile');
    tile.classList.add(`player-${i + 1}-tile`);
    tile.setAttribute('src', value.pic);
    tile.dataset.name = key;

    _tileArea[i].appendChild(tile);
  }
}


// populate sheets with stat names
_sheets.forEach(sheet => {
  let nameSpace = sheet.querySelector('.stat-names');
  let valueSpace = sheet.querySelector('.stat-values');;

  pContent.forEach(thing => {
    let p = document.createElement('p');
    p.innerHTML = thing;

    let emptyP = document.createElement('p');

    nameSpace.appendChild(p);
    valueSpace.appendChild(emptyP);
  })
});


_tileArea[0].addEventListener('click', handleTileClick);
_tileArea[1].addEventListener('click', handleTileClick);


// assign player unit per tile click
function handleTileClick(e) {
  let unitName = e.target.dataset.name;
  let unit = _units[unitName];

  console.log(unit);  //...

  if (e.target.parentElement.parentElement.parentElement.parentElement.id === "player_one") {
    _player1.unit = unit;
    console.log(_player1.unit)
    _photo1.src = unit.pic;
    _photo1.style.visibility = 'visible';
  } else {
    _player2.unit = unit;
    _photo2.src = unit.pic;
    _photo2.style.visibility = 'visible';
  }

  if (_player1.unit != undefined && _player2.unit != undefined) {
    showResult(e);
  }
}



// deep merge two objects
function deepMergeObjects(target, source) {
  const targetCopy = JSON.parse(JSON.stringify(target)); // Create a deep copy of the target

  for (const key in source) {
    if (Array.isArray(source[key])) {
      // If the source value is an array, replace the target value with the source array
      targetCopy[key] = Array.isArray(targetCopy[key])
        ? [...targetCopy[key], ...source[key]] // Merge arrays if both sides are arrays
        : [...source[key]]; // Otherwise, just copy the source array
    } else if (source[key] instanceof Object) {
      // Recursively merge objects
      targetCopy[key] = deepMergeObjects(targetCopy[key] || {}, source[key]);
    } else {
      // For primitive values, directly assign the source value
      targetCopy[key] = source[key];
    }
  }

  return targetCopy;
}

// deep copy object
function deepCloneWithFunctions(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // Return null or primitive values
  }

  // Check if `structuredClone` is available and try to use it
  let clone;
  try {
    clone = structuredClone(obj);
  } catch (e) {
    clone = Array.isArray(obj) ? [] : {};
  }

  // Iterate through all keys and handle functions explicitly
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "function") {
        // Copy the function reference as-is
        clone[key] = obj[key];
      } else if (typeof obj[key] === "object") {
        // Recursively deep clone objects and arrays
        clone[key] = deepCloneWithFunctions(obj[key]);
      } else {
        // Directly copy primitive values
        clone[key] = obj[key];
      }
    }
  }

  return clone;
}


function showPlayerResult(unit1, unit2, parafs) {

  /*
    mamy unit1 i unit2
    power * weapon
    hp * armour
    shield * shielding
    etc
    trzeba sprawdzić kto jest ojcem
    jego tech -> dana technologia++
  */

  // update stats with tech levels
  // unit1.power = unit1.basePower + (unit1.owner.tech.weapon * 0.1 * unit1.basePower);
  // unit1.hp = unit1.baseHp + (unit1.owner.tech.armour * 0.1 * unit1.baseHp);
  // unit1.shield = unit1.baseShield + (unit1.owner.tech.shielding * 0.1 * unit1.baseShield);

  let hpLeft = (unit2.power > unit1.shield) ? (unit1.hp - (unit2.power - unit1.shield)) : unit1.hp;
  let shieldLeft = unit1.shield - unit2.power;
  let explosionChance = 1 - hpLeft / unit1.hp;
  let explode = false;
  let shotsToKill = unit2.hp + unit2.shield <= unit1.power ? 1 : (unit2.hp + unit2.shield) / unit1.power;
  let shotsToTriggerExplo = unit2.hp * .3 + unit2.shield <= unit1.power ? 1 : (unit2.hp * .3 + unit2.shield) / unit1.power;

  // round shots to two decimals
  if (!Number.isInteger(shotsToKill)) {
    shotsToKill = parseFloat(shotsToKill.toFixed(2));
  }
  if (!Number.isInteger(shotsToTriggerExplo)) {
    shotsToTriggerExplo = parseFloat(shotsToTriggerExplo.toFixed(2));
  }

  // explosion check
  if (hpLeft / unit1.hp <= .7) {
    let chance = Math.random();
    if (chance <= explosionChance) {
      explode = true;
    }
  }

  // basic stats:
  /**
  (0) 'hp',
  (1) 'shield',
  (2) 'power',
  (3) 'speed',
  (4) 'fuel',
  (5) 'capacity',
  (6) 'metal',
  (7) 'crystal',
  (8) 'deuter'

  (9) 'shield left',
  (10) 'hp left',
  (11) 'explosion chance',
  (12) 'to trigger explosion',
  (13) 'shots to kill',
  
  (14) 'rapid fire',
  (15) 'shots fired',
   */

  // hp //
  parafs[0].innerHTML = unit1.hp + " base: " + unit1.baseHp;

  // shield //
  parafs[1].innerHTML = unit1.shield;

  // power //
  parafs[2].innerHTML = unit1.power;

  // speed //
  parafs[3].innerHTML = unit1.speed ? unit1.speed : '-';

  // if both units have speed compare speeds
  if (unit1.speed && unit2.speed) {
    let speedDifference = unit1.speed > unit2.speed ? (unit1.speed - unit2.speed) + " +" : '';
    if (speedDifference != '') {
      let fasterTag = document.createElement('span');
      fasterTag.classList.add('winnerTag');
      fasterTag.innerHTML = speedDifference;
      fasterTag.style.color = 'green';
      parafs[3].appendChild(fasterTag);
    }
  }

  // fuel consumption //
  parafs[4].innerHTML = unit1.fuel ? unit1.fuel : '-';

  // capacity //
  parafs[5].innerHTML = unit1.capacity ? unit1.capacity : '-';

  // if both units have capacity compare capacity
  if (unit1.capacity && unit2.capacity) {
    let capDifference = unit1.capacity > unit2.capacity ? (unit1.capacity - unit2.capacity) + " +" : '';

    if (capDifference != '') {
      let fasterTag = document.createElement('span');
      fasterTag.classList.add('winnerTag');
      fasterTag.innerHTML = capDifference;
      fasterTag.style.color = 'green';
      parafs[5].appendChild(fasterTag);
    }
  }

  // cost //
  parafs[6].innerHTML = unit1.cost.metal;
  parafs[7].innerHTML = unit1.cost.crystal;
  parafs[8].innerHTML = unit1.cost.deuter;

  // shield left //
  parafs[9].innerHTML = shieldLeft;
  parafs[9].style.color = shieldLeft < 0 ? 'red' : 'green';

  // hp left / explode? //
  parafs[10].innerHTML = explode ? 'explode' : hpLeft;
  parafs[10].style.color = (explode === true || hpLeft < 0) ? 'red' : 'green';

  // explosion chance //
  parafs[11].innerHTML = hpLeft / unit1.hp <= .7 ? (explosionChance * 100).toFixed(2) + '%' : 0;

  // shots to trigger explosion chance //
  parafs[12].innerHTML = shotsToTriggerExplo;

  // shots  to kill //
  parafs[13].innerHTML = shotsToKill;

  // rapid fire //
  let rapidFireValue = '-';

  if (unit1.rapidFire.to.length > 0) {
    for (let i = 0; i < unit1.rapidFire.to.length; i++) {
      if (unit1.rapidFire.to[i].target === unit2.name) {
        rapidFireValue = unit1.rapidFire.to[i].chance;
        break;
      }
    }
  }

  // rapidfire rate
  parafs[14].innerHTML = rapidFireValue;

  // rapid fire simulation
  if (rapidFireValue != '-') {
    let shotsFired = 1;
    let nextShot = true;

    while (nextShot) {
      let nextShotChance = Math.random() * 100;

      if (nextShotChance < rapidFireValue) {
        shotsFired++;
      } else {
        nextShot = false;
      }
    }

    // amount of rapidFire shots
    parafs[15].innerHTML = shotsFired;
  }

  // list rapid fire targets
  if (unit1.rapidFire.to.length > 0) {
    let rapidFireTargets = [];
    for (let i = 0; i < unit1.rapidFire.to.length; i++) {
      let p = document.createElement('p');
      p.innerHTML = unit1.rapidFire.to[i].target;
      parafs[16].appendChild(p);
    }
  }

  


}


// display all results for each player's sheet
function showResult(e) {

  if(e){
    e.preventDefault();
  }

  _sheets.forEach((sheet, index) => {

    let valueSpace = sheet.querySelector('.stat-values');
    let parafs = [...valueSpace.children];

    parafs.forEach(p => {
      p.innerHTML = '';
    })

    if (index === 0) {  // player 1 sheet
      showPlayerResult(_player1.unit, _player2.unit, parafs);

    } else {            // player 2 sheet
      showPlayerResult(_player2.unit, _player1.unit, parafs);
    }
  })
}


// handle player form
_forms.forEach(form => {
  form.addEventListener('change', gatherForms)
})

function gatherForms(event) {
  console.log('elo')

  let player = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
  let value = parseInt(event.target.value);
  let techName = event.target.name;



  if (player === 'player_one') {
    _player1.tech[techName] = value;
    _player1.unit.update(techName, value);
    showResult();
  } else {
    _player2.tech[techName] = value;
    _player2.unit.update(techName, value);
    showResult();
  }






}






