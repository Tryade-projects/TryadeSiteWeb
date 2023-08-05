import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Use for SASS style is priority over MUI style
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

const ControlledAccordion = ({
  expanded,
  handleChange,

  rulesSectionData,
}) => {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        <Accordion
          expanded={expanded === rulesSectionData.id}
          onChange={handleChange(rulesSectionData.id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'>
            {rulesSectionData.sectionTitle}
            <button className='buttonTrash'>
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
                  />
                </div>
                <div className='columnContainer'>
                  <label className='label'>URL de la section</label>
                  <input
                    className='input'
                    type='text'
                  />
                </div>
              </div>
              <div className='colorContainer columnContainer'>
                <label className='label'>Couleur d&apos;accentuation</label>
                <div className='inputColorContainer'>
                  <input
                    className=' inputColor'
                    type='color'
                  />
                  <span className='colorPreview'>color</span>
                </div>
              </div>
              <div className='rulesFormContainer sectionWrap'>
                <div className='ruleFormContainer columnContainer'>
                  <label className='label'>
                    Règle 1 : Titre de la règle
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
                  />
                  <label className='label'>Règle 1 : Contenu de la règle</label>
                  <textarea className='input textArea' />
                </div>
                <div className='ruleFormContainer columnContainer'>
                  <label className='label'>
                    Règle 1 : Titre de la règle
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
                  />
                  <label className='label'>Règle 1 : Contenu de la règle</label>
                  <textarea className='input textArea' />
                </div>
              </div>
              <button className='addRules'>
                + Ajouter une règle supplémentaire
              </button>
            </form>
          </AccordionDetails>
        </Accordion>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default ControlledAccordion;
