import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { NavBar, SideBar } from "~/components/navbar";
import "./app.css";


export default function App() {
  return (
    <Router
      root={props => (
        <>
          <SideBar hide={false}></SideBar>
          <Suspense>{props.children}</Suspense>
        </>
      )}
     >
      <FileRoutes> </FileRoutes>
    </Router>
  );
}
