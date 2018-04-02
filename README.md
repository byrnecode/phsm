# A JavaScript library for PH Stock Market (_trading/investing_)
## Tools for computations etc..

### Available public methods:

	PHSM.getBoardLot(price)

	PHSM.whatIsPercentOf(percent, target)

	PHSM.isWhatPercentOf(value, target)

	PHSM.getPercentDiff(from, to)

	PHSM.getBuyPreview(price, money)

	PHSM.getGrossAmount(stockPrice, volume)

	PHSM.getBuyingFees(grossAmount)

	PHSM.getSellingFees(grossAmount)
	
	PHSM.getTotalBuyingCost(grossAmount)
	PHSM.getTotalBuyingCost(price, volume)
	
	PHSM.getTotalSellingNet(grossAmount)
	PHSM.getTotalSellingNet(price, volume)
	
	PHSM.getAverage(arrayTransactions)
	PHSM.getAverage(price, volume)
	
	PHSM.getPositionSize(capital, riskPercent, stopLossPercent)
	
	PHSM.getExpectancyRate(winRate, aveWin, lossRate, aveLoss, aveRiskAmount)
	
	PHSM.getProfit(sellingPrice, myAveragePrice, volume)
	
	PHSM.getBreakEvenPrice() // todo
	
	PHSM.getHighLow(arr)
	
	PHSM.getCompounding(amount, percent, cycle, additionPerCycle(optional))