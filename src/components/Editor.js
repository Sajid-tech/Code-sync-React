import React, { useEffect } from 'react'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/darcula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'



const Editor = () => {

    useEffect(() => {
        async function init() {
            Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
                // to enable thi mode we have to import this -: import  'codemirror/mode/javascript/javascript'
                mode: { name: 'javascript', json: true },
                //to enable theme mode we have to import this : import 'codemirror/theme/darcula.css'
                theme: 'darcula',
                //to enbale thi swe have to import this:import 'codemirror/addon/edit/closetag'
                autoCloseTags: true,
                //to enable this we have ti import this:import 'codemirror/addon/edit/closebrackets'
                autoCloseBrackets: true,
                lineNumbers: true

            });
        }
        init()
    }, [])





    return (
        <textarea id='realtimeEditor'></textarea>
    )
}

export default Editor