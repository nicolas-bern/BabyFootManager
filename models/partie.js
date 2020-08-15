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

    static getAllParties(){
        client.query('SELECT * FROM parties', (err, res) => {
            if (err) {
              console.log(err.stack)
            } else {
              console.log(res.rows[0])
            }
        })
    }
}

module.exports = Partie