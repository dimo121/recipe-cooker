export type newIngredient = {
    name: string
    quantity: number
}

export type Ingredients = {
    [key: string]: number
}

export interface Recipe {
    id: string
    name: string
    list: Ingredients
    method: string
}

export interface HistoryItem {
    id: string
    recipeName: string
    timeCooked: string
    ingredientsUsed: Ingredients
}

export type CookingHistory = HistoryItem[]
