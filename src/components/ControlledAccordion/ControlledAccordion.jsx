import React, { useEffect, useState, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Use for SASS style is priority over MUI style
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const cache = createCache({
  key: 'css',
  prepend: true,
});

/**
 *
 * @param {object} props
 * @param {string} props.expanded - The state of the accordion
 * @param {function} props.handleChange - The function to set the state of the accordion
 * @param {object} props.rulesSectionData - The data of the rules section
 * @returns
 */
const ControlledAccordion = ({ expanded, handleChange, rulesSectionData }) => {
  // console.log({ expanded, handleChange, rulesSectionData });
  const [data, setData] = useState(rulesSectionData);
  const [newData, setNewData] = useState(rulesSectionData);
  const [save, setSave] = useState(rulesSectionData.newSection ? false : true);

  const accordionRef = useRef(null);

  const queryClient = useQueryClient();

  const mutationPost = useMutation({
    mutationFn: (newData) => {
      return axios.post('http://localhost:5000/rulesSections', newData);
    },
  });

  const mutationPut = useMutation({
    /**
     * The mutationFn function is used to update the data of a rules section in a React component.
     * @param {object} newData
     * @param {string} newData._id - The id of the rules section
     * @returns  - The axios request
     */
    mutationFn: (newData) => {
      return axios.put(
        `http://localhost:5000/rulesSections/${newData._id}`,
        newData
      );
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:5000/rulesSections/${id}`);
    },
  });
  const updateArrayItemKey = (array, index, key, value) => {
    return array.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
  };
  const handleRuleValueChange = (index, key, value) => {
    // Copiez l'objet 'data' pour éviter de modifier l'objet d'origine directement
    const newDataCopy = { ...newData };

    // Copiez le tableau 'rules' pour éviter de modifier le tableau d'origine directement
    const newRules = [...newDataCopy.rules];

    // Utilisez la fonction générique pour mettre à jour la clé spécifiée dans la règle avec l'index donné
    const updatedRule = updateArrayItemKey(newRules, index, key, value);

    // Mettez à jour le tableau 'rules' dans la copie de 'data'
    newDataCopy.rules = updatedRule;

    // Mettez à jour l'état avec les nouvelles données
    setNewData(newDataCopy);
  };

  useEffect(() => {
    setData(rulesSectionData);
    setNewData(rulesSectionData);
  }, [rulesSectionData]);

  useEffect(() => {
    if (data !== newData || rulesSectionData.newSection) {
      setSave(false);
    }
  }, [data, newData, rulesSectionData.newSection]);

  const handleButtonClick = (goTo) => {
    if (goTo.current) {
      const goToRect = goTo.current.getBoundingClientRect();
      const offset = goToRect.top + window.scrollY - 123;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (expanded === rulesSectionData._id) {
      handleButtonClick(accordionRef);
    }
  }, [expanded, rulesSectionData]);
  // console.log(rulesSectionData.newSection, save);

  function formatDataForPost() {
    // eslint-disable-next-line no-unused-vars
    const { newSection, _id, ...rest } = newData;
    const restWithout_Id = rest.rules.map((rule) => {
      // eslint-disable-next-line no-unused-vars
      const { _id, ...rest } = rule;
      return rest;
    });
    return { ...rest, rules: restWithout_Id };
  }

  useEffect(() => {
    if (
      mutationPost.isSuccess ||
      mutationPut.isSuccess ||
      mutationDelete.isSuccess
    ) {
      setTimeout(() => {
        mutationDelete.reset();
        mutationPost.reset();
        mutationPut.reset();
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationDelete.isSuccess, mutationPost.isSuccess, mutationPut.isSuccess]);

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        {mutationDelete.isLoading && <div>Suppression en cours...</div>}

        {mutationDelete.isError && (
          <div>Une erreur est survenue lors de la suppression</div>
        )}

        {mutationDelete.isSuccess && (
          <div>La suppression a été effectuée avec succès</div>
        )}

        {mutationPost.isLoading && <div>Enregistrement en cours...</div>}

        {mutationPost.isError && (
          <div>Une erreur est survenue lors de l&apos;enregistrement</div>
        )}

        {mutationPost.isSuccess && (
          <div>L&apos;enregistrement a été effectué avec succès</div>
        )}

        {mutationPut.isLoading && <div>Mise à jour en cours...</div>}

        {mutationPut.isError && (
          <div>Une erreur est survenue lors de la mise à jour</div>
        )}

        {mutationPut.isSuccess && (
          <div>La mise à jour a été effectuée avec succès</div>
        )}

        <Accordion
          expanded={expanded === rulesSectionData._id}
          onChange={handleChange(rulesSectionData._id)}
          ref={expanded ? accordionRef : null}
          className={!save ? 'notSave' : ''}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'>
            {rulesSectionData.sectionTitle}
            <button
              className='buttonTrash'
              onClick={(e) => {
                e.stopPropagation();

                if (
                  window.confirm(
                    'Êtes-vous sûr de vouloir supprimer cette section ?'
                  )
                ) {
                  if (!rulesSectionData.newSection) {
                    mutationDelete.mutate(rulesSectionData._id);
                  }
                  queryClient.setQueriesData(['rulesSections'], (oldData) => {
                    return oldData.filter(
                      (section) => section._id !== rulesSectionData._id
                    );
                  });
                }
              }}>
              <img
                src='/assets/trash.svg'
                alt='supprimer regle'
                className='trashIcon'
              />
            </button>
          </AccordionSummary>

          <AccordionDetails>
            <form className='form'>
              <div className='buttonsContainer'>
                <button
                  type='submit'
                  className='saveButton'
                  onClick={(e) => {
                    e.preventDefault();
                    if (rulesSectionData.newSection) {
                      mutationPost.mutate(formatDataForPost());
                    } else {
                      mutationPut.mutate(newData);
                    }
                    setSave(true);
                  }}
                  disabled={
                    save
                      ? true
                      : false || mutationPost.isLoading || mutationPut.isLoading
                  }>
                  <img
                    src={
                      save
                        ? '/assets/validation.svg'
                        : '/assets/validationGreen.svg'
                    }
                    alt='confirm'
                  />
                </button>
                <button
                  type='button'
                  className='cancelButton'
                  onClick={() => {
                    setNewData(data);
                    handleChange(
                      expanded === rulesSectionData._id
                        ? ''
                        : rulesSectionData._id
                    )(null, !expanded);
                  }}>
                  <img
                    src={save ? '/assets/cancel.svg' : '/assets/cancelRed.svg'}
                    alt='cancel'
                  />
                </button>
              </div>
              <div className='titleAndURLContainer'>
                <div className='columnContainer'>
                  <label className='label'>Titre de la section</label>
                  <input
                    className='input'
                    type='text'
                    value={newData.sectionTitle}
                    onChange={(e) => {
                      setNewData({
                        ...newData,
                        sectionTitle: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='columnContainer'>
                  <label className='label'>URL de la section</label>
                  <input
                    className='input'
                    type='text'
                    value={newData.urlBanner}
                    onChange={(e) => {
                      setNewData({
                        ...newData,
                        urlBanner: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className='colorContainer columnContainer'>
                <label className='label'>Couleur d&apos;accentuation</label>
                <div className='inputColorContainer'>
                  <input
                    className=' inputColor'
                    type='color'
                    value={newData.colorLine}
                    onChange={(e) => {
                      setNewData({
                        ...newData,
                        colorLine: e.target.value,
                      });
                    }}
                  />
                  <span className='colorPreview'>{data.colorLine}</span>
                </div>
              </div>
              <div className='rulesFormContainer sectionWrap'>
                {newData.rules.map((rule, i) => (
                  <div
                    className='ruleFormContainer columnContainer'
                    key={rule._id}>
                    <label className='label'>
                      Règle {i + 1} : Titre de la règle
                      <button>
                        <img
                          src='/assets/trash.svg'
                          alt='supprimer regle'
                          className='trashIcon'
                        />
                      </button>
                    </label>
                    <input
                      className='input'
                      type='text'
                      value={rule.title}
                      onChange={(e) =>
                        handleRuleValueChange(i, 'title', e.target.value)
                      }
                    />
                    <label className='label'>
                      Règle {i + 1} : Contenu de la règle
                    </label>
                    <textarea
                      className='input textArea'
                      value={rule.text}
                      onChange={(e) =>
                        handleRuleValueChange(i, 'text', e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </form>
            <button className='addRules'>
              + Ajouter une règle supplémentaire
            </button>
          </AccordionDetails>
        </Accordion>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default ControlledAccordion;
