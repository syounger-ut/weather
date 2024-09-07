import 'dotenv/config';

const handler = async (_event: unknown) => {

  return {
    statusCode: 200,
    body: {
      test: 'success',
    },
  };
}

module.exports = { handler };
