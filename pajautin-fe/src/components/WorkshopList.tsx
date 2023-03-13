import React from "react";
import { Workshop } from "../types/Workshop";
import WorkshopItem from "./WorkshopItem";

interface Props {
  items: Workshop[];
}

function WorkshopList({ items }: Props) {
  return (
    <>
      <div>WorkshopList</div>
      {items.map((item) => (
        <WorkshopItem key={item.id} item={item} />
      ))}
    </>
  );
}

export default WorkshopList;
