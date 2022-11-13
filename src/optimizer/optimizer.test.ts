import optimizer from './optimizer';

describe('optimizer', () => {
  it('works', () => {
    const results = optimizer();
    expect(results).toBeTruthy();
  });
});
