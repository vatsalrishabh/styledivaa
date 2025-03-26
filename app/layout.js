'use client';
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Auth0Provider } from '@auth0/auth0-react';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add meta tags, title, etc. here */}
        
      </head>
      <body className="antialiased">
        <Auth0Provider
          domain="dev-rmx4ghqiem7rad2h.us.auth0.com"
          clientId="Y2fkFIsZmAC7EJ56yYVbsL6yYwotGNkD"
         
        >
          <Provider store={store}>
            {children}
          </Provider>
        </Auth0Provider>
      </body>
    </html>
  );
}