(function (window) {
    //private functions
    function Game(){  //constructor
        this.gamePaused = false;
        Game.prototype.init();
    }
    function tick(event) {
        this.delta = event.delta; //elapsedTimeInMS / 1000msPerSecond

        window.Game.stage.update();
    }

    //public functions
    Game.prototype.init = function() {
        //phonegap activities
        window.addEventListener('resize', function(){ Game.prototype.resizeCanvas(); });

        this.canvas = document.getElementById("gameCanvas");
        this.resizeCanvas();
        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(60);
        createjs.Touch.enable(this.stage);

        this.assetManager = new AssetManager(this.canvas);
        this.assetManager.init();
        this.stage.addChild(this.assetManager);
        this.stage.on("stagemousedown", function(event){ Game.prototype.stageMouseDown(event); });
        this.stage.on("stagemousemove", function(event){ Game.prototype.stageMouseMove(event); });
        this.stage.on("stagemouseup", function(event){ Game.prototype.stageMouseUp(event); });

        this.assetManager.preload.on("complete", function(){ Game.prototype.setStage(); });
        this.assetManager.preload.on("progress", function(){ Game.prototype.assetManager.updateLoading(); window.Game.stage.update(); });
    }
    Game.prototype.setStage = function() {
        //clean up stage
        this.stage.removeAllChildren();

        //initialize game objects
        if (this.cards == null) this.cards = new Cards();

        //ensure stage is blank and add the player
        this.stage.clear();

        //draw according to game view
        this.stage.addChild(this.cards); //loading

        //start game timer
        if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            //createjs.Ticker.setFPS(24);
        }
    }
    Game.prototype.stageMouseDown = function(event){}
    Game.prototype.stageMouseMove = function(event){}
    Game.prototype.stageMouseUp = function(event){}
    Game.prototype.getWidth = function(){ return this.canvas.width; }
    Game.prototype.getHeight = function(){ return this.canvas.height; }
    Game.prototype.resizeCanvas = function(){
        var content = document.getElementById("content");
        content.style.height = window.innerHeight+"px";
        content.style.width = (this.canvas.width/this.canvas.height)*parseInt(content.style.height)+"px";
        if (parseInt(content.style.width) > window.innerWidth) content.style.width = window.innerWidth + "px";
    }
    Game.prototype.retry = function(){ }

    //create prototype of self
    window.Game = new Game();
}(window));