import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda/trigger/api-gateway-proxy";

export interface  QueryStringParams extends APIGatewayProxyEventQueryStringParameters {
  columns: string;
  year: string;
  monthMin: string;
  monthMax: string;
  dayMin: string;
  dayMax: string;
  hourMin: string;
  hourMax: string;
}
export class QueryStringParamValidator {
  public constructor(
    private queryStringParams: Partial<QueryStringParams> | null,
  ) {}

  public valid(): boolean {
    if (!this.queryParamsExist()) {
      return false;
    }

    return this.missingParams().length === 0;
  }

  public returnError(): string {
    if (!this.queryParamsExist()) {
      return 'Missing required query parameters';
    }

    return `Missing required query parameters: ${this.missingParams().join(', ')}`;
  }

  private queryParamsExist(): boolean {
    return !!this.queryStringParams;
  }

  private missingParams(): string[] {
    return ['columns', 'year', 'monthMin', 'monthMax', 'dayMin', 'dayMax', 'hourMin', 'hourMax']
      .filter((param) => this.queryStringParams && this.queryStringParams[param] === undefined);
  }
}
