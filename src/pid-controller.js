class PIDController {
	//public enum DerivativeMeasurement {
	//    Velocity,
	//    ErrorRateOfChange
	//}
	constructor() {
    	this.PIDParams = {proportionalGain: 50, integralGain: 0.01, derivativeGain: 35, outputMin: -1, outputMax: 1, integralSaturation: false, derivativeInitialized: false};
		this.valueLast; 
		this.errorLast;
    	this.integrationStored;
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
        
		this.integrationStored = Math.min(Math.max(this.integrationStored + (error * dt), -this.integralSaturation), -this.integralSaturation);
		var I = this.integralGain * this.integrationStored;

		var errorRateOfChange = (error - this.errorLast) / dt;
		this.errorLast = error;

		var valueRateOfChange = (currentValue - this.valueLast) / dt;
		this.valueLast = currentValue;
		this.velocity = valueRateOfChange;

		var deriveMeasure = 0;

		if (this.derivativeInitialized) {
			//if (derivativeMeasurement == DerivativeMeasurement.Velocity) {
			deriveMeasure = -valueRateOfChange;
			//} else {
			//   deriveMeasure = errorRateOfChange;
			//}
		} else {
			this.derivativeInitialized = true;
		}

		var D = this.PIDParams.derivativeGain * deriveMeasure;
		var result = P + D;
		return result;

		//return Math.min(Math.max((result, this.outputMin), this.outputMax));
	}

	// float AngleDifference(float a, float b) {
	//     return (a - b + 540) % 360 - 180;   //calculate modular difference, and remap to [-180, 180]
	// }

	// public float UpdateAngle(float dt, float currentAngle, float targetAngle) {
	//     if (dt <= 0) throw new ArgumentOutOfRangeException(nameof(dt));
	//     float error = AngleDifference(targetAngle, currentAngle);

	//     //calculate P term
	//     float P = proportionalGain * error;

	//     //calculate I term
	//     integrationStored = Mathf.Clamp(integrationStored + (error * dt), -integralSaturation, integralSaturation);
	//     float I = integralGain * integrationStored;

	//     //calculate both D terms
	//     float errorRateOfChange = AngleDifference(error, errorLast) / dt;
	//     errorLast = error;

	//     float valueRateOfChange = AngleDifference(currentAngle, valueLast) / dt;
	//     valueLast = currentAngle;
	//     velocity = valueRateOfChange;

	//     //choose D term to use
	//     float deriveMeasure = 0;

	//     if (derivativeInitialized) {
	//         if (derivativeMeasurement == DerivativeMeasurement.Velocity) {
	//             deriveMeasure = -valueRateOfChange;
	//         } else {
	//             deriveMeasure = errorRateOfChange;
	//         }
	//     } else {
	//         derivativeInitialized = true;
	//     }

	//     float D = derivativeGain * deriveMeasure;

	//     float result = P + I + D;

	//     return Mathf.Clamp(result, outputMin, outputMax);
	// }
}

export default PIDController;
