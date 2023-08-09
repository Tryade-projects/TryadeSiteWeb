import React from 'react';
import ListTitle from '../ListTitle/ListTitle';

/**
 * List component
 * @param {object} props
 * @param {array} props.rules - Text to display in the background
 * @param {string} props.colorLine - Color of the line
 * @returns {JSX.Element} - Rendered List component
 */
const List = ({ rules, colorLine }) => {
  console.log({ rules });
  return (
    <div className='list'>
      {rules.map((rule) => {
        return (
          <ListTitle
            key={rule._id}
            textBackground={rule.textBackground}
            colorLine={colorLine}
            title={rule.title}
            text={rule.text}
          />
        );
      })}
    </div>
  );
};

export default List;
