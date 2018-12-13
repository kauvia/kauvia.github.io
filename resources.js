const bullets = [{
    name: 'pea-shooter-bullet',
    img: 'images/bullet1.png',
    width: 5,
    height: 5,
    damage: 50,
}, {
    name: 'dumbfire-rocket',
    img: 'images/rocket1.png',
    width: 14,
    height: 14,
    damage: 100,
}, {
    name: 'homing-missile',
    img: 'images/missile1.png',
    width: 20,
    height: 20,
    damage: 50,
}, {
    name: 'c-beam',
    img: 'images/beam1.png',
    width: 3,
    height: 200,
    damage: 10,
}]
const weapons = [{
    name: 'Pea shooter',
    img: 'images/bullet1.png',
    id:0,
    bullet: bullets[0],
    bulletVelocity: 600,
    rateOfFire: 500,
    energyUsage: 50,
    value: 1000,
    dissipation:2000,

}, {
    name: 'Rocket launcher',
    img: 'images/rocket1.png',
    id:1,
    bullet: bullets[1],
    bulletVelocity: 400,
    rateOfFire: 300,
    energyUsage: 100,
    value: 1000,
    dissipation: 5000,
}, {
    name: 'F&F missile launcher',
    img: 'images/missile1.png',
    id:2,
    bullet: bullets[2],
    bulletVelocity: 350,
    rateOfFire: 500,
    energyUsage: 100,
    value: 1000,
    dissipation: 10000,

}, {
    name: 'C-beam',
    img: 'images/beam1.png',
    id:3,
    bullet: bullets[3],
    bulletVelocity: 2000,
    rateOfFire: 200,
    energyUsage: 30,
    value: 1000,
    dissipation: 80,
}]

const ships = [{
    name: 'Mercury',
    img: 'images/ship1.png',
    id: 0,
    width: 30,
    height: 30,
    maxSpeed: 200,
    accel: 400,
    energy: 100,
    maxEnergy: 100,
    shield: 200,
    maxShield: 200,
    hull: 200,
    maxHull: 200,
    maxWeaponHardpoints: 2,
    weaponHardpoints: [weapons[0]],
    maxCargo: 10,
    cargo: [],
    value: 1000,

}, {
    name: 'Venus',
    img: 'images/ship2.png',
    id: 1,
    width: 30,
    height: 30,
    maxSpeed: 200,
    accel: 400,
    energy: 100,
    maxEnergy: 100,
    shield: 200,
    maxShield: 200,
    hull: 200,
    maxHull: 200,
    maxWeaponHardpoints: 2,
    weaponHardpoints: [weapons[0]],
    maxCargo: 15,
    cargo: [],
    value: 1000,

}, {
    name: 'Mars',
    img: 'images/ship3.png',
    id: 2,
    width: 30,
    height: 30,
    maxSpeed: 200,
    accel: 400,
    energy: 100,
    maxEnergy: 100,
    shield: 200,
    maxShield: 200,
    hull: 200,
    maxHull: 200,
    maxWeaponHardpoints: 2,
    weaponHardpoints: [weapons[0]],
    maxCargo: 15,
    cargo: [],
    value: 1000,
}, {
    name: 'Jupiter',
    img: 'images/ship4.png',
    id: 3,
    width: 30,
    height: 30,
    maxSpeed: 200,
    accel: 400,
    energy: 100,
    maxEnergy: 100,
    shield: 200,
    maxShield: 200,
    hull: 200,
    maxHull: 200,
    maxWeaponHardpoints: 2,
    weaponHardpoints: [weapons[0]],
    maxCargo: 15,
    cargo: [],
    value: 1000,

}, {
    name: 'Saturn',
    img: 'images/ship5.png',
    id: 4,
    width: 30,
    height: 30,
    maxSpeed: 250,
    accel: 500,
    energy: 100,
    maxEnergy: 100,
    shield: 200,
    maxShield: 200,
    hull: 200,
    maxHull: 200,
    maxWeaponHardpoints: 2,
    weaponHardpoints: [weapons[0]],
    maxCargo: 10,
    cargo: [],
    value: 1000,

}, {
    name: 'Uranus',
    img: 'images/ship6.png',
    id: 5,
    width: 30,
    height: 30,
    maxSpeed: 150,
    accel: 300,
    energy: 100,
    maxEnergy: 100,
    shield: 200,
    maxShield: 200,
    hull: 200,
    maxHull: 200,
    maxWeaponHardpoints: 1,
    weaponHardpoints: [weapons[0]],
    maxCargo: 30,
    cargo: [],
    value: 1000,

}, {
    name: 'Neptune',
    img: 'images/ship7.png',
    id: 6,
    width: 32,
    height: 32,
    maxSpeed: 150,
    accel: 300,
    energy: 100,
    maxEnergy: 100,
    shield: 200,
    maxShield: 200,
    hull: 200,
    maxHull: 200,
    maxWeaponHardpoints: 1,
    weaponHardpoints: [weapons[0]],
    maxCargo: 30,
    cargo: [],
    value: 1000,

}, {
    name: 'Pluto',
    img: 'images/ship8.png',
    id: 7,
    width: 26,
    height: 32,
    maxSpeed: 150,
    accel: 300,
    energy: 100,
    maxEnergy: 100,
    shield: 200,
    maxShield: 200,
    hull: 200,
    maxHull: 200,
    maxWeaponHardpoints: 1,
    weaponHardpoints: [weapons[0]],
    maxCargo: 30,
    cargo: [],
    value: 1000,

}]
const ores = [{
    index: 0,
    name: 'iron',
    img: 'images/ironore.png',
    width: 15,
    height: 15,
    value: 100,
}, {
    index: 1,
    name: 'copper',
    img: 'images/copperore.png',
    width: 13,
    height: 13,
    value: 150,
}, {
    index: 2,
    name: 'uranium',
    img: 'images/uraniumore.png',
    width: 15,
    height: 15,
    value: 250,
}, {
    index: 3,
    name: 'gold',
    img: 'images/goldore.png',
    width: 15,
    height: 15,
    value: 450,
}]
const asteroids = [{
    name: 'ferrous',
    img: `images/asteroid1.png`,
    width: 29,
    height: 29,
    shield: 0,
    hull: 100,
    ores: [ores[0], ores[0], ores[1]]
}, {
    name: 'radioactive',
    img: `images/asteroid2.png`,
    width: 29,
    height: 29,
    shield: 0,
    hull: 100,
    ores: [ores[1], ores[2], ores[2]]
}, {
    name: 'precious',
    img: `images/asteroid3.png`,
    width: 29,
    height: 29,
    shield: 0,
    hull: 100,
    ores: [ores[2], ores[3], ores[3]]
}]

