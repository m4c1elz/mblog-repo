import Navbar from '../layout/Navbar'
import axios from 'axios'
import {useState, useEffect} from 'react'
import styles from './Home.module.css'
import BarLoader from 'react-spinners/BarLoader'
import Post from '../layout/Post'


function Home() {
    const [data, setData] = useState()

    async function getData() {
        try {
            const {data} = await axios.get('http://localhost:8080/api')
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    
    return(
        <div className={styles.wrapper}>
            <Navbar></Navbar>
                {data ? (
                    <main className={styles.posts}>
                        {data.length > 0 ?
                            data.map(item => {
                                return(
                                    <Post key={item.postid} 
                                        username={item.username} 
                                        content={item.content}/>
                                )
                            })
                        : (<h1 style={{marginLeft: '20px'}} > Não há posts para mostrar.</h1>)}
                    </main>
                ) : (
                    <div className={styles.loadingscreen}>
                        <BarLoader color='#7077A1'></BarLoader>
                    </div>
                )}
        </div>
    )
}

export default Home