var peluru, peluru2, peluru3, pemain, target, gameovers, winCondition;
var counterPeluru = 0, score = 0, counterlevel = 1;
var movementx = 0, movementy = 0, healtFlag = false, flaggameover = true;
let speedhantu = 2, heal = 100, healt_bar_val = 100;
let speed = 10, healths, bulletsize = 10;
let areaTembak = 20;
var life = 3;
function startGame() {
    peluru = new component(20, 20, "asset/Roket_merah.png", 180, 500, 'image');
    peluru2 = new component(10, 10, "asset/Roket_biru.png", 0, 0, 'image');
    peluru3 = new component(10, 10, "asset/Roket_hijau.png", 0, 0, 'image');
    pemain = new component(40, 40, "asset/Canon.png", 180, 500, "image");
    target = new component(30, 30, "asset/Hantu/Ghost1.png", 0, 100, "image");
    powerUp = new component(20, 20, "asset/power_up.png", -100, -100, "image");
    powerSpeed = new component(20, 20, "asset/wall_biru.png", -100, -100, "image");
    gameovers = new component(0, 0, "asset/GameOver.png", 180, 500, 'image');
    winCondition = new component(0, 0, "asset/GameOver.png", 180, 500, 'image');
    var startgame = new Audio('asset/sound/Game-Menu.mp3');
    myGameArea.start();
    startgame.play();

}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 550;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]).classList.add("shadow-lg");
        this.interval = setInterval(updateGameArea, 20);
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}


function health(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = '#50FE73';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    getKeyboardInput();
    getUpdateValue();
    moveTarget();
    peluruHandler();
    gameover();
    powerUpHandler();
    powerSpeedHandler();
    gameovers.update();
    winCondition.update();

}

function getUpdateValue() {
    document.getElementById("score3").innerHTML = life;
    healthHandler()
    target.update();
    pemain.update();
    healths.update();
    peluru.y -= speed;
    peluru2.y -= speed;
    peluru3.y -= speed;
    peluru.update();
    peluru2.update();
    peluru3.update();
    powerUp.update();
    powerSpeed.update();

    gameovers.update();
}

function getKeyboardInput() {
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 32:
                if (counterPeluru == 0) {
                    peluru = new component(bulletsize, bulletsize, "asset/Roket_merah.png", pemain.x + 15, pemain.y, 'image');
                    counterPeluru += 1;
                }
                else if (counterPeluru == 1) {
                    peluru2 = new component(bulletsize, bulletsize, "asset/Roket_biru.png", pemain.x + 15, pemain.y, 'image');
                    counterPeluru += 1;
                }
                else if (counterPeluru == 2) {
                    peluru3 = new component(bulletsize, bulletsize, "asset/Roket_hijau.png", pemain.x + 15, pemain.y, 'image');
                    counterPeluru = 0;
                }
                var horn = new Audio('asset/sound/laser.mp3');
                horn.play();
                break;
            case 37:
                if (pemain.x >= 0) {
                    pemain.x -= speed;
                }
                break;
            case 38:
                if (pemain.y >= 100) {
                    pemain.y -= speed;
                }
                break;
            case 39:
                if (pemain.x <= 360) {
                    pemain.x += speed;
                }
                break;
            case 40:
                if (pemain.y <= 510) {
                    pemain.y += speed;
                }
                break;
        }
    }
}

function moveTarget() {

    if (movementy == 1) {
        if (target.y >= -20 && target.y <= 530) {
            if (speedhantu >= 12) {
                speedhantu = 12;
            }
            target.y += speedhantu;
        }
        if (target.y >= 500) {
            target.y = 500
            movementy = 0;
        }
    }
    else if (movementy == 0) {
        if (target.y >= -20 && target.y <= 530) {
            if (speedhantu >= 12) {
                speedhantu = 12;
            }
            target.y -= speedhantu;
        }
        if (target.y <= 10) {
            target.y = 10
            movementy = 1;
        }
    }
    if (movementx == 0) {
        if (target.x >= -30 && target.x <= 380) {
            if (speedhantu >= 12) {
                speedhantu = 12;
            }
            target.x += speedhantu;
        }
        if (target.x >= 360) {
            target.x = 360
            movementx = 1;
        }
    }
    else if (movementx == 1) {
        if (target.x >= -30 && target.x <= 400) {
            if (speedhantu >= 12) {
                speedhantu = 12;
            }
            target.x -= speedhantu;
        }
        if (target.x <= 0) {
            target.x = 0
            movementx = 0;
        }
    }

}

function healthHandler() {
    if (healtFlag) {
        healtFlag = false;
        healt_bar_val -= 25;
    }

    healths = new health(healt_bar_val, 5, target.x - 20, target.y - 10);

    if (heal == 75) {
        healths = new health(healt_bar_val, 5, target.x - 20, target.y - 10);
    }
    else if (heal == 50) {
        healths = new health(healt_bar_val, 5, target.x - 20, target.y - 10);
    }
    else if (heal == 25) {
        healths = new health(healt_bar_val, 5, target.x - 20, target.y - 10);
    }
    else if (heal <= 0) {
        levelHandler(true)
        speedhantu = 2;
        healt_bar_val = heal;
    }
}

