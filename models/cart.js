module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.totalTaxAmt = oldCart.totalTaxAmt || 0;

    this.add = function(item,id){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty:0, price:0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.discountPrice * storedItem.qty;
        storedItem.taxableAmt = Math.round(storedItem.price * 0.12);
        this.totalQty++;
        this.totalPrice += storedItem.item.discountPrice;
        this.totalTaxAmt += storedItem.taxableAmt;
    }

    this.reduceByOne = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.discountPrice;
        this.items[id].taxableAmt = Math.round( this.items[id].price * 0.12 ); 
        this.totalQty--;
        this.totalPrice -= this.items[id].item.discountPrice;
        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
        this.totalTaxAmt = this.totalPrice *0.12;
    }
 
    this.generateArray = function(){
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
}