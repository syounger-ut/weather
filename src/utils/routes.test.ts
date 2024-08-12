import { routes } from './routes';

describe('routes', () => {
  const routePaths: string[] = Object.keys(routes);

  describe.each(routePaths)('route %s', (route, options) => {
    it('should construct the expected path', () => {
      expect(routes[route].path).toEqual(routes[route].example);
    })
  });
});
