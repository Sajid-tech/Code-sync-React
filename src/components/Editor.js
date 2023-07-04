import React, { useEffect } from 'react'
import Codemirror from 'codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/darcula.css'



const Editor = () => {
    useEffect(() => {
        async function init() {
            Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
                // to enable thi mode we have to import this -: import  'codemirror/mode/javascript/javascript'
                mode: { name: 'javascript', json: true },
                //theme
                theme: 'darcula'
            })
        }
        init()
    }, [])
    return (
        <textarea id='realtimeEditor'></textarea>
    )
}

export default Editor