// Data of questions and welcome block
const blockData = {
  welcome: {
    opening: '',
    details: '',
    image: ''
  }
};

// String names for types
const typeNames = {
  'yes_no': 'Yes/No',
  'multiple_choice': 'Multiple Choice',
  'opinion_scale': 'Opinion Scale',
  'open_answer': 'Open Answer',
  'single': 'Single Select',
  'multiple': 'Multiple Select'
};

let currentlyClickedBlock = 'welcome'; // ID/Keyword of currently selected block

// Upload photo function
function uploadPhoto (file) {
  const formdata = new FormData();
  formdata.append('file', file);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.send(formdata);
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.responseText) {
      if (xhr.status == 500) {
        imageSpan.innerHTML = uploadedText;
        alert("An unknown error occured, please try again later.");
        photoSelectInput.value = ''
        if (!/safari/i.test(navigator.userAgent)){
          photoSelectInput.type = ''
          photoSelectInput.type = 'file'
        }
      } else {
        imageSpan.innerHTML = uploadedText;
        photoSelectInput.value = ''
        if (!/safari/i.test(navigator.userAgent)){
          photoSelectInput.type = ''
          photoSelectInput.type = 'file'
        }
        campaignPhoto.style.display = "block";
        campaignNoPhotoIcon.style.display = "none";
        campaignPhoto.src = xhr.responseText;
        campaign.photo = xhr.responseText;
      }
    };
  };
}

// Add required item sign on an item
function addRequiredItemSign (item) {
  const newSign = document.createElement('span');
  newSign.classList.add('required-input-sign');
  newSign.innerHTML = '*';
  item.appendChild(newSign);
}

// Create a new block with id
function createNewEachBlockWrapper (id) {
  const clickedBlock = document.querySelector('.clicked-each-block');
  if (clickedBlock)
    clickedBlock.classList.remove('clicked-each-block');

  const eachBlockWrapper = document.createElement('div');
  eachBlockWrapper.classList.add('each-block-wrapper');
  eachBlockWrapper.classList.add('clicked-each-block');
  eachBlockWrapper.id = id;

  const eachTypeImage = document.createElement('img');
  eachTypeImage.classList.add('each-type-image');
  eachTypeImage.src = '/res/images/block_icons/' + blockData[id].type + '.png';
  eachBlockWrapper.appendChild(eachTypeImage);

  const eachBlockTextWrapper = document.createElement('div');
  eachBlockTextWrapper.classList.add('each-block-text-wrapper');

  const eachTypeTitle = document.createElement('span');
  eachTypeTitle.classList.add('each-type-title');
  eachTypeTitle.classList.add('custom-block-type-title');
  eachTypeTitle.innerHTML = blockData[id].question;
  eachBlockTextWrapper.appendChild(eachTypeTitle);

  const eachTypeSubtitle = document.createElement('span');
  eachTypeSubtitle.classList.add('each-type-subtitle');
  eachTypeSubtitle.innerHTML = typeNames[blockData[id].type];
  eachBlockTextWrapper.appendChild(eachTypeSubtitle);

  eachBlockWrapper.appendChild(eachBlockTextWrapper);

  document.querySelector('.custom-blocks-wrapper').appendChild(eachBlockWrapper);
}

// Create an input title on the settings-content-wrapper
function createSettingsInputTitle (text, isRequired) {
  const settingsInputTitle = document.createElement('span');
  settingsInputTitle.classList.add('block-settings-input-title');
  settingsInputTitle.innerHTML = text;
  if (isRequired)
    addRequiredItemSign(settingsInputTitle);
  document.querySelector('.block-settings-content-wrapper').appendChild(settingsInputTitle);
}

// Create a text on the settings-content-wrapper
function createSettingsText (text) {
  const span = document.createElement('span');
  span.classList.add('block-settings-text');
  span.innerHTML = text;
  document.querySelector('.block-settings-content-wrapper').appendChild(span);
}

