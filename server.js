let express = require('express')
const { request, response } = require('express')
let app = express()
let bodyparser = require('body-parser')
const bodyParser = require('body-parser')
let session = require('express-session')
const { Console } = require('console')
var http = require('http').Server(app)
var io = require('socket.io')(http)


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
    
    let Partie = require('./models/partie')

    Partie.getAllParties(function (parties){
        let resultsNom = []
        let resultsNomT = []
        let resultsID = []
        for(i=0; i<parties.rowCount; i++){
            if(parties.rows[i].statut == false){
                resultsNomT.push(parties.rows[i].nom)
            } else{
                resultsNom.push(parties.rows[i].nom)
                resultsID.push(parties.rows[i].id)
            }
        }
        response.render('pages/index', {parties: resultsNom, id: resultsID, partiesT : resultsNomT})
    })
})

app.post('/', (request, response) => {
    if(request.body.newgame === undefined || request.body.newgame === ''){
        if(request.body.idDelete != undefined){
            let id = request.body.idDelete[0]
            let Partie = require('./models/partie')
            Partie.deletePartie(id)
            response.redirect('/')
        } else if(request.body.idUpdate != undefined){
            let id = request.body.idUpdate[0]
            let Partie = require('./models/partie')
            Partie.partieOver(id)
            response.redirect('/')
        } else {
            request.flash('error', "Veuillez entrer un nom de partie")
            response.redirect('/')
        }
    }
})


// Socket.io
io.on('connection', function(socket){
    console.log('A user is connected')
    socket.on('disconnect', function(){
        console.log('A user is disctonnected')
    })

    socket.on('newgame', function(partie){
        let Partie = require('./models/partie')
        if(partie == ''){
            
        } else{
            Partie.create(partie)
            console.log('Partie : ' + partie)
        }
        io.emit('newgame', partie)
    })


    socket.on('delete', function(id){

    })

    
    socket.on('over', function(id){
        
    })
})


// Port d'écoute
http.listen(80, function(){
    console.log("Server running on 80")
})