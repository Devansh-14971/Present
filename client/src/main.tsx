import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { FaviconSettings, MasterIcon, generateFaviconFiles, generateFaviconHtml } from '@realfavicongenerator/generate-favicon';
import { getNodeImageAdapter, loadAndConvertToSvg } from "@realfavicongenerator/image-adapter-node";

const imageAdapter = await getNodeImageAdapter();

// This is the icon that will be transformed into the various favicon files
const masterIcon: MasterIcon = {
  icon: await loadAndConvertToSvg("./favicon/master-icon.svg"),
  darkIcon: await loadAndConvertToSvg("./favicon/dark-icon.svg"),
}

const faviconSettings: FaviconSettings = {
  icon: {
    desktop: {
      regularIconTransformation: {
        type: IconTransformationType.Background,
        backgroundColor: "#f3f2f2",
        backgroundRadius: 0.7,
        imageScale: 0.7,
      },
      darkIconType: "specific",
      darkIconTransformation: {
        type: IconTransformationType.Background,
        backgroundColor: "#f2f2f2",
        backgroundRadius: 0.7,
        imageScale: 1,
      },
    },
    touch: {
      transformation: {
        type: IconTransformationType.None,
      },
      appTitle: "Addrs"
    },
    webAppManifest: {
      transformation: {
        type: IconTransformationType.None,
      },
      backgroundColor: "#ffffff",
      themeColor: "#ffffff",
      name: "MyWebSite",
      shortName: "MySite"
    }
  },
  path: "/",
};
createRoot(document.getElementById("root")!).render(<App />);