// Create a short input on the settings-content-wrapper
function createSettingsShortInput (value, placeholder, name) {
  const settingsShortInput = document.createElement('input');
  settingsShortInput.classList.add('block-settings-short-input');
  settingsShortInput.type = "text";
  settingsShortInput.value = value;
  settingsShortInput.placeholder = placeholder;
  settingsShortInput.name = name;
  document.querySelector('.block-settings-content-wrapper').appendChild(settingsShortInput);
}

// Create a long input on the settings-content-wrapper
function createSettingsLongInput (value, placeholder, name) {
  const settingsLongInput = document.createElement('textarea');
  settingsLongInput.classList.add('block-settings-long-input');
  settingsLongInput.value = value;
  settingsLongInput.placeholder = placeholder;
  settingsLongInput.name = name;
  document.querySelector('.block-settings-content-wrapper').appendChild(settingsLongInput);
}

// Create an image picker on the settings-content-wrapper
function createSettingsImagePicker (text) {
  const settingsImagePicker = document.createElement('span');
  settingsImagePicker.classList.add('block-settings-text');
  settingsImagePicker.classList.add('add-image-button');
  settingsImagePicker.innerHTML = text;
  document.querySelector('.block-settings-content-wrapper').appendChild(settingsImagePicker);
}

// Create settings choices wrapper on the settings-content-wrapper
function createSettingsChoicesWrapper () {
  const choicesWrapper = document.createElement('div');
  choicesWrapper.classList.add('block-settings-choices-wrapper');
  choicesWrapper.classList.add('drag-and-drop-wrapper');
  document.querySelector('.block-settings-content-wrapper').appendChild(choicesWrapper);
}

// Create a new choice on the settings-choices-wrapper
function createSettingsEachChoice (text) {
  const wrapper = document.querySelector('.block-settings-choices-wrapper');

  if (!wrapper)
    return;

  const eachChoice = document.createElement('div');
  eachChoice.classList.add('block-settings-each-choice');

  const span = document.createElement('span');
  span.innerHTML = text;
  eachChoice.appendChild(span);

  const i = document.createElement('i');
  i.classList.add('far');
  i.classList.add('fa-trash-alt');
  i.classList.add('choice-delete-button');
  eachChoice.appendChild(i);

  wrapper.appendChild(eachChoice);
}

// Create a settings choice input on the settings-content-wrapper
function createSettingsChoiceInput (value, placeholder, name) {
  const choiceInput = document.createElement('input');
  choiceInput.classList.add('block-settings-each-choice-input');
  choiceInput.type = "text"
  choiceInput.value = value;
  choiceInput.placeholder = placeholder;
  choiceInput.name = name;
  document.querySelector('.block-settings-content-wrapper').appendChild(choiceInput);
}

// Create multiple type wrapper and its content on the settings-content-wrapper
function createSettingsMultipleTypeWrapperAndContent (selected) {
  const multipleWrapper = document.createElement('div');
  multipleWrapper.classList.add('block-settings-multiple-type-wrapper');

  const eachTypeSingle = document.createElement('div');
  eachTypeSingle.classList.add('block-settings-multiple-each-type');
  eachTypeSingle.id = 'single';

  if (selected == 'single')
    eachTypeSingle.classList.add('clicked-multiple-type');
  
  const iSingle = document.createElement('i');
  iSingle.classList.add('far');
  iSingle.classList.add('fa-check-circle');
  const spanSingle = document.createElement('span');
  spanSingle.innerHTML = 'Single Select';
  eachTypeSingle.appendChild(iSingle);
  eachTypeSingle.appendChild(spanSingle);
  multipleWrapper.appendChild(eachTypeSingle);

  const eachTypeMultiple = document.createElement('div');
  eachTypeMultiple.classList.add('block-settings-multiple-each-type');
  eachTypeMultiple.id = 'multiple';

  if (selected == 'multiple')
    eachTypeMultiple.classList.add('clicked-multiple-type');
  
  const iMultiple = document.createElement('i');
  iMultiple.classList.add('far');
  iMultiple.classList.add('fa-check-circle');
  const spanMultiple = document.createElement('span');
  spanMultiple.innerHTML = 'Multiple Select';
  eachTypeMultiple.appendChild(iMultiple);
  eachTypeMultiple.appendChild(spanMultiple);
  multipleWrapper.appendChild(eachTypeMultiple);

  document.querySelector('.block-settings-content-wrapper').appendChild(multipleWrapper);
}

