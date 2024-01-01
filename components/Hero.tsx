import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
export default function Hero() {
  const images = [
    {
      link: "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png",
      text: "Blank Doc",
      font: "Blank",
    },
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
      <div className="w-full flex items-center justify-between p-4 sm:w-2/3">
        <h1 className="text-xs sm:text-sm">Start a new document</h1>
        <div className="flex items-center">
          <Button className="text-gray-700 text-xs sm:text-sm">
            <h1>Template gallery</h1>
            <UnfoldMoreIcon />
          </Button>
          <div className="h-8 border border-gray-300"></div>
          <MoreVertIcon className="m-2 cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap">
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
}
