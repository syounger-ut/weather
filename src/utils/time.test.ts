import { getTodaysDate } from "./time";

describe('getTodaysDate', () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2020-01-01'));
  });

  it('should return the date in format YYYY-MM-DD', () => {
    expect(getTodaysDate()).toEqual('2020-01-01');
  });
});