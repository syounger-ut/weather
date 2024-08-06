type TempestDeviceObservation = {
  status: {
    status_code: number;
    status_message: string;
  };
  device_id: number;
  type: string;
  source: string;
  summary: {
    pressure_trend: string;
    strike_count_1h: number;
    strike_count_3h: number;
    precip_total_1h: number;
    strike_last_dist: number;
    strike_last_epoch: number;
    precip_accum_local_yesterday: number;
    precip_accum_local_yesterday_final: number;
    precip_analysis_type_yesterday: number;
    feels_like: number;
    heat_index: number;
    wind_chill: number;
  };
  obs: number[][];
}

// 0 - Epoch (Seconds UTC)
// 1 - Wind Lull (m/s)
// 2 - Wind Avg (m/s)
// 3 - Wind Gust (m/s)
// 4 - Wind Direction (degrees)
// 5 - Wind Sample Interval (seconds)
// 6 - Pressure (MB)
// 7 - Air Temperature (C)
// 8 - Relative Humidity (%)
// 9 - Illuminance (lux)
// 10 - UV (index)
// 11 - Solar Radiation (W/m^2)
// 12 - Rain Accumulation (mm)
// 13 - Precipitation Type (0 = none, 1 = rain, 2 = hail, 3 = rain + hail (experimental))
// 14 - Average Strike Distance (km)
// 15 - Strike Count
// 16 - Battery (volts)
// 17 - Report Interval (minutes)
// 18 - Local Day Rain Accumulation (mm)
// 19 - NC Rain Accumulation (mm)
// 20 - Local Day NC Rain Accumulation (mm)
// 21 - Precipitation Aanalysis Type (0 = none, 1 = Rain Check with user display on, 2 = Rain Check with user display off)

enum Precipitation {
  None = 0,
  Rain = 1,
  Hail = 2,
  RainHail = 3,
}

enum PrecipitationAnalysis {
  None = 0,
  RainCheckWithDisplayOn = 1,
  RainCheckWithUserDisplayOff = 2,
}

type TempestObservation = {
  dateTime: string; // Epoch (Seconds UTC)
  windLull: number; // Wind Lull (m/s)
  windAvg: number; // Wind Avg (m/s)
  windGust: number; // Wind Gust (m/s)
  windDirection: number; // Wind Direction (degrees)
  windSampleInterval: number; // Wind Sample Interval (seconds)
  pressure: number; // Pressure (MB)
  airTemperature: number; // Air Temperature (C)
  relativeHumidity: number; // Relative Humidity (%)
  illuminance: number; // Illuminance (lux)
  uv: number; // UV (index)
  solarRadiation: number; // Solar Radiation (W/m^2)
  rainAccumulation: number; // Rain Accumulation (mm)
  precipitionType: Precipitation;
  avgStrikeDistance: number;  // 14 - Average Strike Distance (km)
  strikeCount: number;  // 15 - Strike Count
  battery: number;  // 16 - Battery (volts)
  reportInterval: number;  // 17 - Report Interval (minutes)
  localDayRainAccumultation: number;  // 18 - Local Day Rain Accumulation (mm)
  ncRainAccumultation: number;  // 19 - NC Rain Accumulation (mm)
  localDayNCRainAccumultation: number;  // 20 - Local Day NC Rain Accumulation (mm)
  precipitationAnalysis: PrecipitationAnalysis;  // 21 - Precipitation Analysis Type (0 = none, 1 = Rain Check with user display on, 2 = Rain Check with user
}
