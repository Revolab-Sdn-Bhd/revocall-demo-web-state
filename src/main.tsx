import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as Ably from "ably";
import { AblyProvider } from "ably/react";
import { Toaster } from "@/components/ui/sonner";

const client = new Ably.Realtime({
  key: "SNt14w.aaqrPQ:yaMrEu6HgSXSjLykVd2Sph0KIthJPhlsexzX08ILzP8",
  clientId: "web-client-" + Math.random().toString(36),
});

createRoot(document.getElementById("root")!).render(
  <AblyProvider client={client}>
    <StrictMode>
      <App />
      <Toaster position="top-right" richColors />
    </StrictMode>
  </AblyProvider>
);
