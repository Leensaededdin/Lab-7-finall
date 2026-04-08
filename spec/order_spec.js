import { handleInput, clearInput } from "../src/Order.js";

describe("SMS Chatbot Ordering", function () {

  beforeEach(function () {
    clearInput();
  });

  it("starts the conversation", function () {
    let r = handleInput("hello");
    expect(r[0]).toBe("Hi, welcome to Dream Bites.");
  });

  it("orders a pizza", function () {
    handleInput("hello");
    handleInput("pizza");
    handleInput("medium");
    let r = handleInput("pepperoni");
    expect(r[0]).toBe("Done. I added that to your order.");
  });

  it("adds a drink upsell", function () {
    handleInput("hello");
    handleInput("pizza");
    handleInput("small");
    handleInput("cheese");
    handleInput("no");
    let r = handleInput("coke");

    expect(r[1]).toContain("Your order is");
  });

});