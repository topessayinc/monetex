class InvestmentPlan{
    /**
     * 
     * @param {Number} rate fraction of the investment tha will be returned sfter every interval
     * @param {String} title title of the plan 
     * @param {Number} minimum minimum amount that can be invested
     * @param {Number} maximum maximum amount that can be invested
     * @param {Number} duration time taken to complete the investment in hours
     * @param {Number} interval the number of rounds the investment is going to given back
     */
    constructor(rate, title, minimum, maximum, duration, interval){
        this.title = title;
        this.rate = rate;
        this.minimum = minimum;
        this.maximumum = maximum;
        this.duration = duration;
        this.interval = interval;
        this.intervalReturn =rate/interval;
        this.stepLimit = duration/interval;
    }
    /**
     * 
     * @param {Number} amount amount to be invested
     * @returns {InvestmentPlan}
     */
    invest(amount){
        this.intervalReturn *= amount;
        return this;
    }
}

/**
 * 
 * @param {Number} amount amount to be invested
 * @returns {InvestmentPlan} object of investment plan
 */
function choosePlan(amount){
    if(amount< 100){
        return null;
    }else if(amount >= 100 && amount < 5000){
        return new InvestmentPlan(1.02, "Beginner", 100, 5000, 48, 1).invest(amount);
    }else if (amount >= 5000 && amount < 10000){
        return new InvestmentPlan(1.05, "Premium", 5000, 10000, 168, 1).invest(amount)
    }else if(amount >= 10000 && amount < 20000){
        return new InvestmentPlan(1.20, "Platinum", 10000, 20000, 336, 1).invest(amount)
    }else if(amount >= 20000 && amount <= 100000){
        return new InvestmentPlan(1.35, "Professional", 20000, 100000, 672, 1).invest(amount)
    }else return null
}

module.exports = {choosePlan};