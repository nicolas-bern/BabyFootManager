let client = require('../database')

class Partie {

    static create(content){

        const text = 'INSERT INTO parties(nom, statut, date_creation) VALUES ($1, $2, $3) RETURNING *'
        const values = [content, true, new Date()]

        client.query(text, values, (err, res) => {
            if (err){
                console.log(err.stack)
            } else{
                console.log(res.rows[0])
            }
        })
    }

    static getAllParties(cb){
        
        let result = client.query('SELECT * FROM parties ORDER BY date_creation', (err, res) => {
            if (err){
              console.log(err)
            } else{
              cb(res)
            }
        })
    }

    static deletePartie(id){
        const text = 'DELETE FROM parties WHERE id ='+id

        client.query(text, (err, res) => {
            if (err){
                console.error(err)
            } else{
                console.log('Partie supprimée')
            }
        })
    }

    static partieOver(id){

        const text = 'UPDATE parties SET statut = false WHERE id ='+id

        client.query(text, (err, res) => {
            if (err){
                console.error(err)
            } else{
                console.log('Partie terminée')
            }
        })
    }

    static getIdPartie(){
        const text = "SELECT id FROM parties ORDER BY id DESC limit 1"
        client.query(text, (err, res) => {
            if (err){
                console.error(err)
            } else{
                //console.log(res)
                return res
            }
        })
    }
}

module.exports = Partie