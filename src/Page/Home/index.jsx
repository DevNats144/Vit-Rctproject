import { useEffect, useState, useRef } from 'react' //
import './style.css'
import Api from '../../Services/api'


function Home() {

  const [User, setUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const inputname = useRef()    
  const inputage = useRef() 
  const inputemail = useRef()

             // Alistamento de users //
  async function getUsers(){
    setLoading(true)
    setError(null)
    try {
      const UserFromNat = await Api.get('/user')
      setUser(UserFromNat.data)
    } catch (err) {
      console.error('Erro ao buscar users:', err)
      setError('Não foi possível carregar usuários. Verifique o servidor ou tente novamente.')
    } finally {
      setLoading(false)
    }
  }

             // Criação de users //
  async function creatUser() {
    setError(null)
    try {
      await Api.post('/user', {
        name: inputname.current.value,
        age: inputage.current.value,
        email: inputemail.current.value
      })
      getUsers() // atualizar lista
    } catch (err) {
      console.error('Erro ao criar user:', err)
      setError('Não foi possível criar usuário. Tente novamente.')
    }
  }

  async function deleteUser(id){
    setError(null)
    try {
      // remover ':' — o endpoint correto é /user/:id no servidor, mas ao construir a rota aqui devemos enviar /user/${id}
      await Api.delete(`/user/${id}`)
      getUsers()
    } catch (err) {
      console.error('Erro ao apagar user:', err)
      setError('Não foi possível apagar o usuário. Tente novamente.')
    }
  }

  useEffect(() => {
    getUsers()
    
  }, [])


  return (

    <div className='contentor'>

      <form>
        <h1>Criação de Usuários</h1>
        <input placeholder='Nome' type='text' name="NameUser" ref={inputname}/>
        <input placeholder='Idade' type='number' name="Idade"ref={inputage} />
        <input placeholder='E-mail' type='email' name="Email" ref={inputemail}/>
        <button type='button' onClick={creatUser}>Criar User</button>
      </form>

     {loading && <p>Carregando usuários...</p>}
     {error && (
       <div className="error">
         <p>{error}</p>
         <button onClick={() => getUsers()}>Tentar novamente</button>
       </div>
     )}

      {
        User.map((user) => (

          <div key={user.id} className='card'>
            <div>
              <p>Nome:  <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button className='expecify' onClick={ () => deleteUser(user.id)}>
              <h2>Apagar Usuário</h2>
            </button>
          </div>

        )
        )}


    </div>

  )
}

export default Home

