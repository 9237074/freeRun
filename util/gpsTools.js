class GpsTool {
	constructor(arg) {
		// π
		this.PI = 3.14159265358979324
		this.x_pi = 52.35987755982988
	}
	// 转换lat
	transformLat(x, y) {
		let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
		return ret;
	}
	// 转换lon
	transformLon(x, y) {
		let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
		return ret;
	}

	outOfChina(lat, lon) {
		if (lon < 72.004 || lon > 137.8347)
			return true;
		if (lat < 0.8293 || lat > 55.8271)
			return true;
		return false;
	}

	delta(lat, lon) {
		// Krasovsky 1940
		//
		// a = 6378245.0, 1/f = 298.3
		// b = a * (1 - f)
		// ee = (a^2 - b^2) / a^2;
		let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
		let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
		let dLat = this.transformLat(lon - 105.0, lat - 35.0);
		let dLon = this.transformLon(lon - 105.0, lat - 35.0);
		let radLat = lat / 180.0 * this.PI;
		let magic = Math.sin(radLat);
		magic = 1 - ee * magic * magic;
		let sqrtMagic = Math.sqrt(magic);
		dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
		dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
		return {
			'latitude': dLat,
			'longitude': dLon
		}
	}
	// two point's distance
	distance(latA, lonA, latB, lonB) {
		let earthR = 6371000.;
		let x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
		let y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
		let s = x + y;
		if (s > 1) s = 1;
		if (s < -1) s = -1;
		let alpha = Math.acos(s);
		let distance = alpha * earthR;
		// console.log(
		// 	`
		// 	本次计算的
		// 	latA =${latA},
		// 	lonA=${lonA},
		// 	latB =${latB},
		// 	lonB=${lonB},
		// 	distance=${distance}
		// `
		// )
		return distance;
	}
	//WGS-84 to GCJ-02
	gcj_encrypt(wgsLat, wgsLon) {
		if (this.outOfChina(wgsLat, wgsLon))
			return {
				'latitude': wgsLat,
				'longitude': wgsLon
			};

		let d = this.delta(wgsLat, wgsLon);
		return {
			'latitude': wgsLat + d.latitude,
			'longitude': wgsLon + d.longitude
		}
	}
}



export default GpsTool