// Create one line inputs for opinion scale question on the settings-content-wrapper
function createSettingsOneLineInputs (inputs, type) {
  const inputsWrapper = document.createElement('div');
  inputsWrapper.classList.add('block-settings-one-line-inputs-wrapper');

  inputs.forEach(input => {
    const newInput = document.createElement('input');
    newInput.classList.add('block-settings-one-line-input');
    newInput.type = type;
    newInput.value = input.value;
    newInput.name = input.name;
    newInput.placeholder = input.placeholder;
    inputsWrapper.appendChild(newInput);
  });

  for (let i = 3; i > inputs.length; i--) {
    const emptyInput = document.createElement('div');
    emptyInput.classList.add('block-settings-one-line-input-empty-space');
    inputsWrapper.appendChild(emptyInput);
  }

  document.querySelector('.block-settings-content-wrapper').appendChild(inputsWrapper);
}

// Create new content of the settings-content-wrapper
function createSettingsPageContent (id) {
  currentlyClickedBlock = id;

  const blockSettingsHeaderWrapper = document.querySelector('.block-settings-header-wrapper');
  document.querySelector('.block-settings-content-wrapper').innerHTML = "";

  if (id == 'welcome') {
    blockSettingsHeaderWrapper.childNodes[0].src = "/res/images/block_icons/welcome.png";
    blockSettingsHeaderWrapper.childNodes[1].innerHTML = "Welcome Screen";
    blockSettingsHeaderWrapper.childNodes[2].style.display = 'none';
    blockSettingsHeaderWrapper.childNodes[3].style.display = 'none';
    blockSettingsHeaderWrapper.childNodes[4].style.display = 'none';

    createSettingsInputTitle('Opening Message', true);
    createSettingsShortInput(blockData['welcome'].opening, 'Welcome your testers', 'opening');
    createSettingsInputTitle('Task & Details', true);
    createSettingsLongInput(blockData['welcome'].details, 'This is where you give your testers a task. Guide them on what they need to do before answering the questions.', 'details');
    createSettingsInputTitle('Image', false);
    createSettingsImagePicker('Add an image to explain the task. This is optional.')
  } else if (blockData[id]) {
    blockSettingsHeaderWrapper.childNodes[0].src = "/res/images/block_icons/" + blockData[id].type + ".png";
    blockSettingsHeaderWrapper.childNodes[1].innerHTML = typeNames[blockData[id].type];
    blockSettingsHeaderWrapper.childNodes[2].style.display = 'block';
    blockSettingsHeaderWrapper.childNodes[3].style.display = 'block';
    blockSettingsHeaderWrapper.childNodes[4].style.display = 'block';

    if (blockData[id].required) {
      blockSettingsHeaderWrapper.childNodes[3].classList.add('clicked');
      blockSettingsHeaderWrapper.childNodes[3].style.backgroundColor = 'rgb(46, 197, 206)';
      blockSettingsHeaderWrapper.childNodes[3].childNodes[0].classList.add('general-slider-button-slide-right-animation-class');
      blockSettingsHeaderWrapper.childNodes[3].childNodes[0].classList.remove('general-slider-button-slide-left-animation-class');
    } else {
      blockSettingsHeaderWrapper.childNodes[3].classList.remove('clicked');
      blockSettingsHeaderWrapper.childNodes[3].style.backgroundColor = 'rgb(196, 196, 196)';
      blockSettingsHeaderWrapper.childNodes[3].childNodes[0].classList.remove('general-slider-button-slide-right-animation-class');
      blockSettingsHeaderWrapper.childNodes[3].childNodes[0].classList.add('general-slider-button-slide-left-animation-class');
    }

    createSettingsInputTitle('Question', true);
    createSettingsShortInput(blockData[id].question, 'Type your question here', 'question');
    createSettingsInputTitle('Add Notes', false);
    createSettingsShortInput(blockData[id].details, 'Type your details here. This is optional', 'details');
    createSettingsInputTitle('Image', false);
    createSettingsImagePicker('Add an image to show while asking the question. This is optional.');

    if (blockData[id].type == 'multiple_choice') {
      createSettingsInputTitle('Choices', true);
      createSettingsChoicesWrapper();
      createSettingsChoiceInput(blockData[id].choiceInputValue, 'Choice 1', 'choice');
      blockData[id].choices.forEach(choice => {
        createSettingsEachChoice(choice);
      });
      createSettingsText('Press enter to add a new choice');
      createSettingsInputTitle('Type', true)
      createSettingsMultipleTypeWrapperAndContent(blockData[id].subtype);
    } else if (blockData[id].type == 'opinion_scale') {
      createSettingsInputTitle('Label', false);
      createSettingsOneLineInputs([
        {name: 'labelLeft', value: blockData[id].labels.left, placeholder: 'Left'},
        {name: 'labelMiddle', value: blockData[id].labels.middle, placeholder: 'Middle'},
        {name: 'labelRight', value: blockData[id].labels.right, placeholder: 'Right'}
      ], 'text');
      createSettingsInputTitle('Scale', true);
      createSettingsOneLineInputs([
        {name: 'rangeMin', value: blockData[id].range.min, placeholder: 'Min'},
        {name: 'rangeMax', value: blockData[id].range.max, placeholder: 'Max'}
      ], 'number');
    }
  }
}

