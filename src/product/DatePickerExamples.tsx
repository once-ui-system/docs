"use client";

import React, { useState } from "react";
import { DatePicker, Flex } from "@/once-ui/components";

// Basic DatePicker example with managed state
export function BasicDatePickerExample() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };
  
  return (
    <Flex padding="16">
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Flex>
  );
}

// DatePicker with time picker example
export function DateTimePickerExample() {
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date());
  
  const handleDateTimeChange = (newDateTime: Date) => {
    setDateTime(newDateTime);
  };
  
  return (
    <Flex padding="16">
      <DatePicker
        value={dateTime}
        onChange={handleDateTimeChange}
        timePicker
      />
    </Flex>
  );
}

// DatePicker with range selection
export function DateRangePickerExample() {
  const [rangeStart, setRangeStart] = useState<Date | undefined>(new Date());
  const [rangeEnd, setRangeEnd] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  
  const handleHover = (date: Date | null) => {
    setHoverDate(date);
  };
  
  return (
    <Flex padding="16">
      <DatePicker
        range={{
          startDate: rangeStart,
          endDate: rangeEnd
        }}
        onHover={handleHover}
      />
    </Flex>
  );
}

// Component that combines all examples
export function DatePickerExamples() {
  return (
    <Flex direction="column" gap="32">
      <BasicDatePickerExample />
      <DateTimePickerExample />
      <DateRangePickerExample />
    </Flex>
  );
}
