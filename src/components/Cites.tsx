import { useState } from "react";
import Selected from "./Selected";

function Cities() {
  const items = ["NKTT", "NDB", "Brakna", "Atar", "Kiffa"];
  
  const [slectedIndex, setselectedIndex] = useState(-1);

  return (
    <>
      <h3>
        City Selected :{" "}
        {slectedIndex !== -1 ? items[slectedIndex] : "No City Selected"}{" "}
      </h3>
      <ul className="list-group">
        {items.map((item, index) => (
          <Selected
            items={item}
            selectIndex={slectedIndex}
            index={index}
            Onselected={() => setselectedIndex(index)}
          />
        ))}
      </ul>
    </>
  );
}

export default Cities;
