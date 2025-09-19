import React, { useCallback, useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import { $setBlocksType } from "@lexical/selection"
import { $createHeadingNode } from "@lexical/rich-text"
import { mergeRegister } from "@lexical/utils"
import { IconUnderline, IconBold, IconItalic, IconArrowBackUp, IconArrowForwardUp, IconH1 } from "@tabler/icons-react"


export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext()
    const toolbarRef = useRef(null)
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isH1, setIsH1] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection()
        if($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat("bold"))
            setIsItalic(selection.hasFormat("italic"))
            setIsUnderline(selection.hasFormat('underline'))
        }
    }, [])

    const handleHeading = () => {
        editor.update(() => {
            const selection = $getSelection()
            console.log(selection)
            if($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode("h1"))
            }
        })
    }


    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(
                    () => {
                        $updateToolbar();
                    },
                    {editor},
                )
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, _newEditor) => {
                    $updateToolbar();
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
        )
    }, [editor, $updateToolbar])

    return (
        <div className="flex items-center space-x-4 bg-black rounded-t-xl h-[6%] p-2 pr-3 pl-3" ref={toolbarRef}>
            <button
                disabled={!canUndo}
                onClick={() => { editor.dispatchCommand(UNDO_COMMAND, undefined) }}
                className={`size-8 rounded-md ${canUndo ? "bg-black" : "bg-black"} justify-self-center hover:cursor-pointer`}
            >
                <IconArrowBackUp size={25} stroke={1} className="text-white" />
            </button>
            <button
                disabled={!canRedo}
                onClick={() => { editor.dispatchCommand(REDO_COMMAND, undefined) }}
                className={`size-8 rounded-md ${canRedo ? "bg-black" : "bg-black"} justify-self-center self-center hover:cursor-pointer`}
            >
                <IconArrowForwardUp size={25} stroke={1} className="text-white" />
            </button>
            <div className="w-px h-6 bg-gray-600 mx-2" />
            <button
                onClick={() => { editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold") }}
                className={`size-8 rounded-md ${isBold ? "bg-black" : "bg-black"} justify-self-center self-center hover:cursor-pointer`}
            >
                <IconBold size={25} stroke={1} className="text-white" />
            </button>
            <button
                onClick={() => { editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic") }}
                className={`size-8 rounded-md ${isItalic ? "bg-black" : "bg-black"} justify-self-center self-center hover:cursor-pointer`}
            >
                <IconItalic size={25} stroke={1} className="text-white" />
            </button>
            <button
                onClick={() => { editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline") }}
                className={`size-8 rounded-md ${isUnderline ? "bg-black" : "bg-black"} justify-self-center self-center hover:cursor-pointer`}
            >
                <IconUnderline size={28} stroke={1} className="text-white" />
            </button>
            <button
                onClick={handleHeading}
                className={`size-8 rounded-md ${isH1 ? "bg-black" : "bg-black"} justify-self-center self-center hover:cursor-pointer`}
            >
                <IconH1 size={28} stroke={1} className="text-white" />
            </button>
        </div>
    )
}

