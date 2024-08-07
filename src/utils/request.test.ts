import * as http from "node:http";
import { request } from "./request";

jest.mock('https');

describe('request', () => {
  let requestOptions: http.RequestOptions;
  let subject: any;
  let response: any = undefined;

  const verifyRequest = (payload: any) => {
    console.log("TWO");
    response = payload;
    expect(payload).toEqual('');
  }

  describe('when successful', () => {
    requestOptions = {
      method: 'GET',
      host: 'https://foo.bar.com',
      path: 'my/new/routes?someParam=true',
    };


    beforeEach(async () => {
      subject = request(requestOptions)
      await subject(verifyRequest);
    });

    it('should verify the response', () => {
      expect(response).toEqual('');
    });
  });
});