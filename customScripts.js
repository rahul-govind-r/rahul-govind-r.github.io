
const wazirxApi = async () => {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.wazirx.com/api/v2/tickers')
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
     const market = Object.values(myJson)
     const usdtMarket = []
    for ( i=0; i < market.length ; i++) 
    {
      if ( market[i].quote_unit == "usdt" )
      {
          usdtMarket.push(market[i])
      }
    }

    return usdtMarket
    
}
async function priceArray () {
    usdtMarket = await wazirxApi()
    var objct = {}
    const keys = []
    const values = []
    for(var i = 0; i < usdtMarket.length; i++)
    {  
        keys.push(usdtMarket[i].name)
        values.push(usdtMarket[i].last)
    } 

    var array = {}
    for(var i = 0; i < usdtMarket.length; i++){ 
        array[keys[i]] = values[i]; 
    } 

    return array
}

const timer = ms => new Promise(res => setTimeout(res, ms))
bigArray = []
async function load () { // We need to wrap the loop into an async function for this to work
    priceObj = await wazirxApi()
    subArray = []
    for (var obj = 0; obj >= 0 ; obj++) {
        // bigArray[obj] = await priceArray()
        subArray = await priceArray()
        bigArray.push(subArray)
        await timer(30000); // then the created Promise can be awaited
    }
    return bigArray
}

load()

function infiniteLoop () {

    presentObj = bigArray.length - 1
    previousObj = presentObj - 1
    tenMinObj = presentObj -20 
    initialObj = 0
    thirtySecond = ''
    initialChange = ''
            for ( let [key,value ] of Object.entries(bigArray[presentObj]))
            {

                    var index = Object.keys(bigArray[presentObj]).indexOf(key);
                    previousPrice = Object.entries(bigArray[previousObj])[index][1]
                    price = Object.entries(bigArray[presentObj])[index][1]
                    // tenMinPrice = Object.entries(bigArray[tenMinObj])[index][1]
                    initialPrice = Object.entries(bigArray[initialObj])[index][1]
                    percentageChangeSeconds = ( (price-previousPrice) / previousPrice ) * 100
                    percentageChangeInitial = ( (price-initialPrice) / initialPrice ) * 100
                    if ( percentageChangeSeconds > 1)
                    {
                        secondsElement =    '<div class="row coinWrapper" style="background-color: lavender;" data-percentage="' + percentageChangeSeconds + '">' +
                                            '<div class="col-md-6">' + key +'</div>' + 
                                            '<div class="col-md-6">' + percentageChangeSeconds + '%</div>' +
                                            '</div>'
                        thirtySecond = thirtySecond + secondsElement
                        $("#30secWindow").append(thirtySecond)
                        var $wrapper = $('.secondsWindow');
                        $wrapper.find('.coinWrapper').sort(function(a, b) {
                            return +b.dataset.percentage - +a.dataset.percentage;
                        })
                        .appendTo($wrapper);
                    }

                    if ( percentageChangeInitial > 2 )
                    {
                        initialElement =    '<div class="row coinWrapper" style="background-color: lavender;" data-percentage="' + percentageChangeInitial + '">' +
                                            '<div class="col-md-6">' + key +'</div>' + 
                                            '<div class="col-md-6">' + percentageChangeInitial + '%</div>' +
                                            '</div>'
                        initialChange = initialChange + secondsElement
                        $("#startWindow").append(initialChange)
                        $("#10minWindow").append(initialChange)
                        var $wrapper = $('.initialPrice');
                        $wrapper.find('.coinWrapper').sort(function(a, b) {
                            return +b.dataset.percentage - +a.dataset.percentage;
                        })
                        .appendTo($wrapper);
                        var $wrapper1 = $('.initialPrice');
                        $wrapper1.find('.coinWrapper').sort(function(a, b) {
                            return +b.dataset.percentage - +a.dataset.percentage;
                        })
                        .appendTo($wrapper1);
                    }
                    
            }
            if ( $("#30secWindow .coinWrapper").length > 32 ) { $("#30secWindow").children().not(':first').remove(); thirtySecond = '' }
            if ( $("#10minWindow .coinWrapper").length > 32 ) { $("#10minWindow").children().not(':first').remove(); thirtySecond = '' }
            if ( $("#startWindow .coinWrapper").length > 32 ) { $("#startWindow").children().not(':first').remove(); thirtySecond = '' }

}

function loopFunction(delay, callback){
    var loop = function(){
        callback();
        setTimeout(loop, delay);
    }; loop();
};

loopFunction(35000, function(){
    if (bigArray.length > 1 ) 
    {
    infiniteLoop()
    }
});
