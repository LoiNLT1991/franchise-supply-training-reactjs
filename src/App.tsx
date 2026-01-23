import Loading from "./components/template/Loading.component";
import { useLoadingStore } from "./stores";
import { useShallow } from "zustand/react/shallow";

function App() {
  const { loading, setLoading } = useLoadingStore(
    useShallow((state) => ({
      loading: state.loading,
      setLoading: state.setLoading,
    })),
  );

  const test = () => {
    setLoading(!loading);
    console.log("test");
  };

  return (
    <>
      <Loading />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-blue-600">Tailwind OK 🚀</h1>

          <p className="mt-2 text-red-600">Nếu thấy UI đẹp lên là Tailwind đã hoạt động</p>

          <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={() => test()}>
            Test Button
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
