import React from 'react';
import Numero from './components/Numero'
import axios from 'axios'





class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: props.persons,
      newNumber: '',
      newName: '',
      showAll: true,
      filter: ''
    }
    axios
  .get('https://pacific-plateau-14090.herokuapp.com/api/persons')
  .then(response => {
    this.setState({ persons: response.data })
  })
  }

  addNumber = (event) => {
  event.preventDefault()

const names = this.state.persons.map(person => person.name)
const numbers = this.state.persons.map(person => person.number)
if(!names.includes(this.state.newName)){
  const numberObject = {
    name: this.state.newName,
    number: this.state.newNumber
  }

  axios
  .post('https://pacific-plateau-14090.herokuapp.com/api/persons', numberObject)
  .then(response => {
    console.log(response)
  })

  const persons = this.state.persons.concat(numberObject)
      this.setState({
        persons,
        newNumber: '',
        newName: ''
      })
    }
    }



handleNameChange = (event) => {
  console.log(event.target.value)
  this.setState({ newName: event.target.value })
}

handleNumberChange = (event) => {
  console.log(event.target.value)
  this.setState({ newNumber: event.target.value })
}

handleFilterChange = (event) => {
  console.log(event.target.value)
  this.setState({ filter: event.target.value })
}

render() {


  const numerot = this.state.persons.filter(person => person.name.match(this.state.filter))

  return (
    <div>

    <h2>Puhelinluettelo</h2>
    <div>
    rajaa näytettäviä <input
        value={this.state.filter}
        onChange={this.handleFilterChange}/>
    </div>


    <form onSubmit={this.addNumber}>

    nimi:

    <input
    value={this.state.newName}
    onChange={this.handleNameChange}  />



    numero:
    <input
      value={this.state.newNumber}
      onChange={this.handleNumberChange}  />


    <div>
    <button type="submit">lisää</button>
    </div>
</form>

    <h2>Numerot</h2>
    <ul>
      {numerot.map(numero => <Numero key={numero.id} numero={numero} />)}
    </ul>
    </div>
  )
}
}

export default App