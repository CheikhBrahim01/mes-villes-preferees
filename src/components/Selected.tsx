import React from "react";
interface Props {
  items: string;
  selectIndex: number;
  Onselected: (index: number) => void;
  index: number;
}

function Selected({index, items, selectIndex, Onselected }: Props) {
  return (
    <li
            className={
              selectIndex == index
                ? "list-group-item active"
                : "list-group-item"
            }
            
            onClick={() => Onselected(index)}
          >
            {items}
          </li>
  );
}

export default Selected;
