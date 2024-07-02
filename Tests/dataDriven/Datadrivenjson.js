import {Selector, t, ClientFunction} from 'testcafe';
const dataSet = require('./data/dataJsonFile.json')

fixture("Data driven testing with json files")
dataSet.forEach(data => {
  console.log(data)
  test.page("url")
  ("Login test - $expectedMessage", async t => {
    await t
    .typeText(Selector('input#username'), data.username)
    .typeText(Selector('input#password'), data.password)
    .click('button')

    t.expect(Selector('div#flash').innerText, contains data.expectedMessage);
  })
});
