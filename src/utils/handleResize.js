/**
 * Handle resize
 *
 * @param   {number}  screenWidth - The screen width
 * @param   {function}  setModalIsOpen - The set modal is open
 * @param   {function}  setIfMobile - The set if mobile
 * @return  {function}  The handle resize
 */
export function handleResize(screenWidth, setModalIsOpen, setIfMobile) {
  const handleResize = () => {
    if (window.innerWidth > screenWidth) {
      setModalIsOpen(false);
      setIfMobile(false);
    } else {
      setIfMobile(true);
    }
  };

  window.addEventListener('resize', handleResize);

  // Clean up the event listener when not needed anymore
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}
