import { QueryStringParams } from "../services/query-string-param-validator";

export class ObservationQueries {
  private static TABLE_NAME = 'observations';

  public static getObservationsByDateRange({
                                             columns,
                                             year,
                                             monthMin,
                                             monthMax,
                                             dayMin,
                                             dayMax,
                                             hourMin = '00',
                                             hourMax = '23',
                                           }: QueryStringParams): string {
    return `\n
      SELECT ${columns} FROM ${this.TABLE_NAME}\n
      WHERE year='${year}'\n
      AND month>='${monthMin}' AND month<='${monthMax}'\n
      AND day>='${dayMin}' AND day<='${dayMax}'\n
      AND hour>='${hourMin}' AND hour<='${hourMax}'\n
      ORDER BY windDirection DESC LIMIT 100;`;
  }
}
