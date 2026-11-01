import { describe, expect, test } from "bun:test";
import { isStaff } from "./access";

describe("CMS staff access", () => {
  test("accepts only users from the existing staff collection", () => {
    expect(isStaff({ collection: "users" })).toBe(true);
    expect(isStaff({ collection: "customers" })).toBe(false);
    expect(isStaff(null)).toBe(false);
  });
});
