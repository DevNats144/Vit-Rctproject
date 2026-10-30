
import { useEffect, useState, useRef } from 'react' //Importando a galera toda
import './style.css'
import Api from '../../Services/api'


function Home() {

  const [User, setUser] = useState([])
  const [error, setError] = useState('')

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  // Alistamento de users //

  async function getUsers() {

    try {
      const UserFromNat = await Api.get('/user')
      setUser(UserFromNat.data)
      setError('')
    } catch {
      setError('Não foi possível conectar à API.')
    }

  }

  // Criação de users //

  async function creatUser() {

    try {
      await Api.post('/user', {

        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value

      })
      await getUsers() // Chama a funnction para mostar os users cadastrados
    } catch {
      setError('Não foi possível criar o usuário. Verifique se a API está em execução.')
    }
  }

  async function deleteUser(id) {

    try {
      await Api.delete(`/users/${id}`)
      await getUsers()
    } catch {
      setError('Não foi possível apagar o usuário. Verifique se a API está em execução.')
    }

  }


  useEffect(() => {

    getUsers()

  }, [])


  return (

    <div className='contentor'>

      <form>
        <h1>Criação de Usuários</h1>
        <input placeholder='Nome' type='text' name="NameUser" ref={inputName} />
        <input placeholder='Idade' type='number' name="Idade" ref={inputAge} />
        <input placeholder='E-mail' type='email' name="Email" ref={inputEmail} />
        <button type='button' onClick={creatUser}>Criar User</button>
      </form>

      {error && <p role="alert">{error}</p>}

      {
        User.map((user) => (

          <div key={user.id} className='card'>
            <div>
              <p>Nome:  <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button className='expecify' onClick={() => deleteUser(user.id)}>
              <h2>Apagar Usuário</h2>
            </button>
          </div>
        
        )
        
        )}


    </div>

  )
}

export default Home
