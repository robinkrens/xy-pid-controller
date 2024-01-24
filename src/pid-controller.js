class PIDController {
	constructor() {
    	this.PIDParams = {proportionalGain: 2, integralGain: 0.0, derivativeGain: 2, iMin: -1, iMax: 1, integralSaturation: false, derivativeInitialized: false, outputMax: 1, outputMin: -1, magnitude: 10, force: 0, derivativeMeasurement: "Velocity"};
		this.valueLast; 
		this.errorLast;
    	this.integrationStored = 0;
    	this.velocity;
	}
	Reset() {
		this.derivativeInitialized = false;
	}
	Update(dt, currentValue, targetValue) {
		if (dt <= 0) {
			return;
		}
		var error = targetValue - currentValue;
        
		var P = this.PIDParams.proportionalGain * error;
        
		this.integrationStored = Math.min(Math.max(this.integrationStored + (error * dt), this.PIDParams.iMin), this.PIDParams.iMax);
		var I = this.PIDParams.integralGain * this.integrationStored;

		var errorRateOfChange = (error - this.errorLast) / dt;
		this.errorLast = error;

		var valueRateOfChange = (currentValue - this.valueLast) / dt;
		this.valueLast = currentValue;
		this.velocity = valueRateOfChange;

		var deriveMeasure = 0;

		if (this.derivativeInitialized) {
			if (this.PIDParams.derivativeMeasurement == "Velocity") {
				deriveMeasure = -valueRateOfChange;
			} else {
			   deriveMeasure = errorRateOfChange;
			}
		} else {
			this.derivativeInitialized = true;
		}
		var D = this.PIDParams.derivativeGain * deriveMeasure;
		var result = P + I + D;
		result *= this.PIDParams.magnitude;
		this.PIDParams.force = result * 60; /* this routine is called ~60seconds */

		return result;
		//return Math.min(Math.max((result, this.PIDParams.outputMin), this.PIDParams.outputMax));
	}
}

export default PIDController;
