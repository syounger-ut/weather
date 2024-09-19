type DateProps = { year: string, month: string, day: string, hourMin: string, hourMax: string };
export class ObservationQueries {
  private static TABLE_NAME = 'observations';

  public static getObservationsByDateRange(columns: string[], { year, month, day, hourMin = '00', hourMax = '23' }: DateProps): string {
    return `\n
      SELECT ${columns.join(',')} FROM ${this.TABLE_NAME}\n
      WHERE year='${year}' AND month='${month}' AND day='${day}' AND hour>='${hourMin}' AND hour<='${hourMax}'\n
      ORDER BY windDirection DESC LIMIT 100;`;
  }
}
