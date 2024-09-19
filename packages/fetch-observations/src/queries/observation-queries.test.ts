import { ObservationQueries } from "./observation-queries";

describe('ObservationQueries', () => {
  describe('.getObservationsByDateRange', () => {
    describe('when called with a year, month, day, hourMin, and hourMax', () => {
      const columns = ['windDirection', 'temperature', 'humidity'].join(',');
      const dateProps = { columns, year: '2021', month: '01', day: '01', hourMin: '00', hourMax: '23' };
      let subject: string;

      const expectedQuery = `\n
      SELECT windDirection,temperature,humidity FROM observations\n
      WHERE year='2021' AND month='01' AND day='01' AND hour>='00' AND hour<='23'\n
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
