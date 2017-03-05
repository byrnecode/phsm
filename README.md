# A JavaScript library for PH Stock Market (_trading/investing_)
## Tools for computations etc..

### Available public methods: 

    whatIsPercentOf(percent, target)

    isWhatPercentOf(value, target)

    getPercentDiff(from, to)

    getBuyPreview(price, money)

    getGrossAmount(stockPrice, volume)

    getBuyingFees(grossAmount)

    getSellingFees(grossAmount)
    
    getTotalBuyingCost(grossAmount)
    getTotalBuyingCost(price, volume)
    
    getTotalSellingNet(grossAmount)
    getTotalSellingNet(price, volume)
    
    getAverage(arrayTransactions)
    getAverage(price, volume)
    
    getPositionSize(capital, riskPercent, stopLossPercent)
    
    getExpectancyRate(winRate, aveWin, lossRate, aveLoss, aveRiskAmount)
    
    getProfit(sellingPrice, myAveragePrice, volume)
    
    getBreakEvenPrice()
    
    trailingStop(stop, targetToTrail)
    
    getHighLow(arr)
    
    getCompounding(amount, percent, cycle, additionPerCycle(optional))
    
    
### TODO:

* stop loss / trailing stop
    1. 
        * normal stop - will post a sell to the next available price of the specified stop (taking tick size into consideration)
        * immediate stop - will sell at the available highest price of the bid
    2. 
        * fix price
        * percent (from buying)
    3. 
        * take profit
        * sell-stop
        * trailing-stop
* limit order -understand more
* probability computation ("what if I buy/sell at xx price, auto computation..")
* change commission base on broker, have the ablity to change broker, perhaps have a ready-list of brokers with their commission
* bullet proofing on functions parameters (null, number of params passed, type of data passed.. etc..)
* optimized code! (variables, methods, etc..)
