const express = require("express");
const router = express.Router();
const {addPage} = require("../views");
const { Page } = require("../models");

const app = require("../app");


module.exports = router;

router.get('/', (req, res, next) => {
  res.send('hello')
})

// router.post('/', (req, res, next) => {
//   res.json(req.body)
// })

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  const title = req.body.title;
  const content = req.body.content;

  const page = new Page({
    title: title,
    content: content
  });


  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})
