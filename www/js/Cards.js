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
    container.addCard = function(x, y){ this.addChild(new Card(x,y)); }
    container.removeAllCards = function(){ this.removeAllChildren(); }
    container.setupCards = function(cols, rows, spacing){
        var cardWidth = 112;
        var cardHeight = 176;
        for (var row=0; row < rows; row++){
            for (var col=0; col < cols; col++){
                this.addCard(col*((cardWidth+spacing)/2), row*((cardHeight+spacing)/2));
            }
        }
        this.x = window.Game.getWidth() / 2;
        this.y = window.Game.getHeight() / 2;
        this.regX = ((cardWidth + spacing) * (cols - 1))/2;
        this.regY = ((cardHeight + spacing) * (rows - 1))/2;
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
        this.width = 112;
        this.height = 176;
        this.regX = this.width / 2;
        this.regY = this.height / 2;
        this.s = new createjs.Shape();
        this.s.graphics.beginFill("#000000").drawRect(x,y,this.width,this.height);
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
    container.rollOver = function(evt) { this.alpha = 0.5; }
    container.rollOut = function(evt) { this.alpha = 1; }

    window.Card = createjs.promote(Card, "Container");
}(window));