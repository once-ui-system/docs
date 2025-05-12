"use client";

import React, { useState } from "react";
import { Input, Icon, IconButton, Row, ColorInput, DateInput } from "@/once-ui/components";

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

// Color input example with managed state
export function ColorInputExample() {
  const [colorValue, setColorValue] = useState("#4287f5");
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorValue(e.target.value);
  };
  
  return (
    <ColorInput
      id="color-input-example"
      label="Brand Color"
      value={colorValue}
      onChange={handleColorChange}
    />
  );
}

// Date input example with managed state
export function DateInputExample() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };
  
  return (
    <DateInput
      id="date-input-example"
      label="Select Date"
      value={date}
      onChange={handleDateChange}
    />
  );
}

// Date and time input example
export function DateTimeInputExample() {
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date());
  
  const handleDateTimeChange = (newDateTime: Date) => {
    setDateTime(newDateTime);
  };
  
  return (
    <DateInput
      id="date-time-input-example"
      label="Select Date & Time"
      value={dateTime}
      onChange={handleDateTimeChange}
      timePicker={true}
    />
  );
}
