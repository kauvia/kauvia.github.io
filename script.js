const mapKeys = {};
const userInputListener = (dt,now) => {
 //   console.log(mapKeys);
    onkeydown = onkeyup = function (e) {
        e = e;
        mapKeys[e.keyCode] = e.type == 'keydown';
        if (mapKeys[87]) { //w
            
            player.acceleratePlayer(dt);
     
        };

        if (mapKeys[83]) { //s
            player.decceleratePlayer(dt);


        };


        if (mapKeys[65]) { //a
            player.angle -= 9;

        };
        if (mapKeys[68]) { //d
            player.angle += 9;

        };
        if (mapKeys[82]) { //r
            player.pickUpOre();
            player.enterStation();
        };
        if (mapKeys[70]) { //f
            player.shootBullet(now);
        };
    }
}