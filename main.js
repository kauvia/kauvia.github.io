const ranN = (num) => Math.floor(Math.random() * num); //return random number from 0-num
const toRad = (angleInDegree) => angleInDegree * Math.PI / 180;
const gameContainer = document.getElementById('container');

let dockedStation = null;
let playerBulletObjArray = {};

let pirateArray = [];
let raiderArray = [];
let traderArray = [];
let policeArray = [];

let pirateBulletArray = {};
let raiderBulletArray = {};
let traderBulletArray = {};
let policeBulletArray = {};



class _ship {
    constructor(ship) {
        this.name = ship.name;
        this.img = ship.img;
        this.id = ship.id;
        this.width = ship.width;
        this.height = ship.height;
        this.maxSpeed = ship.maxSpeed;
        this.accel = ship.accel;
        this.energy = ship.energy;
        this.maxEnergy = ship.maxEnergy;
        this.shield = ship.shield;
        this.maxShield = ship.maxShield;
        this.hull = ship.hull;
        this.maxHull = ship.maxHull;
        this.maxWeaponHardpoints = ship.maxWeaponHardpoints;
        this.weaponHardpoints = ship.weaponHardpoints;
        this.maxCargo = ship.maxCargo;
        this.cargo = ship.cargo;
        this.value = ship.value;
    }
}


class _gameObject {
    constructor(posX, posY, type, id, sprite, dispXY = [0, 0], veloXY = [0, 0], angle = 0) {
        this.posXY = [posX, posY];

        this.type = type;
        this.id = id;

        this.sprite = sprite;
        this.veloXY = veloXY;
        this.angle = angle; //in degrees
        this.dispXY = dispXY;
        //     this.image = new Image();
        //      this.image.src = sprite.img;
    }


