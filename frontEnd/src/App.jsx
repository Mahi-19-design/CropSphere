import { useEffect, useState } from "react";
import axios from "axios";
import ChatInterface from "./components/ChatInterface";
import { regionOptions } from "./data/options";

const API_BASE_URL = "/api/recommend-crop";

const defaultFormState = {
  state: "Andhra Pradesh",
  district: "West Godavari",
  landArea: 5,
  budget: 50000,
  labour: "medium",
  previousCrop: "",
};

function App() {
  const [formState, setFormState] = useState(defaultFormState);
  const [districts, setDistricts] = useState(regionOptions);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    let ignore = false;

    axios
      .get(`${API_BASE_URL}/regions`)
      .then((response) => {
        if (!ignore) {
          setDistricts(response.data);
        }
      })
      .catch(() => {
        if (!ignore) {
          setDistricts(regionOptions);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  function updateField(field, value) {
    setFormState((current) => {
      if (field === "state") {
        return {
          ...current,
          state: value,
          district: (districts[value] || [])[0] || "",
        };
      }

      return {
        ...current,
        [field]: value,
      };
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setErrorMessage("");
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/farm-input`, formState);
      setResult(response.data);
    } catch (error) {
      console.error("Recommendation request failed", error);
      const nextMessage =
        error.response?.data?.error ||
        "Unable to reach the recommendation API. Start the backend server on http://localhost:5000 and retry.";
      setErrorMessage(nextMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChatInterface
      formState={formState}
      districts={districts}
      onFieldChange={updateField}
      onSubmit={handleSubmit}
      loading={loading}
      errorMessage={errorMessage}
      result={result}
    />
  );
}

export default App;
