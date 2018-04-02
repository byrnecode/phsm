# A JavaScript library for PH Stock Market (_trading/investing_)
## Tools for computations etc..

### Available public methods:

	getBoardLot(price)

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
	
	getBreakEvenPrice() // todo
	
	getHighLow(arr)
	
	getCompounding(amount, percent, cycle, additionPerCycle(optional))