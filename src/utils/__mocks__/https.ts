import EventEmitter from "node:events";

export const mockRequest = (mockReturnValue: () =>  Record<string, unknown>) => {
  return (url: string, callback: (request: any) => void) => {
    const req = new EventEmitter();
    req.on('data', jest.fn());
    req.on('error', jest.fn());
    req.on('end', jest.fn());

    callback(req);

    return {
      on: jest.fn().mockReturnValue({
        end: jest.fn().mockImplementation(() => {
          req.emit('data', JSON.stringify(mockReturnValue()));
          req.emit('end');
          req.removeAllListeners();
          return req;
        }),
      }),
    };
  }
};
