import {
  isValidHex,
  addHex,
  subtractHex,
  multiplyHex,
  divideHex
} from './calculator'

import { test, expect } from 'vitest'

test('accepts valid 1-2 digit hex input', () => {
  expect(isValidHex('A')).toBe(true)
  expect(isValidHex('3F')).toBe(true)
})

test('rejects invalid or too long hex input', () => {
  expect(isValidHex('1F3')).toBe(false)
  expect(isValidHex('G7')).toBe(false)
})

test('adds hex numbers (A + B = 15)', () => {
  expect(addHex('A', 'B')).toBe('15');
});

test('adds hex numbers (1AF + B = Error)', () => {
  expect(() => addHex('1AF', 'B')).toThrow('Invalid hex input');
});

test('subtracts hex numbers (F - A = 5)', () => {
  expect(subtractHex('F', 'A')).toBe('5');
});

test('throws error if subtraction results in negative', () => {
  expect(() => subtractHex('1', 'A')).toThrow('Result would be negative.');
});

test('multiplies hex numbers (F * 2 = 1E)', () => {
  expect(multiplyHex('F', '2')).toBe('1E');
});

test('divides hex and rounds down (A / 0 = Error)', () => {
  expect(() => divideHex('A', '0')).toThrow('Cannot divide by zero');
});

test('subtractHex throws for negative result (1 - A)', () => {
  expect(() => subtractHex('1', 'A')).toThrow('Result would be negative.');
});

test('divideHex throws for divide by zero', () => {
  expect(() => divideHex('A', '0')).toThrow('Cannot divide by zero.');
});
