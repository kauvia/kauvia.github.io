class _tradeObject {
    constructor(obj) {
        this.obj = obj;
        this.display = document.createElement('div');
        this.display.id = this.obj.name;
    }
}
class _oreTradeObject extends _tradeObject {
    constructor(obj) {
        super(obj);
        this.sellButton = document.createElement('button');
        this.sellAllButton = document.createElement('button');
        this.buyButton = document.createElement('button');
        this.buyAllButton = document.createElement('button');
        this.stationStock = document.createElement('div');
        this.oreName = document.createElement('div');
        this.playerStock = document.createElement('div');
        this.buy = this.buy.bind(this);
        this.buyAll = this.buyAll.bind(this);
        this.sell = this.sell.bind(this);
        this.sellAll = this.sellAll.bind(this);

    }
    updateStocks(station) {
        switch (this.obj.name) {
            case 'iron':
                this.stationStock.innerHTML = `In Stock:${station.oreStock.iron}`;
                break;
            case 'copper':
                this.stationStock.innerHTML = `In Stock:${station.oreStock.copper}`;
                break;
            case 'uranium':
                this.stationStock.innerHTML = `In Stock:${station.oreStock.uranium}`;
                break;
            case 'gold':
                this.stationStock.innerHTML = `In Stock:${station.oreStock.gold}`;
                break;
        };
        player.oreCounter();
        switch (this.obj.name) {
            case 'iron':
                this.playerStock.innerHTML = `You have:${player.oreCount.iron}`;
                break;
            case 'copper':
                this.playerStock.innerHTML = `You have:${player.oreCount.copper}`;
                break;
            case 'uranium':
                this.playerStock.innerHTML = `You have:${player.oreCount.uranium}`;
                break;
            case 'gold':
                this.playerStock.innerHTML = `You have:${player.oreCount.gold}`;
                break;
        }
    }
    setupPanel(station) {
        this.buyButton.innerHTML = 'Buy';
        this.buyButton.onclick = this.buy;
        this.buyButton.style.display = 'inline-block';
        this.buyButton.style.width = '8%';
        this.display.appendChild(this.buyButton);

        this.buyAllButton.innerHTML = 'Buy All';
        this.buyAllButton.onclick = this.buyAll;
        this.buyAllButton.style.display = 'inline-block';
        this.buyAllButton.style.width = '12%';
        this.display.appendChild(this.buyAllButton);

        this.updateStocks(station);

        this.stationStock.style.display = 'inline-block';
        this.stationStock.style.width = '20%';
        this.display.appendChild(this.stationStock);

        let oreNameString = `${this.obj.name}`;
        oreNameString = oreNameString.charAt(0).toUpperCase() + oreNameString.slice(1);
        this.oreName.innerHTML = `${oreNameString}:${this.obj.value}c`;
        this.oreName.style.display = 'inline-block';
        this.oreName.style.width = '20%';
        this.display.appendChild(this.oreName);
        this.display.style.textAlign = 'center';


        this.playerStock.style.display = 'inline-block';
        this.playerStock.style.width = '20%';
        this.display.appendChild(this.playerStock);

        this.sellButton.innerHTML = 'Sell';
        this.sellButton.onclick = this.sell;
        this.sellButton.style.display = 'inline-block';
        this.sellButton.style.width = '8%';
        this.display.appendChild(this.sellButton);

        this.sellAllButton.innerHTML = 'Sell All';
        this.sellAllButton.onclick = this.sellAll;
        this.sellAllButton.style.display = 'inline-block';
        this.sellAllButton.style.width = '12%';
        this.display.appendChild(this.sellAllButton);

        this.display.style.border = '1px solid black';
        this.display.style.height = `${100/oreTradeList.length}%`;
    }
    buy() {
        let oreName = this.obj.name;
        if (player.credits >= this.obj.value &&
            dockedStation.oreStock[oreName] > 0 && player.ship.cargo.length < player.ship.maxCargo) {
            player.credits -= this.obj.value;
            player.ship.cargo.push(new _ore(0, 0, `${this.obj.name}`, `ore${this.obj.name+gameTime}`, ores[this.obj.index]));
            dockedStation.oreStock[oreName]--;
            updateCreditCargoDisp();
            this.updateStocks(dockedStation);

        }
        //    console.log(player.oreCount[oreName] + dockedStation.oreStock[oreName])
    }
    buyAll() {
        let oreName = this.obj.name;
        while (player.credits >= this.obj.value &&
            dockedStation.oreStock[oreName] > 0 && player.ship.cargo.length < player.ship.maxCargo) {
            player.credits -= this.obj.value;
            player.ship.cargo.push(new _ore(0, 0, `${this.obj.name}`, `ore${this.obj.name+gameTime}`, ores[this.obj.index]));
            dockedStation.oreStock[oreName]--;
            updateCreditCargoDisp();
            this.updateStocks(dockedStation);
        }
    }
    sell() {
        let oreName = this.obj.name;
        if (player.oreCount[oreName] > 0) {
            player.credits += this.obj.value;
            for (let ore in player.ship.cargo) {
                if (player.ship.cargo[ore].type == oreName) {
                    player.ship.cargo.splice(ore, 1);
                    dockedStation.oreStock[oreName]++;

                    console.log(ore)
                    break;
                }
            }
            updateCreditCargoDisp();
            this.updateStocks(dockedStation);

        }
    }
    sellAll() {
        let oreName = this.obj.name;
        while (player.oreCount[oreName] > 0) {
            for (let ore in player.ship.cargo) {
                if (player.ship.cargo[ore].type == oreName) {
                    player.ship.cargo.splice(ore, 1);
                    player.credits += this.obj.value;
                    dockedStation.oreStock[oreName]++;
                }
            }
            updateCreditCargoDisp();
            this.updateStocks(dockedStation);
        }
    }
}
oreTradeList = [];

