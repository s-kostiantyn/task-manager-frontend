import { createRoot } from "react-dom/client";
import { Root } from "./Root";

const element = document.getElementById("root") as HTMLElement;
const root = createRoot(element);

root.render(<Root />);
