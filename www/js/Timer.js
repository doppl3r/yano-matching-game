(function (window) {
    //constructor
    function Timer(){ //prototype
        this.start = function(){
            this.playTime = 0;
            this.startTime = Date.now();
        }
        this.pause = function(){ this.pauseTime = Date.now(); }
        this.resume = function() { this.playTime += Date.now() - this.pauseTime; }
        this.getPlayTime = function(){
            var playTime = Date.now() - this.startTime - (this.playTime);
            if(isNaN(playTime)) playTime = 0;
            return playTime;
        }
        this.toString = function(){
            var a = this.getPlayTime();
            var milliseconds = ((a/1000)%1).toFixed(2).slice(-2);
            var seconds = (Math.floor((a/1000)));
            if (("0"+seconds).length <= 2) seconds = ("0"+seconds).slice(-2);
            return seconds+":"+milliseconds;
        }
    }
    //create prototype of self
    window.timer = new Timer();
}(window));