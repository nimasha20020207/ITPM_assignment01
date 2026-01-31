
const { test, expect } = require('@playwright/test');

const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data
const TEST_DATA = {
  positive: [
    {
    id: 'Pos_Fun_0001',
    name:'convert a positive present tense form',
    input: 'mama adha enavaa',
    expected: 'මම අද එනවා'
  },
  {
    id: 'Pos_Fun_0002',
    name:'convert a compound sentence with conjunction',
    input: 'mama oyaata kaemathiyi namuth mata epaavenavaa',
    expected: 'මම ඔයාට කැමතියි නමුත් මට එපාවෙනවා'
  },
  {
    id: 'Pos_Fun_0003',
    name:'convert greeting expression',
    input: 'theruvan Saranayi',
    expected: 'තෙරුවන් සරනයි'
  },
  {
    id:'Pos_Fun_0004',
    name:'convert informal phrase',
    input:'ooka amathaka karapan',
    expected:'ඕක අමතක කරපන්'
  },
  {
    id:'Pos_Fun_0005',
    name:'convert polite request',
    input:'karuNaakaralaa oya potha mata dhenna puLuvandha?',
    expected:'කරුණාකරලා ඔය පොත මට දෙන්න පුළුවන්ද?'
  },
  {
    id:'Pos_Fun_0006',
    name:'convert long paragraph input',
    input:'aeththa vashayenma kiyanavaanam magee thiiraNaya gaena mata kisima pasuthaviimak naehae. mama mee thiiraNaya gaththee godak kalpanaa karalaa. ee gaena vena kaatahari prashnayak thiyenam mata eekata karanna dheyak naee.. mama karannee mata hoDHAyi kiyalaa hithena dhee!',
    expected:'ඇත්ත වශයෙන්ම කියනවානම් මගේ තීරණය ගැන මට කිසිම පසුතවීමක් නැහැ. මම මේ තීරණය ගත්තේ ගොඩක් කල්පනා කරලා. ඒ ගැන වෙන කාටහරි ප්‍රශ්නයක් තියෙනම් මට ඒකට කරන්න දෙයක් නෑ.. මම කරන්නේ මට හොඳයි කියලා හිතෙන දේ!'
  },
  {
    id:'Pos_Fun_0007',
    name:'convert sentence with currency',
    input:'mama kadeeta Rs.950 k Nayayi',
    expected:'මම කඩේට Rs.950 ක් ණයයි'
  },
  {
    id:'Pos_Fun_0008',
    name:'convert a slang heavy sentence',
    input:'eeka niyamayi, supiriyi machan!',
    expected:'ඒක නියමයි, සුපිරියි මචන්!'
  },
  {
    id:'Pos_Fun_0009',
    name:'convert a complex sentence expressing a condition',
    input:'Oyaala adha enavanam mama kaeema hadhanavaa',
    expected:'ඔයාල අද එනවනම් මම කෑම හදනවා'
  },
  {
    id:'Pos_Fun_0010',
    name:'convert imperative command',
    input:'vahaama othanin vaadivenna',
    expected:'වහාම ඔතනින් වාඩිවෙන්න'
  },
  {
    id:'Pos_Fun_0011',
    name:'convert interrogative question',
    input:'adha oyaalata vahinavaadha?',
    expected:'අද ඔයාලට වහිනවාද?'
  },
  {
    id:'Pos_Fun_0012',
    name:'convert negative sentence form',
    input:'mama adha mokuthma paadam karannee naehae',
    expected:'මම අද මොකුත්ම පාඩම් කරන්නේ නැහැ'
  },
  {
    id:'Pos_Fun_0013',
    name:'convert a simple daily sentence',
    input:'mama kadeeta yanavaa',
    expected:'මම කඩේට යනවා'
  },
  {
    id:'Pos_Fun_0014',
    name:'convert multi-line input',
    input:`ohu adha enne naehae.
        oyaata dhukayidha?`,
    expected:`ඔහු අද එන්නෙ නැහැ.
        ඔයාට දුකයිද?`
  },
  {
    id:'Pos_Fun_0015',
    name:'convert sentence with a place name',
    input:'Api kattiya Thailand valata savaariyak yannayi hadhannee',
    expected:'අපි කට්ටිය Thailand වලට සවාරියක් යන්නයි හදන්නේ'
  },
  {
    id:'Pos_Fun_0016',
    name:'convert sentence with a punctuation mark',
    input:'mee oyaa adha maava balanna enavaa needha?',
    expected:'මේ ඔයා අද මාව බලන්න එනවා නේද?'
  },
  {
    id:'Pos_Fun_0017',
    name:'convert mixed singish and English sentence',
    input:'oyaa mata facebook eken request ekak dhaemmadha?',
    expected:'ඔයා මට facebook එකෙන් request එකක් දැම්මද?'
  },
  {
    id:'Pos_Fun_0018',
    name:'convert sentence with repeated words',
    input:'hari hari mama thamayi naraka',
    expected:'හරි හරි මම තමයි නරක'
  },
  {
    id:'Pos_Fun_0019',
    name:'convert an empty input',
    input:'  ',
    expected:'  '
  },
  {
    id:'Pos_Fun_0020',
    name:'convert a sentence that contains abbreviations',
    input:'mata adha magee ID eka geenna amathaka unaa',
    expected:'මට අද මගේ ID එක ගේන්න අමතක උනා'
  },
  {
    id:'Pos_Fun_0021',
    name:'convert a long paragraph with slang-heavy language',
    input:'adoo mama kiyana dhee ahapan. ooka dhaen kalpana karaa kiyalaa uBAta vaedakuth naehae. mata vaedakuth naehae. moodayek novii hitapan. dhaen hoDHA ekaa vagee gihilla kaema tikak kaalaa budhiyaaganin. mata aaye kiyanna thiyanna epaa. magen guti kandath epaa',
    expected:'අඩෝ මම කියන දේ අහපන්. ඕක දැන් කල්පන කරා කියලා උඹට වැඩකුත් නැහැ. මට වැඩකුත් නැහැ. මෝඩයෙක් නොවී හිටපන්. දැන් හොඳ එකා වගේ ගිහිල්ල කැම ටිකක් කාලා බුදියාගනින්. මට ආයෙ කියන්න තියන්න එපා. මගෙන් ගුටි කන්ඩත් එපා'
  },
  {
    id:'Pos_Fun_0022',
    name:'convert a phrase with time component',
    input:'mata adha 9.00 Am panthi patangannavaa',
    expected:'මට අද 9.00 Am පන්ති පටන්ගන්නවා'
  },
  {
    id:'Pos_Fun_0023',
    name:'convert a sentence with multiwords',
    input:'aevith yanna enna',
    expected:'ඇවිත් යන්න එන්න'
  },
  {
    id:'Pos_Fun_0024',
    name:'convert a sentence with commonly used English words',
    input:'mee telephone eka vaeda karannee naehae',
    expected:'මේ telephone එක වැඩ කරන්නේ නැහැ'
  },
    
  ],
  
  negative: [
    {
    id:'Neg_Fun_0001',
    name:'convert sentence containing joined words without spaces',
    input:'apihetahamuvemu',
    expected:'අපි හෙට හමුවෙමු'
  },
  {
    id:'Neg_Fun_0002',
    name:'convert sentences with typographical errors in letters',
    input:'mama obata nayagaethiya',
    expected:'මම ඔබට ණයගැතිය'
  },
  {
    id:'Neg_Fun_0003',
    name:'convert sentences with extra spaces',
    input:'dhaen   oyaata     kohomadha?',
    expected:'දැන් ඔයාට කොහොමද?'
  },
  {
    id:'Neg_Fun_0004',
    name:'handle a sentence with unnecessary symbols',
    input:'api adha ehaa# gedhara midhulee sellam karanna hadhannee',
    expected:'අපි අද එහා ගෙදර මිදුලේ සෙල්ලම් කරන්න හදන්නේ'
  },
  {
    id:'Neg_Fun_0005',
    name:'Handle a phrase with a common word',
    input:'Magee jaathiya sinhala',
    expected:'මගේ ජාතිය සිංහල'
  },
  {
    id:'Neg_Fun_0006',
    name:'Handle a phrase that missing a punctuation',
    input:'adha yanavadha',
    expected:'අද යනවාද?'
  },
  {
    id:'Neg_Fun_0007',
    name:'Handle line break within a sentence',
    input:'ammaa bath ivvaa \n kanavaanam kiyanna',
    expected:`අම්මා බත් ඉව්වා 
              කනවානම් කියන්න`
  },
  {
    id:'Neg_Fun_0008',
    name:'convert a sentence contains letter w',
    input:'wathura wiidhuruwak dhenna',
    expected:'වතුර වීදුරුවක් දෙන්න'
  },
  {
    id:'Neg_Fun_0009',
    name:'convert a negation sentence',
    input:'mama ennee naa',
    expected:'මම එන්නේ නෑ'
  },
  {
    id:'Neg_Fun_0010',
    name:'Handle a complex slang phrase',
    input:'eei machan man kiyana dhee ahalaa ooka poddak meheta dhiyan',
    expected:'ඒයි මචන් මම කියන දේ අහලා ඕක පොඩ්ඩක් මෙහෙට දියන්'
  },
  ],
  
  ui: {
    tcId: 'Neg_UI_0001',
    name: 'sinhala traslation autofills when typing',
    input: 'eyaa sindhu kiyanavaa',
    partialInput: 'eyaa sindhu ki',
    expectedFull: 'එයා සින්දු කියනවා',
  }
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator-', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive:', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.id} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative:', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.id} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      await page.waitForTimeout(1500);
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      await translator.waitForOutput();
      
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});




