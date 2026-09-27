import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const getData = async () => {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await response.json();

      setData(json);
    };

    getData();
  }, []);

  return (
    <>
      <h1>Hello Kanki 😊</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default App;
