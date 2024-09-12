type DateProps = { year: string, day: string, hourMin: string, hourMax: string };
export class ObservationQueries {
  private static TABLE_NAME = 'observations';

  public static getObservationsByDateRange(columns: string[], { year, day, hourMin = '00', hourMax = '23' }: DateProps): string {
    return `
      SELECT ${columns.join(',')} FROM ${this.TABLE_NAME}
      WHERE year='${year}' AND day='${day}' AND hour >= '${hourMin}' AND hour <= '${hourMax}'
      ORDER BY windDirection DESC LIMIT 100;
    `;
  }
}
