import { useEffect, useState } from "react";
import { Device } from "@twilio/voice-sdk";

function App() {
  const [device, setDevice] = useState(null);

  useEffect(() => {
    // Fetch token from backend
    fetch("https://twilio-app-backend.onrender.com/token")
      .then((res) => res.json())
      .then((data) => {
        console.log("Received Token:", data.token);

        // Initialize Twilio Device with the token
        const newDevice = new Device(data.token, { debug: true });

        newDevice.on("ready", () => {
          console.log("Twilio Device is ready to make/receive calls");
        });

        newDevice.on("error", (error) => {
          console.error("Twilio Device Error:", error);
        });

        setDevice(newDevice);
      })
      .catch((err) => console.error(err));
  }, []);

  const makeCall = () => {
    if (device) {
      device.connect({ params: { To: "+13072077080" } });
    } else {
      console.log("Device not ready yet!");
    }
  };

  return (
    <div className="App">
      <h1>Twilio Voice Client</h1>
      <button onClick={makeCall} disabled={!device}>
        Make a Call
      </button>
    </div>
  );
}

export default App;
