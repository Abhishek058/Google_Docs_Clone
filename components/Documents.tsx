import { IconButton } from "@mui/material";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";
import ArticleIcon from "@mui/icons-material/Article";
import app from "../app/firebase/firebase";
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface DocumentProps {
  user: {
    email: string;
  };
}

interface Document {
  id: string;
  fileName: string;
  formattedTimestamp: Date;
}

const Documents: React.FC<DocumentProps> = ({ user }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const router = useRouter();

  useEffect(() => {
    const db = getFirestore(app);
    const querySnapshot = getDocs(
      collection(doc(db, "userDocs", user.email), "docs")
    );
    const fetchDataFromFirebase = async () => {
      const newDocuments: Document[] = [];

      (await querySnapshot).forEach((doc: any) => {
        const data = doc.data();
        if (data) {
          const { fileName, timeStamp } = data as {
            fileName: string;
            timeStamp: Timestamp;
          };
          const formattedTimestamp = timeStamp.toDate();
          const id = doc.id;
          newDocuments.push({ id, fileName, formattedTimestamp });
        }
      });
      newDocuments.sort((a, b) => b.formattedTimestamp.getTime() - a.formattedTimestamp.getTime());

      setDocuments(newDocuments);
    };

    fetchDataFromFirebase();
  }, [user.email]);

  return (
    <div className="p-6 flex justify-center">
      <table className="w-[85%] border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th></th>
            <th>Recent Document</th>
            <th>Date Created</th>
            <th>
              <IconButton className="rounded-full">
                <SortByAlphaOutlinedIcon className="cursor-pointer text-black" />
              </IconButton>
              <IconButton className="rounded-full">
                <FolderOpenOutlinedIcon className="text-black cursor-pointer" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => {
            return (
              <tr
                className="hover:bg-gray-100 hover:cursor-pointer"
                key={doc.id}
                onClick={() => router.push(`/doc/${doc.id}`)}
              >
                <td className="text-right">
                  <ArticleIcon className="text-blue-600" />
                </td>
                <td
                  className="text-center"
                >
                  <h1 className="text-gray-500 font-semibold">
                    {doc.fileName}
                  </h1>
                </td>
                <td className="text-center">
                  <h1 className="text-gray-400 text-sm">
                    {doc.formattedTimestamp.toLocaleString()}
                  </h1>
                </td>
                <td className="text-center">
                  <button className="text-black rounded-full">
                    <MoreVert className="cursor-pointer" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Documents;
