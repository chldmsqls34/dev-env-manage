'use client'
import { useEffect, useRef } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";

export default function EditorBox({content,setContent}:{content:string,setContent:(content:string)=>void}) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorContainerRef.current && !quillRef.current) {
      // Quill 인스턴스가 없을 때만 초기화
      quillRef.current = new Quill(editorContainerRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        },
      });
      quillRef.current.root.innerHTML = content;
      quillRef.current.on('text-change', () => {
        setContent(quillRef.current?.root.innerHTML || '');
      });

    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div ref={editorContainerRef} style={{height:"450px"}} >

      </div>
    </div>
  );
};