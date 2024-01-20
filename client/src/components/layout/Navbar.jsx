import Title from "./Title"
import styles from './Navbar.module.css'
import { useNavigate, NavLink, useLocation } from "react-router-dom"
import { useEffect } from "react"

function Navbar() {

    const navigate = useNavigate()


    function handleLogout() {
        localStorage.removeItem('Logged user')
        navigate('/')
    }

    return (
        <nav className={styles.navbar}>
            <Title></Title>
            <div className={styles.options}>
                <NavLink to='/home' className={styles.option}>
                    <i className="fa-solid fa-home"></i>
                    <h1>Home</h1>
                </NavLink>
                <NavLink to='/post' className={styles.option}>
                    <i className="fa-solid fa-envelope"></i>
                    <h1>Postar</h1>
                </NavLink>
                <NavLink to='/profile' className={styles.option}>
                    <i className="fa-solid fa-id-badge"></i>
                    <h1>Perfil</h1>
                </NavLink>
            </div>
            <button onClick={handleLogout}>Sair</button>
        </nav>
    )
}

export default Navbar