import { test } from "@playwright/test";

test('doing teardown', async ({ }) => {
  console.log('teardown done!')
});