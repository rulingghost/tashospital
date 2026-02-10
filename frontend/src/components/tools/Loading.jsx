import React from 'react'
import styles from './CSS/loading.module.css'

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5 w-full h-full'>
        <div className={styles.loading_container}>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
        </div>
    </div>
  )
}

export default Loading