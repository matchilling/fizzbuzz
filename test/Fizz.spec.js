'use strict';

import { assert } from 'chai';
import Fizz from '../src/Fizz';
import pkg from '../package.json';

/** @test {Fizz} */
describe(`${pkg.name}/Fizz`, () => {
  const numberGenerator = (length) => {
    const res = [];
    for (let i = 1; i <= length; i += 1) res.push(i);
    return res;
  };

  /** @test {Fizz#buzz} */
  describe('#buzz', () => {
    it('Throw a type error if argument is not an instance of array.', () => {
      assert.throws(() => Fizz.buzz(1), TypeError, 'Argument "numbers" must be an instance of "Array".');
    });

    it('Throw a type error if an element of the given array is not of type integer.', () => {
      assert.throws(() => Fizz.buzz([1, 2, 'x']), TypeError, 'Non integer element found at position "2".');
    });

    it('Should return an array and substitude any element with the word "lucky" if it is contains a 3.', () => {
      assert.deepEqual(Fizz.buzz([3]), ['lucky']);
    });

    it('Should return an array and substitude any element with the word "fizz" if it is a multiple of 3.', () => {
      assert.deepEqual(Fizz.buzz([27]), ['fizz']);
    });

    it('Should return an array and substitude any element with the word "buzz" if it is a multiple of 5.', () => {
      assert.deepEqual(Fizz.buzz([5]), ['buzz']);
    });

    it('Should return an array and substitude any element with the word "fizzbuzz" if it is a multiple of 15.', () => {
      assert.deepEqual(Fizz.buzz([15]), ['fizzbuzz']);
    });

    it('Should return an array and do not substitude any value if it is not a multiple of 3, 5 or 15.', () => {
      assert.deepEqual(Fizz.buzz([1]), [1]);
    });

    it('Should return an array and substitude elements if they are a multiple of 3, 5 or 15.', () => {
      assert.deepEqual(Fizz.buzz(numberGenerator(20)), [
        1,
        2,
        'lucky',
        4,
        'buzz',
        'fizz',
        7,
        8,
        'fizz',
        'buzz',
        11,
        'fizz',
        'lucky',
        14,
        'fizzbuzz',
        16,
        17,
        'fizz',
        19,
        'buzz'
      ]);
    });
  });

  /** @test {Fizz#produceReport} */
  describe('#produceReport', () => {
    it('Throw a type error if argument is not an instance of array.', () => {
      assert.throws(() => Fizz.produceReport(1), TypeError, 'Argument "arr" must be an instance of "Array".');
    });

    it('Produces a report from the given', () => {
      assert.deepEqual(Fizz.produceReport(Fizz.buzz(numberGenerator(20))), {
        buzz     : 3,
        fizz     : 4,
        fizzbuzz : 1,
        integer  : 10,
        lucky    : 2
      });
    });
  });

  /** @test {Fizz#write} */
  describe('#write', () => {
    it('Throw a type error if argument is not an instance of array.', () => {
      assert.throws(() => Fizz.write(1), TypeError, 'Argument "arr" must be an instance of "Array".');
    });

    it('Write to standard output', () => {
      assert.isTrue(Fizz.write(['1', '2']));
    });
  });

  /** @test {Fizz#writeReport} */
  describe('#writeReport', () => {
    it('Throw a type error if argument is not an instance of object.', () => {
      assert.throws(() => Fizz.writeReport(1), TypeError, 'Argument "report" must be an instance of "Object".');
    });

    it('Write report to standard output', () => {
      assert.isTrue(Fizz.writeReport(
        Fizz.produceReport(Fizz.buzz(numberGenerator(20)))
      ));
    });
  });

  /** @test {Fizz#version} */
  describe('#version', () => {
    it('Should return the current version', () => {
      assert.equal(Fizz.version(), pkg.version);
    });
  });
});
