const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
Category.findAll({
  include: [Product]
})
.then((categories) => res.json(categories))
.catch((err) => res.status(500).json(err))

  // try {
  //   const allCategoryData = await Category.findAll({
  //     include: [{ model: Product }]
  //   });
    
  //   res.status(200).json(allCategoryData);
    
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCategoryDataById = await Category.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: [{ model: Product}]
    });

    if(!getCategoryDataById) {
      res.status(404).json({ message: 'Oh no, cant find this!'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
//This block is waiting to be initialized to create a new category, then once that happens it request the body of the category class then send the information in json. If it doesnt work it'll send an error to the client
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

try {
  const categoryData = await Category.update(
    {category_name: req.body.category_name},
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if(!categoryData[0]) {
    res.status(404).json({  message: 'Theres no category with this ID' });
    return;
  }
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
  // Category.update(req.body)
  // .then((category) => {
  //   res.status(200).json(category);
  // })
  // .catch ((err) => {
  //   console.log(err);
  //   res.status(400).json(err);
  // })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  //This block waits to be initialized, once that happens it will delete a category by its id value. If that id doesn't exist it will five an error saying it doesnt exist. If it does, then it will delete the category.
  try {
    const deleteCategoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!deleteCategoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(deleteCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
