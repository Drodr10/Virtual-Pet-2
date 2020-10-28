class Food{
    constructor(foodStock, lastFed){
        this.foodStock = foodS;
        this.image = loadImage("images/Milk.png")
    }


    getFoodStock(){
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value", (data)=>{
            foodS = data.val();
        });
    }
    updateFoodStock(stock){
        database.ref('/').update({
            Food: stock
        });
    }
    deductFood(){
        foodS--;
        database.ref('/').update({
        Food: foodS   
        });
    }

    display(){
        var x=400
        var y=100;

        imageMode(CENTER);

        if(foodS != 0){
            for(var i = 0;i< foodS; i++){
                if(i%10 == 0){
                    x=400
                    y+=50
                }
                image(this.image,x,y,50,50);
                x+=30;
            }
        }
        if(lastFed>12){
            lastFed = (lastFed-12)+" PM"
        }
        else
            lastFed = lastFed+" AM"
        fill(255)
        text("Last time fed: "+ lastFed, 20, 100)
    }
}