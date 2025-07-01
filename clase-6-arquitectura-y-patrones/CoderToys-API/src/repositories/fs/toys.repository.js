const toys = [];

export const readToysRepository = () => {
  return toys;
};

export const createToyRepository = (doc) => {
  const newDoc = { ...doc, id: toys.length + 1 }
  toys.push(newDoc)
  return newDoc
};
