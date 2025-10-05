"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import React, { useEffect, useState, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Undo2,
  Redo2,
  ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Type,
} from "lucide-react";

export default function BodyWriter({ content, updateField }) {
  const [mounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  // ✅ Initialize editor with content prop (or fallback)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        underline: false,
        link: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],
    content: content || "<p>Write something amazing...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-6 min-h-[300px] focus:outline-none text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700",
      },
    },
    editable: true,
    autofocus: true,
    injectCSS: false,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      updateField("body" ,html); // ✅ send updates to parent
    },
  });

  // ✅ Sync editor when `content` changes (e.g. after fetch)
  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = useCallback(
    (action) => {
      if (!editor) return;
      const chain = editor.chain().focus();

      const commands = {
        bold: () => chain.toggleBold().run(),
        italic: () => chain.toggleItalic().run(),
        underline: () => chain.toggleUnderline().run(),
        undo: () => chain.undo().run(),
        redo: () => chain.redo().run(),
        alignLeft: () => chain.setTextAlign("left").run(),
        alignCenter: () => chain.setTextAlign("center").run(),
        alignRight: () => chain.setTextAlign("right").run(),
        bulletList: () => chain.toggleBulletList().run(),
        orderedList: () => chain.toggleOrderedList().run(),
      };

      if (commands[action]) {
        commands[action]();
      }
    },
    [editor]
  );

  const addImage = () => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setIsImageDialogOpen(false);
    }
  };

  const addLink = () => {
    if (linkUrl && editor) {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to);

      if (text) {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      } else {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${linkUrl}</a>`)
          .run();
      }

      setLinkUrl("");
      setIsLinkDialogOpen(false);
    }
  };

  if (!mounted || !editor) return null;

  const toolbarButtons = [
    { action: "bold", icon: Bold, isActive: () => editor.isActive("bold") },
    { action: "italic", icon: Italic, isActive: () => editor.isActive("italic") },
    { action: "underline", icon: UnderlineIcon, isActive: () => editor.isActive("underline") },
    { action: "alignLeft", icon: AlignLeft, isActive: () => editor.isActive({ textAlign: "left" }) },
    { action: "alignCenter", icon: AlignCenter, isActive: () => editor.isActive({ textAlign: "center" }) },
    { action: "alignRight", icon: AlignRight, isActive: () => editor.isActive({ textAlign: "right" }) },
    { action: "bulletList", icon: List, isActive: () => editor.isActive("bulletList") },
    { action: "orderedList", icon: ListOrdered, isActive: () => editor.isActive("orderedList") },
    { action: "undo", icon: Undo2, isActive: () => false },
    { action: "redo", icon: Redo2, isActive: () => false },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg">
      {/* <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Type className="text-indigo-600" />
          ✨ Write Your Story
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Create rich content with text formatting, images, links & lists
        </p>
      </div> */}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-800 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
        {toolbarButtons.map(({ action, icon: Icon, isActive }) => (
          <button
            key={action}
            onClick={() => handleClick(action)}
            className={`p-2 rounded border ${
              isActive() ? "bg-indigo-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title={action}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}

        <button
          onClick={() => setIsImageDialogOpen(true)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Add Image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>

        <button
          onClick={() => setIsLinkDialogOpen(true)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
