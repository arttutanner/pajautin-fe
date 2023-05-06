import React from "react";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { WorkshopFilter } from "../types/WorkshopFilter";

interface Props {
  setFilters: (filter: WorkshopFilter) => void;
}

let ct: number = 0;
let filters: WorkshopFilter = {
  freetext: "",
  levels: [],
  tags: [],
  types: [],
};
function Filterbar({ setFilters }: Props) {
  let setFilter = (name: string, value: string) => {
    ct++;

    filters.freetext = "freefree" + value + ":" + ct;
    console.log("Tags len" + filters.tags.length);
    filters.tags.push(value + ":" + ct);
    console.log("val:" + value + " ct:" + ct);

    console.log("Filters.freetext:" + filters.freetext);
    setFilters({ ...filters });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Suodattimet</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button variant="primary" onClick={() => setFilter("jotain", "heippa")}>
          Heippa
        </Button>{" "}
        <Button variant="primary" onClick={() => setFilter("jotain", "joopa")}>
          Joopa
        </Button>{" "}
        <Button variant="primary">Joo</Button>{" "}
        <Button variant="primary">Primary</Button>{" "}
        <Button variant="primary">Primary</Button> <Form.Text id="searchText" />
      </Card.Body>
    </Card>
  );
}

export default Filterbar;
