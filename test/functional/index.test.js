import { Selector } from 'testcafe'
import { expect } from 'chai'

const host = process.env.HOST || 'localhost'
const MAIN_PAGE = `http://${host}:3000`

// eslint-disable-next-line no-unused-expressions, no-undef
fixture`Wordseeker`.beforeEach(async t => {
  await t.setNativeDialogHandler(() => true)
  await t.navigateTo(MAIN_PAGE)
})

test('count', async t => {
  const beginWordCount = await Selector('.word').count;

  const Letter_C_In_Word_Count = await Selector('.letter').nth(3).withText('c')

  const letterSize =  await Letter_C_In_Word_Count.clientWidth

  await t.drag(Letter_C_In_Word_Count, letterSize * (5-1), 0, { speed: 0.1 })

  const endWordCount = await Selector('.word').count;

  expect(endWordCount - beginWordCount).to.equal(1)
})


test('pop', async t => {
  const beginWordCount = await Selector('.word').count;

  const Letter_P_In_Word_Count = await Selector('.letter').nth(45).withText('p')

  const letterSize =  await Letter_P_In_Word_Count.clientWidth

  await t.drag(Letter_P_In_Word_Count, letterSize * (3-1), 0, { speed: 0.1 })

  const endWordCount = await Selector('.word').count;

  expect(endWordCount - beginWordCount).to.equal(1)
})
