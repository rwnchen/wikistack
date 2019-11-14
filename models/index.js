const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

function generateSlug(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define("pages", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});

Page.addHook('beforeValidate', (page, options) => {
  const regex = /' '/gi;
  page.slug = page.title.replace(regex, '_');
})

const User = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

module.exports = {
  db,
  Page,
  User
};
