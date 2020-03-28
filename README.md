# CrimeAPI (Deployed at https://maxsem4.github.io/CrimeAPI)

## The first API this project makes use of is the Crime Data Explorer which uses data from the Crime Data API(https://crime-data-explorer.fr.cloud.gov/api) which is provided by the FBI . We decided to use this api to allow the public to know the trend's in crime rate amount of crimes,and types of crimes that occur. With that information we hope the public would be well informed regarding crime when buying a house, or moving.

## The second API this project makes use of is [Chart.js](https://www.chartjs.org/). This is an open source javascript charting for designers and developers. The charts are responsive which you will be able to see in this project, they are developed for the html 5 canvas and are viewable on all modern browsers. ie 11 or later is needed, and there are 8 different chart types available with this api. Below is a link to all of the contributers of the chart.js api (project) .

[https://github.com/orgs/chartjs/people]

## We decided to use [Bulma](https://bulma.io/) as our css framework. Bulma is also an open source framework that is responsive, based on flexbox and used by 200,000 plus developers. Bulma is a css framework that is a mobile first framework and modular.

## We decided to only use a couple of charts from chart.js and a couple of query url's from the FBI Crime Data Explorer. For future development one thing we would like to do is make use of more of the querl url's to gather more data from the FBI Crime Data Explorer.

## When you first navigate to the website this is the first screen you will see. The drop down menus that are presented to you are required fields that need to be selected. After selecting the state radio button you are presented with two drop down menus titled State and Offence that we have already selected a value from those drop down menus. You are than required to select a radio button in the bottom group (Age, Race, Sex) . After you make your selection you can click on submit and you are presented with two graphs.

![picture](https://maxsem4.github.io/CrimeAPI/readmeImgs/crimeApi2.JPG)

## Below is a picture of the graphs that is displayed if your query returns any results .

# Figure A is an example of when there is data for the query you are running.

![picture](https://maxsem4.github.io/CrimeAPI/readmeImgs/crimeApi3.JPG)

# Figure B is an example of when there is no data for a query you are running.

![picture](https://maxsem4.github.io/CrimeAPI/readmeImgs/crimeApi5.JPG)

## Below are the urls that we query for our data from the FBI Crime Data Explorer

## https://api.usa.gov/crime/fbi/sapi/api/nibrs/${offense}/offense/${Location()}/count?API_KEY=$

## https://api.usa.gov/crime/fbi/sapi/api/police-employment/${location()}/${yearfrom}/${yearto}?API_KEY=$

## https://api.usa.gov/crime/fbi/sapi/api/nibrs/${offenseType}/offender/${Location()}/${offenderProperty}?API_KEY=${

## Below are pictures of how the website will display on a mobile device

![picture](https://maxsem4.github.io/CrimeAPI/readmeImgs/crimeApi6.JPG) ![picture](https://maxsem4.github.io/CrimeAPI/readmeImgs/crimeApi7.JPG)
