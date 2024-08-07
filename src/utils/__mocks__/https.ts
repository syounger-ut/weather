import EventEmitter from "node:events";

const https = {
  request: jest.fn((url, callback) => {
    const reqTwo = new EventEmitter();

    reqTwo.on('data', () => {
      console.log("HERE IN DATA");
    });

    reqTwo.on('error', () => {
      console.log("ERROR");
    });

    reqTwo.on('end', () => {
      console.log("END");
    });

    callback(reqTwo);

    return {
      on: () => ({
        end: () => {
          console.log("ENDING");
          reqTwo.emit('data', JSON.stringify({ foo: 'bar '}));
          reqTwo.emit('end');
          reqTwo.removeAllListeners();
          return reqTwo;
        }
      }),
    };
  }),
};

// const response = new EventEmitter();
// // response.statusCode = 200;
//
// // The response starts by emitting a 'request' event.
// req.emit('request', response);
//
// // The response body is returned in the 'data' event, followed by 'end'.
// response.emit('data', 'page contents');
// response.emit('end');
//
// // Indicate that no more responses will be sent.
// req.emit('close');

module.exports = https;