const Sequelize = require('sequelize');
const { STRING } = Sequelize;

const config = {} // if some problems with pushing to heroku
if(process.env.SSL){
  console.log('yes')
  config.dialectOptions = {
    ssn: {
      rejectUnauthorized: false
    }
  }
}

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db', config);

const Product = conn.define('product', {
  name: STRING
});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Product.create({name: 'foo'})
  await Product.create({name: 'bar'})
};

module.exports = {
  syncAndSeed,
  models: {
    Product
  }
};