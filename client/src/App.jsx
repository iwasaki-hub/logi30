import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const json = await response.json();

      setData(json);

      try {
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <h1>Hello Kanki 😊</h1>
      {loading ? (
        <>
          <p>読み込み中...</p>
          <div className="spinner" />
        </>
      ) : error ? (
        <p>エラーが発生しました: {error}</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  );
}

export default App;