const spaceStations = [{
    name: 'Jilted',
    mapImg: 'images/station1.png',
    img: 'images/station1.png',
    width: 256,
    height: 256,

}, {
    name: 'Caldera',
    mapImg: 'images/station1.png',
    img: 'images/station1.png',
    width: 256,
    height: 256,

}, {
    name: 'Minotaur',
    mapImg: 'images/skullcross.png',
    img: 'images/station1.png',
    width: 256,
    height: 256,

}]

let resourceCache = {};
let loading = [];
let readyCallbacks = [];

const load = (urls) => {
    if (urls instanceof Array) {
        urls.forEach(function (url) {
            _load(url)
        })
    } else {
        _load(urls)
    }
}

const _load = (url) => {


    if (resourceCache[url]) {
        return resourceCache[url]
    } else {
        let img = new Image();
        img.onload = () => {
            resourceCache[url] = img;

            if (isReady()) {
                readyCallbacks.forEach(function (func) {
                    func();
                })
            }
        }
        resourceCache[url] = false;
        img.src = url;
    }
}

const get = (url) => {
    return resourceCache[url]
}
const isReady = () => {
    let ready = true;
    for (let item in resourceCache) {
        if (resourceCache.hasOwnProperty(item) &&
            !resourceCache[item]) {
            ready = false;
        }
    }
    return ready;
}

const onReady = (func) => {
    readyCallbacks.push(func);
}
window.resources = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
}

window.resources.load([
    'images/asteroid1.png',
    'images/asteroid2.png',
    'images/asteroid3.png',
    'images/bullet1.png',
    'images/rocket1.png',
    'images/missile1.png',
    'images/beam1.png',
    'images/copperore.png',
    'images/ironore.png',
    'images/uraniumore.png',
    'images/goldore.png',
    'images/station1.png'
])

for (let ship in ships) {
    window.resources.load(ships[ship].img)
}