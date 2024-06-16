export const parsePayload = (payload: TempestDeviceObservation) => ({
  status: {
    statusCode: payload.status.status_code,
    statusMessage: payload.status.status_message,
  },
  deviceId: payload.device_id,
  type: payload.type,
  bucketStepMinutes: payload.bucket_step_minutes,
  source: payload.source,
  obs: payload.obs.map((obs) => ({
    dateTime: obs[0], // Epoch (Seconds UTC)
    windLull: obs[1], // Wind Lull (m/s)
    windAvg: obs[2], // Wind Avg (m/s)
    windGust: obs[3], // Wind Gust (m/s)
    windDirection: obs[4], // Wind Direction (degrees)
    windSampleInterval: obs[5], // Wind Sample Interval (seconds)
    pressure: obs[6], // Pressure (MB)
    airTemperature: obs[7], // Air Temperature (C)
    relativeHumidity: obs[8], // Relative Humidity (%)
    illuminance: obs[9], // Illuminance (lux)
    uv: obs[10], // UV (index)
    solarRadiation: obs[11], // Solar Radiation (W/m^2)
    rainAccumulation: obs[12], // Rain Accumulation (mm)
    precipitionType: obs[13],
    avgStrikeDistance: obs[14],  // 14 - Average Strike Distance (km)
    strikeCount: obs[15],  // 15 - Strike Count
    battery: obs[16],  // 16 - Battery (volts)
    reportInterval: obs[17],  // 17 - Report Interval (minutes)
    localDayRainAccumultation: obs[18],  // 18 - Local Day Rain Accumulation (mm)
    ncRainAccumultation: obs[19],  // 19 - NC Rain Accumulation (mm)
    localDayNCRainAccumultation: obs[20],  // 20 - Local Day NC Rain Accumulation (mm)
    precipitationAnalysis: obs[21],  // 21 - Precipitation Analysis Type (0 = none, 1 = Rain Check with user display on, 2 = Rain Check with user
  })),
});

