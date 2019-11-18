const express = require("express");
const router = express.Router();
const {
  addPage
} = require("../views");
const {
  Page,
  User
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
  const email = req.body.email;


  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: email
      }
    })

    const page = await Page.create(req.body);

    page.setAuthor(user);
    await page.save();

    // console.log(page);
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

  const page = slugPage[0];
  const name = await page.getAuthor();

  res.send(wikipage(page, name.name));
})
