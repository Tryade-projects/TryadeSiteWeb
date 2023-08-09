import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Use for SASS style is priority over MUI style
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useDeleteRule } from '../../hooks/useDeleteRule';

const cache = createCache({
  key: 'css',
  prepend: true,
});

/**
 *
 * @param {object} props
 * @param {boolean} props.expanded - The state of the accordion
 * @param {function} props.handleChange - The function to set the state of the accordion
 * @param {object} props.rulesSectionData - The data of the rules section
 * @returns
 */
const ControlledAccordion = ({ expanded, handleChange, rulesSectionData }) => {
  const [data, setData] = useState(rulesSectionData);

  const deleteRule = useDeleteRule();

  const updateArrayItemKey = (array, index, key, value) => {
    return array.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
  };
  const handleRuleValueChange = (index, key, value) => {
    // Copiez l'objet 'data' pour éviter de modifier l'objet d'origine directement
    const newData = { ...data };

    // Copiez le tableau 'rules' pour éviter de modifier le tableau d'origine directement
    const newRules = [...newData.rules];

    // Utilisez la fonction générique pour mettre à jour la clé spécifiée dans la règle avec l'index donné
    const updatedRule = updateArrayItemKey(newRules, index, key, value);

    // Mettez à jour le tableau 'rules' dans la copie de 'data'
    newData.rules = updatedRule;

    // Mettez à jour l'état avec les nouvelles données
    setData(newData);
  };

  useEffect(() => {
    setData(rulesSectionData);
  }, [expanded, rulesSectionData]);
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        <Accordion
          expanded={expanded === rulesSectionData._id}
          onChange={handleChange(rulesSectionData._id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'>
            {rulesSectionData.sectionTitle}
            <button
              className='buttonTrash'
              onClick={deleteRule(rulesSectionData)}>
              <img
                src='/assets/trash.svg'
                alt='supprimer regle'
                className='trashIcon'
              />
            </button>
          </AccordionSummary>
          <AccordionDetails>
            <div className='buttonsContainer'>
              <button>
                <img
                  src='/assets/validation.svg'
                  alt='confirm'
                />
              </button>
              <button>
                <img
                  src='/assets/cancel.svg'
                  alt='cancel'
                />
              </button>
            </div>
            <form className='form'>
              <div className='titleAndURLContainer'>
                <div className='columnContainer'>
                  <label className='label'>Titre de la section</label>
                  <input
                    className='input'
                    type='text'
                    value={data.sectionTitle}
                    onChange={(e) => {
                      setData({
                        ...data,
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
                    value={data.urlBanner}
                    onChange={(e) => {
                      setData({
                        ...data,
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
                    value={data.colorLine}
                    onChange={(e) => {
                      setData({
                        ...data,
                        colorLine: e.target.value,
                      });
                    }}
                  />
                  <span className='colorPreview'>{data.colorLine}</span>
                </div>
              </div>
              <div className='rulesFormContainer sectionWrap'>
                {data.rules.map((rule, i) => (
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
