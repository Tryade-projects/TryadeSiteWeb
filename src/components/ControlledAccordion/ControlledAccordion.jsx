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
              <div className='colorContainer'>
                <label className='label'>Couleur d&apos;accentuation</label>
                <input
                  className='input'
                  type='color'
                />
              </div>
              <div className='rulesFormContainer'>
                <div className='ruleFormContainer'>
                  <label className='label'>Règle 1 : Titre de la règle</label>
                  <input
                    className='input'
                    type='text'
                  />
                  <label className='label'>Règle 1 : Contenu de la règle</label>
                  <input
                    className='input'
                    type='text'
                  />
                </div>
                <div className='ruleFormContainer'>
                  <label className='label'>Règle 1 : Titre de la règle</label>
                  <input
                    className='input'
                    type='text'
                  />
                  <label className='label'>Règle 1 : Contenu de la règle</label>
                  <input
                    className='input'
                    type='text'
                  />
                </div>
              </div>
              <button className='button'>Ajouter une règle</button>
            </form>
          </AccordionDetails>
        </Accordion>
      </CacheProvider>
    </StyledEngineProvider>
  );
};

export default ControlledAccordion;
