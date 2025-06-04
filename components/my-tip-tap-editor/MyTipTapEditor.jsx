"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { 
  FiBold, 
  FiItalic, 
  FiUnderline, 
  FiLink, 
  FiImage, 
  FiList, 
  FiAlignLeft, 
  FiAlignCenter, 
  FiAlignRight, 
  FiAlignJustify, 
  FiCornerUpLeft, 
  FiRotateCw 
} from "react-icons/fi";

// Proper FontSize extension
const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize.replace('px', ''),
        renderHTML: attributes => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}px` };
        },
      },
    };
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: fontSize })
          .run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .run();
      },
    };
  },
});

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 border-b rounded-t-lg">
      {/* Font Size - Updated to use proper command */}
      <select
        onChange={e => {
          const value = e.target.value;
          if (value) {
            editor.chain().focus().setFontSize(value).run();
          } else {
            editor.chain().focus().unsetFontSize().run();
          }
        }}
        className="p-1 text-sm border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Size</option>
        <option value="12">Small</option>
        <option value="16">Normal</option>
        <option value="20">Large</option>
        <option value="24">XL</option>
      </select>

      {/* Rest of your MenuBar component remains the same */}
      {/* Font Color */}
      <div className="relative">
        <input
          type="color"
          onInput={e => editor.chain().focus().setColor(e.target.value).run()}
          className="w-6 h-6 cursor-pointer"
          title="Text color"
        />
        <div className="absolute inset-0 border border-gray-300 pointer-events-none rounded-sm"></div>
      </div>

      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded-md ${editor.isActive('bold') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        title="Bold"
      >
        <FiBold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded-md ${editor.isActive('italic') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        title="Italic"
      >
        <FiItalic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1.5 rounded-md ${editor.isActive('underline') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        title="Underline"
      >
        <FiUnderline size={18} />
      </button>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded-md ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        title="Bullet List"
      >
        <FiList size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded-md ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        title="Numbered List"
      >
        <ol className="text-sm font-medium">1.</ol>
      </button>

      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-1.5 rounded-md ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        title="Align Left"
      >
        <FiAlignLeft size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-1.5 rounded-md ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        title="Align Center"
      >
        <FiAlignCenter size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-1.5 rounded-md ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        title="Align Right"
      >
        <FiAlignRight size={18} />
      </button>

      {/* Links & Images */}
      <button
        onClick={setLink}
        className={`p-1.5 rounded-md ${editor.isActive('link') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        title="Link"
      >
        <FiLink size={18} />
      </button>
      <button
        onClick={addImage}
        className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100"
        title="Image"
      >
        <FiImage size={18} />
      </button>

      {/* Undo/Redo */}
      <div className="flex gap-1 ml-2 border-l pl-2">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40"
          title="Undo"
        >
          <FiCornerUpLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40"
          title="Redo"
        >
          <FiRotateCw size={18} />
        </button>
      </div>
    </div>
  );
};

export default function MyTipTapEditor({ model, setModel }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontSize, // Now properly defined
      Color.configure({
        types: ['textStyle'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
          style: 'display: inline-block; margin: 0 auto;',
        },
      }),
      Placeholder.configure({
        placeholder: 'Write something beautiful...',
      }),
    ],
    content: model,
    onUpdate({ editor }) {
      setModel(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert focus:outline-none min-h-[300px] p-4 max-w-none',
      },
    },
  });

  useEffect(() => {
    if (editor && model !== editor.getHTML()) {
      editor.commands.setContent(model);
    }
  }, [model, editor]);

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}