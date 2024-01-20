import styles from './Post.module.css'

export default function Post({username, content}) {
    return (
        <div className={styles.post}>
            <h4>@{username}</h4>
            <p>{content}</p>
        </div>
    )
}