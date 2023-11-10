import { useState } from 'react';
import './style.css';
import {FiSearch} from 'react-icons/fi';
import api from './services/api';


function App() {

  const [input,setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch(){
      if(input === ''){
        alert("Preencha algum CEP!")
        return;
      }

      try{
        const response = await api.get(`${input}/json`);
        setCep(response.data);
        console.log(response.data);
        setInput("");
      }catch{
        alert('Erro ao fazer a requisição');
        setInput("");
      }
  }

  return (
    <div className="container">
      <h1 className="title">Procura CEP</h1>

    <div className="containerInput">
      <input
      type="text"
      placeholder="Digite seu cep..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
    <button className="buttonSearch" onClick={handleSearch}>
    <FiSearch size={25} color='#FFF'/>
    </button>
    </div>

    {Object.keys(cep).length > 0 && (
      <main className='main'>
      <span><p className='teste'>CEP</p><h4 className='teste2'>{cep.cep}</h4></span>
      <span><p className='teste'>Logradouro</p><h4 className='teste2'>{cep.logradouro}</h4></span>
      <span><p className='teste'>Complemento</p><h4 className='teste2'>{cep.complemento}</h4></span>
      <span><p className='teste'>Bairro</p><h4 className='teste2'>{cep.bairro}</h4></span>
      <span><p className='teste'>Cidade/Estado</p><h4 className='teste2'>{cep.localidade} - {cep.uf}</h4></span>
    </main>
    )}
    

    </div>
  );
}

export default App;
