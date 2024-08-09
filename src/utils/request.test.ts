const mockResponse = jest.fn();
import { mockRequest } from './__mocks__/https';

import * as http from "node:http";
import { request } from "./request";

jest.mock('https', () => ({
  request: jest.fn().mockImplementation(mockRequest(mockResponse)),
}));

describe('request', () => {
  let requestOptions: http.RequestOptions;
  let subject: any;
  let response: any = undefined;

  const handleResponse = (payload: any) => {
    response = payload;
  };

  describe('when successful', () => {
    requestOptions = {
      method: 'GET',
      host: 'https://foo.bar.com',
      path: 'my/new/routes?someParam=true',
    };

    const expectedReturn = { hello: 'world' };

    beforeEach(async () => {
      mockResponse.mockReturnValue(expectedReturn);
      subject = request(requestOptions)
      await subject(handleResponse);
    });

    it('should verify the response', () => {
      expect(response).toEqual(expectedReturn);
    });
  });
});