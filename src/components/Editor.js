import React, { useEffect, useRef } from 'react'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/darcula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import ACTIONS, { CODE_CHANGE } from '../Action'



const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null)

    useEffect(() => {
        async function init() {

            editorRef.current = Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
                // to enable thi mode we have to import this -: import  'codemirror/mode/javascript/javascript'
                mode: { name: 'javascript', json: true },
                //to enable theme mode we have to import this : import 'codemirror/theme/darcula.css'
                theme: 'darcula',
                //to enbale thi swe have to import this:import 'codemirror/addon/edit/closetag'
                autoCloseTags: true,
                //to enable this we have ti import this:import 'codemirror/addon/edit/closebrackets'
                autoCloseBrackets: true,
                lineNumbers: true




            })










            //change is code miirror event listener ---async the code
            editorRef.current.on('change', (instance, changes) => {
                console.log('changes', changes)
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code)
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    })
                }
                console.log(code)
            })




        }
        init()
    }, [])


    useEffect(() => {

        console.log('changing ref')

        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {

                if (code !== null) {

                    editorRef.current.setValue(code)
                }
            })
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE)
            }
        }
    }, [socketRef.current])


    return (
        <textarea id='realtimeEditor'></textarea>
    )
}

export default Editor