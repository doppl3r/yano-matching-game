//Cards Class
(function (window) {
    //constructor
    function EndGraphics() {
        this.Container_constructor();
        this.graphic = new createjs.Bitmap(window.Game.assetManager.preload.getResult("end_graphic_1"));
        this.alpha = 0; //start faded;
        this.addChild(this.graphic);
    }

    var container = createjs.extend(EndGraphics, createjs.Container); //instance of class

    //check all EndGraphics inside this container
    container.tick = function (delta) {}
    container.fadeIn = function(){
        createjs.Tween.get(this, {override:false}).wait(0).to({alpha: 1}, 2500, createjs.Ease.sineInOut)
        .call(function(){ window.Game.checkHighScore(window.timer.stopTime); });
    }
    container.fadeOut = function(){
        createjs.Tween.get(this, {override:false}).to({alpha: 0}, 250, createjs.Ease.sineInOut);
    }

    window.EndGraphics = createjs.promote(EndGraphics, "Container");
}(window));
