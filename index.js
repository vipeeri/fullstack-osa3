const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')


morgan.token('id', function (req, res) {
  return JSON.stringify(req.body)
})


app.use(bodyParser.json())
app.use(morgan(':method :url :id :response-time'))



let persons = [
    {
      name: 'Arto Hellas',
      number: '040-123123',
      id: 1
    },
    {
        name: 'Martti Tienari',
        number: '040-4343433',
        id: 2
    },
    {
        name: 'Arto Järvinen',
        number: '040-66555666',
        id: 3
    },
    {
        name: 'Lea Kutvonen',
        number: '050-333333333',
        id: 4
    }
  ]

  const generateId = () => {
    const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
      return response.status(400).json({error: 'name missing'})
    } else if (body.number === undefined) {
      return response.status(400).json({error: 'number missing'})
    } else if (JSON.stringify(persons).includes(body.name)) {
      return response.status(400).json({error: 'name exists already'})
    } 
  
    const person = {
      name: body.name,
      number: body.number,
      id: getRandomInt(1000)
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if( person ) {
    response.json(person)
    } else {
        response.status(404).end()
        
    }  
})
  
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')

  })

  app.get('/info', (req, res) => {

    var count = Object.keys(persons).length
    var date = new Date()
    res.send('puhelinluettelossa ' + count + ' henkilön tiedot' + '<p> </p>' + date)

  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })