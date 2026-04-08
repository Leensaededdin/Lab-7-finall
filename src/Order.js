let currentState = welcoming;

let order = [];
let currentItem = {};

const menu = {
  pizza: {
    sizes: ["small", "medium", "large"],
    extras: ["cheese", "pepperoni", "mushrooms"]
  },
  burger: {
    sizes: ["single", "double"],
    extras: ["cheese", "lettuce", "onions"]
  },
  drinks: ["coke", "sprite", "water"]
};

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput() {
  currentState = welcoming;
  order = [];
  currentItem = {};
}

function welcoming() {
  currentState = choosingItem;
  return [
    "Hi, welcome to Dream Bites.",
    "I can help you place your order step by step.",
    "Today we have pizza and burger.",
    "What would you like to order?"
  ];
}

function choosingItem(sInput) {
  let input = sInput.toLowerCase().trim();

  if (input === "pizza" || input === "burger") {
    currentItem = { item: input };
    currentState = choosingSize;

    if (input === "pizza") {
      return [
        "Great choice.",
        "Pizza comes in small, medium, or large.",
        "Which size would you like?"
      ];
    } else {
      return [
        "Nice choice.",
        "Burger comes in single or double.",
        "Which size would you like?"
      ];
    }
  }

  return [
    "I did not understand that item.",
    "Please type pizza or burger."
  ];
}

function choosingSize(sInput) {
  let input = sInput.toLowerCase().trim();
  let validSizes = menu[currentItem.item].sizes;

  if (validSizes.includes(input)) {
    currentItem.size = input;
    currentState = choosingExtra;

    return [
      `Perfect. You chose a ${input} ${currentItem.item}.`,
      `Available extras are: ${menu[currentItem.item].extras.join(", ")}.`,
      "Which extra would you like?"
    ];
  }

  return [
    `That is not a valid size for ${currentItem.item}.`,
    `Please choose one of these: ${validSizes.join(", ")}.`
  ];
}

function choosingExtra(sInput) {
  let input = sInput.toLowerCase().trim();
  let validExtras = menu[currentItem.item].extras;

  if (validExtras.includes(input)) {
    currentItem.extra = input;
    order.push({ ...currentItem });
    currentItem = {};
    currentState = anotherItem;

    return [
      `Done. I added that to your order.`,
      "Would you like to order another item?",
      "Please type yes or no."
    ];
  }

  return [
    "That extra is not available.",
    `Please choose one of these: ${validExtras.join(", ")}.`
  ];
}

function anotherItem(sInput) {
  let input = sInput.toLowerCase().trim();

  if (input === "yes") {
    currentState = choosingItem;
    return [
      "No problem.",
      "Would you like pizza or burger next?"
    ];
  }

  if (input === "no") {
    currentState = drinkUpsell;
    return [
      "Before we finish, would you like a drink?",
      "Available drinks: coke, sprite, water.",
      "You can also type no."
    ];
  }

  return [
    "Please answer with yes or no."
  ];
}

function drinkUpsell(sInput) {
  let input = sInput.toLowerCase().trim();

  if (menu.drinks.includes(input)) {
    order.push({ item: "drink", choice: input });
    currentState = finished;
    return [
      `Great, I added a ${input}.`,
      getOrderSummary(),
      "Thank you for ordering from Dream Bites."
    ];
  }

  if (input === "no") {
    currentState = finished;
    return [
      getOrderSummary(),
      "Thank you for ordering from Dream Bites."
    ];
  }

  return [
    "Please type coke, sprite, water, or no."
  ];
}

function finished() {
  return [
    "Your order is already complete.",
    "Refresh the page if you want to start a new order."
  ];
}

function getOrderSummary() {
  let parts = [];

  for (let item of order) {
    if (item.item === "drink") {
      parts.push(item.choice);
    } else {
      parts.push(`${item.size} ${item.extra} ${item.item}`);
    }
  }

  return "Your order is: " + parts.join(", ") + ".";
}