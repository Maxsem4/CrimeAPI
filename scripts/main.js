$(document).ready(function() {
  //define click handler for search buttons
  $('#searchBtn').click(getAndShowData);
  //define click behaviour for clear button
  $('#clearBtn').click(clearGraphsAndHeadings);
  //add select listener for offensetype dropdown
  defineSelectListenersForDropDowns();
  //select default radio button
  manageRadioButtonDisplay();
});

function defineSelectListenersForDropDowns() {
  $('#offType').change(function() {
    hideElement('errorMsg', false);
  });
  $('#regionType').change(function() {
    hideElement('errorMsg', false);
  });
  $('#stateType').change(function() {
    hideElement('errorMsg', false);
  });
}

function manageRadioButtonDisplay() {
  $(":radio[name='locationType'][value='national']").attr('checked', 'checked');
  $(":radio[name='offProp'][value='age']").attr('checked', 'checked');
  $('#stateType')
    .parents('.section')
    .first()
    .addClass('hide');
  //   $('#offType').show();
  $('#regionType')
    .parents('.section')
    .first()
    .addClass('hide');
  radioButton();
}

function radioButton() {
  $('input[name=locationType]:radio').click(function() {
    if ($('input[name=locationType]:checked').val() === 'state') {
      $('#stateType')
        .parents('.section')
        .removeClass('hide');
      hideRegionalDropDown();
    } else if ($('input[name=locationType]:checked').val() === 'regional') {
      hideStatesDropDown();
      $('#regionType')
        .parents('.section')
        .removeClass('hide');
    } else if ($('input[name=locationType]:checked').val() === 'national') {
      hideStatesDropDown();
      hideRegionalDropDown();
    }
  });
}

function hideStatesDropDown() {
  if (
    !$('#stateType')
      .parents('.section')
      .hasClass('hide')
  ) {
    $('#stateType')
      .parents('.section')
      .addClass('hide');
  }
}

function hideRegionalDropDown() {
  if (
    !$('#regionType')
      .parents('.section')
      .hasClass('hide')
  ) {
    $('#regionType')
      .parents('.section')
      .addClass('hide');
  }
}

function clearGraphsAndHeadings() {
  hideElement('offenderPropChartNotFound', true);
  hideElement('offenseCountChartNotFound', true);
  hideElement('offenseCountHeading', false);
  hideElement('offensePropHeading', false);
  if (currentOffenseCountChart !== null) currentOffenseCountChart.destroy();
  if (currentOffenderPropChart !== null) currentOffenderPropChart.destroy();
}

function hideElement(identifier, hideByClass) {
  let selector = hideByClass ? '.' : '#';
  selector = selector + identifier;
  let domElemenet = $(selector);
  if (!domElemenet.hasClass('hide')) {
    domElemenet.addClass('hide');
  }
}

function getAndShowData(event) {
  event.preventDefault();
  //check if offesnetype is selcted
  //get the offense type from the drop-down
  let offenseType = $('#offType :selected').val();
  if (offenseType === 'Select Offense') {
    $('#errorMsg')
      .children('span')
      .text('Please select the offense type');
    $('#errorMsg').removeClass('hide');
    return;
  }
  //get the location data
  let locationType = $("input[name='locationType']:radio:checked").val();
  //get the locationName
  let locationName = getLocationName(locationType);
  if (
    locationType === 'regional' &&
    $('#regionType :selected').val() === 'Select Region'
  ) {
    $('#errorMsg')
      .children('span')
      .text('Please select a region');
    $('#errorMsg').removeClass('hide');
    return;
  }
  if (
    locationType === 'state' &&
    $('#stateType :selected').val() === 'Select State'
  ) {
    $('#errorMsg')
      .children('span')
      .text('Please select a state');
    $('#errorMsg').removeClass('hide');
    return;
  }
  //get the offender property
  let offenderProp = $("input[name='offProp']:radio:checked").val();
  //fire off the query to get data
  crimeApi.getOffenseCountByLocation(
    offenseType,
    getCountByLocationObject(locationType, locationName)
  );
  //fire off another query to get offender prop data
  crimeApi.getOffenderCountByProperty(
    offenderProp,
    offenseType,
    getCountByLocationObject(locationType, locationName)
  );
}

function getLocationName(locationType) {
  let locationName = null;
  switch (locationType) {
    case 'national':
      break;
    case 'regional':
      locationName = $('#regionType :selected').val();
      break;
    case 'state':
      locationName = $('#stateType :selected').val();
      break;
    default:
      break;
  }
  return locationName;
}

function getCountByLocationObject(locationType, locationName) {
  let countByLocation;
  switch (locationType) {
    case 'national':
      countByLocation = new CountByLocation(true, false, null, null);
      break;
    case 'regional':
      countByLocation = new CountByLocation(false, true, locationName, null);
      break;
    case 'state':
      countByLocation = new CountByLocation(false, false, null, locationName);
      break;
    default:
      //default is national
      countByLocation = new CountByLocation(true, false, null, null);
      break;
  }
  return countByLocation;
}
