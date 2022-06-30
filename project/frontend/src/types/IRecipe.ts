export type IRecipe = {
    title: string;
    description: string;
    cookingTime: number;
    tags: string;
    level: string;
    ingredients: any[];
    steps: any[];
    [key: string]: any;
}