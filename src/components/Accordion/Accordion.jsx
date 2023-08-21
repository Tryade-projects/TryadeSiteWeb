import React, { useState, useEffect, useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import SaveAndCancelFormButtonsContainer from '../SaveAndCancelFormButtonsContainer/SaveAndCancelFormButtonsContainer.jsx';

const Accordion = ({
  index,
  dataElm,
  expanded,
  setExpanded,
  category,
  moveAccordion,
}) => {
  console.log({ expanded });
  const [data, setData] = useState(dataElm);
  const [newData, setNewData] = useState(dataElm);
  const [save, setSave] = useState(dataElm.newSection ? false : true);

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.ACCORDION,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveAccordion(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const id = dataElm.id;
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ACCORDION,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const queryClient = useQueryClient();

  /**
   *
   * @param {number} category - The active category of the panel (1: rules, 2: updates, 3: streamers)
   * @param {string} operation - The operation to perform
   * @returns {object} - The configuration object for the mutation
   */
  const getMutationConfig = (category, operation) => {
    const baseUrl = 'https://tryade-site-web-server.vercel.app/';
    let url;
    let entityName;

    if (category === 1) {
      url = 'rulesSections';
      entityName = 'rules sections';
    } else if (category === 2) {
      url = 'updatesSections';
      entityName = 'updates section';
    } else if (category === 3) {
      url = 'streamersSections';
      entityName = 'streamers section';
    }

    let config = {};
    switch (operation) {
      case 'post':
        config = {
          entityName,
          mutationFn: (newData) => axios.post(`${baseUrl}${url}`, newData),
          onError: (error) =>
            console.error(`Error creating ${entityName}:`, error),
        };
        break;
      case 'put':
        config = {
          entityName,
          mutationFn: (newData) =>
            axios.put(`${baseUrl}${url}/${newData.id}`, newData),
          onError: (error) =>
            console.error(`Error updating ${entityName}:`, error),
        };
        break;
      case 'delete':
        config = {
          entityName,
          mutationFn: (id) => axios.delete(`${baseUrl}${url}/${id}`),
          onError: (error) =>
            console.error(`Error deleting ${entityName}:`, error),
        };
        break;
      default:
        break;
    }

    return config;
  };

  const mutationPostConfig = getMutationConfig(category, 'post');
  const mutationPutConfig = getMutationConfig(category, 'put');
  const mutationDeleteConfig = getMutationConfig(category, 'delete');

  const mutationPostSection = useMutation(mutationPostConfig);
  const mutationPutSection = useMutation(mutationPutConfig);
  const mutationDeleteSection = useMutation(mutationDeleteConfig);

  useEffect(() => {
    const handleMutationSuccess = (mutation) => {
      if (mutation.isSuccess) {
        setData(newData);
        setSave(true);
        queryClient.invalidateQueries([
          `${
            category === 1 ? 'rules' : category === 2 ? 'updates' : 'streamers'
          }Sections`,
        ]);

        setTimeout(() => {
          mutation.reset();
        }, 3000);
      }
    };

    handleMutationSuccess(mutationPostSection);
    handleMutationSuccess(mutationPutSection);
    handleMutationSuccess(mutationDeleteSection);
  }, [
    mutationPostSection.isSuccess,
    mutationPutSection.isSuccess,
    mutationDeleteSection.isSuccess,
  ]);

  function deleteNewSection() {
    // eslint-disable-next-line no-unused-vars
    const { newSection, ...rest } = newData;
    return rest;
  }

  const handleRuleValueChange = (index, key, value, category) => {
    // Copiez l'objet 'data' pour éviter de modifier l'objet d'origine directement
    const newDataCopy = { ...newData };
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

  const updateArrayItemKey = (array, index, key, value) => {
    return array.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
  };
  console.log(dataElm.id);
  useEffect(() => {
    setData(dataElm);
    setNewData(dataElm);
  }, [dataElm]);

  useEffect(() => {
    if (data !== newData || newData.newSection) {
      setSave(false);
    } else {
      setSave(true);
    }
  }, [data, newData, newData.newSection]);

  function renderClassAccordionContent() {
    if (save && category === 3) {
      return 'accordionContent accordionContentSmall';
    } else if (save && category !== 3) {
      return 'accordionContent';
    } else if (!save && category === 3) {
      return 'accordionContent notSave accordionContentSmall';
    } else if (!save && category !== 3) {
      return 'accordionContent notSave';
    }
  }

  return (
    <>
      {mutationDeleteSection.isLoading && <div>Suppression en cours...</div>}

      {mutationDeleteSection.isError && (
        <div>Une erreur est survenue lors de la suppression</div>
      )}

      {mutationDeleteSection.isSuccess && (
        <div>La suppression a été effectuée avec succès</div>
      )}

      {mutationPostSection.isLoading && <div>Enregistrement en cours...</div>}

      {mutationPostSection.isError && (
        <div>Une erreur est survenue lors de l&apos;enregistrement</div>
      )}

      {mutationPostSection.isSuccess && (
        <div>L&apos;enregistrement a été effectué avec succès</div>
      )}

      {mutationPutSection.isLoading && <div>Mise à jour en cours...</div>}

      {mutationPutSection.isError && (
        <div>Une erreur est survenue lors de la mise à jour</div>
      )}

      {mutationPutSection.isSuccess && (
        <div>La mise à jour a été effectuée avec succès</div>
      )}
      <div
        className='accordion'
        ref={ref}
        style={{ opacity }}
        data-handler-id={handlerId}>
        {expanded !== dataElm.id ? (
          <div className='accordionSummary'>
            <h3>{dataElm.sectionTitle || dataElm.name}</h3>
            <div className='accordionSummaryButtonsContainer'>
              <button
                className='buttonTrash'
                onClick={(e) => {
                  e.stopPropagation();

                  if (
                    window.confirm(
                      'Êtes-vous sûr de vouloir supprimer cette section ?'
                    )
                  ) {
                    const deleteMutation = mutationDeleteSection;
                    deleteMutation.mutate(dataElm.id);
                  }
                }}>
                <img
                  src='/assets/trash.svg'
                  alt='supprimer regle'
                  className='trashIcon'
                />
              </button>
              <button
                className='accordionSummaryButton'
                onClick={() =>
                  setExpanded(expanded === dataElm.id ? '' : dataElm.id)
                }>
                <img
                  src='/assets/crossBottom.svg'
                  alt='crossBottom'
                  width={25}
                  height={14}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className={renderClassAccordionContent()}>
            {category === 1 && (
              <>
                <form className='form'>
                  <SaveAndCancelFormButtonsContainer
                    data={data}
                    newData={newData}
                    setNewData={setNewData}
                    mutationPostSection={mutationPostSection}
                    mutationPutSection={mutationPutSection}
                    deleteNewSection={deleteNewSection}
                    save={save}
                    expanded={expanded}
                    setExpanded={setExpanded}
                  />
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
                  <SaveAndCancelFormButtonsContainer
                    data={data}
                    newData={newData}
                    setNewData={setNewData}
                    mutationPostSection={mutationPostSection}
                    mutationPutSection={mutationPutSection}
                    deleteNewSection={deleteNewSection}
                    save={save}
                    expanded={expanded}
                  />

                  <div className='titleAndURLContainer'>
                    <div className='titleAndVersionContainer'>
                      <div className='columnContainer title'>
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
                  <div className='updatesFormContainer sectionWrap'>
                    {newData.details.map((detail, i) => (
                      <div
                        className='columnContainer'
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

            {category === 3 && (
              <>
                <form className='form'>
                  <SaveAndCancelFormButtonsContainer
                    data={data}
                    newData={newData}
                    setNewData={setNewData}
                    mutationPostSection={mutationPostSection}
                    mutationPutSection={mutationPutSection}
                    deleteNewSection={deleteNewSection}
                    save={save}
                    expanded={expanded}
                  />
                  <div className='columnContainer'>
                    <label className='label'>Nom du streamer</label>
                    <input
                      className='input'
                      type='text'
                      value={newData.name}
                      onChange={(e) => {
                        setNewData({
                          ...newData,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className='columnContainer'>
                    <label className='label'>Lien de la chaine</label>
                    <input
                      className='input'
                      type='text'
                      value={newData.channelLink}
                      onChange={(e) => {
                        setNewData({
                          ...newData,
                          channelLink: e.target.value,
                        });
                      }}
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Accordion;
