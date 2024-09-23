export const mockValidReturnValue = jest.fn().mockReturnValue(true);
export const mockReturnError = jest.fn().mockReturnValue('QueryStringParamValidator mock error');

export class QueryStringParamValidator {
  public valid = mockValidReturnValue;

  public returnError = mockReturnError;
}
