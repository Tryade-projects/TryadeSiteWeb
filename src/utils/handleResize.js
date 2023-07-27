/**
 * Handle resize
 *
 * @param   {number}  screenWidth - The screen width
 * @param   {function}  setModalIsOpen - The set modal is open
 * @return  {function}  The handle resize
 */
export function handleResize(screenWidth, setModalIsOpen) {
  const handleResize = () => {
    if (window.innerWidth > screenWidth) {
      setModalIsOpen(false);
    }
  };

  window.addEventListener('resize', handleResize);

  // Clean up the event listener when not needed anymore
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}