class _weaponTradeObject extends _tradeObject {
    constructor(obj) {
        super(obj);
        this.sellButton = document.createElement('button');
        this.buyButton = document.createElement('button');
        this.weaponName = document.createElement('div');
        this.playerStock = document.createElement('div');
        this.buy = this.buy.bind(this);
        this.sell = this.sell.bind(this);
        this.id = obj.id;
    }
    setupPanel(station) {
        this.buyButton.innerHTML = 'Buy';
        this.buyButton.onclick = this.buy;
        this.buyButton.style.display = 'inline-block';
        this.buyButton.style.width = '8%';
        this.display.appendChild(this.buyButton);

        //     this.updateStocks(station);


        this.weaponName.innerHTML = `${this.obj.name}:${this.obj.value}c`;
        this.weaponName.style.display = 'inline-block';
        this.weaponName.style.width = '20%';
        this.display.appendChild(this.weaponName);
        this.display.style.textAlign = 'center';


        this.playerStock.style.display = 'inline-block';
        this.playerStock.style.width = '20%';
        this.display.appendChild(this.playerStock);

        this.sellButton.innerHTML = 'Sell';
        this.sellButton.onclick = this.sell;
        this.sellButton.style.display = 'inline-block';
        this.sellButton.style.width = '8%';
        this.display.appendChild(this.sellButton);

        this.display.style.border = '1px solid black';
        this.display.style.height = `${100/weaponsTradeList.length}%`;
    }
    buy() {
        if (player.credits >= this.obj.value &&
            player.ship.weaponHardpoints.length < player.ship.maxWeaponHardpoints) {
            player.credits -= this.obj.value;
            player.ship.weaponHardpoints.push(weapons[this.id]);
            updateCreditCargoDisp();
        }
    }
    sell() {
        for (i = 0; i < player.ship.weaponHardpoints.length; i++) {
            if (player.ship.weaponHardpoints[i].name == this.obj.name) {
                player.credits += this.obj.value;
                player.ship.weaponHardpoints.splice(i,1);
                updateCreditCargoDisp();
                break;


            }
        }

    }
}
let weaponsTradeList = [];


const populateTradeObjects = () => {
    for (let ore in ores) {
        oreTradeList.push(new _oreTradeObject(ores[ore]))
    }
    for (let ore in oreTradeList) {
        let orePanel = document.getElementById('Ores-panel');
        orePanel.appendChild(oreTradeList[ore].display);
        oreTradeList[ore].setupPanel(spaceStationJilted);
    }

    for (let weapon in weapons) {
        weaponsTradeList.push(new _weaponTradeObject(weapons[weapon]))
    }
    for (let weapon in weaponsTradeList) {
        let weaponPanel = document.getElementById('Weapons-panel');
        weaponPanel.appendChild(weaponsTradeList[weapon].display)
        weaponsTradeList[weapon].setupPanel(spaceStationJilted)

    }
}