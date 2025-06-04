"use client";

import dynamic from "next/dynamic";
import { useMemo, useEffect } from "react";

// ✅ Static imports for CSS — required for styles to be applied
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

// ✅ Dynamic import of Froala Editor (client-only)
const FroalaEditor = dynamic(
  () => import("react-froala-wysiwyg"),
  {
    ssr: false,
    loading: () => <div className="p-4 text-center">Loading editor...</div>
  }
);

export default function MyFroalaEditor({ model, setModel }) {
  useEffect(() => {
    // ✅ Optional: JS plugins load after mount (if needed)
    import("froala-editor/js/plugins.pkgd.min.js");
  }, []);

  const config = useMemo(() => ({
    placeholderText: "Edit your content here",
    charCounterCount: true,
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold", "italic", "underline", "strikeThrough",
          "subscript", "superscript", "fontFamily", "fontSize",
          "textColor", "backgroundColor", "inlineClass",
          "inlineStyle", "clearFormatting"
        ]
      },
      moreParagraph: {
        buttons: [
          "alignLeft", "alignCenter", "alignRight", "alignJustify",
          "formatOL", "formatUL", "paragraphFormat", "paragraphStyle",
          "lineHeight", "outdent", "indent", "quote"
        ]
      },
      moreRich: {
        buttons: [
          "insertLink", "insertImage", "insertVideo", "insertTable",
          "emoticons", "fontAwesome", "specialCharacters", "embedly",
          "insertFile", "insertHR"
        ]
      },
      moreMisc: {
        buttons: [
          "undo", "redo", "fullscreen", "print",
          "getPDF", "spellChecker", "selectAll", "html", "help"
        ],
        align: "right",
        buttonsVisible: 2
      }
    },
    quickInsertEnabled: false,
    attribution: false,
    events: {
      initialized: function () {
        console.log("Froala Editor initialized");
      }
    }
  }), []);

  return (
    <div className="froala-container">
      <FroalaEditor
        tag="textarea"
        config={config}
        model={model}
        onModelChange={setModel}
      />
    </div>
  );
}
