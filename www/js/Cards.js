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
    container.addCard = function(x, y, id){ this.addChild(new Card(x,y,id)); }
    container.removeAllCards = function(){ this.removeAllChildren(); }
    container.setupCards = function(cols, rows, spacing){
        var cardWidth = 112;
        var cardHeight = 176;
        var matches = (cols * rows) / 2;
        var order = []; //list of matches
        for (var i=0; i < matches; i++){
            order.push(i+1); //match 1
            order.push(i+1); //match 2
        }
        order = this.shuffle(order);

        for (var row=0; row < rows; row++){
            for (var col=0; col < cols; col++){
                this.addCard(col*((cardWidth+spacing)), row*((cardHeight+spacing)), order[col+(row*cols)]);
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

    window.Cards = createjs.promote(Cards, "Container");
}(window));

//Card Class
(function (window) {
    //constructor
    function Card(x, y, id) {
        this.Container_constructor();
        this.x = x;
        this.y = y;
        this.id = id;
        this.width = 112;
        this.height = 176;
        this.regX = this.width / 2;
        this.regY = this.height / 2;
        this.rotation = this.getRandomInt(-5,5);
        this.image_1 = new createjs.Bitmap(window.Game.assetManager.preload.getResult("card_"+this.getRandomInt(1,3)));
        this.image_2 = new createjs.Bitmap(window.Game.assetManager.preload.getResult("card_image_1"));
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
        createjs.Tween.get(this, {override:false}).to({scaleX: 0, scaleY: 1.25}, 250, createjs.Ease.sineIn)
            .call(function(){ this.removeAllChildren(); this.addChild(this.image_2); console.log(this.id); })
            .to({scaleX: 1, scaleY: 1}, 250, createjs.Ease.sineOut);
        this.parent.setChildIndex(this, this.parent.children.length-1);
    }
    container.rollOver = function(evt) { this.cursor="pointer"; }
    container.rollOut = function(evt) { }
    container.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    window.Card = createjs.promote(Card, "Container");
}(window));