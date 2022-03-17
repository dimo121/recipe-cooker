

export type newIngredient = {
    name: string,
    quantity: number
}


export type Ingredients = Map<string,number>;

export interface Recipe {
    id: string;
    name: string;
    list: Map<string,number>;
    method: string;
}

export interface HistoryItem {
    id: number;
    recipeName: string;
    timeCooked: string;
    ingredientsUsed: Ingredients;
}

export type CookingHistory = HistoryItem[];