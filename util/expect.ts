import { expect } from "@playwright/test";

export const xlexpect = expect.configure({ timeout: 15000 });
export const lexpect = expect.configure({ timeout: 10000 });
