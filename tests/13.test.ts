import { parseBusIds, calcBusWaits } from '../src/13';

describe('parseBusIds', () => {
  it('should return 7, 13, 59, 31, 19 for test data', () => {
    const busIdList = '7,13,x,x,59,x,31,19';
    expect(parseBusIds(busIdList)).toEqual([7, 13, 59, 31, 19]);
  });
});

describe('calcBusWaits', () => {
  it('should return wait of 5 minutes for bus 59 for test data', () => {
    const busIds = [7, 13, 59, 31, 19];
    const busWaits = calcBusWaits(busIds, 939);
    expect(busWaits[2]).toEqual({ id: 59, wait: 5 });
  });
});
