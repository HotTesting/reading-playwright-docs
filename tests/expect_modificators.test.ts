import { test, expect } from '@playwright/test';

test('expect asymmetric matchers', () => {
    // expect.any() - Matches any instance of a class/primitive
    // With asymmetric matcher
    expect({ id: 1, createdAt: new Date('2024-06-01') }).toEqual({
        id: 1,
        createdAt: expect.any(Date),
    });

    // Without asymmetric matcher
    expect({ id: 1, createdAt: new Date('2024-06-01') }).toEqual({
        id: 1,
        createdAt: new Date('2024-06-01'),
    });

    // expect.anything() - Matches anything
    // With asymmetric matcher
    expect({ id: 1, payload: { nested: true } }).toEqual({
        id: 1,
        payload: expect.anything(),
    });

    // Without asymmetric matcher
    expect({ id: 1, payload: { nested: true } }).toEqual({
        id: 1,
        payload: { nested: true },
    });

    // expect.arrayContaining() - Array contains specific elements
    // With asymmetric matcher
    expect(['a', 'b', 'c', 'd']).toEqual(expect.arrayContaining(['b', 'c']));

    // Without asymmetric matcher
    expect(['a', 'b', 'c', 'd']).toContain('b');
    expect(['a', 'b', 'c', 'd']).toContain('c');

    // expect.arrayOf() - Array contains elements of specific type
    // With asymmetric matcher (works in Playwright)
    expect([1, 2, 3]).toEqual(expect.arrayOf(expect.any(Number)));
    expect(['a', 'b', 'c']).toEqual(expect.arrayOf(expect.any(String)));

    // Without asymmetric matcher
    expect([1, 2, 3]).toEqual([1, 2, 3]);

    // expect.closeTo() - Number is approximately equal
    // With asymmetric matcher
    expect({ average: 0.1 + 0.2 }).toEqual({ average: expect.closeTo(0.3, 5) });

    // Without asymmetric matcher
    expect(0.1 + 0.2).toBeCloseTo(0.3, 5);

    // expect.objectContaining() - Object contains specific properties
    // With asymmetric matcher
    expect({ id: 1, name: 'Alice', role: 'admin' }).toEqual(
        expect.objectContaining({ name: 'Alice', role: 'admin' }),
    );

    // Without asymmetric matcher
    expect({ id: 1, name: 'Alice', role: 'admin' }).toEqual({
        id: 1,
        name: 'Alice',
        role: 'admin',
    });

    // expect.stringContaining() - String contains a substring
    // With asymmetric matcher
    expect({ message: 'Hello Playwright' }).toEqual({
        message: expect.stringContaining('Playwright'),
    });

    // Without asymmetric matcher
    expect({ message: 'Hello Playwright' }).toEqual({
        message: 'Hello Playwright',
    });

    // expect.stringMatching() - String matches a regular expression
    // With asymmetric matcher
    expect({ email: 'alice@example.com' }).toEqual({
        email: expect.stringMatching(/@example\.com$/),
    });

    // Without asymmetric matcher
    expect({ email: 'alice@example.com' }).toEqual({
        email: 'alice@example.com',
    });
});

test('validate fake API response with asymmetric matchers', () => {
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

    // Validate shape and business rules — ignore volatile fields (exact id, timestamps, counts)
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

    // Every tag must be a string — order and extra tags do not matter
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
