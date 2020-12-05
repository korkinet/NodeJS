import * as uuid from 'uuid';
import fetch from 'node-fetch';

import { Category, Product, User } from '../models';

let users: User[];
let categories: Category[];
let products: Product[];
const baseUrl = `http://localhost:${process.env.APP_PORT}`;

async function getUsers() {
  if (!categories) {
    users = await fetch(`${baseUrl}${process.env.STATIC_PATH}/users.json`)
      .then(res => res.json());
  }
}

async function getCategories() {
  if (!categories) {
    const catData: Category[] = await fetch(`${baseUrl}${process.env.STATIC_PATH}/categories.json`)
      .then(res => res.json());
    categories = catData.map(c => ({
      ...c,
      id: uuid.v4()
    }));
  }
}

async function getProducts() {
  if (!products) {
    const prodData: Product[] = await fetch(`${baseUrl}${process.env.STATIC_PATH}/categories.json`)
      .then(res => res.json());
    products = prodData.map(p => ({
      ...p,
      id: uuid.v4()
    }));
  }
}

async function initDB() {
  try {
    await getUsers();
    await getCategories();
    await getProducts();
  } catch (err) {
    console.error('Failed to init DB', err.message);
    return new Error('Failed to init DB');
  }
}

export { users, categories, products, initDB };
