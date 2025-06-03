"use client"; // Required since we're using client-side functionality

import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import dynamic from 'next/dynamic';

// Dynamically import to avoid SSR issues
const FroalaEditor = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg').then((mod) => mod.default),
      // Import plugins you want to use
      import('froala-editor/js/plugins/align.min.js'),
      import('froala-editor/js/plugins/lists.min.js'),
      import('froala-editor/js/plugins/link.min.js'),
      import('froala-editor/js/plugins/image.min.js'),
    ]);
    return values[0];
  },
  {
    loading: () => <p>Loading editor...</p>,
    ssr: false,
  }
);

export default function MyFroalaEditor({ model, setModel }) {
  const config = {
    placeholderText: 'Edit your content here',
    charCounterCount: true,
    toolbarButtons: {
      moreText: {
        buttons: [
          'bold', 'italic', 'underline', 'strikeThrough',
          'subscript', 'superscript', 'fontFamily', 'fontSize',
          'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle',
          'clearFormatting'
        ]
      },
      moreParagraph: {
        buttons: [
          'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
          'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle',
          'lineHeight', 'outdent', 'indent', 'quote'
        ]
      },
      moreRich: {
        buttons: [
          'insertLink', 'insertImage', 'insertVideo', 'insertTable',
          'emoticons', 'fontAwesome', 'specialCharacters', 'embedly',
          'insertFile', 'insertHR'
        ]
      },
      moreMisc: {
        buttons: [
          'undo', 'redo', 'fullscreen', 'print', 'getPDF',
          'spellChecker', 'selectAll', 'html', 'help'
        ],
        align: 'right',
        buttonsVisible: 2
      }
    },
    // Add any other config options you need
  };

  return (
    <FroalaEditor
      tag="textarea"
      config={config}
      model={model}
      onModelChange={setModel}
    />
  );
}