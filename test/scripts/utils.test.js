/* global describe */
import { expect } from '@esm-bundle/chai';
import { isStringDate } from '../../scripts/utils.js';

[
  ['Date with long month', '2 September 2023', true],
  ['Date with short month', '2 Sep 2023', true],
  ['All numerid date', '2 11 2023', true],
  ['All numerid date', '02-11-2023', true],
  ['All words date', 'First, September, 2000', true],
  ['All numerid date', '', false],
  ['All numerid date', undefined, false],
  ['All numerid date', 'Adobe Franklin', false],
].forEach((spec) => {
  describe(`isStringDate() -> ${spec[0]}`, () => {
    const actual = isStringDate(spec[1]);

    expect(actual).to.equal(spec[2]);
  });
});
