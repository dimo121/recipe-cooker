

export type newIngredient = {
    name: string,
    quantity: number
}

export type Ingredients = Map<string,number>;

export type Recipe = {
    id: string,
    name: string,
    list: Map<string,number>,
    method: string
}

export type HistoryItem = {
    id: number
    recipeName: string,
    timeCooked: string,
    ingredientsUsed: Ingredients
}

export type CookingHistory = HistoryItem[];