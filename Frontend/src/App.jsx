import "./App.css";
import CreateRecordForm from "./components/CreateRecordForm.jsx";

function App() {
  return (
    <section className="flex flex-row justify-start items-start gap-12 p-8">
      <div className="flex flex-col w-1/3 gap-10">
        <CreateRecordForm />
      </div>
    </section>
  );
}

export default App
