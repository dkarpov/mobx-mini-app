import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
export const Landing = () => {
  return (
    <div className="App">
      <Header message="Learn BlueprintJS" />
      <Outlet />
    </div>
  );
};
