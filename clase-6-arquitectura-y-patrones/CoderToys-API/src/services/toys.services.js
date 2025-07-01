import { readToysRepository, createToyRepository } from "../repositories/memory/toys.repository.js";

export const readToysService = () => {
  const toys = readToysRepository();
  if (toys.length) {
    return toys;
  } else {
    return { no_products: "not products yet" };
  }
};

export const createToyService = (obj) => {
  const { product, price, sku, category, stock } = obj;

  if (!product || !price || !sku || !category || !stock) {
    console.error("Missing fields");
    return null;
  }

  const newToy = {
    product,
    price,
    sku,
    category,
    stock,
  };

  const created = createToyRepository(newToy)
  return created;
};
