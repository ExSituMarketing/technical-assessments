import { useState } from "react";

export default function Display() {
  const [displayedInfo, setDisplayedInfo] = useState(new Date());

  return (
    <div>
      <div>{displayedInfo.toLocaleTimeString()}</div>
      <button onClick={() => setDisplayedInfo(new Date())}>Update</button>
    </div>
  );
}