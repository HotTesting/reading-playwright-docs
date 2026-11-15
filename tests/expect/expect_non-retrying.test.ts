import { test, expect } from '@playwright/test';

test('string value is the same', () => {
    expect('Playwright').toBe('Playwright');
});

test('number value is the same', () => {
    expect(42).toBe(42);
});

test('number is approximately equal', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
});

test('value is defined', () => {
    expect('defined').toBeDefined();
});

test('false is falsy', () => {
    expect(false).toBeFalsy();
});

test('zero is falsy', () => {
    expect(0).toBeFalsy();
});

test('null is falsy', () => {
    expect(null).toBeFalsy();
});

test('number is greater than another number', () => {
    expect(10).toBeGreaterThan(5);
});

test('number is greater than or equal to another number', () => {
    expect(10).toBeGreaterThanOrEqual(10);
});

test('object is an instance of a class', () => {
    expect(new Date('2024-01-01')).toBeInstanceOf(Date);
});

test('number is less than another number', () => {
    expect(3).toBeLessThan(7);
});

test('number is less than or equal to another number', () => {
    expect(7).toBeLessThanOrEqual(7);
});

test('value is NaN', () => {
    expect(Number('not-a-number')).toBeNaN();
});

test('value is null', () => {
    expect(null).toBeNull();
});

test('string is truthy', () => {
    expect('hello').toBeTruthy();
});

test('number is truthy', () => {
    test.step('my test step', () => {   

    expect(1).toBeTruthy();
    });
});

test('value is undefined', () => {
    expect(undefined).toBeUndefined();
});

test('string contains a substring', () => {
    expect('Hello Playwright').toContain('Playwright');
});

test('array contains an element', () => {
    expect(['a', 'b', 'c']).toContain('b');
});

test('set contains an element', () => {
    expect(new Set(['x', 'y'])).toContain('x');
});

test('array contains a similar element', () => {
    expect([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]).toContainEqual({ id: 2, name: 'Bob' });
});

test('value matches with deep equality', () => {
    expect({ status: 'ok', count: 3 }).toEqual({ status: 'ok', count: 3 });
});

test('value matches an object pattern', () => {
    expect({ id: 1, name: 'Alice', extra: true }).toEqual(expect.objectContaining({ id: 1, name: 'Alice' }));
});

test('string has the expected length', () => {
    expect('Playwright').toHaveLength(10);
});

test('array has the expected length', () => {
    expect([1, 2, 3]).toHaveLength(3);
});

test('object has a property with the expected value', () => {
    expect({ name: 'Playwright', version: 1 }).toHaveProperty('name', 'Playwright');
});

test('string matches a regular expression', () => {
    expect('test@example.com').toMatch(/@example\.com$/);
});

test('object contains specified properties', () => {
    expect({ id: 1, name: 'Alice', role: 'admin' }).toMatchObject({ name: 'Alice', role: 'admin' });
});

test('value is strictly equal, including property types', () => {
    expect({ count: 1 }).toStrictEqual({ count: 1 });
});

test('function throws an error', () => {
    expect(() => {
        throw new Error('Something went wrong');
    }).toThrow('Something went wrong');
});
