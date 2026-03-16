import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../components/SidebarLayout";

const API = "http://localhost:5000/api/federated";

// Professional label mapping
const fieldConfig = {
  age: { label: "Age (Years)", type: "number" },
  sex: {
    label: "Gender",
    type: "select",
    options: [
      { value: 1, label: "Male" },
      { value: 0, label: "Female" },
    ],
  },
  cp: {
    label: "Chest Pain Type",
    type: "select",
    options: [
      { value: 0, label: "Typical Angina" },
      { value: 1, label: "Atypical Angina" },
      { value: 2, label: "Non-anginal Pain" },
      { value: 3, label: "Asymptomatic" },
    ],
  },
  trestbps: { label: "Resting Blood Pressure (mm Hg)", type: "number" },
  chol: { label: "Serum Cholesterol (mg/dL)", type: "number" },
  fbs: {
    label: "Fasting Blood Sugar > 120 mg/dL",
    type: "select",
    options: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
  },
  restecg: {
    label: "Resting ECG Result",
    type: "select",
    options: [
      { value: 0, label: "Normal" },
      { value: 1, label: "ST-T Abnormality" },
      { value: 2, label: "Left Ventricular Hypertrophy" },
    ],
  },
  thalach: { label: "Maximum Heart Rate Achieved", type: "number" },
  exang: {
    label: "Exercise Induced Angina",
    type: "select",
    options: [
      { value: 1, label: "Yes" },
      { value: 0, label: "No" },
    ],
  },
  oldpeak: { label: "ST Depression (Oldpeak)", type: "number" },
  slope: {
    label: "Slope of ST Segment",
    type: "select",
    options: [
      { value: 0, label: "Upsloping" },
      { value: 1, label: "Flat" },
      { value: 2, label: "Downsloping" },
    ],
  },
  ca: { label: "Number of Major Vessels (0–3)", type: "number" },
  thal: {
    label: "Thalassemia Type",
    type: "select",
    options: [
      { value: 1, label: "Normal" },
      { value: 2, label: "Fixed Defect" },
      { value: 3, label: "Reversible Defect" },
    ],
  },
};

export default function PredictionPage() {
  const [globalModel, setGlobalModel] = useState(null);
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModel = async () => {
      const res = await axios.get(`${API}/global-model`);
      setGlobalModel(res.data);

      if (res.data.featureNames) {
        const initial = {};
        res.data.featureNames.forEach((f) => {
          initial[f] = "";
        });
        setFormData(initial);
      }
    };
    fetchModel();
  }, []);

  const handleChange = (feature, value) => {
    setFormData({ ...formData, [feature]: value });
  };

  const isFormValid = Object.values(formData).every(
    (val) => val !== "" && val !== null
  );

  const handlePredict = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setResult(null);

    const featuresArray = Object.values(formData).map(Number);

    try {
      const res = await axios.post(`${API}/predict`, {
        features: featuresArray,
      });
      setResult(res.data);
    } catch (err) {
      console.error("Prediction error:", err);
    }

    setLoading(false);
  };

  const riskLevel =
    result?.probability >= 0.7
      ? "High Risk"
      : result?.probability >= 0.4
      ? "Moderate Risk"
      : "Low Risk";

  const riskColor =
    riskLevel === "High Risk"
      ? "text-red-600"
      : riskLevel === "Moderate Risk"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-8 py-4">
          <h1 className="text-2xl font-bold text-emerald-600">
            Heart Disease Risk Assessment
          </h1>
        </div>

        <div className="p-8">
          {globalModel?.featureNames && (
            <div className="bg-white p-8 rounded-2xl shadow-md mb-10">
              <h2 className="text-xl font-semibold mb-8 text-gray-800">
                Patient Clinical Information
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {globalModel.featureNames.map((feature) => {
                  const config = fieldConfig[feature];

                  if (!config) return null;

                  return (
                    <div key={feature}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {config.label}
                      </label>

                      {config.type === "select" ? (
                        <select
                          value={formData[feature]}
                          onChange={(e) =>
                            handleChange(feature, e.target.value)
                          }
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="">Select</option>
                          {config.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          value={formData[feature]}
                          onChange={(e) =>
                            handleChange(feature, e.target.value)
                          }
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handlePredict}
                disabled={!isFormValid || loading}
                className={`mt-10 px-8 py-3 rounded-lg text-white font-medium shadow transition ${
                  isFormValid
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Processing..." : "Run Prediction"}
              </button>
            </div>
          )}

          {result && (
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold mb-8 text-gray-800">
                Prediction Outcome
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <ResultCard
                  title="Probability"
                  value={(result.probability * 100).toFixed(2) + "%"}
                />

                <ResultCard
                  title="Prediction"
                  value={result.label === 1 ? "Disease Detected" : "No Disease"}
                />

                <div className="bg-gray-50 p-6 rounded-xl border">
                  <p className="text-gray-500">Risk Category</p>
                  <p className={`text-2xl font-bold mt-2 ${riskColor}`}>
                    {riskLevel}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}

function ResultCard({ title, value }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl border">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-emerald-600 mt-2">
        {value}
      </p>
    </div>
  );
}