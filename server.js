let express = require('express')
const { request, response } = require('express')
let app = express()
let bodyparser = require('body-parser')
const bodyParser = require('body-parser')
let session = require('express-session')


// Moteur de template
app.set('view engine', 'ejs')


// Middlewares
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(require('./middlewares/flash'))



// Routes
app.get('/', (request, response) => {
    /*
    let Partie = require('./models/partie')
    
    Partie.getAllParties(function (parties){
        response.render('pages/index', {parties: parties})
    })
    */

   /* 
   if(request.session.error){
    response.locals.error = request.session.error
    request.session.error = undefined
    }
    */
    response.render('pages/index')

})

app.post('/', (request, response) => {
    if(request.body.newgame === undefined || request.body.newgame === ''){
        request.flash('error', "Veuillez entrer un nom de partie")
        response.redirect('/')
    } else{
        let Partie = require('./models/partie')
        Partie.create(request.body.newgame)
        response.redirect('/')
    }
    //console.log(request.body)
})


// Port d'écoute
app.listen(80)