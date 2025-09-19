"use client";

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin'
import {LexicalComposer} from '@lexical/react/LexicalComposer'
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin'
import {ContentEditable} from '@lexical/react/LexicalContentEditable'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary'
import { HeadingNode } from '@lexical/rich-text'
import ToolbarPlugin from '../plugins/toolbarPlugin'
import { theme } from '../plugins/theme'




// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
    console.error(error)
}

export default function EntryPaper() {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [
            HeadingNode,
        ],
    };


    return (
        <div className='w-[90%] h-[90vh] mx-auto bg-white rounded-xl'>
            <LexicalComposer initialConfig={initialConfig}>
                <ToolbarPlugin />
                <div className='flex p-4'>
                    <RichTextPlugin
                        contentEditable={
                            <ContentEditable
                                aria-placeholder={'Enter some text...'}
                                placeholder={<div>Enter some text...</div>}
                                className='focus:outline-none'
                            />
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                </div>
            </LexicalComposer>
        </div>
    )
}