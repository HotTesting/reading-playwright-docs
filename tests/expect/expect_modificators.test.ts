import { test, expect } from '@playwright/test';



test('expect.any matches a Date instance', () => {
    expect({ id: 1, createdAt: new Date('2024-06-01') }).toEqual({
        id: 1,
        createdAt: expect.any(Date),
    });
});

test('Date value matches directly without expect.any', () => {
    expect({ id: 1, createdAt: new Date('2024-06-01') }).toEqual({
        id: 1,
        createdAt: new Date('2024-06-01'),
    });
});

test('expect.anything matches a defined payload', () => {
    expect({ id: 1, payload: { nested: true } }).toEqual({
        id: 1,
        payload: expect.anything(),
    });
});

test('payload value matches directly without expect.anything', () => {
    expect({ id: 1, payload: { nested: true } }).toEqual({
        id: 1,
        payload: { nested: true },
    });
});

test('expect.arrayContaining matches selected elements', () => {
    expect(['a', 'b', 'c', 'd']).toEqual(expect.arrayContaining(['b', 'c']));
});

test('array contains b directly', () => {
    expect(['a', 'b', 'c', 'd']).toContain('b');
});

test('array contains c directly', () => {
    expect(['a', 'b', 'c', 'd']).toContain('c');
});

test('expect.arrayOf matches numbers with expect.any(Number)', () => {
    expect([1, 2, 3]).toEqual(expect.arrayOf(expect.any(Number)));
});

test('expect.arrayOf matches strings with expect.any(String)', () => {
    expect(['a', 'b', 'c']).toEqual(expect.arrayOf(expect.any(String)));
});

test('array values match directly without expect.arrayOf', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
});

test('expect.closeTo matches an approximate number', () => {
    expect({ average: 0.1 + 0.2 }).toEqual({ average: expect.closeTo(0.3, 5) });
});

test('toBeCloseTo matches an approximate number directly', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
});

test('expect.objectContaining matches selected properties', () => {
    expect({ id: 1, name: 'Alice', role: 'admin' }).toEqual(
        expect.objectContaining({ name: 'Alice', role: 'admin' }),
    );
});

test('object properties match directly without expect.objectContaining', () => {
    expect({ id: 1, name: 'Alice', role: 'admin' }).toEqual({
        id: 1,
        name: 'Alice',
        role: 'admin',
    });
});

test('expect.stringContaining matches a substring', () => {
    expect({ message: 'Hello Playwright' }).toEqual({
        message: expect.stringContaining('Playwright'),
    });
});

test('message matches directly without expect.stringContaining', () => {
    expect({ message: 'Hello Playwright' }).toEqual({
        message: 'Hello Playwright',
    });
});

test('expect.stringMatching matches a regular expression', () => {
    expect({ email: 'alice@example.com' }).toEqual({
        email: expect.stringMatching(/@example\.com$/),
    });
});

test('email matches directly without expect.stringMatching', () => {
    expect({ email: 'alice@example.com' }).toEqual({
        email: 'alice@example.com',
    });
});

// Simulates: const response = await request.get('/api/users/42'); const body = await response.json();
const apiResponse = {
    id: 42,
    email: 'alice@example.com',
    name: 'Alice Johnson',
    role: 'admin',
    createdAt: '2024-06-15T10:30:00.000Z',
    updatedAt: '2024-06-20T14:22:11.503Z',
    tags: ['premium', 'verified', 'newsletter'],
    stats: {
        ordersCount: 12,
        totalSpent: 249.99,
        averageRating: 4.73,
    },
    preferences: {
        theme: 'dark',
        locale: 'uk-UA',
        notifications: true,
    },
};

test('API response matches its expected shape and business rules', () => {
    expect(apiResponse).toEqual(
        {
            id: expect.any(Number),
            email: expect.stringMatching(/@example\.com$/),
            name: expect.stringContaining('Alice'),
            role: 'admin',
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
            updatedAt: expect.any(String),
            tags: expect.arrayContaining(['premium', 'verified']),
            stats: {
                ordersCount: expect.any(Number),
                totalSpent: expect.closeTo(250, 0),
                averageRating: expect.closeTo(5, 0),
            },
            preferences: expect.anything(),
        },
    );
});

test('every API response tag is a string', () => {
    expect(apiResponse.tags).toEqual(expect.arrayOf(expect.any(String)));
});

// Docs example: https://playwright.dev/docs/test-assertions#expect-api
// expect(['a', 'b', 'c']).toEqual(expect.arrayOf(String));
// Fails in Playwright: arrayOf uses equals(String, item) instead of a type check.
// Use expect.arrayOf(expect.any(String)) instead.
test('docs example: expect.arrayOf(String) does not work in Playwright', () => {
    expect(['a', 'b', 'c']).toEqual(expect.arrayOf(String));
});

test('docs example: expect.arrayOf(Number) does not work in Playwright', () => {
    expect([1, 2, 3]).toEqual(expect.arrayOf(Number));
});

