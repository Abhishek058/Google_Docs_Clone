import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useState, useEffect } from "react";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import useUser from "./useUser";
import { doc, getFirestore, collection, setDoc } from "firebase/firestore";
import app from "@/app/firebase/firebase";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

interface EditorProps {
  id: string;
}

const TextEditor: React.FC<EditorProps> = ({ id }) => {
  const user = useUser();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const db = getFirestore(app);
  const userEmail = user?.email;
  const [snapshot, error] = useDocumentOnce(
    doc(db, `userDocs/${userEmail}/docs/${id}`)
  );

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);

    const docRef = doc(db, `userDocs/${userEmail}/docs/${id}`);
    setDoc(
      docRef,
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      { merge: true }
    );
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center item-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border"
      />
    </div>
  );
};
export default TextEditor;
