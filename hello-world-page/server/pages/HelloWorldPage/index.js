// listen for Shoutem initialization complete
document.addEventListener('shoutemready', onShoutemReady, false);

// handler for Shoutem initialization finished
function onShoutemReady(event) {
  // config object containing builder extension configuration, can be accessed via event
  // or by shoutem.sandbox.config
  const config = event.detail.config;

  // Waiting for DOM to be ready to initialize shoutem.api and call page start function
  $(document).ready(function() {
    shoutem.api.init(config.context);
    onPageReady(config);
  });
};

function onPageReady(config) {
  function errorHandler(err) {
    console.log('Something went wrong:', err);
  }

  function handleSubmit(e) {
    // prevent default action and bubbling
    e.preventDefault();
    e.stopPropagation();

    const greeting = $('#greetingName').val();

    // updates current shortcut settings by patching with current settings
    shoutem.api.shortcuts.updateSettings({ greeting })
      .catch(errorHandler);

    return false;
  }

  function initForm(settings) {
    if(!settings) {
      return;
    }

    $('#greetingName').val(settings.greeting);
  }

  $('button[type="submit"]').click(handleSubmit);

  // shoutem.api knows current shortcut and returns promise with fetched settings
  shoutem.api.shortcuts.getSettings()
    .then(initForm, errorHandler);
}