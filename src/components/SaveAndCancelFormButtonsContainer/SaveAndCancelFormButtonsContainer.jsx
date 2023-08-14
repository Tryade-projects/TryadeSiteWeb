import React from 'react';

/**
 * The SaveAndCancelFormButtonsContainer component is used to display the save and cancel buttons in a React component.
 * @param {object} props
 * @param {object} props.data - The data of the section
 * @param {object} props.newData - The new data of the section
 * @param {Function} props.setNewData - The function to set the new data of the section
 * @param {object} props.mutationPostSection - The mutation to post a section
 * @param {object} props.mutationPutSection - The mutation to put a section
 * @param {object} props.deleteNewSection - The function to delete the new section
 * @param {boolean} props.save - The state of the save button
 * @param {string} props.expanded - The state of the accordion
 * @param {Function} props.handleChange - The function to set the state of the accordion
 * @returns {JSX.Element} - The save and cancel buttons
 */
const SaveAndCancelFormButtonsContainer = ({
  data,
  newData,
  setNewData,
  mutationPostSection,
  mutationPutSection,
  deleteNewSection,
  save,
  expanded,
  handleChange,
}) => {
  return (
    <div className='saveAndCancelFormButtonsContainer'>
      <button
        type='submit'
        className='saveButton'
        onClick={(e) => {
          e.preventDefault();
          if (newData.newSection) {
            mutationPostSection.mutate(deleteNewSection());
          } else {
            mutationPutSection.mutate(newData);
          }
        }}
        disabled={
          save
            ? true
            : false ||
              mutationPostSection.isLoading ||
              mutationPutSection.isLoading
        }>
        <img
          src={save ? '/assets/validation.svg' : '/assets/validationGreen.svg'}
          alt='confirm'
        />
      </button>
      <button
        type='button'
        className='cancelButton'
        onClick={() => {
          setNewData(data);
          handleChange(expanded === data.id ? '' : data.id)(null, !expanded);
        }}>
        <img
          src={save ? '/assets/cancel.svg' : '/assets/cancelRed.svg'}
          alt='cancel'
        />
      </button>
    </div>
  );
};

export default SaveAndCancelFormButtonsContainer;
