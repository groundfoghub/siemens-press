/* global describe it */
import { expect } from '@esm-bundle/chai';
import { isStringDate } from '../../scripts/utils.js';

describe('isStringDate', () => {
  [
    ['returns true when is a date with long month', '2 September 2023', true],
    ['returns true when is a date with short month', '2 Sep 2023', true],
    ['returns true when is an all numerid date', '2 11 2023', true],
    ['returns true when is an all numerid date', '02-11-2023', true],
    ['returns true when is an all numerid date', '2022-05-04', true],
    ['returns true when is a date and time', '2022-05-04T15:30:00', true],
    ['returns true when is a date and time and timezone ', '2022-05-04T15:30:00-07:00', true],
    ['returns true when date is in verbose', 'First, September, 2000', true],
    ['returns false when given an empty string', '', false],
    ['returns false when given undefined', undefined, false],
    ['returns false when given an invalid date string', 'Adobe Franklin', false],
  ].forEach((spec) => {
    it(spec[0], () => {
      expect(isStringDate(spec[1])).to.equal(spec[2]);
    });
  });
});
