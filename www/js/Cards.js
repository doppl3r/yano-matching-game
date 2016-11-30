//Cards Class
(function (window) {
    //constructor
    function Cards() {
        this.Container_constructor();
        this.setupCards(4, 3);
    }

    var container = createjs.extend(Cards, createjs.Container); //instance of class

    //check all Cards inside this container
    container.tick = function (delta) {
        for (var i=0; i < this.children.length; i++){
            this.getChildAt(i).tick(delta);
        }
    }

    //add Card containers to this container
    container.addCard = function(x, y){ this.addChild(new Card(x,y)); }
    container.removeAllCards = function(){ this.removeAllChildren(); }
    container.setupCards = function(cols, rows){

    }

    window.Cards = createjs.promote(Cards, "Container");
}(window));

//Card Class
(function (window) {
    //constructor
    function Card(x, y) {
        this.Container_constructor();
        this.x = x;
        this.y = y;
        this.s = new createjs.Shape();
        this.s.graphics.beginFill("#000000").drawRect(x,y,112,176);
        this.addChild(this.s);
        this.addListeners();
    }

    //instance of class
    var container = createjs.extend(Card, createjs.Container);

    //update
    container.tick = function (delta) { }
    container.addListeners = function(){
        this.mouseChildren = false; //prevent action on 'content'
        this.on("pressmove", function(evt){ this.pressMove(evt); });
        this.on("click", function(evt){ this.click(evt); });
        this.on("rollover", function(evt){ this.rollOver(evt); });
        this.on("rollout", function(evt){ this.rollOut(evt); });
    }
    container.pressMove = function(evt) {  }
    container.click = function(evt) {  }
    container.rollOver = function(evt) {  }
    container.rollOut = function(evt) {  }

    window.Card = createjs.promote(Card, "Container");
}(window));