"use client";

import Quill from "quill";
import QuillCursors from "quill-cursors";
import { QuillBinding } from "y-quill";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useEffect, useRef, useState } from "react";
import { useRoom } from "@/liveblocks.config";
import 'quill/dist/quill.snow.css';

// Register Quill modules before any Quill usage
Quill.register('modules/cursors', QuillCursors);

import ReactQuill from "react-quill-new";

interface CollaborativeEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

export function CollaborativeEditor({ onChange }: CollaborativeEditorProps) {
  const room = useRoom();
  const [text, setText] = useState<Y.Text>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yText = yDoc.getText("quill");

    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setText(yText);
    setProvider(yProvider);

    console.log("yText", yText, yText.toString());

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!text || !provider) {
    return null;
  }

  return <QuillEditor yText={text} provider={provider} onChange={onChange} />;
}

type EditorProps = {
  yText: Y.Text;
  provider: any;
  onChange: (content: string) => void;
};

function QuillEditor({ yText, provider, onChange }: EditorProps) {
  const reactQuillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill) return;

    const binding = new QuillBinding(yText, quill, provider.awareness);

    // Handle content changes
    quill.on('text-change', () => {
      onChange(quill.getSemanticHTML());
    });

    return () => {
      binding?.destroy?.();
    };
  }, [provider, onChange]);

  const modules = {
    cursors: true,
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
    history: {
      userOnly: true
    }
  };

  return (
    <ReactQuill
      placeholder="Start typing here…"
      ref={reactQuillRef}
      theme="snow"
      modules={modules}
    />
  );
}
