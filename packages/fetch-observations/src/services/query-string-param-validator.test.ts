import { QueryStringParams, QueryStringParamValidator } from "./query-string-param-validator";

const queryStringParams: QueryStringParams = {
  columns: 'column1,column2',
  year: '2020',
  monthMin: '01',
  monthMax: '01',
  dayMin: '01',
  dayMax: '01',
  hourMin: '00',
  hourMax: '23',
};

const invalidParams = { ...queryStringParams, columns: undefined };

describe('QueryStringParamValidator', () => {
  describe('#valid', () => {
    describe('when all required query parameters are present', () => {
      const service = new QueryStringParamValidator(queryStringParams);

      it('returns true', () => {
        expect(service.valid()).toBe(true);
      });
    });

    describe('when some required query parameters are missing', () => {
      const invalidService = new QueryStringParamValidator(invalidParams);

      it('returns false', () => {
        expect(invalidService.valid()).toBe(false);
      });
    });

    describe('when no query parameters are present', () => {
      const service = new QueryStringParamValidator(null);

      it('returns false', () => {
        expect(service.valid()).toBe(false);
      });
    });
  });

  describe('#returnError', () => {
    describe('when some required query parameters are missing', () => {
      const service = new QueryStringParamValidator(invalidParams);

      it('returns a string with the missing parameters', () => {
        expect(service.returnError()).toBe('Missing required query parameters: columns');
      });
    });

    describe('when no query parameters are present', () => {
      const service = new QueryStringParamValidator(null);

      it('returns a string with all required parameters', () => {
        expect(service.returnError()).toBe('Missing required query parameters');
      });
    });
  });
});
