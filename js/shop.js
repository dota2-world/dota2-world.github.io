/**
 * Created by _Ikari_ on 20-Feb-16.
 */
$('#submit').click(function(e){
   // e.preventDefault();
    console.log('form');
    console.log($("#shop").serialize());
    var arr = [];
    arr.push($("#shop").serialize().slice('='));
    var b = $("#shop").serialize().split('&');
    console.log(b);
});



function Order(flavorType,flavId) {
    this.capacity = 0;
    this.nicotine = 0;
    this.profit = 0;
    // константа
    var BASE_PRISE = 5;

    // константа
    var FLAVOR_PRISE;
    if(flavorType=='by'){
        FLAVOR_PRISE = 2;
    }else{
        FLAVOR_PRISE = 4;
    }

    // calculate price
    var self = this;
    function getPrice() {
        console.log(self.capacity *(self.nicotine+FLAVOR_PRISE+BASE_PRISE));
        return (self.capacity/10 *(getNicoPrice()+FLAVOR_PRISE+BASE_PRISE)*1000)*self.profit;
    }
    function getFlavorName(){
        var flavors = [];
        if(flavorType=='by'){
            flavors = [
                'Арбуз',
                'Земляника',
                'Лимон',
                'Мята'
            ];
        }else{
            flavors = [
                'Табак',
                'Черника'
            ];
        }

        return flavors[flavId];
    }
    function getNicoPrice(){
        var nicoPrice = 0;
        if(self.nicotine==3){
            nicoPrice = 1.5;
        }else
        if(self.nicotine==6){
            nicoPrice = 2;
        }else
        if(self.nicotine==8){
            nicoPrice = 2;
        }else
        if(self.nicotine==12){
            nicoPrice = 2;
        }else
        if(self.nicotine==24){
            nicoPrice = 2;
        }
      return nicoPrice;
    }

    // что делать по окончании процесса
    function onReady() {
        $("#total").html(self.capacity.toString()+"ml"+" "+getFlavorName() +"="+ getPrice()+"б.р");
    }

    this.run = function() {
        //getPrice();
        onReady();
    };

}
//change flavors list by country
$('#calculator').on('click','.country',function(){
    if($( ".country:checked" ).val()=='by'){
        $("#country").load('flavBY.html');
    }else {
        $("#country").load('flavUsa.html');
    }

});
// end change flavors list by country

$('#calculator').on('click','#submit',function(){
    console.log('a');
    var flavorCountry= $( ".country:checked" ).val();
    console.log($("#flavors").val());
    var order = new Order(flavorCountry,$("#flavors").val());
    order.profit = $( ".pft:checked" ).val();
    order.capacity = $("#capacity").val();
    order.nicotine = $("#nicotine").val();

    order.run();
});

$('#login').click(function(e){
    var password = $("#pass").val();
    if (password=='carrot'){
        alert('hello');
        $("#calculator").load("calc.html");
    }else{
        alert('Wrong password');
        $("#pass").val("");
    }
});