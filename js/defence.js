class Def {
  constructor(name, hp, shield, power, cost, rapidFire) {
    this.name = name;
    this.baseHp = hp;
    this.hp = hp;
    this.baseShield = shield;
    this.shield = shield;
    this.basePower = power;
    this.power = power;
    this.cost = cost;
    this.rapidFire = rapidFire;
    this.pic = `./img/def/${this.name.replace(/\s+/g, '_').toLowerCase()}.jpg`;
  }
}


let rocketLauncher = new Def('Rocket Launcher', 200, 20, 80, { metal: 2000, crystal: 0, deuter: 0 });
let lightLaser = new Def('Light Laser', 200, 25, 100, { metal: 1500, crystal: 500, deuter: 0 });
let heavyLaser = new Def('Heavy Laser', 800, 100, 250, { metal: 6000, crystal: 2000, deuter: 0 });
let ionCannon = new Def('Ion Cannon', 800, 500, 150, { metal: 5000, crystal: 3000, deuter: 0 });
let gaussCannon = new Def('Gauss Cannon', 3500, 200, 1100, { metal: 20000, crystal: 15000, deuter: 2000 });
let plasmaCannon = new Def('Plasma Cannon', 10000, 300, 3000, { metal: 50000, crystal: 50000, deuter: 3000 });
let smallShield = new Def('Small Shield Dome', 2000, 2000, 1, { metal: 10000, crystal: 10000, deuter: 0 });
let largeShield = new Def('Large Shield Dome', 10000, 10000, 1, { metal: 50000, crystal: 50000, deuter: 0 });


const _defence = {      //        -name-          -hp-   -shld-  -pow-    -cost-                                        -rapidFire-
  rocketLauncher  : new Def('Rocket Launcher',    200,    20,     80,   { metal: 2000, crystal: 0, deuter: 0 },         {to: [],                                  from: [{ target: "Cruiser", chance: 90 }, { target: "Bomber", chance: 95 }, { target: "Deathstar", chance: 99.5 }]}),
  lightLaser      : new Def('Light Laser',        200,    25,     100,  { metal: 1500, crystal: 500, deuter: 0 },       {to: [],                                  from: [{ target: "Bomber", chance: 95 }, { target: "Destroyer", chance: 90 }, { target: "Deathstar", chance: 99.5 }]}),
  heavyLaser      : new Def('Heavy Laser',        800,    100,    250,  { metal: 6000, crystal: 2000, deuter: 0 },      {to: [],                                  from: [{ target: "Bomber", chance: 90 }, { target: "Deathstar", chance: 99 }]}),
  ionCannon       : new Def('Ion Cannon',         800,    500,    150,  { metal: 5000, crystal: 3000, deuter: 0 },      {to: [{ target: "Reaper", chance: 50 }],  from: [{ target: "Bomber", chance: 90 }, { target: "Deathstar", chance: 99 }]}),
  gaussCannon     : new Def('Gauss Cannon',       3500,   200,    1100, { metal: 20000, crystal: 15000, deuter: 2000 }, {to: [],                                  from: [{ target: "Bomber", chance: 80 }, { target: "Deathstar", chance: 98 }]}),
  plasmaCannon    : new Def('Plasma Cannon',      10000,  300,    3000, { metal: 50000, crystal: 50000, deuter: 3000 }, {to: [],                                  from: [{ target: "Bomber", chance: 80 }]}),
  smallShield     : new Def('Small Shield Dome',  2000,   2000,   1,    { metal: 10000, crystal: 10000, deuter: 0 },    {to: [],                                  from: []}),
  largeShield     : new Def('Large Shield Dome',  10000,  10000,  1,    { metal: 50000, crystal: 50000, deuter: 0 },    {to: [],                                  from: []})
}

// let defence = [rocketLauncher,lightLaser,heavyLaser,ionCannon,gaussCannon,plasmaCannon,smallShield,largeShield];