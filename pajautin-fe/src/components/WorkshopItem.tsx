import React from "react";
import { Workshop } from "../types/Workshop";
interface Props {
  item: Workshop;
}
function WorkshopItem({ item }: Props) {
  return (
    <div className="card" style={{ width: "50rem" }}>
      <div className="card-header">{item.name}</div>
      <div className="card-body">{item.description}</div>
    </div>
  );
}

export default WorkshopItem;
