const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(allTagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTagsById = await Tag.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
      include: [{ model: Product, through: ProductTag }]
    });

    if (!getTagsById) {
      res.status(404).json({ message: 'There was no tag found with that ID!' });
      return;
    }
    res.status(200).json(getTagsById);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create(req.body);
    res.status(200).json(newTagData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
try {
  const updateTagData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
    include: [{ model: Product, through: ProductTag }]
  });
  res.status(200).json(updateTagData);
} catch (err) {
  res.status(500).json(err);
}

  // Tag.update(req.body)
  // .then((tag) => {
  //   res.status(200).json(tag);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.status(400).json(err);
  // })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTagById = await Tag.destroy({
      where: { id: req.params.id },
      include: [{ model: Product, through: ProductTag }]
    });
    if(!deleteTagById) {
      res.status(404).json({ message: 'No tag found with that ID!' });
      return;
    }
    res.status(200).json(deleteTagById);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
