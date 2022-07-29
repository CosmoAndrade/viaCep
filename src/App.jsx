
import { useEffect, useState } from 'react';
import './App.css'

import api from './services/api'

function App() {

  const [cep, setCep] = useState('')
  const [enderecos, setEnderecos] = useState([
    {
      "cep": "01001 - 000",
      "logradouro": "Praça da Sé",
      "complemento": "lado ímpar",
      "bairro": "Sé",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11",
      "siafi": "7107"
    }
  ])

  const getCep = () => {

    api
      .get(`${cep}/json`)
      .then((response) => setEnderecos([
        ...enderecos, response.data
      ]))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

  }


  const numberMask = (value) => value.replace(/\D/g, '');

  const handleSubmit = (e) => {
    e.preventDefault()

    const cepExiste = enderecos.find((endereco) => numberMask(endereco.cep) === cep);
    
    if (!cepExiste) {
      getCep()
    }
    // console.log(cepExiste, enderecos);
    setCep('')

  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>

        <div className="cep-input">
          <input type="text"
            value={cep}
            onChange={(e) => setCep(numberMask(e.target.value))}
          />
          <button type='submit'>Buscar</button>
        </div>


      </form>

      <table>
        <thead>
          <th>RUA</th>
          <th>BAIRRO</th>
          <th>CIDADE</th>
          <th>UF</th>
          <th>COMPLEMENTO</th>
          <th>DDD</th>
        </thead>
        <tbody>
          {enderecos.map((endereco) => {
            return (
              <tr>

                <td>{endereco.logradouro}</td>
                <td>{endereco.bairro}</td>
                <td>{endereco.localidade}</td>
                <td>{endereco.uf}</td>
                <td>{endereco.complemento}</td>
                <td>{endereco.ddd}</td>


              </tr>
            )
          })}
        </tbody>

      </table>


    </div>
  )
}

export default App