    renderObject() {
        ctx.save();
        ctx.translate(this.dispXY[0], this.dispXY[1]);
        ctx.rotate(toRad(this.angle));
        ctx.drawImage(resources.get(this.sprite),
            -this.width / 2, -this.height / 2,
            this.width, this.height);
        ctx.restore();

    }
    updateObject(dt) {
        this.posXY[0] += this.veloXY[0] * dt;
        this.posXY[1] -= this.veloXY[1] * dt;
        this.dispXY[0] = this.posXY[0] - player.posXY[0] + player.dispXY[0];
        this.dispXY[1] = this.posXY[1] - player.posXY[1] + player.dispXY[1];
    }
}
class _player extends _gameObject {
    constructor(posX, posY, type, id, sprite, dispXY) {
        super(posX, posY, type, id, sprite, dispXY);
        this.ship = this.sprite;
        this.sprite = this.ship.img;
        this.width = this.ship.width;
        this.height = this.ship.height;
        this.timeFiredBullet = [];
        for (let i = 0; i < this.ship.maxWeaponHardpoints; i++) {
            this.timeFiredBullet.push(Date.now());
        };
        this.credits = 0;
        this.karma = 0;
        this.oreCount = {
            iron: 0,
            copper: 0,
            uranium: 0,
            gold: 0,
        };
    }
    changeShip(id) {
        this.ship = ships[id];
        this.sprite = this.ship.img;
    }
    renderPlayer() {
        ctx.save();
        ctx.translate(this.dispXY[0], this.dispXY[1]);
        ctx.rotate(toRad(this.angle));
        ctx.drawImage(resources.get(this.sprite),
            -this.width / 2, -this.height / 2,
            this.width, this.height);
        ctx.restore();

    }
    updatePlayer(dt) {
        this.posXY[0] += this.veloXY[0] * dt;
        this.posXY[1] -= this.veloXY[1] * dt;
        this.rechargeEnergyShield(dt);
        if (this.karma > 0) {
            this.karma -= dt;
        }

    }
    acceleratePlayer(dt) {
        this.veloXY[0] += Math.sin(toRad(this.angle)) * this.ship.accel * dt;
        this.veloXY[1] += Math.cos(toRad(this.angle)) * this.ship.accel * dt;
    }
    decceleratePlayer(dt) {
        this.veloXY[0] -= Math.sin(toRad(this.angle)) * this.ship.accel * dt;
        this.veloXY[1] -= Math.cos(toRad(this.angle)) * this.ship.accel * dt;
    }
    shootBullet(now) {
        if (player.ship.energy >= player.ship.weaponHardpoints[0].energyUsage){
        if (now - this.timeFiredBullet[0] > this.ship.weaponHardpoints[0].rateOfFire) {
            player.ship.energy -=player.ship.weaponHardpoints[0].energyUsage;
            this.timeFiredBullet[0] = Date.now();
            let bullet = new _bullet(this.posXY[0], this.posXY[1], 'bullet', `bullet${gameTime}`, this.ship.weaponHardpoints[0].bullet, [], [], this.angle);
            bullet.veloXY[0] = player.veloXY[0] + Math.sin(toRad(this.angle)) * this.ship.weaponHardpoints[0].bulletVelocity;
            bullet.veloXY[1] = player.veloXY[1] + Math.cos(toRad(this.angle)) * this.ship.weaponHardpoints[0].bulletVelocity;
            playerBulletObjArray[bullet.id] = bullet;
            setTimeout(function () {
                if (playerBulletObjArray[bullet.id]) {
                    playerBulletObjArray[bullet.id];
                    delete playerBulletObjArray[bullet.id];
                }
            }, player.ship.weaponHardpoints[0].dissipation)

        }

    }
    }
    rechargeEnergyShield(dt) {
        if (player.ship.shield < player.ship.maxShield) {
            player.ship.shield++;
        }
        if (player.ship.energy < player.ship.maxEnergy) {
            player.ship.energy++;
        }
    }
    pickUpOre() {
        for (const ore in oreList) {
            if (player.posXY[0] >= oreList[ore].posXY[0] - 50 &&
                player.posXY[0] <= oreList[ore].posXY[0] + 50 &&
                player.posXY[1] >= oreList[ore].posXY[1] - 50 &&
                player.posXY[1] <= oreList[ore].posXY[1] + 50
            ) {
                if (player.ship.cargo.length < player.ship.maxCargo) {
                    player.ship.cargo.push(oreList[ore]);
                    delete oreList[ore];
                    updateCreditCargoDisp();
                } else {
                    console.log('cargo is full!!')
                }
            }

        }
    }
    oreCounter() {
        let oreCountTemp = {
            iron: 0,
            copper: 0,
            uranium: 0,
            gold: 0,
        }
        for (let ore in this.ship.cargo) {
            switch (this.ship.cargo[ore].type) {
                case 'iron':
                    oreCountTemp.iron++;
                    break;
                case 'copper':
                    oreCountTemp.copper++;
                    break;
                case 'uranium':
                    oreCountTemp.uranium++;
                    break;
                case 'gold':
                    oreCountTemp.gold++;
                    break;
            }
        }
        this.oreCount.iron = oreCountTemp.iron;
        this.oreCount.copper = oreCountTemp.copper;
        this.oreCount.uranium = oreCountTemp.uranium;
        this.oreCount.gold = oreCountTemp.gold;
    };
    enterStation() {
        for (let station in spaceStationArray) {
            let relativeVelocity = Math.abs(findRelativeVelocity(player, spaceStationArray[0]));
            if (relativeVelocity < 50) {
                if (player.posXY[0] >= spaceStationArray[station].posXY[0] - spaceStationArray[station].width / 2 &&
                    player.posXY[0] <= spaceStationArray[station].posXY[0] + spaceStationArray[station].width / 2 &&
                    player.posXY[1] >= spaceStationArray[station].posXY[1] - spaceStationArray[station].height / 2 &&
                    player.posXY[1] <= spaceStationArray[station].posXY[1] + spaceStationArray[station].height / 2
                ) {
                    dockedStation = spaceStationArray[station];
                    for (let ore in oreTradeList) {
                        oreTradeList[ore].updateStocks(dockedStation)
                    }
                    updateCreditCargoDisp();
                    stationContainer.style.display = 'block';
                    pauseGame();

                }
            }
        }
    };

}
class _asteroid extends _gameObject {
    constructor(posX, posY, type, id, sprite) {
        super(posX, posY, type, id, sprite);
        this.ores = this.sprite.ores;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.hull = this.sprite.hull;
        this.sprite = this.sprite.img;
    }

