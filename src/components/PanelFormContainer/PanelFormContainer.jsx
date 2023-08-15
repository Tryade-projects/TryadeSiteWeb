import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import { useQueryClient, useMutation } from '@tanstack/react-query';
// import ControlledAccordion from '../ControlledAccordion/ControlledAccordion';
import Accordion from '../Accordion/Accordion';
import SaveAndCancelFormButtonsContainer from '../SaveAndCancelFormButtonsContainer/SaveAndCancelFormButtonsContainer';
import axios from 'axios';

/**
 *
 * @param {object} props
 * @param {array} props.dataSections- The data of the sections
 * @param {string} props.expanded - The state of the accordion
 * @param {function} props.setExpanded - The function to set the state of the accordion
 * @param {number} props.category - The category of the panel
 * @returns {JSX.Element}
 */
const PanelFormContainer = ({
  dataSections,
  expanded,
  setExpanded,
  category,
}) => {
  const [accordionsData, setAccordionsData] = useState(dataSections);
  const [newOrder, setNewOrder] = useState(dataSections);
  const [isSave, setIsSave] = useState(true);

  const queryClient = useQueryClient();

  const getMutationPutOrderConfig = (category) => {
    const baseUrl = 'http://localhost:5000/';
    let url;
    if (category === 1) {
      url = `rulesSections`;
    } else if (category === 2) {
      url = `updatesSections`;
    } else {
      url = `streamersSections`;
    }
    return {
      mutationFn: (accordionsData) => {
        return axios.put(`${baseUrl}${url}`, accordionsData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries([url]);
      },
      onError: (error) => {
        console.log(error);
      },
    };
  };

  const mutationPutOrderSectionsConfig = getMutationPutOrderConfig(category);

  const mutationPutOrderSections = useMutation(mutationPutOrderSectionsConfig);

  const moveAccordion = useCallback((dragIndex, hoverIndex) => {
    setNewOrder((prevAccordion) => {
      const updatedAccordion = update(prevAccordion, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevAccordion[dragIndex]],
        ],
      });
      // mutationPutOrderSections.mutate(updatedAccordion);
      return updatedAccordion;
    });
  }, []);

  useEffect(() => {
    setAccordionsData(dataSections);
    setNewOrder(dataSections);
  }, [dataSections]);

  useEffect(() => {
    if (accordionsData !== newOrder) {
      setIsSave(false);
    } else {
      setIsSave(true);
    }
  }, [accordionsData, newOrder]);

  useEffect(() => {
    if (mutationPutOrderSections.isSuccess) {
      setTimeout(() => {
        mutationPutOrderSections.reset();
      }, 3000);
    }
  }, [mutationPutOrderSections]);
  return (
    <div
      className={isSave ? 'panelFormContainer' : 'panelFormContainer notSave'}>
      {!isSave && (
        <SaveAndCancelFormButtonsContainer
          data={accordionsData}
          newData={newOrder}
          setNewData={setNewOrder}
          save={isSave}
          mutationPutOrderSections={mutationPutOrderSections}
        />
      )}
      {mutationPutOrderSections.isLoading && <p>Enregistrement en cours...</p>}

      {mutationPutOrderSections.isSuccess && (
        <div>La mise à jour a été effectuée avec succès</div>
      )}

      {mutationPutOrderSections.isError && (
        <div>Une erreur est survenue lors de la mise à jour</div>
      )}

      {newOrder.map((dataElm, index) => (
        <Accordion
          key={dataElm.id}
          index={index}
          dataElm={dataElm}
          expanded={expanded}
          setExpanded={setExpanded}
          category={category}
          moveAccordion={moveAccordion}
        />
      ))}
    </div>
  );
};

export default PanelFormContainer;
