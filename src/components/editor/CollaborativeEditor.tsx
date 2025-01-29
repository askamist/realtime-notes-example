import { useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';
import QuillCursors from 'quill-cursors';
import { useAuth } from '../../hooks/useAuth.js';
import 'react-quill/dist/quill.snow.css';

// Register the cursors module
Quill.register('modules/cursors', QuillCursors);

interface CollaborativeEditorProps {
  noteId: string;
  initialContent: string;
  onChange: (content: string) => void;
}

export function CollaborativeEditor({
  noteId,
  initialContent,
  onChange,
}: CollaborativeEditorProps) {
  const quillRef = useRef<ReactQuill>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    // Initialize Yjs document
    const ydoc = new Y.Doc();

    // Connect to WebSocket server
    const provider = new WebsocketProvider(
      'ws://localhost:3000',
      `notes/${noteId}`,
      ydoc,
      { WebSocketPolyfill: WebSocket }
    );

    // Create a Y.Text type for the editor
    const ytext = ydoc.getText('quill');

    // Bind Quill to Yjs
    const binding = new QuillBinding(ytext, quill, provider.awareness);

    // Set initial content if document is empty
    if (ytext.toString() === '') {
      ytext.insert(0, initialContent);
    }

    // Handle awareness (cursor positions, user info)
    provider.awareness.setLocalStateField('user', {
      name: currentUser?.name,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      id: currentUser?.id
    });

    // Update parent component when content changes
    quill.on('text-change', () => {
      onChange(quill.root.innerHTML);
    });

    return () => {
      binding.destroy();
      provider.destroy();
      ydoc.destroy();
    };
  }, [noteId, initialContent, currentUser]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean']
    ],
    cursors: true
  };

  return (
    <div className="collaborative-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        placeholder="Write your note here..."
        className="h-[350px]"
      />
    </div>
  );
}