// Save reorder of choices which are below settings-choices-wrapper
function getChoices () {
  const wrapper = document.querySelector('.block-settings-choices-wrapper');

  if (!wrapper) return;

  blockData[currentlyClickedBlock].choices = [];

  wrapper.childNodes.forEach(node => {
    blockData[currentlyClickedBlock].choices.push(node.childNodes[0].innerHTML);
  });
}

function createPreviewPageContent () {

}

window.onload = () => {
  dragAndDrop(document); // Lister for drag-and-drop wrappers
  listenSliderButtons(document); // Listern slider buttons

  const addBlockWrapper = document.querySelector('.add-block-wrapper');
  const addBlockButton = document.querySelector('.add-block-button');
  let isAddBlockClicked = false;

  document.addEventListener('click', event => {
    // Open/Close add a new block menu
    if (event.target.classList.contains('add-block-button') || event.target.parentNode.classList.contains('add-block-button') || event.target.parentNode.parentNode.classList.contains('add-block-button')) {
      if (isAddBlockClicked) {
        isAddBlockClicked = false;
        addBlockWrapper.classList.add('close-up-animation-class');
        addBlockWrapper.classList.remove('open-bottom-animation-class');
        setTimeout(() => {
          if (!isAddBlockClicked) {
            addBlockButton.childNodes[0].childNodes[0].classList.remove('fa-times');
            addBlockButton.childNodes[0].childNodes[0].classList.add('fa-plus');
            addBlockButton.childNodes[1].childNodes[0].innerHTML = 'Add a Block';
            addBlockButton.childNodes[1].childNodes[1].innerHTML = 'Rating, question...';
            addBlockWrapper.style.border = '0.4px dashed rgb(46, 197, 206)';
          }
        }, 600);
      } else {
        isAddBlockClicked = true;
        addBlockButton.childNodes[0].childNodes[0].classList.remove('fa-plus');
        addBlockButton.childNodes[0].childNodes[0].classList.add('fa-times');
        addBlockButton.childNodes[1].childNodes[0].innerHTML = 'Choose a block type';
        addBlockButton.childNodes[1].childNodes[1].innerHTML = 'Pick the next type you need';
        addBlockWrapper.style.border = '0.4px solid rgb(196, 196, 196)';
        addBlockWrapper.classList.add('open-bottom-animation-class');
        addBlockWrapper.classList.remove('close-up-animation-class');
        setTimeout(() => {
          addBlockWrapper.scrollIntoView(false);
        }, 600);
      }
    }

    // Add a new block
    if (event.target.classList.contains('each-add-block-wrapper') || event.target.parentNode.classList.contains('each-add-block-wrapper') || event.target.parentNode.parentNode.classList.contains('each-add-block-wrapper')) {
      let type;

      if (event.target.classList.contains('each-add-block-wrapper'))
        type = event.target.id;
      else if (event.target.parentNode.classList.contains('each-add-block-wrapper'))
        type = event.target.parentNode.id;
      else if (event.target.parentNode.parentNode.classList.contains('each-add-block-wrapper'))
        type = event.target.parentNode.parentNode.id;

      const newData = {};
      const id = Math.random().toString(36).substr(2, 12);

      if (type == 'yes_no') {
        newData.type = 'yes_no';
        newData.question = 'New question';
        newData.required = true;
        newData.details = '';
        newData.image = null;
        blockData[id] = newData;
        createNewEachBlockWrapper(id);
        createSettingsPageContent(id);
      } else if (type == 'multiple_choice') {
        newData.type = 'multiple_choice';
        newData.question = 'New question';
        newData.required = true;
        newData.details = '';
        newData.image = null;
        newData.choices = [];
        newData.choiceInputValue = '';
        newData.subtype = 'single';
        blockData[id] = newData;
        createNewEachBlockWrapper(id);
        createSettingsPageContent(id);
      } else if (type == 'opinion_scale') {
        newData.type = 'opinion_scale';
        newData.question = 'New question';
        newData.required = true;
        newData.details = '';
        newData.image = null;
        newData.labels = {
          left: '',
          middle: '',
          right: ''
        };
        newData.range = {
          min: '',
          max: ''
        };
        blockData[id] = newData;
        createNewEachBlockWrapper(id);
        createSettingsPageContent(id);
      } else if (type == 'open_answer') {
        newData.type = 'open_answer';
        newData.question = 'New question';
        newData.required = true;
        newData.details = '';
        newData.image = null;
        blockData[id] = newData;
        createNewEachBlockWrapper(id);
        createSettingsPageContent(id);
      }

      isAddBlockClicked = false;
      addBlockWrapper.classList.add('close-up-animation-class');
      addBlockWrapper.classList.remove('open-bottom-animation-class');
      setTimeout(() => {
        if (!isAddBlockClicked) {
          addBlockButton.childNodes[0].childNodes[0].classList.remove('fa-times');
          addBlockButton.childNodes[0].childNodes[0].classList.add('fa-plus');
          addBlockButton.childNodes[1].childNodes[0].innerHTML = 'Add a Block';
          addBlockButton.childNodes[1].childNodes[1].innerHTML = 'Rating, question...';
          addBlockWrapper.style.border = '0.4px dashed rgb(46, 197, 206)';
        }
      }, 600);
    }

    // Change to the welcome block
    if (event.target.classList.contains('welcome-block-wrapper') || event.target.parentNode.classList.contains('welcome-block-wrapper')) {
      const clickedBlock = document.querySelector('.clicked-each-block');
      if (clickedBlock)
        clickedBlock.classList.remove('clicked-each-block');
      createSettingsPageContent('welcome');
    }

    // Change block
    if (event.target.classList.contains('each-block-wrapper')) {
      const clickedBlock = document.querySelector('.clicked-each-block');
      if (clickedBlock)
        clickedBlock.classList.remove('clicked-each-block');
      event.target.classList.add('clicked-each-block');
      currentlyClickedBlock = event.target.id;
      createSettingsPageContent(event.target.id);
    } else if (event.target.parentNode.classList.contains('each-block-wrapper')) {
      const clickedBlock = document.querySelector('.clicked-each-block');
      if (clickedBlock)
        clickedBlock.classList.remove('clicked-each-block');
      event.target.parentNode.classList.add('clicked-each-block');
      currentlyClickedBlock = event.target.parentNode.id;
      createSettingsPageContent(event.target.parentNode.id);
    } else if (event.target.parentNode.parentNode.classList.contains('each-block-wrapper')) {
      const clickedBlock = document.querySelector('.clicked-each-block');
      if (clickedBlock)
        clickedBlock.classList.remove('clicked-each-block');
      event.target.parentNode.parentNode.classList.add('clicked-each-block');
      currentlyClickedBlock = event.target.parentNode.parentNode.id;
      createSettingsPageContent(event.target.parentNode.parentNode.id);
    }

    // Change required option
    if (event.target.classList.contains('required-slide-button') || event.target.parentNode.classList.contains('required-slide-button'))
      blockData[currentlyClickedBlock].required = !blockData[currentlyClickedBlock].required;

    // Delete block
    if (event.target.classList.contains('settings-delete-button')) {
      const selectedDocument = document.getElementById(currentlyClickedBlock);
      if (selectedDocument.previousElementSibling) {
        selectedDocument.previousElementSibling.classList.add('clicked-each-block');
        currentlyClickedBlock = selectedDocument.previousElementSibling.id;
        createSettingsPageContent(selectedDocument.previousElementSibling.id);
      }
      selectedDocument.remove();
    }

    // Delete Choice
    if (event.target.classList.contains('choice-delete-button')) {
      event.target.parentNode.remove();
      getChoices();
    }

    // Auto-Select default 'New question' text inside the input
    if (event.target.classList.contains('block-settings-short-input') && event.target.value == 'New question') {
      event.target.select();
    }

    // Change multiple choice subtype
    if (event.target.classList.contains('block-settings-multiple-each-type')) {
      document.querySelector('.clicked-multiple-type').classList.remove('clicked-multiple-type');
      event.target.classList.add('clicked-multiple-type');
      blockData[currentlyClickedBlock].subtype = event.target.id;
    } else if (event.target.parentNode.classList.contains('block-settings-multiple-each-type')) {
      document.querySelector('.clicked-multiple-type').classList.remove('clicked-multiple-type');
      event.target.parentNode.classList.add('clicked-multiple-type');
      blockData[currentlyClickedBlock].subtype = event.target.parentNode.id;
    }
  });

  document.addEventListener('input', event => {
    if (event.target.name == 'opening') { // Welcome opening text input
      blockData['welcome'].opening = event.target.value;
    } else if (event.target.name == 'question') { // Question text input
      blockData[currentlyClickedBlock].question = event.target.value;
      document.getElementById(currentlyClickedBlock).childNodes[1].childNodes[0].innerHTML = event.target.value;
    } else if (event.target.name == 'details') { // Question details input
      blockData[currentlyClickedBlock].details = event.target.value;
    } else if (event.target.name == 'choice') { // New choice input
      blockData[currentlyClickedBlock].choiceInputValue = event.target.value;
    } else if (event.target.name == 'labelLeft') { // Left label input
      blockData[currentlyClickedBlock].labels.left = event.target.value;
    } else if (event.target.name == 'labelMiddle') { // Middle label input
      blockData[currentlyClickedBlock].labels.middle = event.target.value;
    } else if (event.target.name == 'labelRight') { // Right label input
      blockData[currentlyClickedBlock].labels.right = event.target.value;
    } else if (event.target.name == 'rangeMin') { // Min range input
      blockData[currentlyClickedBlock].range.min = event.target.value;
    } else if (event.target.name == 'rangeMax') { // Max range input
      blockData[currentlyClickedBlock].range.max = event.target.value;
    }
  });

  document.addEventListener('keydown', event => {
    // Create new choice
    if (event.target.name == 'choice' && event.key == 'Enter' && event.target.value.length) { // New choice input Enter clicked
      createSettingsEachChoice(event.target.value);
      blockData[currentlyClickedBlock].choices.push(event.target.value);
      blockData[currentlyClickedBlock].choiceInputValue = '';
      event.target.value = '';
      event.target.placeholder = 'Choice ' + (document.querySelector('.block-settings-choices-wrapper').childNodes.length + 1);
    }
  });

  document.addEventListener('mouseup', event => {
    // Reorder choices
    if (event.target.classList.contains('block-settings-each-choice'))
      getChoices();
  });
}