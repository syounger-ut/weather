import { ObservationQueries } from "./observation-queries";
import { QueryStringParams } from "../services/query-string-param-validator";

describe('ObservationQueries', () => {
  describe('.getObservationsByDateRange', () => {
    describe('when called with a year, month, day, hourMin, and hourMax', () => {
      const columns = ['windDirection', 'temperature', 'humidity'].join(',');
      const dateProps: QueryStringParams = {
        columns,
        year: '2021',
        monthMin: '01',
        monthMax: '02',
        dayMin: '03',
        dayMax: '04',
        hourMin: '05',
        hourMax: '06',
      };
      let subject: string;

      const expectedQuery = `\n
      SELECT windDirection,temperature,humidity FROM observations\n
      WHERE year='2021'\n
      AND month>='01' AND month<='02'\n
      AND day>='03' AND day<='04'\n
      AND hour>='05' AND hour<='06'\n
      ORDER BY windDirection DESC LIMIT 100;`;

      beforeEach(() => {
        subject = ObservationQueries.getObservationsByDateRange(dateProps);
      });

      it('returns a SQL query string', () => {
        expect(subject).toEqual(expectedQuery);
      });
    });
  });
});
