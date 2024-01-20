import Navbar from "../layout/Navbar"
import axios from "axios"
import styles from './Profile.module.css'
import { useEffect, useState } from "react"
import BarLoader from 'react-spinners/BarLoader'

function Profile() {

    const [userData, setUserData] = useState()

    async function getUserData() {
        try {
            const userid = localStorage.getItem('Logged user')
            const {data} = await axios.get(`http://localhost:8080/api/users/${userid}`)
            setUserData(data[0])
        } catch (error) {
            console.log('Opa! Aconteceu alguma coisa!')
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return(
        <div className={styles.wrapper}>
            <Navbar></Navbar>
            <div className={styles.userwrapper}>
                <div className={styles.interface}>
                    <div className={styles.user}>
                        <i className="fa-solid fa-user-circle"></i>
                        <div className="username">
                            {userData ? (
                                <>
                                    <h1>@{userData.username}</h1>
                                    <h2>Senha: {userData.password}</h2>
                                </>
                            ) : (
                                <BarLoader color='#2D3250'></BarLoader>
                            )}
                        </div>
                    </div>
                    <div className={styles.description}>
                        <textarea 
                            name="description" 
                            id="description" 
                            cols="30" 
                            rows="10"
                            placeholder="Adicione uma descrição! ...enquanto não há como salvá-la no banco de dados ainda."></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile