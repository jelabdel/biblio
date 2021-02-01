const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middleware/auth');
const knex = require('knex');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const db = knex({
  client: 'pg',
  connection: {
    host: config.get('pgURI'),
    database: 'biblio2'
  }
});



const app = express();

app.use(bodyParser.json());
app.use(cors());

// RETRIEVING ALL BOOKS
// IS USED TO MAP OVER IN FRONT END
app.get('/', auth, (req, res) => {
  return db.select('*').from('books')
    .then(books => {
      res.json(books)
    })
    .catch(error => {
      return res.status(401).json("error getting books!")
    })
})


// RETRIEVING ENGLISH BOOKS
app.get('/english', auth, (req, res) => {
  return db.select('*').from('books').where('lang', '=', 'english')
    .then(books => {
      res.json(books)
    })
})


// RETRIEVING DUTCH BOOKS
app.get('/dutch', auth, (req, res) => {
  return db.select('*').from('books').where('lang', '=', 'dutch')
    .then(books => {
      res.json(books)
    })
})


// ADDING BOOK
app.post('/add', auth, (req, res) => {
  const { title, author, lang, isread, image, username } = req.body;
  db.insert({
    title: title,
    author: author,
    lang: lang,
    isread: isread,
    image: image,
    username: username
  })
    .into('books')
    .returning('*')
    .then(book => {
      res.json(book[0]) // return the book added to db.
    })
    .catch(error => {
      return res.status(401).json("error adding a book!")
    })

})


// EDIT BOOK
app.put('/edit/:id', auth, (req, res) => {
  const { id, title, author, lang, isread, image } = req.body;
  db('books').where('id', '=', req.params.id)
    .update({
      title: title,
      author: author,
      lang: lang,
      isread: isread,
      image: image
    })
    .catch(error => {
      return res.status(401).json("error updating book!")
    })
})


// RETRIEVING BOOK WITH SPECIFIC ID
app.get('/book/:id', auth, (req, res) => {
  db('books').where('id', req.params.id)
    .then((book) => {
      res.json(book[0])
    })
    .catch(error => {
      return res.status(401).json("error getting book!")
    })
})


// SIGNUP
app.post('/signup', (req, res) => {
  const { name, username, email, password } = req.body;

  // Simple validation, are all fields filled in?
  if (!name || !username || !email || !password) {
    return res.status(400).json("please enter all fields!")
  }


  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            name: name,
            username: username,
            email: loginEmail[0],
          })
          .then(user => {
            jwt.sign(
              { id: user[0].id },
              config.get('jwtSecret'),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token: token,
                  user: user[0]
                })
              }
            )
          })
          .then(() => console.log(`username ${username} for ${name} created.`))
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => {
      res.status(400).json('unable to register')
    })

})



// SIGNIN
app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            jwt.sign(
              { id: user[0].id },
              config.get('jwtSecret'),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token: token,
                  user: user[0]
                })
              }
            )
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))

})

// // Get user data
app.get('/user', auth, (req, res) => {
  db.select('*').from('users')
    .where('id', '=', req.user.id) // find the id which is included in the token
    .then(user => res.json(user[0]))
})


// DELETE BOOK
app.delete('/book/:id', auth, (req, res) => {
  db('books')
    .where('id', req.params.id)
    .del()
    .then(data => res.status(200).json('deleted book'))
    .catch(err => {
      res.status(400).json('unable to delete book') // does not work, always returning 'deleted book'
    })
})



// Listen to port 3001
app.listen(3001, () => {
  console.log('server is running')
})
