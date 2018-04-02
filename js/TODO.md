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
* limit order
* probability computation ("what if I buy/sell at xx price, auto computation..")
* change commission base on broker, have the ablity to change broker, perhaps have a ready-list of brokers with their commission
* bullet proofing on functions parameters (null, number of params passed, type of data passed.. etc..)
* optimized code! (variables, methods, etc..)