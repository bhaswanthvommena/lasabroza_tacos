export const MEAT_OPTIONS = [
  "Asada (Roast Meat)",
  "Pastor (Marinated Pork)",
  "Pollo (Chicken)",
  "Chorizo (Chorizo)",
  "Tripa (Guts)",
  "Lengua (Tongue)",
  "Carnitas (Fried Pork Meat)",
  "Barbacoa (Mex-BBQ)",
  "Chicharron (Pork Rinds)",
  "Campechano (Chorizo and Roast Meat)",
];

export const BREAKFAST_FORMATS = ["Taco", "Torta", "Burrito"] as const;

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number | null;
  img?: string;
  requiresMeat?: boolean;
  requiresFormat?: boolean;
};

export type MenuSection = {
  category: string;
  subtitle?: string;
  showMeatOptions?: boolean;
  items: MenuItem[];
};

export const MENU_SECTIONS: MenuSection[] = [
  {
    category: "Breakfast",
    subtitle: "Breakfast tacos, tortas, and burritos",
    items: [
      { id: "b1", name: "Potato & Egg", desc: "Available as breakfast taco, torta, or burrito.", price: 5.00, requiresFormat: true },
      { id: "b2", name: "Chorizo & Egg", desc: "Available as breakfast taco, torta, or burrito.", price: 5.00, requiresFormat: true },
      { id: "b3", name: "Bacon & Egg", desc: "Available as breakfast taco, torta, or burrito.", price: 5.00, requiresFormat: true },
      { id: "b4", name: "Salchicha & Egg", desc: "Available as breakfast taco, torta, or burrito.", price: 5.00, requiresFormat: true },
      { id: "b5", name: "Cactus & Egg", desc: "Available as breakfast taco, torta, or burrito.", price: 5.00, requiresFormat: true },
      { id: "b6", name: "Shredded Beef & Egg", desc: "Available as breakfast taco, torta, or burrito.", price: 5.00, requiresFormat: true },
      { id: "b7", name: "Egg Mexican Style", desc: "Available as breakfast taco, torta, or burrito.", price: 5.00, requiresFormat: true },
      { id: "b8", name: "Egg & Monterey Jack Cheese", desc: "Available as breakfast taco, torta, or burrito.", price: 5.00, requiresFormat: true },
      { id: "b9", name: "Egg & Beans", desc: "Available as breakfast taco, torta, or burrito.", price: 5.00, requiresFormat: true },
    ],
  },
  {
    category: "Classics",
    subtitle: "Choose any meat for applicable items",
    showMeatOptions: true,
    items: [
      {
        id: "m1",
        name: "Burrito",
        desc: "Refried beans, Monterey Jack cheese, lettuce, avocado, tomato, and jalapeno.",
        price: 5.00,
        requiresMeat: true,
      },
      {
        id: "m2",
        name: "Gringa",
        desc: "Flour tortillas, Monterey Jack cheese, lettuce, avocado, tomato, and jalapeno.",
        price: 5.00,
        requiresMeat: true,
      },
      {
        id: "m3",
        name: "Sincronizada",
        desc: "Flour tortillas with ham and cheese, plus lettuce, avocado, tomato, and jalapeno.",
        price: 5.00,
      },
      {
        id: "m4",
        name: "Gordita",
        desc: "Lettuce, avocado, spread tomato, Monterey Jack cheese, jalapenos served inside a thick tortilla pocket.",
        price: 5.00,
        requiresMeat: true,
      },
      {
        id: "m5",
        name: "Torta",
        desc: "Refried beans, Monterey Jack cheese, avocado, lettuce, tomato, jalapenos, mayonnaise, sandwiched between bread.",
        price: 5.00,
        requiresMeat: true,
      },
      {
        id: "m6",
        name: "Quesadilla",
        desc: "Monterey Jack cheese, lettuce, avocado, tomato, and jalapeno.",
        price: 5.00,
        requiresMeat: true,
      },
      {
        id: "m7",
        name: "Taco Plate",
        desc: "3 tacos of any meat with your order of rice or beans.",
        price: 5.00,
        requiresMeat: true,
      },
      {
        id: "m8",
        name: "Tacos",
        desc: "Street tacos with your choice of meat.",
        price: 5.00,
        requiresMeat: true,
      },
    ],
  },
  {
    category: "Drinks",
    subtitle: "Different flavors",
    items: [
      {
        id: "d1",
        name: "Aguas Frescas",
        desc: "Fresh daily flavors available.",
        price: 5.00,
      },
    ],
  },
];
