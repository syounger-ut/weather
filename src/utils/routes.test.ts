import { routes } from './routes';

describe('routes', () => {
  const routePaths: string[] = Object.keys(routes);

  describe.each(routePaths)('route %s', (route, _options) => {
    const routeObj = routes[route]({ startTime: 0, endTime: 1 });

    it('should construct the expected path', () => {
      expect(routeObj.path).toEqual(routeObj.example);
    })
  });
});
