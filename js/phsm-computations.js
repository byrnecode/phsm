var PHSM = (function () {

	// ************************************************************************
	// PRIVATE VARIABLES
	// ************************************************************************
	var charges = {
		commission: 0.25, // % of gross amount
		commissionMinimum: 20, // pesos minimum commission of broker
		vat: 12, // % of commission
		pseTransFee: 0.005, // % of gross amount
		sccp: 0.01, // % of gross amount
		salesTax: 0.5 // % of gross amount
	};

	// Board Lot Table (minimum allowed shares at certain price range)
	var boardLotTable = [
		{
			from: 0.0001,
			to: 0.0099,
			tick: 0.0001,
			size: 1000000
        },
		{
			from: 0.0100,
			to: 0.0490,
			tick: 0.0010,
			size: 100000
        },
		{
			from: 0.0500,
			to: 0.2490,
			tick: 0.0010,
			size: 10000
        },
		{
			from: 0.2500,
			to: 0.4950,
			tick: 0.0050,
			size: 10000
        },
		{
			from: 0.5000,
			to: 4.9900,
			tick: 0.0100,
			size: 1000
        },
		{
			from: 5.0000,
			to: 9.9900,
			tick: 0.0100,
			size: 100
        },
		{
			from: 10.0000,
			to: 19.9800,
			tick: 0.0200,
			size: 100
        },
		{
			from: 20.0000,
			to: 49.9500,
			tick: 0.0500,
			size: 100
        },
		{
			from: 50.0000,
			to: 99.9500,
			tick: 0.0500,
			size: 10
        },
		{
			from: 100.0000,
			to: 199.9000,
			tick: 0.1000,
			size: 10
        },
		{
			from: 200.0000,
			to: 499.8000,
			tick: 0.2000,
			size: 10
        },
		{
			from: 500.0000,
			to: 999.5000,
			tick: 0.5000,
			size: 10
        },
		{
			from: 1000.0000,
			to: 1999.0000,
			tick: 1.0000,
			size: 5
        },
		{
			from: 2000.0000,
			to: 4998.0000,
			tick: 2.0000,
			size: 5
        },
		{
			from: 5000.0000,
			to: 9999.0000,
			tick: 5.0000,
			size: 5
        }
    ];

	// ========================================================================
	// private function to get Board Lot size
	// params: int/float - price
	// return: object - tick size (fluctuation), board lot size (minimum shares)
	// ========================================================================
	var getBoardLot = function (price) {
		for (var i = 0; i < boardLotTable.length; i++) {
			var from = boardLotTable[i].from, // price range (from)
				to = boardLotTable[i].to, // price range (to)
				tick = boardLotTable[i].tick, // tick size (fluctuation)
				size = boardLotTable[i].size, // lot size (minimum shares)
				result;

			// check for price range
			if (price >= from && price <= to) {
				result = {
					tick: tick,
					size: size
				};
				break;
			} else {
				result = "Price is out-of-range by fluctuation or tick size!";
			}
		}
		return result;
	};

	// ========================================================================
	// private function to compute Commission
	// params: int/float - gross amount
	// return: int/float - computed commission
	// ========================================================================
	var computeCommission = function (grossAmount) {
		var commission = charges.commission,
			commissionMinimum = charges.commissionMinimum,
			// get (commission)% of gross amount
			computedCommission = PHSM.whatIsPercentOf(commission, grossAmount);

		// check if computed commission is less than the minimum commission of broker
		if (computedCommission < commissionMinimum) {
			computedCommission = commissionMinimum;
		}
		// round-off to 4 decimal and remove trailing zeros
		computedCommission = +computedCommission.toFixed(4);
		return computedCommission;
	};

	// ========================================================================
	// private function to compute VAT (Value Added Tax)
	// params: int/float - commission
	// return: int/float - computed vat
	// ========================================================================
	var computeVat = function (commission) {
		var vat = charges.vat,
			// get (vat)% of commission
			computedVat = PHSM.whatIsPercentOf(vat, commission);

		// round-off to 4 decimal and remove trailing zeros
		computedVat = +computedVat.toFixed(4);
		return computedVat;
	};

	// ========================================================================
	// private function to compute PSE Transaction Fee
	// params: int/float - gross amount
	// return: int/float - computed pse trans fee
	// ========================================================================
	var computePseTransFee = function (grossAmount) {
		var pseTransFee = charges.pseTransFee,
			// get (pse trans fee)% of gross amount
			computedPseTransFee = PHSM.whatIsPercentOf(pseTransFee, grossAmount);

		// round-off to 4 decimal and remove trailing zeros
		computedPseTransFee = +computedPseTransFee.toFixed(4);
		return computedPseTransFee;
	};

	// ========================================================================
	// private function to compute SCCP Fee (Securities Clearing Corporation of The Philippines)
	// params: int/float - gross amount
	// return: int/float - computed sccp fee
	// ========================================================================
	var computeSccp = function (grossAmount) {
		var sccp = charges.sccp,
			// get (sccp fee)% of gross amount
			computedSccp = PHSM.whatIsPercentOf(sccp, grossAmount);

		// round-off to 4 decimal and remove trailing zeros
		computedSccp = +computedSccp.toFixed(4);
		return computedSccp;
	};

	// ========================================================================
	// private function to compute Sales Tax
	// params: int/float - gross amount
	// return: int/float - computed sales tax
	// ========================================================================
	var computeSalesTax = function (grossAmount) {
		var salesTax = charges.salesTax,
			// get (sales tax)% of gross amount
			computedSalesTax = PHSM.whatIsPercentOf(salesTax, grossAmount);

		// round-off to 4 decimal and remove trailing zeros
		computedSalesTax = +computedSalesTax.toFixed(4);
		return computedSalesTax;
	};

	// ========================================================================
	// private function to compute overall Average
	// params: int/float - total cost, total volume
	// return: int/float - computed overall average
	// ========================================================================
	var computeAverage = function (totalCost, totalVolume) {
		// compute for average
		var average = totalCost / totalVolume;

		// round-off to 4 decimal and remove trailing zeros
		average = +average.toFixed(4);
		return average;
	};

	// ************************************************************************
	// PUBLIC METHODS
	// ************************************************************************
	return {

		// ====================================================================
		// public method to compute percent value
		// params: int/float - percent, target
		// return: int/float - computed value
		// sample: What is 10% of 100? answer = 10
		// where 10% = percent, 100 = target, return = 10
		// ====================================================================
		whatIsPercentOf: function (percent, target) {
			var result = (percent / 100) * target;

			// round-off to 4 decimal and remove trailing zeros
			result = +result.toFixed(4);
			return result;
		},

		// ====================================================================
		// public method to compute percent
		// params: int/float - value, target
		// return: int/float - computed percent
		// sample: 10 is what percent of 100? answer = 10%
		// where 10 = value, 100 = target, return = 10%
		// ====================================================================
		isWhatPercentOf: function (value, target) {
			var result = (value / target) * 100;

			// round-off to 4 decimal and remove trailing zeros
			result = +result.toFixed(4);
			return result;
		},

		// ====================================================================
		// public method to compute percent difference
		// params: int/float - from, to
		// return: int/float - computed percent difference
		// sample: What is the percent difference from 50 to 100? answer = 100%
		// where 50 = from, 100 = to, return = 100%
		// ====================================================================
		getPercentDiff: function (from, to) {
			var diff = to - from,
				percentDiff = PHSM.isWhatPercentOf(diff, from);

			// round-off to 4 decimal and remove trailing zeros
			percentDiff = +percentDiff.toFixed(4);
			return percentDiff;
		},

		// ====================================================================
		// public method to compute how many shares can you buy at certain price with certain money
		// params: int/float - price, money
		// return: object - max volume, gross amount, total cost
		// ====================================================================
		getBuyPreview: function (price, money) {
			// we initialize every computation to assume the total cost
			var boardLot = getBoardLot(price),
				boardLotSize = boardLot.size,
				minimumAmount = price * boardLotSize,
				canBuy = Math.floor(money / minimumAmount), // number of buyable boardlot
				maxVolume = canBuy * boardLotSize,
				grossAmount = PHSM.getGrossAmount(price, maxVolume),
				totalCost = PHSM.getTotalBuyingCost(grossAmount);

			// since total cost must not exceed the current money
			// we re-evaluate the values to include the charges
			if (totalCost > money) {
				canBuy--; // we decrement the number of buyable boardlot
				maxVolume = canBuy * boardLotSize;
				grossAmount = PHSM.getGrossAmount(price, maxVolume);
				totalCost = PHSM.getTotalBuyingCost(grossAmount);
			}

			return {
				maxVolume: maxVolume,
				grossAmount: grossAmount,
				totalCost: totalCost
			};
		},

		// ====================================================================
		// public method to compute Gross Amount (buy/sell cost without the charges)
		// params: int/float - stock price, volume
		// return: int/float - computed gross amount
		// ====================================================================
		getGrossAmount: function (stockPrice, volume) {
			// get gross amount by multiplying stock price * volume
			var grossAmount = stockPrice * volume;

			// round-off to 4 decimal and remove trailing zeros
			grossAmount = +grossAmount.toFixed(4);
			return grossAmount;
		},

		// ====================================================================
		// public method to compute Buying Fees
		// params: int/float - gross amount
		// return: object - commission, vat, pseTransFee, sccp, totalFees
		// ====================================================================
		getBuyingFees: function (grossAmount) {
			var commission = computeCommission(grossAmount),
				vat = computeVat(commission),
				pseTransFee = computePseTransFee(grossAmount),
				sccp = computeSccp(grossAmount),
				totalFees = commission + vat + pseTransFee + sccp;

			// round-off to 4 decimal and remove trailing zeros
			totalFees = +totalFees.toFixed(4);
			return {
				commission: commission,
				vat: vat,
				pseTransFee: pseTransFee,
				sccp: sccp,
				totalFees: totalFees
			};
		},

		// ====================================================================
		// public method to compute Selling Fees
		// params: int/float - gross amount
		// return: object - commission, vat, pseTransFee, sccp, salesTax, totalFees
		// ====================================================================
		getSellingFees: function (grossAmount) {
			var commission = computeCommission(grossAmount),
				vat = computeVat(commission),
				pseTransFee = computePseTransFee(grossAmount),
				sccp = computeSccp(grossAmount),
				salesTax = computeSalesTax(grossAmount),
				totalFees = commission + vat + pseTransFee + sccp + salesTax;

			// round-off to 4 decimal and remove trailing zeros
			totalFees = +totalFees.toFixed(4);
			return {
				commission: commission,
				vat: vat,
				pseTransFee: pseTransFee,
				sccp: sccp,
				salesTax: salesTax,
				totalFees: totalFees
			};
		},

		// ====================================================================
		// public method to compute Total Buying Cost (inclusive of charges)
		// params: int/float - if only one argument was passed,
		//     it will be treated as gross amount, if two arguments was passed,
		//     it will be treated as stock price and volume
		// return: int/float - computed total buying cost
		// ====================================================================
		getTotalBuyingCost: function () {
			// check if passed arguments is a number
			//if (arguments[0].constructor === Number) {
			// if only one argument was passed, we'll use it as gross amount
			if (arguments.length === 1) {
				var grossAmount = arguments[0], // set the first argument as gross amount
					buyingFees = PHSM.getBuyingFees(grossAmount),
					totalBuyingCost = grossAmount + buyingFees.totalFees;
			}
			// if two arguments was passed, we'll use it as stock price and volume
			else if (arguments.length === 2) {
				var stockPrice = arguments[0], // set the first argument as stock price
					volume = arguments[1], // set the second argument as volume
					grossAmount = PHSM.getGrossAmount(stockPrice, volume),
					buyingFees = PHSM.getBuyingFees(grossAmount),
					totalBuyingCost = grossAmount + buyingFees.totalFees;
			}
			//}
			// round-off to 4 decimal and remove trailing zeros
			totalBuyingCost = +totalBuyingCost.toFixed(4);
			return totalBuyingCost;
		},

		// ====================================================================
		// public method to compute Total Selling Net (inclusive of charges)
		// params: int/float - if only one argument was passed,
		//     it will be treated as gross amount, if two arguments was passed,
		//     it will be treated as stock price and volume
		// return: int/float - computed total selling cost
		// ====================================================================
		getTotalSellingNet: function () {
			// check if passed arguments is a number
			//if (arguments[0].constructor === Number) {
			// if only one argument was passed, we'll use it as gross amount
			if (arguments.length === 1) {
				var grossAmount = arguments[0], // set the first argument as gross amount
					sellingFees = PHSM.getSellingFees(grossAmount),
					totalSellingNet = grossAmount - sellingFees.totalFees;
			}
			// if two arguments was passed, we'll use it as stock price and volume
			else if (arguments.length === 2) {
				var stockPrice = arguments[0], // set the first argument as stock price
					volume = arguments[1], // set the second argument as volume
					grossAmount = PHSM.getGrossAmount(stockPrice, volume),
					sellingFees = PHSM.getSellingFees(grossAmount),
					totalSellingNet = grossAmount - sellingFees.totalFees;
			}
			//}
			// round-off to 4 decimal and remove trailing zeros
			totalSellingNet = +totalSellingNet.toFixed(4);
			return totalSellingNet;
		},

		// ====================================================================
		// public method to compute Average base on transaction (price and volume)
		// params: int/float - arguments can be an array of objects (transactions)
		//     which consists of prices and volumes,
		//     following this format: [{stockPrice: 3, volume: 1000}, ...]
		//     or two arguments of price and volume for a single transaction
		// return: int/float - computed average
		// ====================================================================
		getAverage: function () {
			var average;
			// check if the passed argument is an Array,
			// an Array means multiple transactions
			if (arguments[0].constructor === Array) {
				var transactions = arguments[0], // the arguments[0] is the actual array, and we set it to a variable
					stockPrice,
					volume,
					totalCost = null,
					totalVolume = null;
				// loop through the array to get individual transactions
				for (var i = 0; i < transactions.length; i++) {
					stockPrice = transactions[i].stockPrice, // set individual stock price
						volume = transactions[i].volume; // set individual volume
					// compute for the total cost, and add them to get the total
					totalCost += PHSM.getTotalBuyingCost(stockPrice, volume);
					// we get the individual volume, and add them to get the total
					totalVolume += volume;
				}
				// compute for average, using the values from the array loop
				average = computeAverage(totalCost, totalVolume);
			}
			// check if passed arguments is a number,
			// if the argument is not an Array,
			// it means it's just a single transaction
			else /*if (arguments[0].constructor === Number)*/ {
				var stockPrice = arguments[0], // set the first argument as stock price
					volume = arguments[1], // set the second argument as volume
					totalCost = PHSM.getTotalBuyingCost(stockPrice, volume),
					totalVolume = volume;
				// compute for average
				average = computeAverage(totalCost, totalVolume);
			}
			return average;
		},

		// ====================================================================
		// public method to compute Position Size
		// params: int/float - capital, risk percent, stop loss percent
		//         risk percent is relative to capital,
		//         stop loss percent is dependent to trade setup
		// return: int/float - position size in amount
		// view here for more info on position sizing: http://www.chrisperruna.com/2007/09/18/reinforce-position-sizing/
		// ====================================================================
		getPositionSize: function (capital, riskPercent, stopLossPercent) {
			var riskAmount, positionSize;

			riskAmount = PHSM.whatIsPercentOf(riskPercent, capital);
			positionSize = (riskAmount / stopLossPercent) * 100;
			positionSize = +positionSize.toFixed(4);
			
			return {
				riskAmount,
				positionSize
			};
		},

		// ====================================================================
		// public method to compute Expectancy Rate per Trade
		// params: int/float - winning rate, average win, lossing rate, average loss, 
		//		   average risk amount
		//         winning rate and lossing rate are percentage
		//         while average win and average loss can be percentage or actual amount
		// return: int/float - expectancy per trade
		// view here for more info on expectancy: http://www.chrisperruna.com/2007/06/26/position-sizing-and-expectancy/
		// ====================================================================
		getExpectancyRate: function (winRate, aveWin, lossRate, aveLoss, aveRiskAmount) {
			var expectancy;

			// expectancy = (winRate * aveWin) - (lossRate * aveLoss);
			expectancy = ((winRate * aveWin) - (lossRate * aveLoss) / aveRiskAmount);
			// expectancy = expectancy / 100;
			return expectancy;
		},

		// ====================================================================
		// public method to compute Profit (gain/loss)
		// params: int/float - stock last price, "my" average price, volume
		// return: object - actual profit, percent profit
		// ====================================================================
		getProfit: function (sellingPrice, myAveragePrice, volume) {

			// calculate total buying cost
			var totalCost = myAveragePrice * volume,
				totalCost = +totalCost.toFixed(4);

			// calculate total selling net
			var totalNet = PHSM.getTotalSellingNet(sellingPrice, volume);

			// calculate actual profit
			var profit = totalNet - totalCost;
			// calculate actual profit percent
			var profitPercent = PHSM.isWhatPercentOf(profit, totalCost);

			// round-off to 2 decimal and remove trailing zeros
			profit = +profit.toFixed(2);
			profitPercent = +profitPercent.toFixed(2);

			return {
				profit: profit,
				profitPercent: profitPercent
			};

		},

		// ====================================================================
		// public method to compute break-even price from original purchase
		// params: int/float - 
		// return: 
		// ====================================================================
		getBreakEvenPrice: function () {

		},

		// ====================================================================
		// public method to compute high/low of price
		// params: Array
		// return: int/float - max and min
		// ====================================================================
		getHighLow: function (arr) {

			var max = Math.max(...arr),
				min = Math.min(...arr);

			return {
				max: max,
				min: min
			};
		},
		
		// ====================================================================
		// public method to compute compunding
		// params: int/float - amount, percent, cycle, additionPerCycle
		// return: int/float - compunded amount, cycle, amount increase, percent increase, total investment
		// ====================================================================
		getCompounding: function(amount, percent, cycle, additionPerCycle = 0) {
			var totalInvestment = amount + (additionPerCycle * (cycle - 1)); // get total investment including additionPerCycle for every cycle

			for (var i = 0; i < cycle; i++) {
				var interest = PHSM.whatIsPercentOf(percent, amount);
				// check if last iteration
				if(i === cycle - 1) {
					amount += interest;
				}
				else {
					amount += interest + additionPerCycle;
				}
			}
			
			var percentIncrease = PHSM.getPercentDiff(totalInvestment, amount),
				amountIncrease = amount - totalInvestment;
			
			return {
				compoundedAmount: amount,
				cycle: cycle,
				amountIncrease: amountIncrease,
				percentIncrease: percentIncrease,
				totalInvestment: totalInvestment
			};
		}

	};

})();