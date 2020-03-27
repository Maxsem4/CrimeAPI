('use strict');

const crimeApiUrls = {
  api_key: 'lnCSsYjnRgflhaB0c4Uc78F9LivWRTDMPUP1Bsu1',
  base_url: 'https://api.usa.gov/crime/fbi/sapi/',

  countByOffenseUrl: function(offenseType, countByLocation) {
    let endpoint = `api/nibrs/${offenseType}/offense/${countByLocation.getLocationSpecificEndpoint()}/count?API_KEY=${
      this.api_key
    }`;
    return this.base_url + endpoint;
    //Example https://api.usa.gov/crime/fbi/sapi/api/nibrs/homicide/offense/national/count?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv
    //https://api.usa.gov/crime/fbi/sapi/api/nibrs/burglary/offense/regions/Midwest/count?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv
    //https://api.usa.gov/crime/fbi/sapi/api/nibrs/homicide/offense/states/CO/count?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv
  },

  offenderCountByPropUrl: function(
    offenderProperty,
    offenseType,
    countByLocation
  ) {
    let endpoint = `api/nibrs/${offenseType}/offender/${countByLocation.getLocationSpecificEndpoint()}/${offenderProperty}?API_KEY=${
      this.api_key
    }`;
    return this.base_url + endpoint;
    //Example https://api.usa.gov/crime/fbi/sapi/api/nibrs/robbery/offender/national/age?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv
    //https://api.usa.gov/crime/fbi/sapi/api/nibrs/rape/offender/regions/Midwest/race?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv
    //https://api.usa.gov/crime/fbi/sapi/api/nibrs/homicide/offender/states/AR/age?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv
  },

  getPoliceEmployementUrl: function(countByLocation, since, untill) {
    let endpoint = `api/police-employment/${countByLocation.getLocationSpecificEndpoint()}/${since}/${untill}?API_KEY=${
      this.api_key
    }`;
    return this.base_url + endpoint;
    //Example https://api.usa.gov/crime/fbi/sapi/api/police-employment/national/2017/2017?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv
    //https://api.usa.gov/crime/fbi/sapi/api/police-employment/regions/Midwest/2017/2017?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv
    //https://api.usa.gov/crime/fbi/sapi/api/police-employment/states/AR/2016/2016?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv
  }
};

const crimeApi = {
  getOffenseCountByLocation: function(offenseType, countByLocation) {
    fetch(crimeApiUrls.countByOffenseUrl(offenseType, countByLocation))
      .then(parseResponse)
      .then(function(apiDataObj) {
        console.log(apiDataObj);
        if (apiDataObj.data.length === 0) {
          throw new Error(
            'No data found for offense type: ' +
              offenseType +
              ' at location :' +
              countByLocation.getLocationType()
          );
        }
        let parsedData = parseOffenseCountDataSet(apiDataObj);
        drawOffenseCountChart(
          parsedData.trimmedDataSet,
          'Crime Count',
          'Crimr Count Heading',
          parsedData.max,
          parsedData.min,
          parsedData.labels
        );
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        noDataFound('offenseCountChart');
      });
  },
  getOffenderCountByProperty: function(
    offenderProperty,
    offenseType,
    countByLocation
  ) {
    fetch(
      crimeApiUrls.offenderCountByPropUrl(
        offenderProperty,
        offenseType,
        countByLocation
      )
    )
      .then(parseResponse)
      .then(function(data) {
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // return erroHandler(error);
      });
  },

  getNumberOfPoliceByLocationAndyear: function(countByLocation, since, untill) {
    fetch(crimeApiUrls.getPoliceEmployementUrl(countByLocation, since, untill))
      .then(parseResponse)
      .then(function(data) {
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // return erroHandler(error);
      });
  }
};

const parseResponse = function(response) {
  if (!response.ok) {
    throw new Error(
      'Error Code : ' +
        response.status +
        'Error Message: ' +
        response.statusText
    );
  }
  return response.json();
};

function parseOffenseCountDataSet(crimeDataObj) {
  console.log(crimeDataObj);
  const parsedData = {
    trimmedDataSet: [],
    labels: [],
    min: 9999,
    max: 0
  };
  let filteredData = crimeDataObj.data
    .filter(element => element.key === 'Offense Count')
    .sort(function(a, b) {
      return b.data_year - a.data_year;
    });
  filteredData = filteredData
    .slice(0, filteredData.length <= 9 ? filteredData.length : 9)
    .reverse();

  for (let i = 0; i < filteredData.length; i++) {
    if (i >= 10) break;
    const element = filteredData[i];
    if (element.value <= parsedData.min) {
      parsedData.min = element.value;
    }
    if (element.value >= parsedData.max) {
      parsedData.max = element.value;
    }
    parsedData.trimmedDataSet.push(element.value);
    parsedData.labels.push(element.data_year);
  }

  // .filter(element => element.data_year > 2007)
  // .forEach(function(element, index) {
  //   if (element.value <= parsedData.min) {
  //     parsedData.min = element.value;
  //   }
  //   if (element.value >= parsedData.max) {
  //     parsedData.max = element.value;
  //   }
  //   parsedData.trimmedDataSet.push(element.value);
  //   parsedData.labels.push(element.data_year);
  // });
  return parsedData; //this will be array of objects
}

class CountByLocation {
  /**
   * if @getCountByRegion and @getNationalCount are false then state count url is returned
   * @param {Boolean} getNationalCount
   * @param {Boolean} getCountByRegion
   * @param {String} regionName Possible values described in const regions
   * @param {String} statecode Possible values described in const states
   */
  constructor(getNationalCount, getCountByRegion, regionName, statecode) {
    this.getNationalCount = getNationalCount;
    this.getCountByRegion = getCountByRegion;
    this.regionName = regionName;
    this.statecode = statecode;
  }

  getLocationSpecificEndpoint() {
    if (this.getNationalCount) {
      return 'national';
    } else if (this.getCountByRegion) {
      return `regions/${this.regionName}`;
    } else {
      return `states/${this.statecode}`;
    }
  }

  getLocationType() {
    if (this.getNationalCount) {
      return 'national';
    } else if (this.getCountByRegion) {
      return `region ${this.regionName}`;
    } else {
      return `state ${this.statecode}`;
    }
  }
}
