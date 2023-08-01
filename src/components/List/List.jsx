import React from 'react';
import ListTitle from '../ListTitle/ListTitle';

/**
 * List component
 * @param {object} props
 * @param {array} props.rules - Text to display in the background
 * @returns {JSX.Element} - Rendered List component
 */
const List = ({ rules }) => {
  console.log({ rules });
  return (
    <div className='list'>
      {rules.map((rule) => {
        return (
          <ListTitle
            key={rule.id}
            textBackground={rule.textBackground}
            colorLine={rule.colorLine}
            title={rule.title}
            text={rule.text}
          />
        );
      })}
    </div>
  );
};

export default List;
