

export type Ingredient = {
    id: number,
    name: string,
    quantity: number
};

export type Recipe = {
    id: number,
    name: string,
    list: Ingredient[],
    method: string
}

export type HistoryItem = {
    id: number
    recipeName: string,
    timeCooked: string,
    ingredientsUsed: Ingredient[]
}

export type CookingHistory = HistoryItem[];