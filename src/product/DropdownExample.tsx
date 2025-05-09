"use client";

import React, { useState } from "react";
import { 
  Dropdown,
  Option,
  Icon,
  Line,
} from "@/once-ui/components";

export function BasicRawDropdown() {
  const [selected, setSelected] = useState("");
  
  return (
    <Dropdown
      selectedOption={selected}
      onSelect={(value) => setSelected(value)}
      padding="4"
      radius="m-4"
    >
      <Option
        label="Option 1"
        value="option1"
        selected={selected === "option1"}
      />
      <Option
        label="Option 2"
        value="option2"
        selected={selected === "option2"}
      />
      <Option
        label="Option 3"
        value="option3"
        selected={selected === "option3"}
      />
    </Dropdown>
  );
}

export function IconsRawDropdown() {
  const [selected, setSelected] = useState("");
  
  return (
    <Dropdown
      selectedOption={selected}
      onSelect={(value) => setSelected(value)}
      padding="8"
      radius="m-8"
    >
      <Option
        label="Edit"
        value="edit"
        hasPrefix={<Icon name="edit" size="xs" />}
        selected={selected === "edit"}
      />
      <Option
        label="Duplicate"
        value="duplicate"
        hasPrefix={<Icon name="copy" size="xs" />}
        selected={selected === "duplicate"}
      />
      <Line marginY="8" />
      <Option
        label="Delete"
        value="delete"
        hasPrefix={<Icon name="delete" size="xs" />}
        danger
        selected={selected === "delete"}
      />
    </Dropdown>
  );
}

export function DescriptionRawDropdown() {
  const [selected, setSelected] = useState("");
  
  return (
    <Dropdown
      selectedOption={selected}
      onSelect={(value) => setSelected(value)}
      padding="8"
      radius="m-8"
    >
      <Option
        label="Apple"
        value="apple"
        description="A fruit that grows on trees"
        selected={selected === "apple"}
      />
      <Option
        label="Banana"
        value="banana"
        description="A curved yellow fruit"
        selected={selected === "banana"}
      />
      <Option
        label="Carrot"
        value="carrot"
        description="An orange root vegetable"
        selected={selected === "carrot"}
      />
    </Dropdown>
  );
}

export function CustomStyledRawDropdown() {
  const [selected, setSelected] = useState("");
  
  return (
    <Dropdown
      selectedOption={selected}
      onSelect={(value) => setSelected(value)}
      radius="m-8"
      border="brand-alpha-medium"
      background="brand-alpha-weak"
      shadow="xl"
      padding="8"
    >
      <Option
        label="Small"
        value="small"
        selected={selected === "small"}
      />
      <Option
        label="Medium"
        value="medium"
        selected={selected === "medium"}
      />
      <Option
        label="Large"
        value="large"
        selected={selected === "large"}
      />
    </Dropdown>
  );
}
