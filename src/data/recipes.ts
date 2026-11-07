import { Recipe } from "../types";

export const INITIAL_RECIPES: Recipe[] = [
  {
    "id": "1",
    "title": "Protein Smoothie Bowl",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 70.5g protein and 1166 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "12",
        "name": "Banana",
        "quantity": 260,
        "unit": "g"
      },
      {
        "ingredientId": "21",
        "name": "Blueberries",
        "quantity": 140,
        "unit": "g"
      },
      {
        "ingredientId": "70",
        "name": "Flax Seed Powder",
        "quantity": 2,
        "unit": "tbsp"
      },
      {
        "ingredientId": "110",
        "name": "Milk",
        "quantity": 200,
        "unit": "ml"
      },
      {
        "ingredientId": "118",
        "name": "Oats",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "132",
        "name": "Pineapple",
        "quantity": 160,
        "unit": "g"
      },
      {
        "ingredientId": "138",
        "name": "Protein Powder",
        "quantity": 2,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Combine all ingredients."
    ],
    "calories": 1166,
    "protein": 70.5,
    "carbs": 184.6,
    "fats": 22.0,
    "fiber": 26.4
  },
  {
    "id": "2",
    "title": "Moong Dal Chilla",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 50.3g protein and 749 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 0.5,
        "unit": "nos"
      },
      {
        "ingredientId": "59",
        "name": "Cumin Whole Jeera",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "112",
        "name": "Moong Dal",
        "quantity": 200,
        "unit": "g"
      }
    ],
    "instructions": [
      "Soak Moon Dal overnight",
      "Blend it with ginger, garlic and cumin seeds",
      "Top it with veggies"
    ],
    "calories": 749,
    "protein": 50.3,
    "carbs": 136.5,
    "fats": 3.8,
    "fiber": 34.8
  },
  {
    "id": "3",
    "title": "Overnight Oats",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 66.8g protein and 951 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "2",
        "name": "Apple",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "15",
        "name": "Berries",
        "quantity": 160,
        "unit": "g"
      },
      {
        "ingredientId": "42",
        "name": "Chia Seeds",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "97",
        "name": "Kefir",
        "quantity": 150,
        "unit": "ml"
      },
      {
        "ingredientId": "110",
        "name": "Milk",
        "quantity": 50,
        "unit": "ml"
      },
      {
        "ingredientId": "118",
        "name": "Oats",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "138",
        "name": "Protein Powder",
        "quantity": 2,
        "unit": "cup"
      },
      {
        "ingredientId": "187",
        "name": "Walnuts",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 1,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Combine oats, berries, chia seeds, and nuts",
      "Refrigerate overnight",
      "Serve with eggs."
    ],
    "calories": 951,
    "protein": 66.8,
    "carbs": 111.4,
    "fats": 27.2,
    "fiber": 26.9
  },
  {
    "id": "4",
    "title": "Veggie Omelette",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 36.2g protein and 564 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "28",
        "name": "Cabbage",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "113",
        "name": "Mushrooms",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "16",
        "name": "Besan Flour",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "14",
        "name": "Beans",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 9.2,
        "unit": "g"
      }
    ],
    "instructions": [
      "Whisk all ingredients",
      "Toast it on pan."
    ],
    "calories": 564,
    "protein": 36.2,
    "carbs": 39.0,
    "fats": 30.5,
    "fiber": 9.8
  },
  {
    "id": "5",
    "title": "Eggs / Paneer / Tofu Bhurji Sandwich",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 65.5g protein and 1227 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "22",
        "name": "Bread",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "123",
        "name": "Paneer",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "77",
        "name": "Ginger",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "104",
        "name": "Lettuce",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "58",
        "name": "Cumin Seeds",
        "quantity": 3,
        "unit": "g"
      }
    ],
    "instructions": [
      "chop onion, tomato, green chillies, cumin powder and saute",
      "Add scrambled eggs / paneer, ginger and cook.,",
      "Use halloumi instead of paneer occasionally",
      "Top it on toast",
      "Add lettuce if required."
    ],
    "calories": 1227,
    "protein": 65.5,
    "carbs": 123.8,
    "fats": 49.8,
    "fiber": 9.5
  },
  {
    "id": "7",
    "title": "Masala Omelette",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 34.3g protein and 529 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein"
    ],
    "ingredients": [
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "164",
        "name": "Spices",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "176",
        "name": "Toast",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "192",
        "name": "Zucchini",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "120",
        "name": "Olives",
        "quantity": 20,
        "unit": "g"
      }
    ],
    "instructions": [
      "Beat eggs with spices",
      "Cook omelette",
      "Serve with toast"
    ],
    "calories": 529,
    "protein": 34.3,
    "carbs": 48.4,
    "fats": 23.2,
    "fiber": 5.6
  },
  {
    "id": "8",
    "title": "Sweet Quinoa Porridge",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 16.1g protein and 638 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "12",
        "name": "Banana",
        "quantity": 240,
        "unit": "g"
      },
      {
        "ingredientId": "15",
        "name": "Berries",
        "quantity": 160,
        "unit": "g"
      },
      {
        "ingredientId": "117",
        "name": "Nuts",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "140",
        "name": "Quinoa",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Cook quinoa into porridge",
      "Top with nuts, banana, or berries."
    ],
    "calories": 638,
    "protein": 16.1,
    "carbs": 94.2,
    "fats": 25.0,
    "fiber": 17.8
  },
  {
    "id": "10",
    "title": "Chickpea Salad",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 39.5g protein and 998 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "45",
        "name": "Chickpeas",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "104",
        "name": "Lettuce",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "40",
        "name": "Cheddar Cheese",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 2,
        "unit": "tbsp"
      },
      {
        "ingredientId": "101",
        "name": "Lemon Juice",
        "quantity": 30,
        "unit": "ml"
      },
      {
        "ingredientId": "56",
        "name": "Couscous",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Soak chickpeas overnight and pressure cook next day",
      "Cook couscous by steaming it hot water",
      "Add salad veggies and leaves, chickpeas",
      "Dress it with lemon / balsamic vinegar / olive oil."
    ],
    "calories": 998,
    "protein": 39.5,
    "carbs": 97.0,
    "fats": 52.7,
    "fiber": 20.9
  },
  {
    "id": "11",
    "title": "Quinoa Bowl with roasted veggies",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 70.5g protein and 929 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "140",
        "name": "Quinoa",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "192",
        "name": "Zucchini",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "146",
        "name": "Red Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "6",
        "name": "Aubergine",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "45",
        "name": "Chickpeas",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "103",
        "name": "Lentils",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "125",
        "name": "Parsley",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "102",
        "name": "Lemon Olive Oil Dressing",
        "quantity": 28,
        "unit": "g"
      },
      {
        "ingredientId": "86",
        "name": "Grilled Chicken",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "122",
        "name": "Orange",
        "quantity": 150,
        "unit": "g"
      }
    ],
    "instructions": [
      "Have orange first",
      "Cook all ingredients and mix - top with dressing"
    ],
    "calories": 929,
    "protein": 70.5,
    "carbs": 101.7,
    "fats": 29.2,
    "fiber": 26.0
  },
  {
    "id": "12",
    "title": "Mediterranean Stir-fry",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 83.2g protein and 1030 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Lunch",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "45",
        "name": "Chickpeas",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "67",
        "name": "Feta",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 1,
        "unit": "tbsp"
      }
    ],
    "instructions": [
      "Stir-fry peppers, onions, spinach, and tomatoes",
      "Add chickpeas and feta or chicken."
    ],
    "calories": 1030,
    "protein": 83.2,
    "carbs": 73.4,
    "fats": 46.1,
    "fiber": 20.3
  },
  {
    "id": "13",
    "title": "Burrito Bowls",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 163.7g protein and 2109 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "8",
        "name": "Avocado",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "17",
        "name": "Black Beans",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "25",
        "name": "Brown Rice",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "87",
        "name": "Ground Beef",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "123",
        "name": "Paneer",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "157",
        "name": "Salsa",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "177",
        "name": "Tofu",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Assemble bowls with brown rice, black beans, salsa, avocado, and yogurt",
      "Add tofu, paneer, ground meat, or chicken."
    ],
    "calories": 2109,
    "protein": 163.7,
    "carbs": 173.9,
    "fats": 86.0,
    "fiber": 45.1
  },
  {
    "id": "14",
    "title": "Wraps with Black Beans",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 150.2g protein and 1850 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Lunch",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "223",
        "name": "Protein Chapati",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "17",
        "name": "Black Beans",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "8",
        "name": "Avocado",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "73",
        "name": "Fruit",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "161",
        "name": "Shrimp",
        "quantity": 150,
        "unit": "g"
      }
    ],
    "instructions": [
      "Fill wraps with beans, avocado",
      "Serve with fruit",
      "Add chicken or shrimp."
    ],
    "calories": 1850,
    "protein": 150.2,
    "carbs": 222.8,
    "fats": 40.9,
    "fiber": 50.5
  },
  {
    "id": "15",
    "title": "Grilled Halloumi/Tofu & Roasted Veg",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 64.8g protein and 854 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "89",
        "name": "Halloumi",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "177",
        "name": "Tofu",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "56",
        "name": "Couscous",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "122",
        "name": "Orange",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "156",
        "name": "Salmon",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Grill halloumi or tofu",
      "Serve with couscous, orange, or salmon."
    ],
    "calories": 854,
    "protein": 64.8,
    "carbs": 45.4,
    "fats": 47.2,
    "fiber": 7.3
  },
  {
    "id": "16",
    "title": "Pasta with a veggie",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 30.3g protein and 832 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "126",
        "name": "Pasta",
        "quantity": 160,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 1,
        "unit": "tbsp"
      },
      {
        "ingredientId": "225",
        "name": "Parmesan Cheese",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "23",
        "name": "Broccoli",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Boil pasta",
      "Saut\u00e9 garlic and vegetable",
      "Add pasta and pesto / sauce."
    ],
    "calories": 832,
    "protein": 30.3,
    "carbs": 132.5,
    "fats": 20.4,
    "fiber": 9.0
  },
  {
    "id": "17",
    "title": "Mezze Platter",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 109.0g protein and 1358 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Lunch",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "92",
        "name": "Hummus",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "173",
        "name": "Tabbouleh",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "65",
        "name": "Falafel",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "109",
        "name": "Melon",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "99",
        "name": "Lamb",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 150,
        "unit": "g"
      }
    ],
    "instructions": [
      "Assemble platter with hummus, tzatziki, tabbouleh, falafel or eggs",
      "Serve with melon slices and lamb or chicken skewers."
    ],
    "calories": 1358,
    "protein": 109.0,
    "carbs": 64.3,
    "fats": 72.7,
    "fiber": 14.8
  },
  {
    "id": "19",
    "title": "Brown Rice & Chana Masala w chicken",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 52.8g protein and 736 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "25",
        "name": "Brown Rice",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "37",
        "name": "Chana Masala",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "44",
        "name": "Chicken Breast",
        "quantity": 120,
        "unit": "g"
      },
      {
        "ingredientId": "85",
        "name": "Greens",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "15",
        "name": "Berries",
        "quantity": 80,
        "unit": "g"
      }
    ],
    "instructions": [
      "Serve chana masala with brown rice, greens, salad, berries, and chicken breast."
    ],
    "calories": 736,
    "protein": 52.8,
    "carbs": 73.0,
    "fats": 24.4,
    "fiber": 11.8
  },
  {
    "id": "23",
    "title": "Moroccan Lentil & Vegetable Stew",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 83.9g protein and 1018 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    "prepTime": 30,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Dinner",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "103",
        "name": "Lentils",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "45",
        "name": "Chickpeas",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "192",
        "name": "Zucchini",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "164",
        "name": "Spices",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "99",
        "name": "Lamb",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 1,
        "unit": "tbsp"
      }
    ],
    "instructions": [
      "Cook lentils with vegetables and spices",
      "Add chicken or lamb."
    ],
    "calories": 1018,
    "protein": 83.9,
    "carbs": 85.4,
    "fats": 38.8,
    "fiber": 28.3
  },
  {
    "id": "24",
    "title": "Stir-fry noodles",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 42.0g protein and 800 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "207",
        "name": "Protein Noodles",
        "quantity": 300,
        "unit": "g"
      },
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "14",
        "name": "Beans",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "28",
        "name": "Cabbage",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "167",
        "name": "Spring Onion",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "163",
        "name": "Soy Sauce",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "46",
        "name": "Chilli Flakes",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "234",
        "name": "MSG",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 14,
        "unit": "g"
      }
    ],
    "instructions": [
      "Boil the protein noodles until just tender (a minute under package time), drain and rinse briefly in cold water so they stop cooking and stay springy",
      "Beat the egg with a pinch of salt; scramble it in a lightly oiled pan over medium heat until just set, break into pieces and set aside",
      "Heat 1 tbsp sunflower oil in a wok over high heat until shimmering",
      "Add the sliced garlic and chilli flakes and stir for 15-20 seconds until fragrant",
      "Add the julienned carrot, chopped beans and cabbage, and the capsicum strips",
      "Stir-fry 4-5 minutes on high heat - they should stay crisp-tender with a little char",
      "Add the noodles, scrambled egg and spring onion (white and green parts)",
      "Pour in the soy sauce around the edge of the hot wok so it caramelises, sprinkle in the MSG and toss everything hard for 1-2 minutes until evenly coated and glossy",
      "Taste and adjust: more soy for salt, chilli flakes for heat",
      "Serve hot straight from the wok."
    ],
    "calories": 800,
    "protein": 42.0,
    "carbs": 107.7,
    "fats": 23.2,
    "fiber": 16.5
  },
  {
    "id": "25",
    "title": "Paneer Paratha with Masala Yogurt",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 52.2g protein and 1313 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "123",
        "name": "Paneer",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "38",
        "name": "Chapati Flour",
        "quantity": 160,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "62",
        "name": "Dry Methi Leaves",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 9.2,
        "unit": "g"
      }
    ],
    "instructions": [
      "Shred paneer, add masala and onions",
      "Stuff in paratha",
      "Saute onion, tomatoes, add masala",
      "Once cooled, add yogurt."
    ],
    "calories": 1313,
    "protein": 52.2,
    "carbs": 147.7,
    "fats": 57.2,
    "fiber": 7.7
  },
  {
    "id": "26",
    "title": "Palak Paneer Chappathi",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 53.3g protein and 1250 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "123",
        "name": "Paneer",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 250,
        "unit": "g"
      },
      {
        "ingredientId": "38",
        "name": "Chapati Flour",
        "quantity": 160,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "164",
        "name": "Spices",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 9.2,
        "unit": "g"
      }
    ],
    "instructions": [
      "Cook spinach and paneer",
      "Serve with chapati."
    ],
    "calories": 1250,
    "protein": 53.3,
    "carbs": 152.7,
    "fats": 49.8,
    "fiber": 14.4
  },
  {
    "id": "27",
    "title": "Chicken Tikka",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 104.4g protein and 774 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Dinner",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 300,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 120,
        "unit": "g"
      },
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "74",
        "name": "Garam Masala",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "47",
        "name": "Chilli Powder",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "183",
        "name": "Turmeric Powder",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "101",
        "name": "Lemon Juice",
        "quantity": 15,
        "unit": "ml"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Cook chicken tikka with onions and tomatoes",
      "Serve with chapati."
    ],
    "calories": 774,
    "protein": 104.4,
    "carbs": 29.2,
    "fats": 26.5,
    "fiber": 7.1
  },
  {
    "id": "28",
    "title": "Palak Tofu",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 43.4g protein and 833 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "177",
        "name": "Tofu",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "115",
        "name": "Naan",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "122",
        "name": "Orange",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "164",
        "name": "Spices",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 1,
        "unit": "tbsp"
      }
    ],
    "instructions": [
      "Cook spinach with tofu curry",
      "Serve with naan, vegetable sabzi, and orange slices."
    ],
    "calories": 833,
    "protein": 43.4,
    "carbs": 88.0,
    "fats": 40.7,
    "fiber": 15.8
  },
  {
    "id": "30",
    "title": "Masala Boiled Eggs",
    "description": "A nutritious snack featuring fresh ingredients. Provides 12.9g protein and 150 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Snack",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "36",
        "name": "Chaat Masala",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "19",
        "name": "Black Salt",
        "quantity": 1,
        "unit": "g"
      }
    ],
    "instructions": [
      "Sprinkle masala on boiled eggs and serve."
    ],
    "calories": 150,
    "protein": 12.9,
    "carbs": 1.4,
    "fats": 9.8,
    "fiber": 0.3
  },
  {
    "id": "31",
    "title": "Nut Mix",
    "description": "A nutritious snack featuring fresh ingredients. Provides 7.8g protein and 340 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Snack",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "1",
        "name": "Almonds",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "187",
        "name": "Walnuts",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "2",
        "name": "Apple",
        "quantity": 180,
        "unit": "g"
      }
    ],
    "instructions": [
      "Serve almonds and walnuts with apple slices."
    ],
    "calories": 340,
    "protein": 7.8,
    "carbs": 31.9,
    "fats": 23.4,
    "fiber": 8.2
  },
  {
    "id": "32",
    "title": "Hummus & Veggie Sticks",
    "description": "A nutritious snack featuring fresh ingredients. Provides 11.3g protein and 329 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Snack",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "92",
        "name": "Hummus",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "57",
        "name": "Cucumber",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "81",
        "name": "Grapes",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "109",
        "name": "Melon",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Serve vegetable sticks with hummus and grapes or melon."
    ],
    "calories": 329,
    "protein": 11.3,
    "carbs": 53.7,
    "fats": 10.4,
    "fiber": 11.2
  },
  {
    "id": "33",
    "title": "Cottage Cheese & Berries",
    "description": "A nutritious snack featuring fresh ingredients. Provides 12.1g protein and 156 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Snack",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "55",
        "name": "Cottage Cheese",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "15",
        "name": "Berries",
        "quantity": 150,
        "unit": "g"
      }
    ],
    "instructions": [
      "Serve cottage cheese with berries or strawberries."
    ],
    "calories": 156,
    "protein": 12.1,
    "carbs": 12.4,
    "fats": 4.9,
    "fiber": 5.7
  },
  {
    "id": "37",
    "title": "Veggies & Tzatziki",
    "description": "A nutritious snack featuring fresh ingredients. Provides 12.4g protein and 336 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Snack",
      "Vegetarian"
    ],
    "ingredients": [
      {
        "ingredientId": "57",
        "name": "Cucumber",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "81",
        "name": "Grapes",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Serve vegetable sticks with tzatziki and grapes."
    ],
    "calories": 336,
    "protein": 12.4,
    "carbs": 41.9,
    "fats": 15.7,
    "fiber": 4.9
  },
  {
    "id": "39",
    "title": "Roasted Chickpeas & Grapes",
    "description": "A nutritious snack featuring fresh ingredients. Provides 14.0g protein and 315 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Snack",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "45",
        "name": "Chickpeas",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "81",
        "name": "Grapes",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Serve roasted chickpeas with grapes."
    ],
    "calories": 315,
    "protein": 14.0,
    "carbs": 59.2,
    "fats": 4.0,
    "fiber": 12.3
  },
  {
    "id": "46",
    "title": "Puliyar Chutney",
    "description": "A nutritious sides featuring fresh ingredients. Provides 13.7g protein and 469 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Sides",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "148",
        "name": "Rice",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "174",
        "name": "Tamarind",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "127",
        "name": "Peanuts",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "164",
        "name": "Spices",
        "quantity": 10,
        "unit": "g"
      }
    ],
    "instructions": [
      "Cook rice and mix with tamarind, peanuts, and spices",
      "Serve with yogurt."
    ],
    "calories": 469,
    "protein": 13.7,
    "carbs": 70.1,
    "fats": 16.6,
    "fiber": 7.5
  },
  {
    "id": "47",
    "title": "Salna - Hotel style",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 18.9g protein and 839 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 27.6,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 250,
        "unit": "g"
      },
      {
        "ingredientId": "79",
        "name": "Ginger Paste",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "76",
        "name": "Garlic Paste",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 6,
        "unit": "nos"
      },
      {
        "ingredientId": "149",
        "name": "Roasted Gram",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "127",
        "name": "Peanuts",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "50",
        "name": "Coconut",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "31",
        "name": "Cardamom",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "49",
        "name": "Cloves",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "48",
        "name": "Cinnamon",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "168",
        "name": "Star Anise",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "66",
        "name": "Fennel Seeds",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "95",
        "name": "Kalpasi",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "183",
        "name": "Turmeric Powder",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "47",
        "name": "Chilli Powder",
        "quantity": 6,
        "unit": "g"
      },
      {
        "ingredientId": "93",
        "name": "Jeera Powder",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "54",
        "name": "Corriander Powder",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "114",
        "name": "Mutton Masala",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "74",
        "name": "Garam Masala",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "53",
        "name": "Corriander Leaves",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "111",
        "name": "Mint Leaves",
        "quantity": 20,
        "unit": "g"
      }
    ],
    "instructions": [
      "* Prepare the Paste:",
      "* Combine roasted gram (pottukadalai), peanuts, coconut, cardamom, star anise, a small piece of cinnamon, kalpasi, two cloves, and a little fennel seeds in a blender",
      "* Grind these ingredients into a smooth paste",
      "* Saut\u00e9 Aromatics:",
      "* Heat 150 ml of oil in a large pot",
      "* Add two bay leaves, two cloves, two small pieces of cinnamon, a small amount of kalpasi, a small piece of star anise, and four cloves to the hot oil",
      "* Add 200 grams of sliced onions and saut\u00e9 until golden brown",
      "* Add one spoon of garlic paste and one spoon of ginger paste, then mix well",
      "* Add six green chilies and continue to saut\u00e9",
      "* Add Spices and Tomatoes:",
      "* Add half a spoon of turmeric powder, two spoons of chili powder, two spoons of cumin powder, one spoon of coriander powder, two spoons of mutton masala, and one spoon of garam masala",
      "* Mix the spices thoroughly with the saut\u00e9ed ingredients",
      "* Add five chopped tomatoes and mix until they soften",
      "* Add a little water and salt to taste",
      "* Add a small bunch of coriander leaves and a slightly larger amount of mint leaves",
      "* Continue to cook until the tomatoes are well mashed and the oil separates",
      "* Incorporate the Ground Paste and Finish:",
      "* Add the previously ground paste to the pot and mix it in",
      "* Pour in about 3 liters of water",
      "* Check the salt level and adjust if needed",
      "* Cover the pot and let it boil for about 10 minutes",
      "* Once cooked, garnish with coriander leaves."
    ],
    "calories": 839,
    "protein": 18.9,
    "carbs": 72.8,
    "fats": 59.2,
    "fiber": 29.3
  },
  {
    "id": "48",
    "title": "Overnight rice",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 2.7g protein and 130 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "148",
        "name": "Rice",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 1.5,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Soak rice overnight."
    ],
    "calories": 130,
    "protein": 2.7,
    "carbs": 28.2,
    "fats": 0.3,
    "fiber": 0.4
  },
  {
    "id": "49",
    "title": "Guacamole with boiled eggs",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 40.8g protein and 921 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "8",
        "name": "Avocado",
        "quantity": 300,
        "unit": "g"
      },
      {
        "ingredientId": "41",
        "name": "Cherry Tomatoes",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "105",
        "name": "Lime",
        "quantity": 45,
        "unit": "g"
      },
      {
        "ingredientId": "120",
        "name": "Olives",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "156",
        "name": "Salmon",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Toast bread",
      "Mash avocado",
      "Top with onion and tomato",
      "Season with Masala if needed",
      "Have with slice of boiled egg."
    ],
    "calories": 921,
    "protein": 40.8,
    "carbs": 41.3,
    "fats": 71.5,
    "fiber": 24.4
  },
  {
    "id": "50",
    "title": "Celery soup",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 5.5g protein and 317 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "35",
        "name": "Celery",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "72",
        "name": "Fried Onions",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "137",
        "name": "Potatoes",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 2,
        "unit": "cup"
      },
      {
        "ingredientId": "186",
        "name": "Vegetable Stock",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "27",
        "name": "Butter",
        "quantity": 10,
        "unit": "g"
      }
    ],
    "instructions": [
      "Pressure cook carrot, celery, potato",
      "Once cooled down, grind it in the mixer",
      "Heat sauce pan, saut\u00e9 garlic and pour soup",
      "Top with fried onions."
    ],
    "calories": 317,
    "protein": 5.5,
    "carbs": 50.0,
    "fats": 11.8,
    "fiber": 7.8
  },
  {
    "id": "52",
    "title": "Salad & Pickle",
    "description": "A nutritious snack featuring fresh ingredients. Provides 6.7g protein and 293 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Snack",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "57",
        "name": "Cucumber",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "155",
        "name": "Salad Tomatoes",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "81",
        "name": "Grapes",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "136",
        "name": "Pomegranate",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "130",
        "name": "Pickle",
        "quantity": 50,
        "unit": "g"
      }
    ],
    "instructions": [
      "Take one pickle",
      "And a choice of salad vegetables / fruits in a bowl",
      "Have them 30mins before dinner."
    ],
    "calories": 293,
    "protein": 6.7,
    "carbs": 69.2,
    "fats": 2.2,
    "fiber": 13.0
  },
  {
    "id": "53",
    "title": "Mediterranean Lentil & Chickpea salad",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 51.0g protein and 1115 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "45",
        "name": "Chickpeas",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "103",
        "name": "Lentils",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "145",
        "name": "Red Capsicum",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "146",
        "name": "Red Onion",
        "quantity": 75,
        "unit": "g"
      },
      {
        "ingredientId": "9",
        "name": "Baby Spinach",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "68",
        "name": "Feta Cheese",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 2,
        "unit": "tbsp"
      },
      {
        "ingredientId": "101",
        "name": "Lemon Juice",
        "quantity": 30,
        "unit": "ml"
      },
      {
        "ingredientId": "61",
        "name": "Dried Oregano",
        "quantity": 2,
        "unit": "g"
      }
    ],
    "instructions": [
      "In a large bowl, combine chickpeas, lentils, bell pepper, and red onion",
      "Add the baby spinach and gently toss together",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper",
      "Pour the dressing over the salad and mix well",
      "Top with crumbled feta cheese if using",
      "Serve immediately or refrigerate for up to 24 hours (the flavors will develop nicely)."
    ],
    "calories": 1115,
    "protein": 51.0,
    "carbs": 112.6,
    "fats": 55.1,
    "fiber": 34.6
  },
  {
    "id": "54",
    "title": "Cumin tea",
    "description": "A nutritious pre breakfast featuring fresh ingredients. Provides 1.6g protein and 41 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
    "prepTime": 5,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Pre-Breakfast",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "58",
        "name": "Cumin Seeds",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "77",
        "name": "Ginger",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "100",
        "name": "Lemon",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 2,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Soak cumin overnight, boil with ginger and serve with lemon"
    ],
    "calories": 41,
    "protein": 1.6,
    "carbs": 8.7,
    "fats": 1.3,
    "fiber": 2.1
  },
  {
    "id": "55",
    "title": "Soaked raisins and nuts",
    "description": "A nutritious pre breakfast featuring fresh ingredients. Provides 5.1g protein and 205 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 5,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Pre-Breakfast",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "1",
        "name": "Almonds",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "69",
        "name": "Fig",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "143",
        "name": "Raisins",
        "quantity": 20,
        "unit": "g"
      }
    ],
    "instructions": [
      "Soak almonds, fig, raisins overnight."
    ],
    "calories": 205,
    "protein": 5.1,
    "carbs": 27.8,
    "fats": 10.2,
    "fiber": 4.4
  },
  {
    "id": "56",
    "title": "Overnight rice water",
    "description": "A nutritious pre breakfast featuring fresh ingredients. Provides 9.5g protein and 288 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 5,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Pre-Breakfast",
      "Vegetarian"
    ],
    "ingredients": [
      {
        "ingredientId": "148",
        "name": "Rice",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 75,
        "unit": "g"
      }
    ],
    "instructions": [
      "Soak 3 spoons of rice or oats overnight with a 2spoons of yogurt",
      "Have them with onions."
    ],
    "calories": 288,
    "protein": 9.5,
    "carbs": 39.2,
    "fats": 10.4,
    "fiber": 1.7
  },
  {
    "id": "57",
    "title": "Lemon tea",
    "description": "A nutritious pre breakfast featuring fresh ingredients. Provides 1.0g protein and 155 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
    "prepTime": 5,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Pre-Breakfast",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "77",
        "name": "Ginger",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "91",
        "name": "Honey",
        "quantity": 30,
        "unit": "ml"
      },
      {
        "ingredientId": "100",
        "name": "Lemon",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 2,
        "unit": "cup"
      }
    ],
    "instructions": [
      "In warm water squeeze half lemon and honey",
      "Ginger is optional"
    ],
    "calories": 155,
    "protein": 1.0,
    "carbs": 42.6,
    "fats": 0.3,
    "fiber": 1.9
  },
  {
    "id": "58",
    "title": "Mint tea",
    "description": "A nutritious snack featuring fresh ingredients. Provides 1.1g protein and 30 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800",
    "prepTime": 5,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Snack",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "111",
        "name": "Mint Leaves",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "77",
        "name": "Ginger",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "100",
        "name": "Lemon",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 2,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Boil mint and ginger",
      "Serve with lemon",
      "Best to have after meal."
    ],
    "calories": 30,
    "protein": 1.1,
    "carbs": 7.9,
    "fats": 0.3,
    "fiber": 2.4
  },
  {
    "id": "59",
    "title": "Ragi idly / dosa",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 22.3g protein and 523 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "142",
        "name": "Ragi Flour",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "185",
        "name": "Urad Dhal",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "210",
        "name": "Fenugreek Seeds",
        "quantity": 2,
        "unit": "tsp"
      }
    ],
    "instructions": [
      "Soak urad dhal for 5 hours",
      "Grind it with ragi"
    ],
    "calories": 523,
    "protein": 22.3,
    "carbs": 106.0,
    "fats": 2.4,
    "fiber": 21.9
  },
  {
    "id": "60",
    "title": "Peanut protein chutney",
    "description": "A nutritious sides featuring fresh ingredients. Provides 23.2g protein and 661 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Sides",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "127",
        "name": "Peanuts",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "166",
        "name": "Split Peas",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "50",
        "name": "Coconut",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "60",
        "name": "Curry Leaves",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "174",
        "name": "Tamarind",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 4.6,
        "unit": "g"
      }
    ],
    "instructions": [
      "Roast all ingredients (except curry leaves) on a pan and grind it for chutney",
      "Tadka with curry leaves",
      "Use less oil."
    ],
    "calories": 661,
    "protein": 23.2,
    "carbs": 48.0,
    "fats": 46.5,
    "fiber": 18.3
  },
  {
    "id": "61",
    "title": "Vit-C boost snack box",
    "description": "A nutritious snack featuring fresh ingredients. Provides 7.2g protein and 321 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Snack",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "88",
        "name": "Guava",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "98",
        "name": "Kiwi",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "122",
        "name": "Orange",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "124",
        "name": "Papaya",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "132",
        "name": "Pineapple",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "169",
        "name": "Strawberry",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Choice of snack for a day",
      "Have BEFORE your meal to increase iron absorption."
    ],
    "calories": 321,
    "protein": 7.2,
    "carbs": 77.0,
    "fats": 2.5,
    "fiber": 17.6
  },
  {
    "id": "62",
    "title": "Makhana Salad bowl",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 63.8g protein and 877 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "40",
        "name": "Cheddar Cheese",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "45",
        "name": "Chickpeas",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "52",
        "name": "Corn",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "104",
        "name": "Lettuce",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "106",
        "name": "Makana",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "111",
        "name": "Mint Leaves",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "131",
        "name": "Pickled Courgette",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "141",
        "name": "Radishes",
        "quantity": 50,
        "unit": "g"
      }
    ],
    "instructions": [
      "* Boil chickpeas, chicken, and corn separately",
      "* Prepare the dressing by combining makana, mint, green chilies, cheddar cheese, and yogurt",
      "* Combine chickpeas, chicken, corn, lettuce, radishes, chopped onions and pickled courgette",
      "* Mix in the dressing."
    ],
    "calories": 877,
    "protein": 63.8,
    "carbs": 104.0,
    "fats": 24.9,
    "fiber": 22.4
  },
  {
    "id": "64",
    "title": "Kefir drink",
    "description": "A nutritious pre breakfast featuring fresh ingredients. Provides 19.7g protein and 334 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800",
    "prepTime": 5,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Pre-Breakfast",
      "Vegetarian"
    ],
    "ingredients": [
      {
        "ingredientId": "97",
        "name": "Kefir",
        "quantity": 560,
        "unit": "ml"
      },
      {
        "ingredientId": "4",
        "name": "Asafoetida",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "19",
        "name": "Black Salt",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 1,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Mix in a glass of water."
    ],
    "calories": 334,
    "protein": 19.7,
    "carbs": 26.5,
    "fats": 16.3,
    "fiber": 0.1
  },
  {
    "id": "65",
    "title": "Chapati",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 15.5g protein and 603 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Dinner",
      "Vegetarian"
    ],
    "ingredients": [
      {
        "ingredientId": "38",
        "name": "Chapati Flour",
        "quantity": 160,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 0.4,
        "unit": "cup"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 4.6,
        "unit": "g"
      }
    ],
    "instructions": [
      "Mix all, knead dough, keep it aside for 20mins",
      "And make chapatis"
    ],
    "calories": 603,
    "protein": 15.5,
    "carbs": 125.3,
    "fats": 6.8,
    "fiber": 5.4
  },
  {
    "id": "67",
    "title": "Bhaji style gravy",
    "description": "A nutritious sides featuring fresh ingredients. Provides 17.3g protein and 695 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Sides",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "137",
        "name": "Potatoes",
        "quantity": 300,
        "unit": "g"
      },
      {
        "ingredientId": "34",
        "name": "Cauliflower",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "128",
        "name": "Peas",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "27",
        "name": "Butter",
        "quantity": 25,
        "unit": "g"
      },
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "47",
        "name": "Chilli Powder",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "54",
        "name": "Corriander Powder",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "80",
        "name": "Gram Masala",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "93",
        "name": "Jeera Powder",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "36",
        "name": "Chaat Masala",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      }
    ],
    "instructions": [
      "Pressure cook all vegetables and mash them",
      "In a pan, add some butter and chopped onions",
      "Fry until brown and add ginger garlic paste",
      "Once cooked, add all masala and cook for some more time",
      "Add butter",
      "Then tomatoes",
      "Once cooked, add mashed veggies",
      "Cook till it becomes dry and brown",
      "Serve with butter, lemon, chopped raw onions and chaat masala on top."
    ],
    "calories": 695,
    "protein": 17.3,
    "carbs": 109.3,
    "fats": 26.3,
    "fiber": 22.9
  },
  {
    "id": "68",
    "title": "Aval upma & Eggs",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 34.1g protein and 988 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "7",
        "name": "Aval",
        "quantity": 120,
        "unit": "g"
      },
      {
        "ingredientId": "14",
        "name": "Beans",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 1.5,
        "unit": "tbsp"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "127",
        "name": "Peanuts",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "53",
        "name": "Corriander Leaves",
        "quantity": 10,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saute asusual and add chopped beans and carrot",
      "When cooked, add chopped onions",
      "Meanwhile wash aval and dry it in a plate",
      "When onion is still mildly crunchy, add aval",
      "Add saut\u00e9d peanuts and serve with corriander leaves toppings",
      "Try to include olive oil, lemon juice",
      "Serve with boiled egg"
    ],
    "calories": 988,
    "protein": 34.1,
    "carbs": 117.2,
    "fats": 46.3,
    "fiber": 10.2
  },
  {
    "id": "69",
    "title": "Toast and Baked beans",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 37.1g protein and 1016 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "10",
        "name": "Baked Beans",
        "quantity": 400,
        "unit": "g"
      },
      {
        "ingredientId": "22",
        "name": "Bread",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "27",
        "name": "Butter",
        "quantity": 15,
        "unit": "g"
      }
    ],
    "instructions": [
      "Cook baked beans can with spices you like",
      "Toast the bread",
      "Serve with butter."
    ],
    "calories": 1016,
    "protein": 37.1,
    "carbs": 184.4,
    "fats": 19.8,
    "fiber": 21.6
  },
  {
    "id": "70",
    "title": "Brussel sprouts + brown rice / quinoa",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 45.0g protein and 1043 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "26",
        "name": "Brussel Sprouts",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "140",
        "name": "Quinoa",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "25",
        "name": "Brown Rice",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "17",
        "name": "Black Beans",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "68",
        "name": "Feta Cheese",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "101",
        "name": "Lemon Juice",
        "quantity": 20,
        "unit": "ml"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 2,
        "unit": "tbsp"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 50,
        "unit": "g"
      }
    ],
    "instructions": [
      "Cook all separate and mix",
      "Add za'atar for seasoning",
      "Have a fruit before the meal",
      "Have with chicken for M"
    ],
    "calories": 1043,
    "protein": 45.0,
    "carbs": 124.7,
    "fats": 44.5,
    "fiber": 27.5
  },
  {
    "id": "71",
    "title": "Clear veg soup",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 3.1g protein and 86 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "14",
        "name": "Beans",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "186",
        "name": "Vegetable Stock",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 4,
        "unit": "cup"
      }
    ],
    "instructions": [
      "With chicken stock"
    ],
    "calories": 86,
    "protein": 3.1,
    "carbs": 19.6,
    "fats": 0.5,
    "fiber": 5.6
  },
  {
    "id": "72",
    "title": "Aubergine - Turkish version",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 51.0g protein and 930 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "6",
        "name": "Aubergine",
        "quantity": 300,
        "unit": "g"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "68",
        "name": "Feta Cheese",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "94",
        "name": "Kale",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 2,
        "unit": "tbsp"
      },
      {
        "ingredientId": "156",
        "name": "Salmon",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "125",
        "name": "Parsley",
        "quantity": 10,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saute aubergine, capsicum separately in olive oil",
      "Add chopped parsley and kale",
      "Top with chopped feta cheese",
      "Saute salmon for Manoj",
      "Use lemon as dressing."
    ],
    "calories": 930,
    "protein": 51.0,
    "carbs": 31.4,
    "fats": 69.3,
    "fiber": 12.8
  },
  {
    "id": "73",
    "title": "Saut\u00e9d Broccoli + Pasta",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 29.1g protein and 843 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "23",
        "name": "Broccoli",
        "quantity": 250,
        "unit": "g"
      },
      {
        "ingredientId": "126",
        "name": "Pasta",
        "quantity": 160,
        "unit": "g"
      },
      {
        "ingredientId": "57",
        "name": "Cucumber",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "11",
        "name": "Balsamic Vinegar",
        "quantity": 24,
        "unit": "g"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 1,
        "unit": "tbsp"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      }
    ],
    "instructions": [
      "Saute broccoli",
      "Boiled pasta with chicken stock",
      "Dress with Balsamic vinegar",
      "Eat with cucumber slices"
    ],
    "calories": 843,
    "protein": 29.1,
    "carbs": 145.8,
    "fats": 17.0,
    "fiber": 12.2
  },
  {
    "id": "74",
    "title": "Lentil stew",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 65.5g protein and 530 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    "prepTime": 30,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "103",
        "name": "Lentils",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "23",
        "name": "Broccoli",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "14",
        "name": "Beans",
        "quantity": 75,
        "unit": "g"
      },
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saute all veggies",
      "\\nPressure cook lentils\\nMix all",
      "\\nServe with chopped corriander."
    ],
    "calories": 530,
    "protein": 65.5,
    "carbs": 54.0,
    "fats": 6.7,
    "fiber": 19.8
  },
  {
    "id": "75",
    "title": "Fruits and yogurt",
    "description": "A nutritious snack featuring fresh ingredients. Provides 13.9g protein and 558 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Snack",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "2",
        "name": "Apple",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "12",
        "name": "Banana",
        "quantity": 120,
        "unit": "g"
      },
      {
        "ingredientId": "98",
        "name": "Kiwi",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "132",
        "name": "Pineapple",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "122",
        "name": "Orange",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 150,
        "unit": "g"
      }
    ],
    "instructions": [
      "Choice of fruits with yogurt."
    ],
    "calories": 558,
    "protein": 13.9,
    "carbs": 99.5,
    "fats": 16.5,
    "fiber": 14.7
  },
  {
    "id": "76",
    "title": "Mediterranean Chicken & Chickpea Bowl",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 94.9g protein and 936 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "56",
        "name": "Couscous",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "45",
        "name": "Chickpeas",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "44",
        "name": "Chicken Breast",
        "quantity": 240,
        "unit": "g"
      },
      {
        "ingredientId": "101",
        "name": "Lemon Juice",
        "quantity": 15,
        "unit": "ml"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 1,
        "unit": "tbsp"
      }
    ],
    "instructions": [
      "Base of wholewheat couscous, peppers, onions, spinach, tomatoes, chickpeas",
      "Topped with 120g grilled chicken breast or feta cheese"
    ],
    "calories": 936,
    "protein": 94.9,
    "carbs": 78.0,
    "fats": 26.8,
    "fiber": 16.9
  },
  {
    "id": "77",
    "title": "Hearty Lentil & Sweet Potato Shepherd's pie",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 30.6g protein and 866 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "171",
        "name": "Sweet Potatoes",
        "quantity": 400,
        "unit": "g"
      },
      {
        "ingredientId": "110",
        "name": "Milk",
        "quantity": 100,
        "unit": "ml"
      },
      {
        "ingredientId": "27",
        "name": "Butter",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "35",
        "name": "Celery",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "103",
        "name": "Lentils",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "186",
        "name": "Vegetable Stock",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "163",
        "name": "Soy Sauce",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "83",
        "name": "Green Beans",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Boil the sweet potatoes until tender, then mash with milk and oil/butter",
      "Saut\u00e9 onion, carrots, and celery until softened",
      "Add garlic",
      "Stir in the rinsed lentils, chopped tomatoes, vegetable stock, herbs, and soy sauce",
      "Simmer for 30-40 minutes until lentils are tender",
      "Preheat oven to 200\u00b0C",
      "Spoon the lentil mixture into an ovenproof dish and top with the mashed sweet potato",
      "Bake for 20-25 minutes until golden brown",
      "Serve with steamed green vegetables."
    ],
    "calories": 866,
    "protein": 30.6,
    "carbs": 153.5,
    "fats": 17.8,
    "fiber": 34.9
  },
  {
    "id": "78",
    "title": "Tofu & Black Bean Burrito Bowl",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 135.7g protein and 2146 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "25",
        "name": "Brown Rice",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "17",
        "name": "Black Beans",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "172",
        "name": "Sweetcorn",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "104",
        "name": "Lettuce",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "8",
        "name": "Avocado",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "179",
        "name": "Tomato Salsa",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "71",
        "name": "Fresh Coriander",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "105",
        "name": "Lime",
        "quantity": 45,
        "unit": "g"
      },
      {
        "ingredientId": "177",
        "name": "Tofu",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "44",
        "name": "Chicken Breast",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "162",
        "name": "Smoked Paprika",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "93",
        "name": "Jeera Powder",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 2,
        "unit": "tbsp"
      }
    ],
    "instructions": [
      "Prepare the protein",
      "In separate bowls, toss the tofu and the chicken with their respective seasonings",
      "Cook the chicken strips until golden and cooked through",
      "Pan-fry the tofu cubes until golden and crisp",
      "Assemble the bowls",
      "Divide the cooked brown rice between two bowls",
      "Arrange the shared ingredients around the rice",
      "Top the vegetarian bowl with the crispy tofu and the omnivore bowl with the grilled chicken",
      "Finish each bowl with salsa, Greek yogurt, coriander, and a squeeze of lime."
    ],
    "calories": 2146,
    "protein": 135.7,
    "carbs": 232.2,
    "fats": 84.7,
    "fiber": 55.8
  },
  {
    "id": "79",
    "title": "Briyani",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 143.6g protein and 1531 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 400,
        "unit": "g"
      },
      {
        "ingredientId": "148",
        "name": "Rice",
        "quantity": 250,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 120,
        "unit": "g"
      },
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "72",
        "name": "Fried Onions",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "111",
        "name": "Mint Leaves",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "71",
        "name": "Fresh Coriander",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "47",
        "name": "Chilli Powder",
        "quantity": 4,
        "unit": "g"
      },
      {
        "ingredientId": "183",
        "name": "Turmeric Powder",
        "quantity": 1.5,
        "unit": "g"
      },
      {
        "ingredientId": "74",
        "name": "Garam Masala",
        "quantity": 4,
        "unit": "g"
      },
      {
        "ingredientId": "101",
        "name": "Lemon Juice",
        "quantity": 15,
        "unit": "ml"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "13",
        "name": "Bay Leaves",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "48",
        "name": "Cinnamon",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "49",
        "name": "Cloves",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "31",
        "name": "Cardamom",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "233",
        "name": "Black Cardamom",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "168",
        "name": "Star Anise",
        "quantity": 1.5,
        "unit": "g"
      },
      {
        "ingredientId": "230",
        "name": "Shah Jeera",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "231",
        "name": "Ghee",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "110",
        "name": "Milk",
        "quantity": 30,
        "unit": "ml"
      },
      {
        "ingredientId": "229",
        "name": "Saffron",
        "quantity": 0.2,
        "unit": "g"
      },
      {
        "ingredientId": "232",
        "name": "Kewra Water",
        "quantity": 2.5,
        "unit": "ml"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 3,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Kacchi (raw) dum style Hyderabadi biryani",
      "MARINADE (2h minimum, overnight is best): Whisk yogurt, ginger garlic paste, chilli powder, turmeric, garam masala, lemon juice and salt",
      "Coat the chicken, mix in half the fried onions, half the mint and coriander, and the slit green chillies",
      "Rest 2 hours minimum",
      "PREP: Soak the saffron in warm milk",
      "Wash and soak the basmati rice for 30 minutes, then drain",
      "RICE: Boil 3 cups water with bay leaves, cinnamon, cloves, green cardamom, black cardamom, star anise, shah jeera and salt",
      "Add the rice and cook to 70-80% done - the grain should still have a firm bite",
      "Drain immediately (mushy rice is the #1 biryani mistake)",
      "LAYER: In a heavy-bottomed pot, spread the marinated chicken (with its marinade) on the base",
      "Layer the parboiled rice over it",
      "Top with the remaining fried onions, mint, coriander, the saffron milk, kewra water and dots of ghee",
      "DUM: Seal the pot with foil or a tight lid (traditionally a wheat-dough seal)",
      "Place on a hot tawa/griddle over medium heat for 5-10 minutes until steam builds, then cook on the lowest heat for 25-30 minutes",
      "Do not open the lid",
      "Rest sealed for 15 minutes",
      "SERVE: Open at the table, fluff gently so each plate gets both the chicken layer and the white/saffron-streaked rice",
      "Serve with raita or mirchi ka salan."
    ],
    "calories": 1531,
    "protein": 143.6,
    "carbs": 103.2,
    "fats": 59.1,
    "fiber": 10.7
  },
  {
    "id": "80",
    "title": "Garlic bread",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 31.6g protein and 517 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "46",
        "name": "Chilli Flakes",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 8,
        "unit": "nos"
      },
      {
        "ingredientId": "228",
        "name": "Jason'S Protein Bread",
        "quantity": 3,
        "unit": "nos"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 2,
        "unit": "tbsp"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 2,
        "unit": "g"
      }
    ],
    "instructions": [
      "Toast the Jason's Protein Bread slices lightly first so the spread melts into them instead of sogging them",
      "Spoon the Oven-baked Garlic Chilli Spread over each slice - about 1 tbsp of the garlicky oil and 4 soft roasted cloves per slice (from a 2-person batch: 8 cloves, 2 tbsp oil total), with a little of the chilli flakes and salt that ride along in the spread",
      "Spread it right to the edges, then return the slices to the toaster/oven for 2-3 minutes until the edges are golden and the oil bubbles",
      "Serve hot, straight away."
    ],
    "calories": 517,
    "protein": 31.6,
    "carbs": 23.6,
    "fats": 34.8,
    "fiber": 9.8
  },
  {
    "id": "81",
    "title": "Green gram dosa/idly",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 105.2g protein and 1571 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "193",
        "name": "Green Moong Dhal",
        "quantity": 2,
        "unit": "cup"
      },
      {
        "ingredientId": "142",
        "name": "Ragi Flour",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 3,
        "unit": "nos"
      },
      {
        "ingredientId": "53",
        "name": "Corriander Leaves",
        "quantity": 10,
        "unit": "g"
      }
    ],
    "instructions": [
      "Blend soaked dhal with spinach, ragi, corriander leaves, green chillies",
      "Saute cumin seeds and mix with the batter",
      "You make the batter idly / dosa",
      "Serve with coconut chutney."
    ],
    "calories": 1571,
    "protein": 105.2,
    "carbs": 289.1,
    "fats": 6.1,
    "fiber": 73.4
  },
  {
    "id": "82",
    "title": "Creamy orange smoothie",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 16.5g protein and 676 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "12",
        "name": "Banana",
        "quantity": 300,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "111",
        "name": "Mint Leaves",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "122",
        "name": "Orange",
        "quantity": 350,
        "unit": "g"
      },
      {
        "ingredientId": "117",
        "name": "Nuts",
        "quantity": 20,
        "unit": "g"
      }
    ],
    "instructions": [
      "Blend them and top it with nuts",
      "Serves 1",
      "Double the quantity for two."
    ],
    "calories": 676,
    "protein": 16.5,
    "carbs": 121.5,
    "fats": 20.5,
    "fiber": 19.9
  },
  {
    "id": "83",
    "title": "Millet Ponghal",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 32.1g protein and 845 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "195",
        "name": "Kambhu",
        "quantity": 120,
        "unit": "g"
      },
      {
        "ingredientId": "112",
        "name": "Moong Dal",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 3.5,
        "unit": "cup"
      },
      {
        "ingredientId": "27",
        "name": "Butter",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "58",
        "name": "Cumin Seeds",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "18",
        "name": "Black Pepper",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "60",
        "name": "Curry Leaves",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "77",
        "name": "Ginger",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "4",
        "name": "Asafoetida",
        "quantity": 0.5,
        "unit": "g"
      },
      {
        "ingredientId": "214",
        "name": "Cashew Nuts",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      }
    ],
    "instructions": [
      "Pressure cook millet and dhal with salt",
      "Saute with cumin seeds, curry leaves, green chillies",
      "Serve with coconut chutney and sliced carrots and cucumber."
    ],
    "calories": 845,
    "protein": 32.1,
    "carbs": 128.8,
    "fats": 24.5,
    "fiber": 25.3
  },
  {
    "id": "84",
    "title": "Vegetable pastry",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 27.6g protein and 906 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "205",
        "name": "Wheat Flour",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "27",
        "name": "Butter",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "137",
        "name": "Potatoes",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "128",
        "name": "Peas",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 9.2,
        "unit": "g"
      }
    ],
    "instructions": [
      "Cook veggie masala for stuffing",
      "And stuff into the pastry sheet",
      "Apply egg on pastries before baking."
    ],
    "calories": 906,
    "protein": 27.6,
    "carbs": 132.8,
    "fats": 33.4,
    "fiber": 20.3
  },
  {
    "id": "85",
    "title": "Sweet potato chaat",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 8.3g protein and 358 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "171",
        "name": "Sweet Potatoes",
        "quantity": 300,
        "unit": "g"
      },
      {
        "ingredientId": "41",
        "name": "Cherry Tomatoes",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "57",
        "name": "Cucumber",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "18",
        "name": "Black Pepper",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "36",
        "name": "Chaat Masala",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "101",
        "name": "Lemon Juice",
        "quantity": 20,
        "unit": "ml"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      }
    ],
    "instructions": [
      "Mix all"
    ],
    "calories": 358,
    "protein": 8.3,
    "carbs": 81.7,
    "fats": 1.4,
    "fiber": 14.3
  },
  {
    "id": "86",
    "title": "Glass of ACV",
    "description": "A nutritious snack featuring fresh ingredients. Provides 0.0g protein and 6 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Snack",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "197",
        "name": "Apple Cider Vinegar",
        "quantity": 2,
        "unit": "tbsp"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 2,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Mix and drink before heavy meal"
    ],
    "calories": 6,
    "protein": 0.0,
    "carbs": 0.3,
    "fats": 0.0,
    "fiber": 0.0
  },
  {
    "id": "87",
    "title": "Khambu dosa",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 16.7g protein and 498 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "198",
        "name": "Pearl Millet",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "203",
        "name": "Rava",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "205",
        "name": "Wheat Flour",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 3,
        "unit": "nos"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 4,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Mix all and use the batter for dosa"
    ],
    "calories": 498,
    "protein": 16.7,
    "carbs": 98.8,
    "fats": 5.0,
    "fiber": 13.7
  },
  {
    "id": "88",
    "title": "Lentil Tofu (baked) salad",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 66.6g protein and 1035 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "1",
        "name": "Almonds",
        "quantity": 8,
        "unit": "g"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "45",
        "name": "Chickpeas",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "52",
        "name": "Corn",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "53",
        "name": "Corriander Leaves",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "77",
        "name": "Ginger",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "101",
        "name": "Lemon Juice",
        "quantity": 20,
        "unit": "ml"
      },
      {
        "ingredientId": "111",
        "name": "Mint Leaves",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "140",
        "name": "Quinoa",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "177",
        "name": "Tofu",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "187",
        "name": "Walnuts",
        "quantity": 10,
        "unit": "g"
      }
    ],
    "instructions": [
      "Soak (any lentil) example, splitted chickpea overnight",
      "Grind it next day with garlic, mint leaves, ginger, and coriander leaves",
      "Add tofu and grind mildly",
      "Make it into small balls and bake in oven / air fryer for 25-30 minutes at 185\u00b0C",
      "Now chop capsicum, onion, corn and soak them in vinegar and lemon juice for a while",
      "Cook quinoa and add baked lentil Tofu balls in the same bowl",
      "Now add vegetables and gently mix",
      "Recipe serves 2."
    ],
    "calories": 1035,
    "protein": 66.6,
    "carbs": 114.3,
    "fats": 43.6,
    "fiber": 27.8
  },
  {
    "id": "89",
    "title": "Oats idly",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 25.2g protein and 618 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "53",
        "name": "Corriander Leaves",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "118",
        "name": "Oats",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "203",
        "name": "Rava",
        "quantity": 50,
        "unit": "g"
      }
    ],
    "instructions": [
      "Roast oats and rava on low heat",
      "Once cooled down, grind and add water and yogurt",
      "Let it soak for 30mins, then pour batter in idly mould",
      "Steam it for 15-20 mins."
    ],
    "calories": 618,
    "protein": 25.2,
    "carbs": 105.8,
    "fats": 12.3,
    "fiber": 12.7
  },
  {
    "id": "90",
    "title": "Bitter gourd gravy",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 6.8g protein and 240 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Fiber",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "206",
        "name": "Bitter Gourd",
        "quantity": 3,
        "unit": "nos"
      },
      {
        "ingredientId": "71",
        "name": "Fresh Coriander",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "47",
        "name": "Chilli Powder",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "183",
        "name": "Turmeric Powder",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saute onion, ginger garlic paste, tomato",
      "Chop bitter gourd and add it to the gravy",
      "Serve with chapathi and cucumber."
    ],
    "calories": 240,
    "protein": 6.8,
    "carbs": 31.6,
    "fats": 12.7,
    "fiber": 15.1
  },
  {
    "id": "91",
    "title": "Cauliflower rice",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 10.0g protein and 174 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Fiber",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "34",
        "name": "Cauliflower",
        "quantity": 500,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 4.5,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1.5,
        "unit": "g"
      },
      {
        "ingredientId": "93",
        "name": "Jeera Powder",
        "quantity": 1,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saut\u00e9ed cauliflower rice pilaf",
      "Grate the cauliflower on the coarse side of a grater (or pulse in a food processor) to rice-sized grains",
      "Heat 1 tsp oil in a wide pan over medium heat",
      "Add 0.5 tsp jeera powder and let it sizzle for a few seconds, then add 1 minced clove of garlic and cook until fragrant, about 20-30 seconds - do not let it brown",
      "Add the riced cauliflower and salt",
      "Toss to coat, spread it out, and saut\u00e9 over medium-high heat for 5-7 minutes, stirring every minute or so, until tender with a slight bite and a few toasted edges",
      "Taste and adjust salt",
      "Serve hot as a low-carb rice substitute with curry or dal."
    ],
    "calories": 174,
    "protein": 10.0,
    "carbs": 26.3,
    "fats": 6.1,
    "fiber": 10.2
  },
  {
    "id": "92",
    "title": "Spicy quinoa porridge",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 11.8g protein and 253 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "1",
        "name": "Almonds",
        "quantity": 6,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 0.5,
        "unit": "nos"
      },
      {
        "ingredientId": "52",
        "name": "Corn",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "128",
        "name": "Peas",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "140",
        "name": "Quinoa",
        "quantity": 80,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 80,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saute quinoa, veggies, and make it in a porridge consistency",
      "Add sumac, green chillies for flavour."
    ],
    "calories": 253,
    "protein": 11.8,
    "carbs": 42.5,
    "fats": 5.9,
    "fiber": 9.8
  },
  {
    "id": "93",
    "title": "Kovakkai Gravy",
    "description": "A nutritious sides featuring fresh ingredients. Provides 6.5g protein and 290 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Sides",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "208",
        "name": "Ivy Gourd (Kovakkai)",
        "quantity": 250,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "50",
        "name": "Coconut",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "47",
        "name": "Chilli Powder",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "54",
        "name": "Corriander Powder",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "183",
        "name": "Turmeric Powder",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "60",
        "name": "Curry Leaves",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      }
    ],
    "instructions": [
      "Add oil in a pan",
      "Add bay leaves and cumin seeds to saute",
      "Now add onions",
      "Once cooked, add ginger garlic paste",
      "Then add kovakkai",
      "Add some water",
      "Add green chillies, red chilli powder, corriander powder",
      "Once cooked add grinded coconut paste."
    ],
    "calories": 290,
    "protein": 6.5,
    "carbs": 29.3,
    "fats": 19.4,
    "fiber": 14.2
  },
  {
    "id": "94",
    "title": "Rice dosa / idly",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 9.0g protein and 215 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "148",
        "name": "Rice",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "185",
        "name": "Urad Dhal",
        "quantity": 25,
        "unit": "g"
      }
    ],
    "instructions": [
      "Soak idly rice and urad dhal overnight",
      "Grind next morning",
      "Allow it to ferment whole day."
    ],
    "calories": 215,
    "protein": 9.0,
    "carbs": 42.9,
    "fats": 0.7,
    "fiber": 5.0
  },
  {
    "id": "95",
    "title": "Avarakkai (flat beans) poriyal",
    "description": "A nutritious sides featuring fresh ingredients. Provides 6.8g protein and 232 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Sides",
      "Vegetarian",
      "High Fiber",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "4",
        "name": "Asafoetida",
        "quantity": 0.1,
        "unit": "g"
      },
      {
        "ingredientId": "18",
        "name": "Black Pepper",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "58",
        "name": "Cumin Seeds",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "60",
        "name": "Curry Leaves",
        "quantity": 0.5,
        "unit": "g"
      },
      {
        "ingredientId": "211",
        "name": "Flat Beans",
        "quantity": 250,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 0.1,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 10,
        "unit": "g"
      }
    ],
    "instructions": [
      "Heat oil, add mustard seeds, urad dal, dry red chilli, curry leaves",
      "Add chopped onion and fry till soft.Add avarakkai, turmeric, salt, 2\u20133 tbsp water; cover and cook till tender",
      "Garnish with grated Coconut (optional)"
    ],
    "calories": 232,
    "protein": 6.8,
    "carbs": 30.9,
    "fats": 11.8,
    "fiber": 10.8
  },
  {
    "id": "96",
    "title": "Nuts laddu",
    "description": "A nutritious snack featuring fresh ingredients. Provides 7.7g protein and 253 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800",
    "prepTime": 8,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Snack",
      "Vegetarian"
    ],
    "ingredients": [
      {
        "ingredientId": "1",
        "name": "Almonds",
        "quantity": 7,
        "unit": "g"
      },
      {
        "ingredientId": "216",
        "name": "Brazil Nuts",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "214",
        "name": "Cashew Nuts",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "218",
        "name": "Dates",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "212",
        "name": "Green Pumpkin Seeds",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "217",
        "name": "Hazelnuts",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "213",
        "name": "Pine Nuts",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "134",
        "name": "Pistachios",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "143",
        "name": "Raisins",
        "quantity": 4,
        "unit": "g"
      },
      {
        "ingredientId": "215",
        "name": "Sesame Seeds",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "187",
        "name": "Walnuts",
        "quantity": 8,
        "unit": "g"
      },
      {
        "ingredientId": "150",
        "name": "White Pumpkin Seeds",
        "quantity": 4,
        "unit": "g"
      }
    ],
    "instructions": [
      "Dry roast all ingredients except raisins and dates in a pan or oven at 60C for 1 hour",
      "once cooled, coarse blend them all along with raisins and dates",
      "Make round laddu like portions each 25-30g"
    ],
    "calories": 253,
    "protein": 7.7,
    "carbs": 11.4,
    "fats": 21.8,
    "fiber": 3.4
  },
  {
    "id": "97",
    "title": "Lentil masala",
    "description": "A nutritious sides featuring fresh ingredients. Provides 12.4g protein and 313 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Sides",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "103",
        "name": "Lentils",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 70,
        "unit": "g"
      },
      {
        "ingredientId": "164",
        "name": "Spices",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "183",
        "name": "Turmeric Powder",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 10,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saute onion, tomato with spices",
      "Add lentils and pressure cook for 5 whistles"
    ],
    "calories": 313,
    "protein": 12.4,
    "carbs": 40.2,
    "fats": 13.2,
    "fiber": 13.9
  },
  {
    "id": "98",
    "title": "Mushroom gravy",
    "description": "A nutritious sides featuring fresh ingredients. Provides 10.3g protein and 175 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Sides",
      "Vegetarian",
      "High Fiber",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "113",
        "name": "Mushrooms",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "164",
        "name": "Spices",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 60,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saute onion, tomato",
      "Add ginger garlic paste",
      "Once cooked well, add mushroom."
    ],
    "calories": 175,
    "protein": 10.3,
    "carbs": 29.1,
    "fats": 4.6,
    "fiber": 10.3
  },
  {
    "id": "99",
    "title": "Green peas gravy",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 41.0g protein and 717 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "221",
        "name": "Dry Green Peas",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "47",
        "name": "Chilli Powder",
        "quantity": 4,
        "unit": "g"
      },
      {
        "ingredientId": "54",
        "name": "Corriander Powder",
        "quantity": 4,
        "unit": "g"
      },
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "93",
        "name": "Jeera Powder",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "170",
        "name": "Sunflower Oil",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      }
    ],
    "instructions": [
      "Pressure cook pre soak dry green peas for 3 whistle",
      "In a pan saute the other ingredients and make a thick gravy",
      "Finally the cooked peas and garnish with chopped corriander"
    ],
    "calories": 717,
    "protein": 41.0,
    "carbs": 112.9,
    "fats": 15.7,
    "fiber": 44.9
  },
  {
    "id": "100",
    "title": "Buttermilk",
    "description": "A nutritious pre breakfast featuring fresh ingredients. Provides 3.6g protein and 79 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800",
    "prepTime": 5,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Pre-Breakfast",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "4",
        "name": "Asafoetida",
        "quantity": 0.5,
        "unit": "g"
      },
      {
        "ingredientId": "19",
        "name": "Black Salt",
        "quantity": 0.5,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 1.5,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Grind yoghurt, water, salt and asafoetida in mixer."
    ],
    "calories": 79,
    "protein": 3.6,
    "carbs": 2.8,
    "fats": 6.0,
    "fiber": 0.0
  },
  {
    "id": "102",
    "title": "Kootu Rice",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 17.5g protein and 445 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "148",
        "name": "Rice",
        "quantity": 120,
        "unit": "g"
      },
      {
        "ingredientId": "180",
        "name": "Toor Dhal",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "83",
        "name": "Green Beans",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "50",
        "name": "Coconut",
        "quantity": 15,
        "unit": "g"
      },
      {
        "ingredientId": "58",
        "name": "Cumin Seeds",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "183",
        "name": "Turmeric Powder",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 2,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Cook"
    ],
    "calories": 445,
    "protein": 17.5,
    "carbs": 80.9,
    "fats": 7.2,
    "fiber": 13.8
  },
  {
    "id": "103",
    "title": "Lentil & Vegetable oats kichdi",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 20.6g protein and 410 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "118",
        "name": "Oats",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "103",
        "name": "Lentils",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "83",
        "name": "Green Beans",
        "quantity": 75,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 75,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "58",
        "name": "Cumin Seeds",
        "quantity": 3,
        "unit": "g"
      },
      {
        "ingredientId": "183",
        "name": "Turmeric Powder",
        "quantity": 2,
        "unit": "g"
      }
    ],
    "instructions": [
      "Soak a choice of lentil overnight",
      "Boil or pressure cook next day",
      "Saute vegetables, greens and lentils along with oats."
    ],
    "calories": 410,
    "protein": 20.6,
    "carbs": 75.9,
    "fats": 5.7,
    "fiber": 18.7
  },
  {
    "id": "104",
    "title": "Besan flour chila",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 28.7g protein and 507 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "16",
        "name": "Besan Flour",
        "quantity": 120,
        "unit": "g"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "32",
        "name": "Carrot",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 20,
        "unit": "g"
      }
    ],
    "instructions": [
      "Grate all vegetables and mix it with besan flour",
      "Add water gradually and make it a batter",
      "Heat pan and make small pan cakes",
      "Serve with chutney."
    ],
    "calories": 507,
    "protein": 28.7,
    "carbs": 91.9,
    "fats": 6.4,
    "fiber": 17.3
  },
  {
    "id": "105",
    "title": "Lentil spinach gravy",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 14.4g protein and 245 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Lunch",
      "Vegetarian",
      "High Fiber",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "103",
        "name": "Lentils",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "164",
        "name": "Spices",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "27",
        "name": "Butter",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saute onion, add spices and spinach",
      "Cook choice lentils separately and bring it to thick consistency",
      "Garnish with coriander",
      "And a half teaspoon of ghee."
    ],
    "calories": 245,
    "protein": 14.4,
    "carbs": 36.6,
    "fats": 6.3,
    "fiber": 15.0
  },
  {
    "id": "194",
    "title": "Mushroom rice",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 11.2g protein and 387 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Lunch",
      "Vegetarian"
    ],
    "ingredients": [
      {
        "ingredientId": "113",
        "name": "Mushrooms",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "148",
        "name": "Rice",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 1,
        "unit": "tbsp"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "g"
      }
    ],
    "instructions": [
      "Cook"
    ],
    "calories": 387,
    "protein": 11.2,
    "carbs": 55.5,
    "fats": 14.7,
    "fiber": 3.6
  },
  {
    "id": "196",
    "title": "Chicken Wrap",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 78.2g protein and 721 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "223",
        "name": "Protein Chapati",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "44",
        "name": "Chicken Breast",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "104",
        "name": "Lettuce",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "105",
        "name": "Lime",
        "quantity": 45,
        "unit": "g"
      },
      {
        "ingredientId": "146",
        "name": "Red Onion",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "130",
        "name": "Pickle",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "224",
        "name": "Yellow Bell Pepper",
        "quantity": 150,
        "unit": "g"
      }
    ],
    "instructions": [
      "Prepare and combine all ingredients as desired."
    ],
    "calories": 721,
    "protein": 78.2,
    "carbs": 56.8,
    "fats": 18.8,
    "fiber": 9.6
  },
  {
    "id": "197",
    "title": "Halloumi Chicken Wrap",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 91.7g protein and 912 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Dinner",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "223",
        "name": "Protein Chapati",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "44",
        "name": "Chicken Breast",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "89",
        "name": "Halloumi",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "104",
        "name": "Lettuce",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "82",
        "name": "Greek Yogurt",
        "quantity": 60,
        "unit": "g"
      },
      {
        "ingredientId": "105",
        "name": "Lime",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "57",
        "name": "Cucumber",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "197",
        "name": "Apple Cider Vinegar",
        "quantity": 2,
        "unit": "tbsp"
      }
    ],
    "instructions": [
      "Prepare and combine all ingredients as desired."
    ],
    "calories": 912,
    "protein": 91.7,
    "carbs": 55.2,
    "fats": 33.8,
    "fiber": 8.1
  },
  {
    "id": "198",
    "title": "Chicken Caesar Salad",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 83.8g protein and 667 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "High Protein"
    ],
    "ingredients": [
      {
        "ingredientId": "44",
        "name": "Chicken Breast",
        "quantity": 240,
        "unit": "g"
      },
      {
        "ingredientId": "225",
        "name": "Parmesan Cheese",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "104",
        "name": "Lettuce",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "154",
        "name": "Salad Leaves",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "102",
        "name": "Lemon Olive Oil Dressing",
        "quantity": 28,
        "unit": "g"
      }
    ],
    "instructions": [
      "Prepare and combine all ingredients as desired."
    ],
    "calories": 667,
    "protein": 83.8,
    "carbs": 8.4,
    "fats": 32.1,
    "fiber": 3.0
  },
  {
    "id": "199",
    "title": "Salmon Pasta",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 69.0g protein and 1433 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Advanced",
    "tags": [
      "Lunch",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "126",
        "name": "Pasta",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "156",
        "name": "Salmon",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "41",
        "name": "Cherry Tomatoes",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 3,
        "unit": "nos"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 2,
        "unit": "tbsp"
      },
      {
        "ingredientId": "46",
        "name": "Chilli Flakes",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "125",
        "name": "Parsley",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 4,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 8,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Bring a large pot of salted water (8 cups, 4g salt) to the boil and cook the pasta until al dente, 9-10 minutes",
      "Reserve a cup of pasta water before draining",
      "Pat the salmon fillets dry, season with a pinch of the salt, and sear in 1 tbsp olive oil over medium-high heat, skin-side down 3-4 minutes until crisp, then flip and cook 2 minutes more",
      "Break into large flakes on a plate; discard the skin",
      "In the same pan, lower heat to medium and add the remaining 1 tbsp olive oil",
      "Add the halved cherry tomatoes and cook 4-5 minutes until they soften and burst into a rough sauce",
      "Add the sliced garlic and chilli flakes and cook 1-2 minutes until fragrant - do not let the garlic brown",
      "Add the drained pasta to the pan with a splash of pasta water and toss so the tomatoes coat every strand, loosening with more pasta water as needed",
      "Fold in the salmon flakes gently (they just need warming through, not re-cooked) and the chopped parsley",
      "Taste for salt and serve immediately."
    ],
    "calories": 1433,
    "protein": 69.0,
    "carbs": 159.4,
    "fats": 56.8,
    "fiber": 9.0
  },
  {
    "id": "200",
    "title": "English Breakfast",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 45.0g protein and 508 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "228",
        "name": "Jason'S Protein Bread",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "154",
        "name": "Salad Leaves",
        "quantity": 30,
        "unit": "g"
      },
      {
        "ingredientId": "10",
        "name": "Baked Beans",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "113",
        "name": "Mushrooms",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Prepare and combine all ingredients as desired."
    ],
    "calories": 508,
    "protein": 45.0,
    "carbs": 54.4,
    "fats": 16.0,
    "fiber": 15.9
  },
  {
    "id": "201",
    "title": "SweetPotato-Egg Omelette",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 31.1g protein and 441 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "64",
        "name": "Egg",
        "quantity": 4,
        "unit": "nos"
      },
      {
        "ingredientId": "165",
        "name": "Spinach",
        "quantity": 40,
        "unit": "g"
      },
      {
        "ingredientId": "171",
        "name": "Sweet Potatoes",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "30",
        "name": "Capsicum",
        "quantity": 120,
        "unit": "g"
      },
      {
        "ingredientId": "125",
        "name": "Parsley",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "178",
        "name": "Tomato",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "113",
        "name": "Mushrooms",
        "quantity": 20,
        "unit": "g"
      }
    ],
    "instructions": [
      "Prepare and combine all ingredients as desired."
    ],
    "calories": 441,
    "protein": 31.1,
    "carbs": 35.1,
    "fats": 20.2,
    "fiber": 8.3
  },
  {
    "id": "202",
    "title": "Avocado Toast",
    "description": "A nutritious breakfast featuring fresh ingredients. Provides 24.4g protein and 438 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&q=80&w=800",
    "prepTime": 12,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Breakfast",
      "Vegetarian",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "8",
        "name": "Avocado",
        "quantity": 150,
        "unit": "g"
      },
      {
        "ingredientId": "41",
        "name": "Cherry Tomatoes",
        "quantity": 100,
        "unit": "g"
      },
      {
        "ingredientId": "228",
        "name": "Jason'S Protein Bread",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "121",
        "name": "Onion",
        "quantity": 50,
        "unit": "g"
      }
    ],
    "instructions": [
      "Prepare and combine all ingredients as desired."
    ],
    "calories": 438,
    "protein": 24.4,
    "carbs": 31.3,
    "fats": 27.3,
    "fiber": 18.1
  },
  {
    "id": "203",
    "title": "Spaghetti Aglio e Olio Pepperoncino",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 34.6g protein and 1326 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "Vegetarian",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "126",
        "name": "Pasta",
        "quantity": 200,
        "unit": "g"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 4,
        "unit": "tbsp"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 5,
        "unit": "nos"
      },
      {
        "ingredientId": "46",
        "name": "Chilli Flakes",
        "quantity": 1,
        "unit": "g"
      },
      {
        "ingredientId": "125",
        "name": "Parsley",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "225",
        "name": "Parmesan Cheese",
        "quantity": 20,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 5,
        "unit": "g"
      },
      {
        "ingredientId": "188",
        "name": "Water",
        "quantity": 8,
        "unit": "cup"
      }
    ],
    "instructions": [
      "Classic Roman spaghetti aglio, olio e pepperoncino - golden garlic, pasta-water finish, parmesan",
      "Bring generously salted water to a boil and cook the spaghetti until al dente (about 1 minute short of the packet time)",
      "Before draining, scoop out a cup of the starchy pasta water",
      "While the pasta cooks, warm the olive oil in a large pan over LOW heat",
      "Add the thinly sliced garlic and let it steep slowly, shaking the pan, until evenly golden - about 3-4 minutes",
      "Watch closely: pale gold, never brown (burnt garlic turns the whole dish bitter)",
      "Add the chilli flakes in the last 30 seconds to bloom in the warm oil, then take the pan off the heat",
      "Drain the pasta and add it straight into the oil OFF the heat",
      "Add a good splash of pasta water and toss vigorously - the starch emulsifies with the oil into a silky sauce that clings to every strand",
      "Add more water a splash at a time if it looks dry",
      "Toss in the chopped parsley, taste and adjust salt",
      "Plate and finish with grated parmesan over each bowl",
      "Serve immediately - this dish waits for no one."
    ],
    "calories": 1326,
    "protein": 34.6,
    "carbs": 156.2,
    "fats": 62.5,
    "fiber": 7.3
  },
  {
    "id": "204",
    "title": "Oven-baked Garlic Chilli Spread",
    "description": "A nutritious sides featuring fresh ingredients. Provides 4.0g protein and 2000 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 30,
    "servings": 8,
    "difficulty": "Easy",
    "tags": [
      "Sides",
      "Vegetarian"
    ],
    "ingredients": [
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 20,
        "unit": "nos"
      },
      {
        "ingredientId": "119",
        "name": "Olive Oil",
        "quantity": 16,
        "unit": "tbsp"
      },
      {
        "ingredientId": "46",
        "name": "Chilli Flakes",
        "quantity": 2,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 5,
        "unit": "g"
      }
    ],
    "instructions": [
      "Preheat the oven to 180C",
      "Slice the tops off the 2 garlic heads so the cloves are exposed, place them on foil, drizzle with a little of the olive oil and sprinkle a pinch of the salt, then wrap the foil closed",
      "Bake 40 minutes until the cloves are completely soft and golden at the edges",
      "Cool slightly",
      "Squeeze the soft roasted cloves out of their skins into a bowl and mash to a paste",
      "Stir the mash into the remaining olive oil (about 1 cup total across the batch), add the chilli flakes and the rest of the salt (1 tsp), and whisk until smooth",
      "Spoon into a clean jar, making sure the garlic sits under the oil",
      "Keeps 2 weeks refrigerated; bring to room temperature before using - the oil solidifies when cold."
    ],
    "calories": 2000,
    "protein": 4.0,
    "carbs": 21.1,
    "fats": 216.8,
    "fiber": 1.7
  },
  {
    "id": "205",
    "title": "Chicken saute",
    "description": "A nutritious dinner featuring fresh ingredients. Provides 96.0g protein and 569 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Intermediate",
    "tags": [
      "Dinner",
      "High Protein",
      "High Fiber"
    ],
    "ingredients": [
      {
        "ingredientId": "43",
        "name": "Chicken",
        "quantity": 300,
        "unit": "g"
      },
      {
        "ingredientId": "47",
        "name": "Chilli Powder",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "54",
        "name": "Corriander Powder",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "78",
        "name": "Ginger Garlic Paste",
        "quantity": 10,
        "unit": "g"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 5,
        "unit": "g"
      }
    ],
    "instructions": [
      "saute chicken"
    ],
    "calories": 569,
    "protein": 96.0,
    "carbs": 12.9,
    "fats": 15.3,
    "fiber": 7.8
  },
  {
    "id": "206",
    "title": "Boiled white rice",
    "description": "A nutritious lunch featuring fresh ingredients. Provides 2.3g protein and 110 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    "prepTime": 20,
    "servings": 2,
    "difficulty": "Easy",
    "tags": [
      "Lunch",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "148",
        "name": "Rice",
        "quantity": 85,
        "unit": "g"
      }
    ],
    "instructions": [
      "boil rice"
    ],
    "calories": 110,
    "protein": 2.3,
    "carbs": 23.9,
    "fats": 0.2,
    "fiber": 0.3
  },
  {
    "id": "208",
    "title": "Gongura Thovaiyal",
    "description": "A nutritious sides featuring fresh ingredients. Provides 2.1g protein and 46 kcal per serving.",
    "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800",
    "prepTime": 30,
    "servings": 4,
    "difficulty": "Advanced",
    "tags": [
      "Sides",
      "Vegetarian",
      "Low Calorie"
    ],
    "ingredients": [
      {
        "ingredientId": "159",
        "name": "Shallots",
        "quantity": 10,
        "unit": "nos"
      },
      {
        "ingredientId": "75",
        "name": "Garlic",
        "quantity": 5,
        "unit": "nos"
      },
      {
        "ingredientId": "77",
        "name": "Ginger",
        "quantity": 1,
        "unit": "nos"
      },
      {
        "ingredientId": "238",
        "name": "Mustard Seeds",
        "quantity": 1,
        "unit": "tsp"
      },
      {
        "ingredientId": "185",
        "name": "Urad Dhal",
        "quantity": 1,
        "unit": "tbsp"
      },
      {
        "ingredientId": "4",
        "name": "Asafoetida",
        "quantity": 0.5,
        "unit": "tsp"
      },
      {
        "ingredientId": "84",
        "name": "Green Chillies",
        "quantity": 2,
        "unit": "nos"
      },
      {
        "ingredientId": "46",
        "name": "Chilli Flakes",
        "quantity": 1,
        "unit": "tsp"
      },
      {
        "ingredientId": "59",
        "name": "Cumin Whole Jeera",
        "quantity": 1,
        "unit": "tsp"
      },
      {
        "ingredientId": "183",
        "name": "Turmeric Powder",
        "quantity": 0.5,
        "unit": "tsp"
      },
      {
        "ingredientId": "158",
        "name": "Salt",
        "quantity": 1,
        "unit": "tsp"
      },
      {
        "ingredientId": "239",
        "name": "Gongura Leaves",
        "quantity": 100,
        "unit": "g"
      }
    ],
    "instructions": [
      "Saute mustard seeds, urad dal, asafoetida, green chillies, crushed red chili and jeera in a little oil",
      "Add turmeric powder and salt",
      "Add the gongura leaves and cook for 8 minutes",
      "Cool, then grind into a paste."
    ],
    "calories": 46,
    "protein": 2.1,
    "carbs": 9.6,
    "fats": 0.6,
    "fiber": 1.5
  }
];
