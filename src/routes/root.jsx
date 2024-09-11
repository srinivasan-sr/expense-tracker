import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="detail" className="ml-14 w-11/12">
        <Outlet />
      </div>
    </>
  );
}