    spawnOres() {
        for (let index in this.ores) {
            let num = ranN(2);
            if (num == 1) {
                let ore = new _ore(this.posXY[0], this.posXY[1], `${this.ores[index].name}`, `ore${this.ores[index].name+gameTime}`, this.ores[index]);
                ore.angle = ranN(360);
                ore.veloXY[0] = Math.sin(toRad(ore.angle)) * ranN(100) / 10;
                ore.veloXY[1] = Math.cos(toRad(ore.angle)) * ranN(100) / 10;
                oreList[ore.id] = ore;
                setTimeout(function () {
                    if (oreList[ore.id]) {
                        delete oreList[ore.id];
                    }
                }, 10000 + ranN(3000))
            }
        }
    };
}

class _ore extends _gameObject {
    constructor(posX, posY, type, id, sprite) {
        super(posX, posY, type, id, sprite);
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.sprite = this.sprite.img;
    }

}

class _spaceStation extends _gameObject {
    constructor(posX, posY, type, id, sprite) {
        super(posX, posY, type, id, sprite);
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.sprite = this.sprite.img;
        this.oreStock = {
            iron: 100,
            copper: 100,
            uranium: 100,
            gold: 100
        }
    }

}

class _enemy extends _gameObject {
    constructor(posX, posY, type, id, sprite, dispXY) {
        super(posX, posY, type, id, sprite, dispXY);
        this.ship = this.sprite;
        this.sprite = this.ship.img;
        this.width = this.ship.width;
        this.height = this.ship.height;
        this.ship.shield = 0;
        this.ship.hull = this.ship.hull;
        this.timeFiredBullet = [];
        for (let i = 0; i < this.ship.maxWeaponHardpoints; i++) {
            this.timeFiredBullet.push(Date.now());
        };
        if (this.type == 'pirate') {
            this.targetStation = spaceStationArray[2];
            this.patrolPoint = {
                posXY: [4200 + ranN(800), 4200 + ranN(800)],

            }
        } else {
            this.patrolPoint = {
                posXY: [ranN(5000), ranN(5000)],

            };
            this.targetStation = spaceStationArray[ranN(3)];

        };
    }
    updateEnemy(dt, now) {
        switch (this.type) {
            case 'pirate':
                this.patrolPirateStation(dt, now);
                break;
            case 'raider':
                this.raidPlayer(dt, now);
                break;
            case 'trader':
                this.tradeRun(dt, now);
                break;
            case 'police':
                this.patrolMap(dt, now);
                break;
        }
    }
    killVelocity(dt, multiplier = 1) {
        if (this.veloXY[0] > 0) {
            this.veloXY[0] -= this.ship.accel * dt * multiplier
        } else if (this.veloXY[0] < 0) {
            this.veloXY[0] += this.ship.accel * dt * multiplier
        }
        if (this.veloXY[1] > 0) {
            this.veloXY[1] -= this.ship.accel * dt * multiplier
        } else if (this.veloXY[1] < 0) {
            this.veloXY[1] += this.ship.accel * dt * multiplier
        }
    }
    tradeRun(dt) {
        let distance = findDistance(this, this.targetStation);
        let relativeVelocity = findRelativeVelocity(this, this.targetStation);
        let relativeAngle = Math.floor(findAngle(this, this.targetStation));
        if (relativeAngle > this.angle + 2) {
            this.angle += 3;
        } else if (relativeAngle < this.angle) {
            this.angle -= 3;
        };
        if (distance > 300) {
            if (distance > 600) {
                this.accelerate(dt)
                // } else if (distance < 300 && relativeVelocity > 100) {
                //     this.deccelerate(dt)
                // } else {
                //     this.accelerate(dt)
            }
        } else if (distance < 300 && distance > 50) {
            if (Math.abs(relativeVelocity) > 80) {
                this.killVelocity(dt, .1)
            } else {
                this.accelerate(dt)
            }
        };
        if (distance < 70) {
            this.killVelocity(dt, .2)
        };
        if (distance < 70 && Math.abs(relativeVelocity) < 5) {
            this.veloXY = [0, 0];
            this.targetStation = spaceStationArray[ranN(3)];
        }
    }
    patrolMap(dt, now) {
        let playerDistance = findDistance(this, player);
        if (playerDistance < 1000 && player.karma >= 100) {
            this.engagePlayer(dt, now)
        } else {
            let distance = findDistance(this, this.patrolPoint);
            let relativeAngle = Math.floor(findAngle(this, this.patrolPoint));
            if (relativeAngle > this.angle + 2) {
                this.angle += 3;
            } else if (relativeAngle < this.angle) {
                this.angle -= 3;
            };
            if (distance > 600) {
                this.accelerate(dt)
            } else {
                this.patrolPoint = {
                    posXY: [ranN(5000), ranN(5000)]
                };

            }
        }
    }
    raidPlayer(dt, now) {
        if (player.ship.cargo.length > 0) {
            this.engagePlayer(dt, now)
        } else {
            this.patrolMap(dt, now)
        }
    }
    patrolPirateStation(dt, now) {
        let playerToStationDistance = findDistance(this, this.targetStation);
        if (playerToStationDistance < 1000) {
            this.engagePlayer(dt, now)
        } else {

            let distance = findDistance(this, this.patrolPoint);
            let relativeAngle = Math.floor(findAngle(this, this.patrolPoint));
            if (relativeAngle > this.angle + 2) {
                this.angle += 3;
            } else if (relativeAngle < this.angle) {
                this.angle -= 3;
            };
            if (distance > 600) {
                this.accelerate(dt)
            } else {
                this.patrolPoint = {
                    posXY: [4200 + ranN(800), 4200 + ranN(800)]
                };

            }
        }
    }
    engagePlayer(dt, now) {
        let relativeAngle = Math.floor(findAngle(this, player));
        if (relativeAngle > this.angle + 2) {
            this.angle += 3;
        } else if (relativeAngle < this.angle) {
            this.angle -= 3;
        }
        let distance = findDistance(this, player);
        if (distance > 100 && this.angle + 30 > relativeAngle && this.angle - 30 < relativeAngle) {
            this.accelerate(dt)
        } else {
            this.deccelerate(dt)
        }
        if (distance < 300 && this.angle + 1 > relativeAngle && this.angle - 1 < relativeAngle) {
            //       console.log('firing solution found');
            switch (this.type) {
                case 'pirate':
                    this.shootBullet(now, pirateBulletArray)
                    break;
                case 'raider':
                    this.shootBullet(now, raiderBulletArray)
                    break;
                case 'trader':
                    this.shootBullet(now, traderBulletArray)
                    break;
                case 'police':
                    this.shootBullet(now, policeBulletArray)
                    break;
            }
        }
    }
    accelerate(dt) {
        this.veloXY[0] += Math.sin(toRad(this.angle)) * this.ship.accel / 10 * dt;
        this.veloXY[1] += Math.cos(toRad(this.angle)) * this.ship.accel / 10 * dt;
    }
    deccelerate(dt) {
        this.veloXY[0] -= Math.sin(toRad(this.angle)) * this.ship.accel / 10 * dt;
        this.veloXY[1] -= Math.cos(toRad(this.angle)) * this.ship.accel / 10 * dt;
    }
    shootBullet(now, bulletArray) {
        //    console.log(now);
        if (now - this.timeFiredBullet[0] > this.ship.weaponHardpoints[0].rateOfFire) {
            this.timeFiredBullet[0] = Date.now();
            let bullet = new _bullet(this.posXY[0], this.posXY[1], 'bullet', `bullet${gameTime}`, this.ship.weaponHardpoints[0].bullet, [], [], this.angle);
            bullet.veloXY[0] = this.veloXY[0] + Math.sin(toRad(this.angle)) * this.ship.weaponHardpoints[0].bulletVelocity;
            bullet.veloXY[1] = this.veloXY[1] + Math.cos(toRad(this.angle)) * this.ship.weaponHardpoints[0].bulletVelocity;
            bulletArray[bullet.id] = bullet;
            setTimeout(function () {
                if (bulletArray[bullet.id]) {
                    bulletArray[bullet.id];
                    delete bulletArray[bullet.id];
                }
            }, 10000)

        }


    }
}

