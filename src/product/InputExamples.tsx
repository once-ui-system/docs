"use client";

import React, { useState } from "react";
import { Input, Icon, IconButton, Row } from "@/once-ui/components";

// Search input with managed state and conditional clear button
export function SearchInput() {
  const [searchValue, setSearchValue] = useState<string>("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  
  const handleClear = () => {
    setSearchValue("");
  };
  
  return (
    <Input
      id="search-input"
      placeholder="Search"
      value={searchValue}
      onChange={handleChange}
      hasPrefix={<Icon name="search" size="xs" />}
      hasSuffix={
        searchValue.length > 0 ? (
          <IconButton
            variant="ghost"
            icon="close"
            size="s"
            onClick={handleClear}
            aria-label="Clear search"
            tooltip="Clear"
            tooltipPosition="left"
          />
        ) : null
      }
    />
  );
}

export function ValidationInputExample() {
  const [value, setValue] = useState("");

  const validateEmail = (email: any) => {
    if (!email) return null;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    
    return null;
  };

  return (
    <Input
      id="validation-input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      validate={validateEmail}
      placeholder="Email"
    />
  );
}
