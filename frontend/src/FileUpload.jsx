
import React, { useState } from 'react'

const FileUpload = () => {

    const [file, setFile] = useState()

    const fileHandle = e => {
        setFile(e.target.files[0])
        console.log(e.target.files[0]);
        
    }

  return (
    <div>
        <form action="">
            <input type="file" file={file} onChange={fileHandle} />
        </form>
        <button onClick={()=> console.log(file)}>göster</button>
    </div>
  )
}

export default FileUpload