import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import PulseLoader from 'react-spinners/PulseLoader'
import Title from '../layout/Title'

function Login() {

    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleClick(e) {
        e.preventDefault()
        setLoading(true)
        try {
            const {data} = await axios.get('http://localhost:8080/api/users')
            data.forEach(item => {
                if (item.username == user && item.password == password) {
                    localStorage.setItem('Logged user', item.userid)
                    setLoading(false)
                    navigate('/home')
                }
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <Title></Title>
                <div className={styles.inputs}>
                    <input 
                        type="text" 
                        placeholder="Nome de usuário" 
                        onChange={(e) => 
                        setUser(e.target.value)} 
                        required/>
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required/>
                </div>
                <button type="submit" onClick={(e) => handleClick(e)}>
                    {loading ? (<PulseLoader color='#fff'/>) : ('Entrar')}
                </button>
            </form>
        </div>
    )
}

export default Login