import Sidebar from "./components/Sidebar";
import Root from "./routes/root";
function App() {
  return (
    <div className="dark:text-gray-300 dark:bg-gray-600 flex">
      <Sidebar />
      <Root />
    </div>
  );
}
export default App;
