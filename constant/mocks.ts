import { faker } from "@faker-js/faker";

export const Books = Array.from({ length: 100 }, (_, index) => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
}));

export const Categories = Array.from({ length: 10 }, (_, index) => ({
  id: faker.string.uuid(),
  image: faker.image.avatar(),
  name: faker.commerce.department(),
}));
