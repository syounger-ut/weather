import { routes } from './routes';

describe('routes', () => {
  const routePaths: string[] = Object.keys(routes);

  describe.each(routePaths)('route %s', (route) => {
    const routeObj = routes[route]({ timeStart: 0, timeEnd: 1 });

    it('should construct the expected path', () => {
      expect(routeObj.path).toEqual(routeObj.example);
    });
  });
});
