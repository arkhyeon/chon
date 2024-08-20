import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCode,
  FaImage,
  FaItalic,
  FaList,
  FaListOl,
  FaParagraph,
  FaStrikethrough,
  FaTable,
  FaUnderline,
} from 'react-icons/fa';
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHighlighter,
} from 'react-icons/lu';
import { RiCodeBlock } from 'react-icons/ri';
import { TbBlockquote } from 'react-icons/tb';
import React, { useRef } from 'react';
import {
  MenuButton,
  MenuInSubButton,
} from '@/src/ui/tiptap/components/MenuButton';

const TableMenuList = ({ editor }: any) => [
  {
    name: 'Insert Table',
    action: () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
  },
  {
    name: 'Add Column Before',
    action: () => editor.chain().focus().addColumnBefore().run(),
  },
  {
    name: 'Add Column After',
    action: () => editor.chain().focus().addColumnAfter().run(),
  },
  {
    name: 'Delete Column',
    action: () => editor.chain().focus().deleteColumn().run(),
  },
  {
    name: 'Add Row Before',
    action: () => editor.chain().focus().addRowBefore().run(),
  },
  {
    name: 'Add Row After',
    action: () => editor.chain().focus().addRowAfter().run(),
  },
  {
    name: 'Delete Row',
    action: () => editor.chain().focus().deleteRow().run(),
  },
  {
    name: 'Delete Table',
    action: () => editor.chain().focus().deleteTable().run(),
  },
  {
    name: 'Merge Cells',
    action: () => editor.chain().focus().mergeCells().run(),
  },
  {
    name: 'Toggle Header Column',
    action: () => editor.chain().focus().toggleHeaderColumn().run(),
  },
  {
    name: 'Toggle Header Row',
    action: () => editor.chain().focus().toggleHeaderRow().run(),
  },
  {
    name: 'Toggle Header Cell',
    action: () => editor.chain().focus().toggleHeaderCell().run(),
  },
  {
    name: 'Merge Or Split',
    action: () => editor.chain().focus().mergeOrSplit().run(),
  },
  {
    name: 'Set Cell Attribute',
    action: () => editor.chain().focus().setCellAttribute('colspan', 2).run(),
  },
];

