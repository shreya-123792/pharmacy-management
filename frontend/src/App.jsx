import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBatches = async (searchValue = "") => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/batches?search=${searchValue}`
      );

      const data = await response.json();

      setBatches(data.batches || []);
    } catch (error) {
      console.error("Error fetching batches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchBatches(value);
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>💊 Pharmacy Management</h1>
          <p>Manage medicine batches and inventory</p>
        </div>
      </header>

      <main className="container">
        <div className="top-section">
          <div>
            <h2>Medicine Inventory</h2>
            <p>Track batches, stock and expiry dates</p>
          </div>

          <input
            type="text"
            placeholder="🔍 Search medicine..."
            value={search}
            onChange={handleSearch}
            className="search-box"
          />
        </div>

        {loading ? (
          <p className="loading">Loading batches...</p>
        ) : batches.length === 0 ? (
          <div className="empty">
            <h3>No batches found</h3>
            <p>Try searching for another medicine.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Batch Number</th>
                  <th>Expiry Date</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {batches.map((batch) => {
                  const expiryDate = new Date(batch.expiryDate);
                  const today = new Date();

                  const isExpired = expiryDate < today;

                  return (
                    <tr key={batch._id}>
                      <td>{batch.medicineName}</td>
                      <td>{batch.batchNumber}</td>
                      <td>
                        {expiryDate.toLocaleDateString("en-IN")}
                      </td>
                      <td>{batch.quantity}</td>
                      <td>₹{batch.price}</td>
                      <td>
                        <span
                          className={
                            isExpired
                              ? "status expired"
                              : "status valid"
                          }
                        >
                          {isExpired ? "Expired" : "Valid"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;