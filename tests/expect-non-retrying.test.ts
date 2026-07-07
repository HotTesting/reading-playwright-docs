import { test, expect } from '@playwright/test';

test('expect non-retrying', () => {
    // Value is the same
    expect('Playwright').toBe('Playwright');
    expect(42).toBe(42);

    // Number is approximately equal
    expect(0.1 + 0.2).toBeCloseTo(0.3, 5);

    // Value is not undefined
    expect('defined').toBeDefined();

    // Value is falsy
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect(null).toBeFalsy();

    // Number is more than
    expect(10).toBeGreaterThan(5);

    // Number is more than or equal
    expect(10).toBeGreaterThanOrEqual(10);

    // Object is an instance of a class
    expect(new Date('2024-01-01')).toBeInstanceOf(Date);

    // Number is less than
    expect(3).toBeLessThan(7);

    // Number is less than or equal
    expect(7).toBeLessThanOrEqual(7);

    // Value is NaN
    expect(Number('not-a-number')).toBeNaN();

    // Value is null
    expect(null).toBeNull();

    // Value is truthy
    expect('hello').toBeTruthy();
    expect(1).toBeTruthy();

    // Value is undefined
    expect(undefined).toBeUndefined();

    // String contains a substring
    expect('Hello Playwright').toContain('Playwright');

    // Array or set contains an element
    expect(['a', 'b', 'c']).toContain('b');
    expect(new Set(['x', 'y'])).toContain('x');

    // Array or set contains a similar element
    expect([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]).toContainEqual({ id: 2, name: 'Bob' });

    // Value is similar - deep equality and pattern matching
    expect({ status: 'ok', count: 3 }).toEqual({ status: 'ok', count: 3 });
    expect({ id: 1, name: 'Alice', extra: true }).toEqual(expect.objectContaining({ id: 1, name: 'Alice' }));

    // Array or string has length
    expect('Playwright').toHaveLength(10);
    expect([1, 2, 3]).toHaveLength(3);

    // Object has a property
    expect({ name: 'Playwright', version: 1 }).toHaveProperty('name', 'Playwright');

    // String matches a regular expression
    expect('test@example.com').toMatch(/@example\.com$/);

    // Object contains specified properties
    expect({ id: 1, name: 'Alice', role: 'admin' }).toMatchObject({ name: 'Alice', role: 'admin' });

    // Value is similar, including property types
    expect({ count: 1 }).toStrictEqual({ count: 1 });

    // Function throws an error
    expect(() => {
        throw new Error('Something went wrong');
    }).toThrow('Something went wrong');
});