class _bullet extends _gameObject {
    constructor(posX, posY, type, id, sprite, dispXY, veloXY, angle) {
        super(posX, posY, type, id, sprite, dispXY, veloXY, angle);
        this.bullet = this.sprite;
        this.sprite = this.bullet.img;
        this.width = this.bullet.width;
        this.height = this.bullet.height;
        this.damage = this.bullet.damage;
    }




}



const objBoundary = (obj) => {
    if (obj.posXY[0] < -350) {
        obj.posXY[0] = 5350;
    };
    if (obj.posXY[0] > 5350) {
        obj.posXY[0] = -350;
    };
    if (obj.posXY[1] < -350) {
        obj.posXY[1] = 5350;
    };
    if (obj.posXY[1] > 5350) {
        obj.posXY[1] = -350;
    };

}

const checkMaxSpeed = (obj, dt) => {
    if (obj.veloXY[0] < -obj.ship.maxSpeed) {
        obj.veloXY[0] += 2 * obj.ship.accel * dt
    };
    if (obj.veloXY[1] < -obj.ship.maxSpeed) {
        obj.veloXY[1] += 2 * obj.ship.accel * dt
    };
    if (obj.veloXY[0] > obj.ship.maxSpeed) {
        obj.veloXY[0] -= 2 * obj.ship.accel * dt
    };
    if (obj.veloXY[1] > obj.ship.maxSpeed) {
        obj.veloXY[1] -= 2 * obj.ship.accel * dt
    };
}

