class PIDController {
	constructor() {
		this.PIDParams = {
			proportionalGain: 2,
			integralGain: 0.0,
			derivativeGain: 2,
			iMin: -1,
			iMax: 1,
			integralSaturation: false,
			derivativeInitialized: false,
			outputMax: 1,
			outputMin: -1,
			magnitude: 10,
			force: {x: 0, y: 0},
			forceMagnitude: 0,
			derivativeMeasurement: "Velocity"
		};
		this.valueLast = {x: 0, y: 0};
		this.errorLast = {x: 0, y: 0};
		this.integrationStored = {x: 0, y: 0};
		this.velocity = {x: 0, y: 0};
	}

	Reset() {
		this.derivativeInitialized = false;
	}

	Update(dt, currentValue, targetValue) {
		if (dt <= 0) {
			return {x: 0, y: 0};
		}

		const error = {
			x: targetValue.x - currentValue.x,
			y: targetValue.y - currentValue.y
		};

		const P = {
			x: this.PIDParams.proportionalGain * error.x,
			y: this.PIDParams.proportionalGain * error.y
		};

		this.integrationStored = {
			x: Math.min(
				Math.max(this.integrationStored.x + (error.x * dt), this.PIDParams.iMin),
				this.PIDParams.iMax
			),
			y: Math.min(
				Math.max(this.integrationStored.y + (error.y * dt), this.PIDParams.iMin),
				this.PIDParams.iMax
			)
		};

		const I = {
			x: this.PIDParams.integralGain * this.integrationStored.x,
			y: this.PIDParams.integralGain * this.integrationStored.y
		};

		const errorRateOfChange = {
			x: (error.x - this.errorLast.x) / dt,
			y: (error.y - this.errorLast.y) / dt
		};

		this.errorLast = error;

		const valueRateOfChange = {
			x: (currentValue.x - this.valueLast.x) / dt,
			y: (currentValue.y - this.valueLast.y) / dt
		};

		this.valueLast = currentValue;
		this.velocity = valueRateOfChange;

		let deriveMeasure = {x: 0, y: 0};

		if (this.derivativeInitialized) {
			if (this.PIDParams.derivativeMeasurement === "Velocity") {
				deriveMeasure = {
					x: -valueRateOfChange.x,
					y: -valueRateOfChange.y
				};
			} else {
				deriveMeasure = errorRateOfChange;
			}
		} else {
			this.derivativeInitialized = true;
		}

		const D = {
			x: this.PIDParams.derivativeGain * deriveMeasure.x,
			y: this.PIDParams.derivativeGain * deriveMeasure.y
		};

		const result = {
			x: P.x + I.x + D.x,
			y: P.y + I.y + D.y
		};

		result.x *= this.PIDParams.magnitude;
		result.y *= this.PIDParams.magnitude;

		this.PIDParams.force = {
			x: result.x * 60, // this routine is called ~60 seconds
			y: result.y * 60
		};

		this.PIDParams.forceMagnitude = Math.sqrt(result.x ** 2 + result.y ** 2) * 60;

		return result;
	}
}
export default PIDController;
