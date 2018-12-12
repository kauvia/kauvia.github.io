const visibleAsteroids = {};
const oreList = {};

const visibleObject = () => {
    for (asteroid in asteroidList) {
        if (-300 <= asteroidList[asteroid].dispXY[0] && asteroidList[asteroid].dispXY[0] <= 900 &&
            -300 <= asteroidList[asteroid].dispXY[1] && asteroidList[asteroid].dispXY[1] <= 900) {
            visibleAsteroids[asteroidList[asteroid].id] = asteroidList[asteroid];
        } else {
            delete visibleAsteroids[asteroidList[asteroid].id];

        }
    } //sconsole.log(Object.keys(visibleAsteroids).length)
}
setInterval(visibleObject, 500);

const asteroidCollisionDetection = (bulletArray, dt) => {
    for (bullet in bulletArray) {
        for (asteroid in visibleAsteroids) {
            if (bulletArray[bullet].posXY[0] + bulletArray[bullet].width >= asteroidList[asteroid].posXY[0] &&
                bulletArray[bullet].posXY[0] <= asteroidList[asteroid].posXY[0] + asteroidList[asteroid].width &&
                bulletArray[bullet].posXY[1] + bulletArray[bullet].height >= asteroidList[asteroid].posXY[1] &&
                bulletArray[bullet].posXY[1] <= asteroidList[asteroid].posXY[1] + asteroidList[asteroid].height) {
                asteroidList[asteroid].hull -= bulletArray[bullet].damage;
                delete bulletArray[bullet];
                if (asteroidList[asteroid].hull <= 0) {
                    asteroidList[asteroid].spawnOres(dt);
                    delete asteroidList[asteroid];
                    delete visibleAsteroids[asteroid];
                };
                break;
            }
        }
    }
}
const collisionDetection = (bulletArray, targetArray, dt) => {
    for (let bullet in bulletArray) {
        if (targetArray instanceof Array || targetArray == visibleAsteroids) {
            for (let target in targetArray) {
                if (bulletArray[bullet].posXY[0] + bulletArray[bullet].width >= targetArray[target].posXY[0] &&
                    bulletArray[bullet].posXY[0] <= targetArray[target].posXY[0] + targetArray[target].width &&
                    bulletArray[bullet].posXY[1] + bulletArray[bullet].height >= targetArray[target].posXY[1] &&
                    bulletArray[bullet].posXY[1] <= targetArray[target].posXY[1] + targetArray[target].height) {
                    if (targetArray[target].ship.shield > bulletArray[bullet].damage) {
                        targetArray[target].ship.shield -= bulletArray[bullet].damage;
                    } else if (targetArray[target].ship.shield > 0) {
                        targetArray[target].ship.shield = 0;

                    } else {
                        targetArray[target].ship.hull -= bulletArray[bullet].damage;

                    };
                    delete bulletArray[bullet];
                    if (targetArray[target].ship.hull <= 0) {
                        if (bulletArray == playerBulletObjArray) {
                            if (targetArray == traderArray || targetArray == policeArray) {
                                console.log('u attked friendly ship');
                                player.karma += 100;
                            } else if (targetArray == pirateArray || targetArray == raiderArray) {
                                if (player.karma > 50) {
                                    player.karma -= 50
                                } else {
                                    player.karma = 0
                                }
                            }
                        }
                        delete targetArray[target];
                    };
                    break;
                }
            }
        } else {
            if (bulletArray[bullet].posXY[0] + bulletArray[bullet].width >= targetArray.posXY[0] &&
                bulletArray[bullet].posXY[0] <= targetArray.posXY[0] + targetArray.width &&
                bulletArray[bullet].posXY[1] + bulletArray[bullet].height >= targetArray.posXY[1] &&
                bulletArray[bullet].posXY[1] <= targetArray.posXY[1] + targetArray.height) {
                if (targetArray.ship.shield > bulletArray[bullet].damage) {
                    targetArray.ship.shield -= bulletArray[bullet].damage;
                    console.log(targetArray.ship.shield)
                } else if (targetArray.ship.shield > 0) {
                    let shieldPenetration = bulletArray[bullet].damage - targetArray.ship.shield;
                    targetArray.ship.shield = 0;
                    targetArray.ship.hull -= shieldPenetration;
                    console.log(targetArray.ship.shield)

                } else {
                    targetArray.ship.hull -= bulletArray[bullet].damage;
                    console.log(targetArray.ship.hull)

                };
                delete bulletArray[bullet];
                if (targetArray.ship.hull <= 0) {
                    if (targetArray == player) {
                        targetArray.ship.hull = 0;
                        //                       console.log('you died')

                    }

                };
                break;
            }

        }
    }
}