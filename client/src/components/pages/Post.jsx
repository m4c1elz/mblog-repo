import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../layout/Navbar"
import styles from "./Post.module.css"
import axios from 'axios'
import PulseLoader from 'react-spinners/PulseLoader'

function Post() {

    const navigate = useNavigate()
    const [placeholder, setPlaceholder] = useState()
    const [postContent, setPostContent] = useState()
    const [loading, setLoading] = useState(false)

    const placeholders = [
        "Escreva algo interessante! Ou não, é assim que a internet funciona...",
        "GEOMETRY DASH 2.1 LANÇOU MEU DEUS",
        "aquele maluco gastou 50k numa animação dele...",
        "reactjs é um lixo ngl",
        "FIRE IN THE HOLE !!!",
        "se quiser sim mano",
        "sonic é bastante mid. -felipe, que zerou sonic 06",
        "i put the new forgis on the jeans"
    ]

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * placeholders.length)
        setPlaceholder(placeholders[randomNum])
    }, [])

    async function handlePost(e) {
        e.preventDefault()
        setLoading(true)

        if (postContent == '') {
            return
        }

        try {
            // AGORA podemos postar
            const response = await axios.post('http://localhost:8080/api/posts', 
            {
                userid: localStorage.getItem('Logged user'),
                content: postContent
            })

            navigate('/home')
        } catch (error) {
            console.log('Opa! algo aconteceu.')
            console.log(error)
        }
        setLoading(false)
    }

    return(
        <div className={styles.wrapper}>
            <Navbar/>
            <form className={styles.form}>
                <h1>Crie sua postagem!</h1>
                <textarea 
                    name="post" 
                    id="post" 
                    cols="50" 
                    rows="5" 
                    placeholder={placeholder} 
                    onChange={(e) => setPostContent(e.target.value)}
                    required>
                    </textarea>
                <button type="submit" onClick={(e) => handlePost(e)}>
                    {loading ? (<PulseLoader color="#fff"/>) : ('Postar')}
                </button>
            </form>
        </div>
    )
}

export default Post