const requestAnimFrame = (function () {
    return window.requestAnimationFrame
})();

const canvas = document.createElement('canvas');
canvas.id = 'game-canvas';
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;
gameContainer.appendChild(canvas);
let timeFiredBullet = Date.now();
let gameTime;
let lastTime;
const main = () => {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;

    if (isGameRunning) {

        update(dt, now);
        render();

    }
    lastTime = now;

    //       console.log(findRelativeVelocity(player, spaceStationArray[0]) + 'distance' + findDistance(player, spaceStationArray[0]))
    requestAnimFrame(main);

}




const update = (dt, now) => {
    gameTime += dt;
    visibleObject();

    userInputListener(dt, now);
    updateEntities(dt, now)
    asteroidCollisionDetection(playerBulletObjArray, dt);
    asteroidCollisionDetection(pirateBulletArray, dt);
    asteroidCollisionDetection(raiderBulletArray, dt);
    asteroidCollisionDetection(traderBulletArray, dt);
    asteroidCollisionDetection(policeBulletArray, dt);

    collisionDetection(playerBulletObjArray, pirateArray, dt);
    collisionDetection(playerBulletObjArray, raiderArray, dt);
    collisionDetection(playerBulletObjArray, traderArray, dt);
    collisionDetection(playerBulletObjArray, policeArray, dt);

    collisionDetection(pirateBulletArray, player, dt);
    collisionDetection(raiderBulletArray, player, dt);
    collisionDetection(traderBulletArray, player, dt);
    collisionDetection(policeBulletArray, player, dt);

    // collisionDetection(pirateBulletArray, visibleAsteroids, dt);
    // collisionDetection(pirateBulletArray, visibleAsteroids, dt);
    // collisionDetection(raiderBulletArray, visibleAsteroids, dt);
    // collisionDetection(traderBulletArray, visibleAsteroids, dt);
    // collisionDetection(policeBulletArray, visibleAsteroids, dt);

}

