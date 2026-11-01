import { describe, expect, test } from "bun:test";
import { orderSteps } from "./status";

describe("portal status", () => {
  test("maps project progress to the customer journey", () => {
    expect(orderSteps("in_progress").map((step) => step.state)).toEqual(["done", "done", "current", "upcoming"]);
  });
});
