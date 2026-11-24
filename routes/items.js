const express = require("express");
const router = express.Router();

// Хранилище в памяти (сбрасывается при перезапуске сервера)
let items = [];
// Счётчик id. Так id не повторяются после удаления, в отличие от items.length + 1
let nextId = 1;

// CREATE: добавить элемент
router.post("/", (req, res) => {
  const { name } = req.body;
  // Проверяем, что name передан
  if (!name) return res.status(400).send("Name is required");
  const newItem = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// READ: получить все элементы
router.get("/", (req, res) => {
  res.json(items);
});

// UPDATE: изменить элемент по id
router.put("/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");
  if (!req.body.name) return res.status(400).send("Name is required");
  item.name = req.body.name;
  res.json(item);
});

// DELETE: удалить элемент по id
router.delete("/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");
  items.splice(index, 1);
  res.status(204).send();
});

module.exports = router;