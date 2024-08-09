import EventEmitter from "node:events";

export const mockRequest = (event: () => EventEmitter, mockReturnValue: () =>  Record<string, unknown>) => {
  return (url: string, callback: (request: any) => void) => {
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
