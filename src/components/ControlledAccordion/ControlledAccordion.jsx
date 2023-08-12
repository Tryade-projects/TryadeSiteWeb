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
import { v4 as uuidv4 } from 'uuid';
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
 * @param {object} props.dataSection - The data of the rules section
 * @param {number} props.category - The category of the panel
 * @returns
 */
const ControlledAccordion = ({
  expanded,
  handleChange,
  dataSection,
  category,
}) => {
  // console.log({ expanded, handleChange, dataSection });
  const [data, setData] = useState(dataSection);
  const [newData, setNewData] = useState(dataSection);
  const [save, setSave] = useState(dataSection.newSection ? false : true);

  const accordionRef = useRef(null);

  const queryClient = useQueryClient();

  const mutationPostRulesSection = useMutation({
    mutationFn: (newData) => {
      return axios.post('http://localhost:5000/rulesSections', newData);
    },
  });

  const mutationPostUpdatesSection = useMutation({
    mutationFn: (newData) => {
      return axios.post('http://localhost:5000/updatesSections', newData);
    },
  });

  const mutationPutRulesSection = useMutation({
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

  const mutationPutUpdatesSection = useMutation({
    /**
     * The mutationFn function is used to update the data of a updates section in a React component.
     * @param {object} newData
     * @param {string} newData._id - The id of the updates section
     * @returns  - The axios request
     */
    mutationFn: (newData) => {
      return axios.put(
        `http://localhost:5000/updatesSections/${newData._id}`,
        newData
      );
    },
  });

  const mutationDeleteRulesSection = useMutation({
    mutationFn: (_id) => {
      return axios.delete(`http://localhost:5000/rulesSections/${_id}`);
    },
  });

  const mutationDeleteUpdatesSection = useMutation({
    mutationFn: (_id) => {
      return axios.delete(`http://localhost:5000/updatesSections/${_id}`);
    },
  });

  const updateArrayItemKey = (array, index, key, value) => {
    return array.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
  };
  const handleRuleValueChange = (index, key, value, category) => {
    // Copiez l'objet 'data' pour éviter de modifier l'objet d'origine directement
    const newDataCopy = { ...newData };
    console.log(category);
    console.log({ newData });
    let newDataArray = [];
    if (category === 1) {
      newDataArray = [...newDataCopy.rules];
      // Utilisez la fonction générique pour mettre à jour la clé spécifiée dans la règle avec l'index donné
      const updatedRule = updateArrayItemKey(newDataArray, index, key, value);

      // Mettez à jour le tableau 'rules' dans la copie de 'data'
      newDataCopy.rules = updatedRule;
    }

    if (category === 2) {
      newDataArray = [...newDataCopy.details];
      // Utilisez la fonction générique pour mettre à jour la clé spécifiée dans la règle avec l'index donné
      const updatedRule = updateArrayItemKey(newDataArray, index, key, value);

      // Mettez à jour le tableau 'rules' dans la copie de 'data'
      newDataCopy.details = updatedRule;
    }

    if (category === 3) {
      newDataArray = [...newDataCopy.Streamers];
      // Utilisez la fonction générique pour mettre à jour la clé spécifiée dans la règle avec l'index donné
      const updatedRule = updateArrayItemKey(newDataArray, index, key, value);

      // Mettez à jour le tableau 'rules' dans la copie de 'data'
      newDataCopy.Streamers = updatedRule;
    }

    // Mettez à jour l'état avec les nouvelles données
    setNewData(newDataCopy);
  };

  useEffect(() => {
    setData(dataSection);
    setNewData(dataSection);
  }, [dataSection]);

  useEffect(() => {
    if (data !== newData || dataSection.newSection) {
      setSave(false);
    } else {
      setSave(true);
    }
  }, [data, newData, dataSection.newSection]);

  const handleButtonClick = (goTo) => {
    if (goTo.current) {
      const goToRect = goTo.current.getBoundingClientRect();
      const offset = goToRect.top + window.scrollY - 123;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (expanded === dataSection.id) {
      handleButtonClick(accordionRef);
    }
  }, [expanded, dataSection]);
  // console.log(dataSection.newSection, save);

  function deleteNewSection() {
    // eslint-disable-next-line no-unused-vars
    const { newSection, ...rest } = newData;
    return rest;
  }

  useEffect(() => {
    if (
      mutationPostRulesSection.isSuccess ||
      mutationPutRulesSection.isSuccess ||
      mutationDeleteRulesSection.isSuccess
    ) {
      setData(newData);
      setSave(true);
      queryClient.invalidateQueries(['rulesSections']);

      setTimeout(() => {
        mutationDeleteRulesSection.reset();
        mutationPostRulesSection.reset();
        mutationPutRulesSection.reset();
      }, 5000);
    }

    if (
      mutationPostUpdatesSection.isSuccess ||
      mutationPutUpdatesSection.isSuccess ||
      mutationDeleteUpdatesSection.isSuccess
    ) {
      setData(newData);
      setSave(true);
      queryClient.invalidateQueries(['updatesSections']);

      setTimeout(() => {
        mutationPostUpdatesSection.reset();
        mutationPutUpdatesSection.reset();
        mutationDeleteUpdatesSection.reset();
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mutationDeleteRulesSection.isSuccess,
    mutationPostRulesSection.isSuccess,
    mutationPutRulesSection.isSuccess,
    mutationDeleteUpdatesSection.isSuccess,
    mutationPostUpdatesSection.isSuccess,
    mutationPutUpdatesSection.isSuccess,
  ]);

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        {(mutationDeleteRulesSection.isLoading ||
          mutationDeleteUpdatesSection.isLoading) && (
          <div>Suppression en cours...</div>
        )}

        {(mutationDeleteRulesSection.isError ||
          mutationDeleteUpdatesSection.isError) && (
          <div>Une erreur est survenue lors de la suppression</div>
        )}

        {(mutationDeleteRulesSection.isSuccess ||
          mutationDeleteUpdatesSection.isSuccess) && (
          <div>La suppression a été effectuée avec succès</div>
        )}

        {(mutationPostRulesSection.isLoading ||
          mutationPostUpdatesSection.isLoading) && (
          <div>Enregistrement en cours...</div>
        )}

        {(mutationPostRulesSection.isError ||
          mutationPostUpdatesSection.isError) && (
          <div>Une erreur est survenue lors de l&apos;enregistrement</div>
        )}

        {(mutationPostRulesSection.isSuccess ||
          mutationPostUpdatesSection.isSuccess) && (
          <div>L&apos;enregistrement a été effectué avec succès</div>
        )}

        {(mutationPutRulesSection.isLoading ||
          mutationPutUpdatesSection.isLoading) && (
          <div>Mise à jour en cours...</div>
        )}

        {(mutationPutRulesSection.isError ||
          mutationPutUpdatesSection.isError) && (
          <div>Une erreur est survenue lors de la mise à jour</div>
        )}

        {(mutationPutRulesSection.isSuccess ||
          mutationPutUpdatesSection.isSuccess) && (
          <div>La mise à jour a été effectuée avec succès</div>
        )}

        <Accordion
          expanded={expanded === dataSection.id}
          onChange={handleChange(dataSection.id)}
          ref={expanded ? accordionRef : null}
          className={!save ? 'notSave' : ''}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'>
            {dataSection.sectionTitle}
            <button
              className='buttonTrash'
              onClick={(e) => {
                e.stopPropagation();

                if (
                  window.confirm(
                    'Êtes-vous sûr de vouloir supprimer cette section ?'
                  )
                ) {
                  if (category === 1) {
                    if (!dataSection.newSection) {
                      mutationDeleteRulesSection.mutate(dataSection._id);
                    }
                    queryClient.setQueriesData(['rulesSections'], (oldData) => {
                      return oldData.filter(
                        (section) => section._id !== dataSection._id
                      );
                    });
                  }
                  if (category === 2) {
                    if (!dataSection.newSection) {
                      mutationDeleteUpdatesSection.mutate(dataSection._id);
                    }
                    queryClient.setQueriesData(
                      ['updatesSections'],
                      (oldData) => {
                        return oldData.filter(
                          (section) => section._id !== dataSection._id
                        );
                      }
                    );
                  }
                  if (category === 3) {
                    if (!dataSection.newSection) {
                      mutationDeleteStreamersSections.mutate(dataSection._id);
                    }
                    queryClient.setQueriesData(
                      ['StreamersSections'],
                      (oldData) => {
                        return oldData.filter(
                          (section) => section._id !== dataSection._id
                        );
                      }
                    );
                  }
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
            {category === 1 && (
              <>
                <form className='form'>
                  <div className='buttonsContainer'>
                    <button
                      type='submit'
                      className='saveButton'
                      onClick={(e) => {
                        e.preventDefault();
                        if (newData.newSection) {
                          mutationPostRulesSection.mutate(deleteNewSection());
                        } else {
                          mutationPutRulesSection.mutate(newData);
                        }
                      }}
                      disabled={
                        save
                          ? true
                          : false ||
                            mutationPostRulesSection.isLoading ||
                            mutationPutRulesSection.isLoading
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
                          expanded === dataSection.id ? '' : dataSection.id
                        )(null, !expanded);
                      }}>
                      <img
                        src={
                          save ? '/assets/cancel.svg' : '/assets/cancelRed.svg'
                        }
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
                        key={rule.id}>
                        <label className='label'>
                          Règle {i + 1} : Titre de la règle
                          <button
                            type='button'
                            onClick={(e) => {
                              e.stopPropagation();

                              setNewData({
                                ...newData,
                                rules: newData.rules.filter(
                                  (rule, index) => index !== i
                                ),
                              });
                            }}>
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
                            handleRuleValueChange(
                              i,
                              'title',
                              e.target.value,
                              category
                            )
                          }
                        />
                        <label className='label'>
                          Règle {i + 1} : Contenu de la règle
                        </label>
                        <textarea
                          className='input textArea'
                          value={rule.text}
                          onChange={(e) =>
                            handleRuleValueChange(
                              i,
                              'text',
                              e.target.value,
                              category
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </form>
                <button
                  className='addRules'
                  onClick={() => {
                    setNewData({
                      ...newData,
                      rules: [
                        ...newData.rules,
                        {
                          id: uuidv4(),
                          title: '',
                          text: '',
                          textBackground: '',
                        },
                      ],
                    });
                  }}>
                  + Ajouter une règle supplémentaire
                </button>
              </>
            )}

            {category === 2 && (
              <>
                <form className='form'>
                  <div className='buttonsContainer'>
                    <button
                      type='submit'
                      className='saveButton'
                      onClick={(e) => {
                        e.preventDefault();
                        if (newData.newSection) {
                          mutationPostUpdatesSection.mutate(deleteNewSection());
                        } else {
                          mutationPutUpdatesSection.mutate(newData);
                        }
                      }}
                      disabled={
                        save
                          ? true
                          : false ||
                            mutationPostUpdatesSection.isLoading ||
                            mutationPutUpdatesSection.isLoading
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
                          expanded === dataSection.id ? '' : dataSection.id
                        )(null, !expanded);
                      }}>
                      <img
                        src={
                          save ? '/assets/cancel.svg' : '/assets/cancelRed.svg'
                        }
                        alt='cancel'
                      />
                    </button>
                  </div>
                  <div className='titleAndURLContainer'>
                    <div className='titleAndVersionContainer'>
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
                        <label className='label'>Version</label>
                        <input
                          className='input'
                          type='text'
                          value={newData.version}
                          onChange={(e) => {
                            setNewData({
                              ...newData,
                              version: e.target.value,
                            });
                          }}
                        />
                      </div>
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
                  <div className='rulesFormContainer sectionWrap'>
                    {newData.details.map((detail, i) => (
                      <div
                        className='ruleFormContainer columnContainer'
                        key={detail.id}>
                        <label className='label'>{detail.title}</label>
                        <textarea
                          className='input textArea'
                          value={detail.content}
                          onChange={(e) =>
                            handleRuleValueChange(
                              i,
                              'content',
                              e.target.value,
                              category
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </form>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default ControlledAccordion;
