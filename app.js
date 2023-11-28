const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const PORT = process.env.PORT;

const staticPath = path.join(__dirname, '/public');
const template_path = path.join(__dirname, '/templates/views');
const partials_path = path.join(__dirname,"/templates/partials")
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path)

app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.render('index');
}); 
app.get("/about", (req, res) => {
  res.render('about');
});

app.get("/Weather", (req, res) => {
  res.render('weather');
});

app.get("/*", (req, res) => {
  res.render('404error');
});

app.get("/*/*", (req, res) => {
  res.render('404error');
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
