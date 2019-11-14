const express = require("express");
const router = express.Router();
const {
  addPage
} = require("../views");
const {
  Page
} = require("../models");

const wikipage = require("../views/wikipage");

module.exports = router;

router.get('/', (req, res, next) => {
  res.send('hello')
})

// router.post('/', (req, res, next) => {
//   res.json(req.body)
// })

router.post('/', async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const page = new Page({
    title: title,
    content: content,
    author: author
  });
  const existing = await User.findOrCreate({
    where: {
      name: req.body.author
    }
  })

  if (existing[1]){
    page.setOwner(existing)
  }
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();

    console.log(page);
    const slug = page.slug;
    res.redirect(`/wiki/${slug}`);
  } catch (error) {
    next(error)
  }
});


router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  const slugPage = await Page.findAll({
    where: {
      slug: req.params.slug
    }
  });

  res.send(wikipage(slugPage));
})
