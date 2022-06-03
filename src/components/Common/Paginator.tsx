// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import module from '../Users/users.module.css';



type Props={
  paginationData:number
  handelClickPag:(pageNumber:number)=>void
  portionSize:number
}
const Paginator:React.FC<Props> = ({ paginationData, handelClickPag, portionSize = 10 }) => {
  let pagesCount = Math.ceil(paginationData.totalUsersCount / paginationData.pageSize);
  let pages:Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let portionCount = Math.ceil(pagesCount / portionSize);
  const currentPortion = Math.ceil(paginationData.currentPage / portionSize);

  const [portionNumber, setPortionNumber] = useState(currentPortion || 1);
  //формула нахождение первого элемента порции
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  //формула нахождение последнего элемента порции
  let rightPortionPageNumber = portionNumber * portionSize;
  const pageStyle = {
    border: '1px solid black',
    padding: '2px',
    margin:'2px'
  };
  return (
    <div>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
      )}

      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return (
            <span
              key={p}
              className={paginationData.currentPage === p ? module.selectedPage : null}
              onClick={() => handelClickPag(p)}
              style={pageStyle}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};
export default Paginator;
