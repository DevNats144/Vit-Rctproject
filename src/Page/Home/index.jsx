
import { useEffect, useState, useRef } from 'react' //
import './style.css'
import Api from '../../Services/api'


function Home() {

  const [User, setUser] = useState([]) 

  const inputname = useRef()    
  const inputage = useRef() 
  const inputemail = useRef()

 
            // Alistamento de users //

  async function getUsers(){

    const UserFromNat = await Api.get('/user')
    setUser(UserFromNat.data)

  }

            // Criação de users //

   async function creatUser() {

         await Api.post('/user',{

      name: inputname.current.value,
      age: inputage.current.value,
      email: inputemail.current.value

     })
        getUsers() // Chama a funnction para mostar os users cadastrados 
  }

  async function deleteUser(id){

     await Api.delete(`/user/:${id}`)

      getUsers()

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

