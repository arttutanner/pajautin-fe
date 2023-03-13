import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import WorkshopList from "./components/WorkshopList";
import { Workshop } from "./types/Workshop";

function App() {
  const [count, setCount] = useState(100);

  let wsItems: Workshop[] = [
    {
      id: 1,
      name: "Pysäytetään ilmastonmuutos",
      description: "Ilmastonmuutos loppuu nyt kun muutetaan se takas jne.",
      level: 2,
    },
    {
      id: 2,
      name: "Saavutetaan maailmanrauha",
      description: "Ammutaan kaikki aseet mäsäksi, niin sillä se loppuu.",
      level: 1,
    },
    {
      id: 3,
      name: "Poistetaan köyhyys",
      description: "Annetaan kaikille ihmisille miljaardi euroa.",
      level: 3,
    },
    {
      id: 4,
      name: "Parannetaan sairaudet",
      description:
        "Kehitettään semmottii erikoislääke, joka parantaa kaikki sairaudet.",
      level: 5,
    },
  ];

  return (
    <div className="App">
      <WorkshopList items={wsItems} />
    </div>
  );
}

export default App;