const MenuList = ({ editor }: any) => [
  {
    name: 'bold',
    icon: <FaBold />,
    onClick: () => editor.chain().focus().toggleBold().run(),
    disable: !editor.can().chain().focus().toggleBold().run(),
    isActive: editor.isActive('bold') ? 'is-active text-green-700' : '',
  },
  {
    name: 'italic',
    icon: <FaItalic />,
    onClick: () => editor.chain().focus().toggleItalic().run(),
    disable: !editor.can().chain().focus().toggleItalic().run(),
    isActive: editor.isActive('italic') ? 'is-active text-green-700' : '',
  },
  {
    name: 'underline',
    icon: <FaUnderline />,
    onClick: () => editor.chain().focus().toggleUnderline().run(),
    isActive: editor.isActive('underline') ? 'is-active text-green-700' : '',
  },
  {
    name: 'strike',
    icon: <FaStrikethrough />,
    onClick: () => editor.chain().focus().toggleStrike().run(),
    disable: !editor.can().chain().focus().toggleStrike().run(),
    isActive: editor.isActive('strike') ? 'is-active text-green-700' : '',
  },
  {
    name: 'code',
    icon: <FaCode />,
    onClick: () => editor.chain().focus().toggleCode().run(),
    disable: !editor.can().chain().focus().toggleCode().run(),
    isActive: editor.isActive('code') ? 'is-active text-green-700' : '',
    split: true,
  },
  {
    name: 'heading1',
    icon: <LuHeading1 strokeWidth={3.5} viewBox="2 2 20 20" />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: editor.isActive('heading', { level: 1 })
      ? 'is-active text-green-700'
      : '',
  },
  {
    name: 'heading2',
    icon: <LuHeading2 strokeWidth={3.5} viewBox="2 2 20 20" />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: editor.isActive('heading', { level: 2 })
      ? 'is-active text-green-700'
      : '',
  },
  {
    name: 'heading3',
    icon: <LuHeading3 strokeWidth={3.5} viewBox="2 2 20 20" />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: editor.isActive('heading', { level: 3 })
      ? 'is-active text-green-700'
      : '',
  },
  {
    name: 'heading4',
    icon: <LuHeading4 strokeWidth={3.5} viewBox="2 2 20 20" />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: editor.isActive('heading', { level: 4 })
      ? 'is-active text-green-700'
      : '',
  },
  {
    name: 'heading5',
    icon: <LuHeading5 strokeWidth={3.5} viewBox="2 2 20 20" />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: editor.isActive('heading', { level: 5 })
      ? 'is-active text-green-700'
      : '',
  },
  {
    name: 'paragraph',
    icon: <FaParagraph />,
    onClick: () => editor.chain().focus().setParagraph().run(),
    isActive: editor.isActive('paragraph') ? 'is-active text-green-700' : '',
    split: true,
  },
  {
    name: 'bullet list',
    icon: <FaList />,
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    isActive: editor.isActive('bulletList')
      ? 'is-active text-green-700 list-disc'
      : '',
  },
  {
    name: 'ordered list',
    icon: <FaListOl />,
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: editor.isActive('orderedList')
      ? 'is-active text-green-700 list-decimal'
      : '',
  },
  {
    name: 'align left',
    icon: <FaAlignLeft />,
    onClick: () => editor.chain().focus().setTextAlign('left').run(),
    isActive: editor.isActive({ textAlign: 'left' }) ? 'is-active' : '',
  },
  {
    name: 'align center',
    icon: <FaAlignCenter />,
    onClick: () => editor.chain().focus().setTextAlign('center').run(),
    isActive: editor.isActive({ textAlign: 'center' })
      ? 'is-active text-green-700 text-center'
      : '',
  },
  {
    name: 'align right',
    icon: <FaAlignRight />,
    onClick: () => editor.chain().focus().setTextAlign('right').run(),
    isActive: editor.isActive({ textAlign: 'right' }) ? 'is-active' : '',
  },
  {
    name: 'align justify',
    icon: <FaAlignJustify />,
    onClick: () => editor.chain().focus().setTextAlign('justify').run(),
    isActive: editor.isActive({ textAlign: 'justify' }) ? 'is-active' : '',
    split: true,
  },
  {
    name: 'highlight',
    icon: <LuHighlighter strokeWidth={3.5} />,
    onClick: () => editor.chain().focus().toggleHighlight().run(),
    isActive: editor.isActive('highlight') ? 'is-active text-green-700' : '',
  },
  {
    name: 'code block',
    icon: <RiCodeBlock strokeWidth={1} />,
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    isActive: editor.isActive('codeBlock') ? 'is-active text-green-700' : '',
  },
  {
    name: 'blockquote',
    icon: <TbBlockquote strokeWidth={3} />,
    onClick: () => editor.chain().focus().toggleBlockquote().run(),
    isActive: editor.isActive('blockquote') ? 'is-active text-green-700' : '',
  },
  {
    name: 'table',
    icon: <FaTable />,
    onClick: () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
    isActive: editor.isActive('table') ? 'is-active text-green-700' : '',
    subMenu: TableMenuList,
  },
];

export default function MenuBar({ editor, setImageURL }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }
  const MenuBarIconValue = MenuList({ editor });

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageURL(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex w-full items-center gap-1 bg-black p-2 text-white">
      <input
        type="color"
        onInput={(event: any) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes('textStyle').color}
      />
      {MenuBarIconValue.map((item) =>
        item?.subMenu ? (
          <MenuInSubButton key={item.name} item={item} editor={editor} />
        ) : (
          <MenuButton key={item.name} item={item} />
        ),
      )}
      <div className="cursor-pointer p-1 hover:rounded-lg hover:bg-gray-500">
        <input
          type="file"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        <FaImage onClick={handleIconClick} />
      </div>
    </div>
  );
}
