//Cards Class
(function (window) {
    //constructor
    function Cards() {
        this.Container_constructor();
        this.setupCards(4, 3, 12);
    }

    var container = createjs.extend(Cards, createjs.Container); //instance of class

    //check all Cards inside this container
    container.tick = function (delta) {
        for (var i=0; i < this.children.length; i++){
            this.getChildAt(i).tick(delta);
        }
    }

    //add Card containers to this container
    container.addCard = function(x, y, id, index){ this.addChild(new Card(x,y,id,index)); }
    container.removeAllCards = function(){ this.removeAllChildren(); }
    container.setupCards = function(cols, rows, spacing){
        this.totalMatches = (cols * rows) / 2;
        this.currentMatch = 0;
        this.matches = 0;
        var cardWidth = 112;
        var cardHeight = 176;
        var order = []; //list of totalMatches
        for (var i=0; i < this.totalMatches; i++){
            order.push(i+1); //match 1
            order.push(i+1); //match 2
        }
        order = this.shuffle(order);

        var index = 0;
        for (var row=0; row < rows; row++){
            for (var col=0; col < cols; col++){
                index = col+(row*cols);
                this.addCard(col*((cardWidth+spacing)), row*((cardHeight+spacing)), order[index], index);
            }
        }
        this.x = window.Game.getWidth() / 2;
        this.y = window.Game.getHeight() / 2;
        this.regX = ((cardWidth + spacing) * (cols - 1))/2;
        this.regY = ((cardHeight + spacing) * (rows - 1))/2;
    }
    container.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    container.checkMatch = function(id, index){
        this.currentMatch++;
        if (this.currentMatch == 1){ this.card1 = this.getChildAt(index); }
        else if (this.currentMatch == 2){
            this.card2 = this.getChildAt(index);
            if (this.card1.id == this.card2.id){ //found a match
                this.matches++;
                if (this.matches >= this.totalMatches){ //win
                    this.resetAllTweens();
                }
            }
            else { //no match was found
                this.card1.resetTween();
                this.card2.resetTween();
            }
            this.currentMatch = 0;
        }
    }
    container.resetAllTweens = function(){
        var length = this.children.length;
        for (var i=0; i < length; i++){ this.getChildAt(i).resetTween(i*100); }
        this.matches = 0;
    }

    window.Cards = createjs.promote(Cards, "Container");
}(window));

//Card Class
(function (window) {
    //constructor
    function Card(x, y, id, index) {
        this.Container_constructor();
        this.x = x;
        this.y = y;
        this.id = id;
        this.index = index;
        this.width = 112;
        this.height = 176;
        this.regX = this.width / 2;
        this.regY = this.height / 2;
        this.flipped = false;
        this.rotation = this.getRandomInt(-5,5);
        this.image_1 = new createjs.Bitmap(window.Game.assetManager.preload.getResult("card_"+this.getRandomInt(1,3)));
        this.image_2 = new createjs.Bitmap(window.Game.assetManager.preload.getResult("card_image_"+id));
        this.image = this.image_1;
        this.addChild(this.image);
        this.addListeners();
    }

    //instance of class
    var container = createjs.extend(Card, createjs.Container);

    //update
    container.tick = function (delta) {

    }
    container.addListeners = function(){
        this.mouseChildren = false; //prevent action on 'content'
        this.on("pressmove", function(evt){ this.pressMove(evt); });
        this.on("click", function(evt){ this.click(evt); });
        this.on("rollover", function(evt){ this.rollOver(evt); });
        this.on("rollout", function(evt){ this.rollOut(evt); });
    }
    container.pressMove = function(evt) {  }
    container.click = function(evt) {
        this.startTween();
    }
    container.rollOver = function(evt) { this.cursor="pointer"; }
    container.rollOut = function(evt) { }
    container.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    container.startTween = function(){
        if (this.flipped == false){
            createjs.Tween.get(this, {override:false}).to({scaleX: 0, scaleY: 1.25}, 250, createjs.Ease.sineIn)
            .call(function(){ //swap out image
                this.removeAllChildren();
                this.addChild(this.image_2);
                this.flipped = true;
            })
            .to({scaleX: 1, scaleY: 1}, 250, createjs.Ease.sineOut)
            .call(function(){
                this.parent.checkMatch(this.id, this.index);
            });
        }
    }
    container.resetTween = function(delay){
        delay = delay != null ? delay : 0;
        this.flipped = false;
        createjs.Tween.get(this, {override:false}).wait(delay).to({scaleX: 0, scaleY: 1.25}, 250, createjs.Ease.sineIn)
        .call(function(){ //reset original image
            this.removeAllChildren();
            this.addChild(this.image_1);
            this.flipped = false;
        })
        .to({scaleX: 1, scaleY: 1}, 250, createjs.Ease.sineOut);
    }

    window.Card = createjs.promote(Card, "Container");
}(window));