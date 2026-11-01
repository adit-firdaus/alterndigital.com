import { describe, expect, test } from "bun:test";
import { parseOrder } from "./order";

describe("order requests", () => {
  test("rejects unknown categories and too-short requirements", () => {
    expect(parseOrder({ category: "other", title: "Project", requirements: "kebutuhan yang cukup panjang" })).toBeNull();
    expect(parseOrder({ category: "mobile", title: "Project", requirements: "x" })).toBeNull();
  });
  test("trims valid customer input", () => {
    expect(parseOrder({ category: "mobile", title: " App ", requirements: " Butuh aplikasi inventaris " })).toEqual({ category: "mobile", title: "App", requirements: "Butuh aplikasi inventaris" });
  });
});
