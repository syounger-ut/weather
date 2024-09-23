export class QueryPreparation {
  public queryResponse = {};

  public valid = jest.fn().mockReturnValue(true);

  public responseText = jest.fn().mockReturnValue('QueryPreparation mock error');
}
