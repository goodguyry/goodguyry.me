export default function domContentLoaded(run) {
  // in case the document is already rendered
  if ('loading' !== document.readyState) {
    run();
  } else {
    document.addEventListener('DOMContentLoaded', run);
  }
}
