const express = require('express');
const mongoose = require("mongoose")
const Article = require("./models/Article")
const app = express();



mongoose.connect("mongodb+srv://sadia:Algiers2010@tarmeeznode.ydrb800.mongodb.net/?retryWrites=true&w=majority").then((response) => {
  console.log("connection successful")

}).catch(() => {

  console.log('error with loading data')
})


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bismi ALLAH')
})

app.get('/get', (req, res) => {
  res.send('Salam Alikoum')
})

app.post('/post', (req, res) => {
  res.send('Post Request')
});

app.put('/put', (req, res) => {
  res.send('put request')
});

app.delete('/delete', (req, res) => {
  res.send('delete Request')
})

// Get request with path parameter
app.get('/request-with-path-params/:number1/:number2', (req, res) => {
  let num1 = req.params.number1;
  let num2 = req.params.number2;
  let total = Number(num1) + Number(num2)
  res.send(`The total of ${num1} + ${num2} is ${total}`)
})

//Get request with body parameter
app.get('/request-with-body-params', (req, res) => {
  console.log(req.body)
  res.send(` Salam Alikoum ${req.body.name}`)
})

//Get request with quey parameter
app.get('/request-with-query-params', (req, res) => {
  console.log(req.query)
  res.send(`firstname: ${req.query.firstname} lastname: ${req.query.lastname}`)
})

// JSON response
app.get('/request-with-all-params-1/:firstname', (req, res) => {
  let firstname = req.params.firstname;
  let lastname = req.query.lastname;
  let age = req.body.age;
  res.json({ "fistname": req.params.firstname, "lastname": req.query.lastname, "age": req.body.age })
})

//HTML response
app.get('/request-with-all-params-2/:firstname', (req, res) => {
  let firstname = req.params.firstname;
  let lastname = req.query.lastname;
  let age = req.body.age;
  console.log(req.body)
  res.send(`First Name: ${firstname} </br>Last Name: ${lastname} </br>Age: ${age}`)
})

// response an html file
app.get('/file-response', (req, res) => {

  res.sendFile(__dirname + '/views/numbers.html')
})

//response an ejs file
app.get('/ejs-response', (req, res) => {
  res.render("numbers.ejs", {
    name: "Maya",
    age: 2
  })
})

// Add artcile to the database collection Article
app.post('/article', async (req, res) => {

  const newArticle = new Article();
  newArticle.title = req.body.articleTitle;
  newArticle.body = req.body.articleBody;
  newArticle.numberOfLikes = req.body.numberOfLikes;
  await newArticle.save();
  res.send('Your article was created')

})

// Display All Articles Using find() Mthod from Article Model 'Object Document Mapper ODM'
app.get('/allArticles', async (req, res) => {
  const allArticles = await Article.find()
  res.json(allArticles)
})
// Display an Article Using findById() Method from Article Model 'Object Document Mapper ODM and Path Parameter'
app.get('/findArticleById/:articleId', async (req, res) => {

  let artId = req.params.articleId
  console.log(artId)
  const article = await Article.findById(artId)
  res.json(article)
})
// Display an Article Using findById() Mthod from Article Model 'Object Document Mapper ODM'
app.delete('/deleteArticle/:articleId', async (req, res) => {
  let artId = req.params.articleId
  const article = await Article.findByIdAndDelete(artId)
  res.send(article)
})

app.get('/showArticles', async (req, res) => {
  try {
    const articles = await Article.find()
    res.render("articles.ejs", {
      allArticles : articles,
    })
  } catch (error) {
    res.json(error)
  }
})



app.listen('7000', () => {
  console.log('Ready to listen on port 7000')
})
