import React from 'react';
import ListTitle from '../ListTitle/ListTitle';

/**
 * List component
 * @param {object} props
 * @param {array=} props.datas - Array of data
 * @param {string} props.colorLine - Color of the line
 * @returns {JSX.Element} - Rendered List component
 */
const List = ({ datas, colorLine }) => {
  console.log({ datas });
  return (
    <div className='list'>
      {datas?.map((data, index) => {
        return (
          <ListTitle
            key={data.id}
            textBackground={data.textBackground || `0${index + 1}`}
            colorLine={colorLine}
            title={data.title}
            text={data.text || data.content}
          />
        );
      })}
    </div>
  );
};

export default List;
