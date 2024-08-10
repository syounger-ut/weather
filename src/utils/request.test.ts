import EventEmitter from "node:events";

const mockResponse = jest.fn();
const mockEvent = jest.fn();
import { mockRequest } from './__mocks__/https';

import * as http from "node:http";
import { request } from "./request";

jest.mock('https', () => ({
  request: jest.fn().mockImplementation(mockRequest(mockEvent, mockResponse)),
}));

const requestOptions: http.RequestOptions = {
  method: 'GET',
  host: 'https://foo.bar.com',
  path: 'my/new/routes?someParam=true',
};

const publishEvent = (eventName: string, event: EventEmitter, eventMessage?: Record<string, unknown>): void => {
  event.emit(eventName, JSON.stringify(eventMessage));
  event.emit('end');
  event.removeAllListeners();
};

describe('request', () => {
  let subject: any;
  let response: any = undefined;

  const handleResponse = (payload: any) => {
    response = payload;
  };

  const dispatchRequest = (eventName: string, expectedReturn?: Record<string, unknown>): Promise<Record<string, unknown>> => {
    const event = new EventEmitter();
    mockResponse.mockReturnValue(expectedReturn);
    mockEvent.mockReturnValue(event);

    subject = request(requestOptions)
    const res =  subject(handleResponse);

    publishEvent(eventName, event, expectedReturn);

    return res;
  };

  describe('when successful', () => {
    const expectedReturn = { hello: 'world' };

    beforeEach(async () => {
      await dispatchRequest('data', expectedReturn);
    });

    it('should verify the response', () => {
      expect(response).toEqual(expectedReturn);
    });
  });

  describe('when error', () => {
    const expectedReturn = { message: 'Something went wrong test' };

    beforeEach(async () => {
      await dispatchRequest('error', expectedReturn);
    });

    it('should return an error', () => {
      expect(response).toEqual(expectedReturn);
    });
  });

  describe('when end', () => {
    describe('when there is no payload', () => {
      const expectedReturn = undefined;

      beforeEach(async () => {
        await dispatchRequest('end');
      });

      it('should return undefined', () => {
        expect(response).toEqual(expectedReturn);
      });
    });
  });
});