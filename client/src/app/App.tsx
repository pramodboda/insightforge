import { useState } from 'react'

import ResponsiveAppBar from "../components/AppBar/AppBar";
import Home from "../pages/Home/Home";

import ColorRule from "../components/ProUI/ColorRule";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ResponsiveAppBar />
      <Home />
      <ul>
        <li>ClimateScope</li>
        <li>WorkforceHub</li>
        <li>FinanceLens</li>
        <li>CommercePulse</li>
        <li>HealthMetrics</li>
        <li>GlobalRisk Monitor</li>
      </ul>

      <ColorRule />

    </>
  )
}

export default App
