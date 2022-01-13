test('Validar as principais operações do JEST', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).not.toBeNull();
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Validar operações com objetos', () => {
  const obj = { name: 'Pedro Sousa', mail: 'pesousa@ipca.pt' };
  expect(obj).toHaveProperty('name');
  expect(obj).toHaveProperty('name', 'Pedro Sousa');
  expect(obj.name).toBe('Pedro Sousa');

  const obj2 = { name: 'Pedro Sousa', mail: 'pesousa@ipca.pt' };
  expect(obj).toEqual(obj2);
  expect(obj).toBe(obj);
});
