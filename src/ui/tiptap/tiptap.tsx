'use client';

import './style.scss';
import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import MenuBar from '@/src/ui/tiptap/components/MenuBar';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { common, createLowlight } from 'lowlight';

function Tiptap({
  content,
  setContent,
}: {
  content: string;
  setContent: (e: string) => void;
}) {
  const lowlight = createLowlight(common);

  const editor = useEditor({
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: true, allowBase64: true }),
      StarterKit.configure({
        codeBlock: false,
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline.configure({ HTMLAttributes: { class: 'my-custom-class' } }),
      CodeBlockLowlight.configure({ lowlight }),
      Highlight,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    immediatelyRender: false,
    editorProps: { attributes: { class: 'm-2 focus:outline-none' } },
    content,
  });
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    if (editor && imageURL) {
      editor.commands.setImage({ src: imageURL });
    }
  }, [imageURL]);

  // useEffect(() => {
  //   editor?.chain().focus().insertContent(content).run();
  // }, [content, editor]);

  return (
    <div className="w-full">
      <MenuBar editor={editor} setImageURL={setImageURL} />
      <EditorContent
        className="max-h-[600px] w-full overflow-auto bg-gray-50 p-3 text-black"
        editor={editor}
      />
    </div>
  );
}

export default Tiptap;
