"use client";

import { useState, useEffect } from "react";

export default function Component() {
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    async function fetchSomething() {
      try {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        const result = await response.json();
        setValue(result.value);
      } catch {
        setValue("Error");
      } finally {
        setStatus(false);
      }
    }

    fetchSomething();
  }, []);

  if (status) {
    return <div>Loading...</div>;
  }

  return <div>{value}</div>;
}