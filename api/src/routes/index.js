const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Recipe, Diet } = require('../db');
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6 } = process.env
const { getAllRecipes } = require('../controllers/getAllRecipes')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req, res) => {
    const { name } = req.query;
    let recipesTotal = await getAllRecipes();
    if (name) {
      let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase())); // siempre buscar en minuscula para tener todos los datos iguales 
      if(recipeName.length){
        res.status(200).send(recipeName)
      }else{
        res.status(404).send('The recipe was not found');
      }
    } else {
      res.status(200).send(recipesTotal);
    }
  
})

router.get('/recipes/:id', async (req, res) => {
    // const id = req.params.id;
    const {id} = req.params;
    const allRecipes = await getAllRecipes();
    if (id) {
      let recipesById = await allRecipes.filter(e => e.id == id);
      if(recipesById.length){
        res.status(200).send(recipesById)
      }else{
        res.status(404).send('The ID you are looking for was not found.')
      }
  
    }
})

router.get('/types', async (req, res) => {

    const allDiet = await Diet.findAll();
    if (allDiet.length === 0) {
      const dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&number=100&addRecipeInformation=true`
      );
      const diet = dietApi.data.results.map((el) => el.diets);
      // console.log(diet, "asdasd")
      const dietFlat = diet.flat();
      // console.log(dietFlat, "probando")
  
      const dietsFiltered = dietFlat.filter((d, index) => {
        return dietFlat.indexOf(d) === index
      })
  
      
  
      await dietsFiltered.forEach((d) =>
        Diet.findOrCreate({
          where: { name: d },
        })
      );
  
      res.send(dietsFiltered);
    } else {
      res.json(allDiet);
    }
});

router.post('/recipes', async (req, res) => {
    let {
      name,
      image,
      summary,
      nivelDeComidaSaludable,
      pasoAPaso,
      diets
    } = req.body;
  
    if (name && summary) {
      let recipeCreated = await Recipe.create({
        name: name,
        image: image,
        summary: summary,
        nivelDeComidaSaludable: nivelDeComidaSaludable,
        pasoAPaso: pasoAPaso
      })
  
      const dietDb = await Diet.findAll({
        where: { name: diets},
      })
    //   console.log(diets, "asdasdasdasd")
  
  
      await recipeCreated.addDiet(dietDb)
      res.status(200).send('Receta creada con éxitos')
    } else {
      res.status(404).send("error")
    }
  })




module.exports = router;