function peluruHandler() {
    if (peluru.y <= (target.y + areaTembak) && peluru.y >= (target.y - areaTembak)) {
        if (peluru.x <= (target.x + areaTembak) && peluru.x >= (target.x - areaTembak)) {
            peluru = new component(0, 0, "asset/Roket_merah.png", -100, -100, 'image');
            addResourcePeluru();
        }
    }
    if (peluru2.y <= (target.y + areaTembak) && peluru2.y >= (target.y - areaTembak)) {
        if (peluru2.x <= (target.x + areaTembak) && peluru2.x >= (target.x - areaTembak)) {
            peluru2 = new component(0, 0, "asset/Roket_biru.png", -100, -100, 'image');
            addResourcePeluru();
        }
    }
    if (peluru3.y <= (target.y + areaTembak) && peluru3.y >= (target.y - areaTembak)) {
        if (peluru3.x <= (target.x + areaTembak) && peluru3.x >= (target.x - areaTembak)) {
            peluru3 = new component(0, 0, "asset/Roket_hijau.png", -100, -100, 'image');
            addResourcePeluru();
        }
    }
}

function addResourcePeluru() {
    document.getElementById("score").innerHTML = score;
    score += 5;
    speedhantu += 2;
    heal -= 25;
    healtFlag = true;
}

function levelHandler(flags) {
    this.flaglevel = flags
    if (this.flaglevel) {
        this.flaglevel = false
        if (counterlevel == 1) {
            heal = 110;
            areaTembak += 5;
            target = new component(40, 40, "asset/Hantu/Ghost2.png", 0, 100, 'image');
            random = Math.floor(Math.random() * 11);
            if (random % 2 == 0) {
                powerUp = new component(20, 20, "asset/power_up.png", 200, 500, 'image');
            }
        }
        if (counterlevel == 2) {
            heal = 115;
            areaTembak += 5;
            target = new component(50, 50, "asset/Hantu/Ghost3.png", 0, 100, 'image');
            random = Math.floor(Math.random() * 11);
            if (random % 2 == 1) {
                powerSpeed = new component(20, 20, "asset/SpeedUp.png", 200, 500, 'image');
            }
        }
        if (counterlevel == 3) {
            heal = 120;
            areaTembak += 5;
            target = new component(60, 60, "asset/Hantu/Ghost4.png", 0, 100, 'image');
            random = Math.floor(Math.random() * 11);
            if (random % 2 == 0) {
                powerUp = new component(20, 20, "asset/power_up.png", 200, 500, 'image');
            }
        }
        if (counterlevel == 4) {
            heal = 130;
            areaTembak += 5;
            target = new component(70, 70, "asset/Hantu/Ghost5.png", 0, 100, 'image');
            random = Math.floor(Math.random() * 11);
            if (random % 2 == 1) {
                powerSpeed = new component(20, 20, "asset/SpeedUp.png", 200, 500, 'image');
            }
        }
        if (counterlevel == 5) {
            heal = 135;
            areaTembak += 5;
            target = new component(80, 80, "asset/Hantu/Ghost6.png", 0, 100, 'image');
        }
        if (counterlevel == 6) {
            heal = 150;
            areaTembak += 5;
            target = new component(90, 90, "asset/Hantu/Ghost7.png", 0, 100, 'image');
        }
        if (counterlevel == 7) {
            counterlevel = 5;
            heal = 150;
            winCondition = new component(300, 80, "asset/YouWin.png", 45, 250, 'image');
            flaggameover = false;
            alert("You Win!!");
            var wingames = new Audio('asset/sound/WinGame.mp3');
            wingames.play();
        }
    }
    document.getElementById("score2").innerHTML = counterlevel + 1;
    counterlevel += 1;
}

function powerUpHandler() {
    if (pemain.x >= (powerUp.x - 20) && pemain.x <= (powerUp.x + 17)) {
        if (pemain.y >= (powerUp.y - 17) && pemain.y <= (powerUp.y + 5)) {
            powerUp = new component(0, 0, "asset/power_up.png", 200, 500, 'image');
            bulletsize = 20;
        }
    }
}

function powerSpeedHandler() {
    if (pemain.x >= (powerSpeed.x - 20) && pemain.x <= (powerSpeed.x + 17)) {
        if (pemain.y >= (powerSpeed.y - 17) && pemain.y <= (powerSpeed.y + 5)) {
            powerSpeed = new component(0, 0, "asset/power_up.png", 200, 500, 'image');
            speed = 20;
        }
    }
}

function gameover() {
    if (pemain.y <= (target.y + 20) && pemain.y >= (target.y - 20)) {
        if (pemain.x <= (target.x + 20) && pemain.x >= (target.x - 20)) {
            if (life <= 1) {
                var gameoverss = new Audio('asset/sound/GameOversoundeffect.mp3');
                gameoverss.play();
                if (flaggameover) {
                    gameovers = new component(300, 80, "asset/GameOver.png", 45, 250, 'image');
                }
                life = 0;
                pemain = new component(0, 0, "red", -100, -100);
            }
            else {
                life -= 1
                pemain = new component(40, 40, "asset/Canon.png", 180, 500, "image");
            }
        }
    }
}