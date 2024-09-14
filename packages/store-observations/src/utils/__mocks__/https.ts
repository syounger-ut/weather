import EventEmitter from "node:events";

export const mockRequest = (event: () => EventEmitter) => {
  return (url: string, callback: (request: unknown) => void) => {
    const req = event();
    callback(req);

    return {
      on: jest.fn().mockReturnValue({
        end: jest.fn().mockImplementation(() => {
          return req;
        }),
      }),
    };
  }
};
