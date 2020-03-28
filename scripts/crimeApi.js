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
          'offenseCountChart',
          parsedData.trimmedDataSet,
          'Offense Count',
          `Recent Trend for ${offenseType} in  ${countByLocation.getLocationType()}`,
          parsedData.max,
          parsedData.min,
          parsedData.labels,
          'line'
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
        if (data.data.length === 0) {
          throw new Error(
            'No data found for offense type: ' +
              offenseType +
              ' at location :' +
              countByLocation.getLocationType()
          );
        }
        let parsedData = parseOffenderPropTypeData(data);
        drawOffenseCountChart(
          'offenderProp',
          parsedData.trimmedDataSet,
          'Offense Count by Offender property :' + offenderProperty,
          `Recent Trend for ${offenseType} by ${offenderProperty} in  ${countByLocation.getLocationType()}`,
          parsedData.max,
          parsedData.min,
          parsedData.labels,
          'bar'
        );
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        noDataFound('offenderProp');
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

function parseOffenderPropTypeData(offernderCrimeObj) {
  const parsedData = {
    trimmedDataSet: [],
    labels: [],
    min: 9999,
    max: 0
  };
  let filteredData = offernderCrimeObj.data.sort(function(a, b) {
    return b.data_year - a.data_year;
  });
  let slicingINdex = 10 * offernderCrimeObj.keys.length - 1;
  filteredData = filteredData
    .slice(
      0,
      filteredData.length <= slicingINdex ? filteredData.length : slicingINdex
    )
    .reverse();
  let offenseCountMap = new Map();

  filteredData.forEach(element => {
    if (typeof offenseCountMap.get(element.key) === 'undefined') {
      offenseCountMap.set(element.key, 0);
    } else {
      //get current count
      let count = offenseCountMap.get(element.key);
      offenseCountMap.set(element.key, count + element.value);
    }
    if (offenseCountMap.get(element.key) <= parsedData.min) {
      parsedData.min = offenseCountMap.get(element.key);
    }
    if (offenseCountMap.get(element.key) >= parsedData.max) {
      parsedData.max = offenseCountMap.get(element.key);
    }
  });
  console.log(offenseCountMap);
  console.log('minL ' + parsedData.min);
  console.log('maxnL ' + parsedData.max);
  parsedData.trimmedDataSet = Array.from(offenseCountMap.values());
  parsedData.labels = Array.from(offenseCountMap.keys());
  return parsedData;
}

function parseOffenseCountDataSet(crimeDataObj) {
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
      return 'United States Of America';
    } else if (this.getCountByRegion) {
      return `the region ${this.regionName}`;
    } else {
      return `the state ${this.statecode}`;
    }
  }
}
