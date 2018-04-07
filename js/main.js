var phsmApp = new Vue({
  el: '#phsm-app',
  data: {
		whatIsPercentOfArg1: '',
		whatIsPercentOfArg2: '',
		isWhatPercentOfArg1: '',
		isWhatPercentOfArg2: '',
		percentDiffArg1: '',
		percentDiffArg2: '',
		boardLotArg1: '',
		grossAmountArg1: '',
		grossAmountArg2: ''	,
		buyingFeesArg1: '',
		sellingFeesArg1: '',
		totalBuyingCostArg1: '',
		totalBuyingCostArg2: '',
		totalBuyingCostArg3: '',
		totalSellingNetArg1: '',
		totalSellingNetArg2: '',
		totalSellingNetArg3: '',
		buyPreviewArg1: '',
		buyPreviewArg2: '',
		averageArg1: '',
		averageArg2: '',
		profitArg1: '',
		profitArg2: '',
		profitArg3: '',
		positionSizeArg1: '',
		positionSizeArg2: '',
		positionSizeArg3: '',
		expectancyRateArg1: '',
		expectancyRateArg2: '',
		expectancyRateArg3: '',
		expectancyRateArg4: '',
		expectancyRateArg5: '',
		compoundingArg1: '',
		compoundingArg2: '',
		compoundingArg3: '',
		compoundingArg4: ''
  },
	computed: {
		whatIsPercentOf: function() {
			return PHSM.whatIsPercentOf(this.whatIsPercentOfArg1, this.whatIsPercentOfArg2);
		},
		isWhatPercentOf: function() {
			return PHSM.isWhatPercentOf(this.isWhatPercentOfArg1, this.isWhatPercentOfArg2);
		},
		percentDiff: function() {
			return PHSM.getPercentDiff(this.percentDiffArg1, this.percentDiffArg2);
		},
		boardLot: function() {
			return PHSM.getBoardLot(this.boardLotArg1);
		},
		grossAmount: function() {
			return PHSM.getGrossAmount(this.grossAmountArg1, this.grossAmountArg2);
		},
		buyingFees: function() {
			return PHSM.getBuyingFees(this.buyingFeesArg1);
		},
		sellingFees: function() {
			return PHSM.getSellingFees(this.sellingFeesArg1);
		},
		totalBuyingCost1: function() {
			return PHSM.getTotalBuyingCost(this.totalBuyingCostArg1);
		},
		totalBuyingCost2: function() {
			return PHSM.getTotalBuyingCost(this.totalBuyingCostArg2, this.totalBuyingCostArg3);
		},
		totalSellingNet1: function() {
			return PHSM.getTotalSellingNet(this.totalSellingNetArg1);
		},
		totalSellingNet2: function() {
			return PHSM.getTotalSellingNet(this.totalSellingNetArg2, this.totalSellingNetArg3);
		},
		buyPreview: function() {
			return PHSM.getBuyPreview(this.buyPreviewArg1, this.buyPreviewArg2);
		},
		average: function() {
			return PHSM.getAverage(this.averageArg1, this.averageArg2);
		},
		profit: function() {
			return PHSM.getProfit(this.profitArg1, this.profitArg2, this.profitArg3);
		},
		positionSize: function() {
			return PHSM.getPositionSize(this.positionSizeArg1, this.positionSizeArg2, this.positionSizeArg3);
		},
		expectancyRate: function() {
			return PHSM.getExpectancyRate(this.expectancyRateArg1, this.expectancyRateArg2, this.expectancyRateArg3, this.expectancyRateArg4, this.expectancyRateArg5);
		},
		compounding: function() {
			return PHSM.getCompounding(this.compoundingArg1, this.compoundingArg2, this.compoundingArg3, this.compoundingArg4);
		}
	}
});