function updateEntities(dt, now) {
    player.updatePlayer(dt);
    objBoundary(player);
    checkMaxSpeed(player, dt);

    for (let asteroid in asteroidList) {
        asteroidList[asteroid].updateObject(dt);
    }
    for (let ore in oreList) {
        oreList[ore].updateObject(dt);
    }
    for (let station in spaceStationArray) {
        spaceStationArray[station].updateObject(dt);
    }
    for (let bullet in playerBulletObjArray) {
        playerBulletObjArray[bullet].updateObject(dt);
    }
    for (let bullet in pirateBulletArray) {
        pirateBulletArray[bullet].updateObject(dt);
    }
    for (let bullet in raiderBulletArray) {
        raiderBulletArray[bullet].updateObject(dt);
    }
    for (let bullet in traderBulletArray) {
        traderBulletArray[bullet].updateObject(dt);
    }
    for (let station in policeBulletArray) {
        policeBulletArray[station].updateObject(dt)
    }
    for (let ship in pirateArray) {
        pirateArray[ship].updateEnemy(dt, now);
        checkMaxSpeed(pirateArray[ship], dt);
        pirateArray[ship].updateObject(dt);
        objBoundary(pirateArray[ship]);
    }
    for (let ship in raiderArray) {
        raiderArray[ship].updateEnemy(dt, now);
        checkMaxSpeed(raiderArray[ship], dt);
        raiderArray[ship].updateObject(dt);
        objBoundary(raiderArray[ship]);
    }
    for (let ship in traderArray) {
        traderArray[ship].updateEnemy(dt, now);
        checkMaxSpeed(traderArray[ship], dt);
        traderArray[ship].updateObject(dt);
        objBoundary(traderArray[ship]);
    }
    for (let ship in policeArray) {
        policeArray[ship].updateEnemy(dt, now);
        checkMaxSpeed(policeArray[ship], dt);
        policeArray[ship].updateObject(dt);
        objBoundary(policeArray[ship]);
    }
}

const render = () => {
    minimapUpdate();
    playerDetailUpdate();
    // ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let station in spaceStationArray) {
        spaceStationArray[station].renderObject()
    }
    player.renderPlayer();
    for (let asteroid in asteroidList) {
        asteroidList[asteroid].renderObject()
    };
    for (let ore in oreList) {
        oreList[ore].renderObject();
    };
    for (let bullet in playerBulletObjArray) {
        playerBulletObjArray[bullet].renderObject();
    };
    for (let bullet in pirateBulletArray) {
        pirateBulletArray[bullet].renderObject();
    };
    for (let bullet in raiderBulletArray) {
        raiderBulletArray[bullet].renderObject();
    };
    for (let bullet in traderBulletArray) {
        traderBulletArray[bullet].renderObject();
    };
    for (let bullet in policeBulletArray) {
        policeBulletArray[bullet].renderObject();
    };
    for (let ship in pirateArray) {
        pirateArray[ship].renderObject();
    };
    for (let ship in raiderArray) {
        raiderArray[ship].renderObject();
    };
    for (let ship in traderArray) {
        traderArray[ship].renderObject();
    };
    for (let ship in policeArray) {
        policeArray[ship].renderObject();
    }
}


 

// let image = new Image();
// image.src = player.ship.img;

// let stationImage = new Image();
// stationImage.src = 'images/station1.png';
// let bulletImage = new Image();
// bulletImage.src = 'images/bullet1.png';
// let asteroidImage = new Image();
// asteroidImage.src = 'images/asteroid1.png';
// let oreImage = new Image();