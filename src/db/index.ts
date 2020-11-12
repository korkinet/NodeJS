import * as uuid from 'uuid';

import productsList from './products.json';
import categoriesList from './categories.json';
import { Category, Product } from '../models';

const categories: Category[] = categoriesList.map(c => ({
  ...c,
  id: uuid.v4()
}));

const products: Product[] = productsList.map(p => ({
  ...p,
  id: uuid.v4(),
  categoryId: categories[Math.floor(Math.random() * categories.length)].id
}));

export { categories, products };
