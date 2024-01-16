import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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

interface DocumentProps {
  user: {
    email: string;
  };
}

interface Document {
  fileName: string;
  formattedTimestamp: Date;
}

const Documents: React.FC<DocumentProps> = ({ user }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

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
          newDocuments.push({ fileName, formattedTimestamp });
        }
      });

      setDocuments(newDocuments);
    };

    fetchDataFromFirebase();
  }, [user.email]);

  return (
    <div className="w-full p-6">
      <div className="flex items-center  justify-around md:text-lg text-xs">
        <div className="flex flex-col items-center w-2/3 p-4">
          <div className="flex justify-between items-center w-full m-4">
            <ArrowDropDownIcon />
            <h1 className="">Recent Documents</h1>
            <h1 className="">Recent Documents</h1>
          </div>
          {documents.map((doc, index) => {
            return (
              <div className="flex items-center justify-between w-full">
                <ArticleIcon className="text-blue-600" />
                <h1 className="font-bold" key={index}>
                  {doc.fileName}
                </h1>
                <h1 className="text-gray-500 text-sm" key={index}>
                  {doc.formattedTimestamp.toLocaleString()}
                </h1>
              </div>
            );
          })}
        </div>

        <div>
          <Button className="text-black w-14 h-14 rounded-full">
            <SortByAlphaOutlinedIcon className="cursor-pointer" />
          </Button>
          <Button className="text-black w-12 h-14 rounded-full">
            <FolderOpenOutlinedIcon className="cursor-pointer" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Documents;
