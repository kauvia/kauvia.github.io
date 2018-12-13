let asteroidList = {};
const mapBorder = new _gameObject(0, 0, 0, 0, 'map-background');
let isGameRunning = false;
const asteroidFields = [
    [300, 0, 500, 3500, 0, 1000],
    [300, 300, 1000, 2000, 1000, 1000],
    [300, 600, 1000, 1500, 2000, 3000],
    [300, 900, 0, 1000, 3000, 2000],
    [300, 1200, 3000, 1000, 1000, 4000],
    [300, 1500, 4000, 1000, 1500, 3000]
]
let playerName = 'Traveller';
let player;

const startGame = () => {
    playerName = prompt('What is your name?');
    player = new _player(2500, 2500, 'player', playerName, new _ship(ships[0]), [300, 300]);
    player.credits = 10000;
    playerDetailSetup();
    playerElements();
    stationElements();
    populateTradeObjects();
    isGameRunning = true;
    for (let field in asteroidFields) {
        generateAsteroids(asteroidFields[field][0], asteroidFields[field][1], asteroidFields[field][2], asteroidFields[field][3], asteroidFields[field][4], asteroidFields[field][5])
    };
    menuContainer.style.display = 'none';
    minimapStatics();
    gameTime = Date.now();
    lastTime = Date.now();
    requestAnimFrame(main);
}
const pauseGame = () => {
    isGameRunning = false;
}
const resumeGame = () => {
    isGameRunning = true;
    requestAnimFrame(main);
}
const generateAsteroids = (num, numID, x0, width, y0, height) => {
    for (let i = 0; i < num; i++) {
        let asteroid = new _asteroid(x0 + ranN(width), y0 + ranN(height), 'asteroid', `asteroid${i+numID}`, asteroids[ranN(3)], []);
        asteroid.sprite = `images/asteroid${ranN(3)+1}.png`;
        asteroidList[asteroid.id] = asteroid;
        asteroidList[asteroid.id].angle = ranN(360);
        //             asteroidList[asteroid.id].veloXY = [ranN(200)/15,ranN(200)/15];



    }
}
const leaveStation = () => {
    player.veloXY = [0, 0];
    dockedStation = null;
    resumeGame()
}

let spaceStationArray = [];
const spaceStationJilted = new _spaceStation(3500, 1500, 'station', 'Jilted', spaceStations[0]);
const spaceStationCaldera = new _spaceStation(500, 2500, 'station', 'Caldera', spaceStations[1]);
const spaceStationMinotaur = new _spaceStation(4500, 4500, 'station', 'Minotaur', spaceStations[2]);
spaceStationArray[0] = spaceStationJilted;
spaceStationArray[1] = spaceStationCaldera;
spaceStationArray[2] = spaceStationMinotaur;

// resources.onReady(startGame);

const enemyArray = [];

const generateEnemy = (array, num, type, x0, width, y0, height) => {
    for (let i = 0; i < num; i++) {
        let shipNum = 0;
        switch (type) {
            case 'pirate':
                shipNum = ranN(3) + 1;
                break;
            case 'raider':
                shipNum = ranN(2) + 2;
                break;
            case 'trader':
                shipNum = ranN(3) + 5;
                break;
            case 'police':
                shipNum = 4;
                break;
        }
        let enemy = new _enemy(x0 + ranN(width), y0 + ranN(height), type, type + num, new _ship(ships[shipNum]), []);
        enemy.angle = ranN(360);
        array.push(enemy);
    }
}
generateEnemy(pirateArray, 20, 'pirate', 0, 5000, 0, 5000);
generateEnemy(raiderArray, 10, 'raider', 0, 5000, 0, 5000);
generateEnemy(traderArray, 80, 'trader', 0, 5000, 0, 5000);
generateEnemy(policeArray, 40, 'police', 0, 5000, 0, 5000);

const findAngle = (obj1, obj2) => {
    let angle = Math.atan2(obj2.posXY[1] - obj1.posXY[1], obj2.posXY[0] - obj1.posXY[0]);
    angle = angle * 180 / Math.PI;
    angle += 90;
    if (angle < 0) {
        angle += 360;
    }
    return angle
}

const findDistance = (obj1, obj2) => {
    let distance = Math.sqrt((Math.pow(obj1.posXY[0] - obj2.posXY[0], 2)) + (Math.pow(obj1.posXY[1] - obj2.posXY[1], 2)));
    return distance;
}

const findRelativeVelocity = (obj1, obj2) => {
    let relativeVelocity = obj1.veloXY[0] - obj2.veloXY[0] + obj1.veloXY[1] - obj2.veloXY[1];
    if (relativeVelocity < 0) {
        relativeVelocity = -Math.sqrt((Math.pow(obj1.veloXY[0] - obj2.veloXY[0], 2)) + (Math.pow(obj1.veloXY[1] - obj2.veloXY[1], 2)));
    } else {
        relativeVelocity = Math.sqrt((Math.pow(obj1.veloXY[0] - obj2.veloXY[0], 2)) + (Math.pow(obj1.veloXY[1] - obj2.veloXY[1], 2)));
    }
    return relativeVelocity;
}

const saveGame = () => {
    localStorage.setItem('player', `${player.id}`);
    localStorage.setItem('credit', `${player.credits}`);
    localStorage.setItem('ship', `${player.ship.id}`);
    localStorage.setItem('karma', `${player.karma}`);
    localStorage.setItem('posX', `${player.posXY[0]}`);
    localStorage.setItem('posY', `${player.posXY[1]}`);

}

const loadGame = () => {
    let name = localStorage.getItem('player');
    let credit = parseInt(localStorage.getItem('credit'));
    let ship = parseInt(localStorage.getItem('ship'));
    let karma = parseInt(localStorage.getItem('karma'));
    let posX = parseInt(localStorage.getItem('posX'));
    let posY = parseInt(localStorage.getItem('posY'));



    player = new _player(posX, posY, 'player', name, new _ship(ships[ship]), [300, 300]);
    player.credits = credit;
    player.karma = karma;
    playerDetailSetup();
    playerElements();
    stationElements();
    populateTradeObjects();
    isGameRunning = true;
    for (let field in asteroidFields) {
        generateAsteroids(asteroidFields[field][0], asteroidFields[field][1], asteroidFields[field][2], asteroidFields[field][3], asteroidFields[field][4], asteroidFields[field][5])
    };
    menuContainer.style.display = 'none';
    minimapStatics();
    gameTime = Date.now();
    lastTime = Date.now();
    requestAnimFrame(main);
console.log(player+' '+credit+' '+ship+' '+karma)
}

const restartGame = () => {
     dockedStation = null;
 playerBulletObjArray = {};

 pirateArray = [];
 raiderArray = [];
 traderArray = [];
 policeArray = [];

 pirateBulletArray = {};
 raiderBulletArray = {};
 traderBulletArray = {};
 policeBulletArray = {};

 asteroidList = {};
 visibleAsteroids = {};
 oreList={};
 gameOverContainer.style.display='none';

    player = new _player(ranN(3000), ranN(3000), 'player', playerName, new _ship(ships[0]), [300, 300]);
 //   playerDetailSetup();
 //   playerElements();
 //   stationElements();
//    populateTradeObjects();
    isGameRunning = true;
    for (let field in asteroidFields) {
        generateAsteroids(asteroidFields[field][0], asteroidFields[field][1], asteroidFields[field][2], asteroidFields[field][3], asteroidFields[field][4], asteroidFields[field][5])
    };
    menuContainer.style.display = 'none';
  //  minimapStatics();
    gameTime = Date.now();
    lastTime = Date.now();
    requestAnimFrame(main);
}