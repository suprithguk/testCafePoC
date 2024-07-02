import {Selector, t, ClientFunction} from 'testcafe';
import xlsx from 'node-xlsx';

const excelFile = xlsx.parse('./data/testData.xlsx');
const excelSheet = excelFile.find(sheets ==> sheets.name == 'data');
const excelSheetData = excelSheet.data;
const headers = excelSheetData.shift();

const dataSet = excelSheetData.map((row) => {
  const user = {};
  row.forEach((data, idx) => {
    user[headers[idx]] = data;
    return user;
  })
});

fixture("Excel - Data driven demo")
dataSet.forEach((user) => {
  test
  .page("url");
  (`Login page validation - $(data.expectedMessage)`, async t => {
    await t
    .maximizewindow()
    .typeText(Selector('input#username'), data.username)
    .typeText(Selector('input#password'), data.password)
    .click('button');

   await t.expect(Selector('div#flash').innerText).contains(data.expectedMessage);
  });
});
