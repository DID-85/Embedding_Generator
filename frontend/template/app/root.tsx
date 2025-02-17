// root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import RootLayout from "./components/layout/RootLayout"; // Import RootLayout

import './tailwind.css'
export const meta = () => {
  return [  // Changed to return an array
    { charset: "utf-8" },
    { title: "Remix Chatbot App" },
    { viewport: "width=device-width,initial-scale=1" },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <RootLayout> {/* Use RootLayout here */}
          <ScrollRestoration />
          <Outlet />
          <LiveReload />
          <Scripts />
        </RootLayout>
      </body>
    </html>
  );
}