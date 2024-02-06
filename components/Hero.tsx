import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { doc, getFirestore, serverTimestamp, addDoc } from "firebase/firestore";
import app from "../app/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface HeroProps {
  user: {
    email: string;
  };
}

const Hero: React.FC<HeroProps> = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  const createDocument = (input: string) => {
    if (!input) return;

    const auth = getAuth(app);
    const db = getFirestore(app);

    const unsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        if (authUser.email) {
          const userDocRef = doc(db, `userDocs/${authUser.email}/docs`, input);

          addDoc(userDocRef.parent, {
            fileName: input,
            timeStamp: serverTimestamp(),
          });
        }
      }
    });

    setInput("");
    setShowModal(false);
    window.location.reload();

    return () => unsub();
  };

  const modal = (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <div className="bg-white py-4 rounded-md mx-auto max-w-sm relative top-1/3 outline-none">
        <h1 className="text-center mb-2 font-semibold">Create new Document</h1>
        <div className="flex justify-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="outline-none w-3/4 p-2 border-2 border-gray-300 rounded-md"
            placeholder="Enter name..."
            onKeyDown={(e) => e.key === "Enter" && createDocument(input)}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            className="px-4 py-2 m-2 text-black bg-gray-200 hover:bg-gray-300 rounded-md hover:shadow-xl"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 m-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md hover:shadow-xl"
            onClick={() => createDocument(input)}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
  const images = [
    {
      link: "https://ssl.gstatic.com/docs/templates/thumbnails/1XykI9TfWo4IoUqGLjQ-D8NIU4jZ1Ml9OI8-Euj5FrA0_400_3.png",
      text: "Project proposal",
      font: "Tropic",
    },
    {
      link: "https://ssl.gstatic.com/docs/templates/thumbnails/1wyFqxsRmKm9q--7j4WRmBMn694YdhV6hmNrfh4rVm2E_400.png",
      text: "Resume",
      font: "Serif",
    },
    {
      link: "https://ssl.gstatic.com/docs/templates/thumbnails/1TojfPV3jurwEV2RpmVqnCCCR4z9g2eQBZ40XTHPBqk8_400_3.png",
      text: "Brochure",
      font: "Coral",
    },
    {
      link: "https://ssl.gstatic.com/docs/templates/thumbnails/1OLxGsoZ-q6o9MiMbWpY7FngEKzF94SS6fZXAwo-vorM_400_2.png",
      text: "Report",
      font: "Spearmint",
    },
    {
      link: "https://ssl.gstatic.com/docs/templates/thumbnails/10e8_E36oj6_LuCRzckBFX_9oqbCHntmYB-jxB5U9gsw_400_2.png",
      text: "Letter",
      font: "Luxe",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 pt-4">
      {showModal && modal}
      <div className="w-full flex items-center justify-between p-2 sm:w-2/3">
        <h1 className="text-xs sm:text-lg">Start a new document</h1>
        <div className="flex items-center">
          <Button className="!text-gray-700 !text-xs !sm:text-sm">
            <h1>Template gallery</h1>
            <UnfoldMoreIcon />
          </Button>
          <div className="h-8 border border-gray-300"></div>
          <MoreVertIcon className="m-2 cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap">
        <div
          className="flex flex-col m-4 max-w-[120px] w-full sm:max-w-[150px] cursor-pointer"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <img
            src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
            alt="template"
            className="border-[1px] border-gray-200 rounded-md hover:border-blue-500 max-w-full"
          />
          <h1 className="mt-2 text-sm font-semibold">Blank Doc</h1>
          <p className="text-gray-400 text-xs">Blank</p>
        </div>
        {images.map((image, index) => (
          <div
            key={index}
            className="flex flex-col m-4 max-w-[120px] w-full sm:max-w-[150px] cursor-pointer"
          >
            <img
              src={image.link}
              alt="template"
              className="border-[1px] border-gray-200 rounded-md hover:border-blue-500 max-w-full"
            />
            <h1 className="mt-2 text-sm font-semibold">{image.text}</h1>
            <p className="text-gray-400 text-xs">{image.font}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
