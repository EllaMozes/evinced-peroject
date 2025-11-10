# evinced-project

## Steps in the project

1. Prepared my environment to start the project:  
   - Installed NPM  
   - Installed Playwright  

2. Created an `.npmrc` file to connect to the JFrog repository.  

3. Created a `.env` file with my Evinced credentials.  

4. Created two tests:  
   - **Simple test:** opens the website and checks for some text  
   - **Complex test:** completes a full “Book a Consultation” flow, filling out contact info, selecting a date, etc.  

5. Added the Evinced SDK to the Playwright tests, which generates an HTML report including screenshots using the `enableScreenshots: true` parameter in the `evStart` / `evAnalyse` functions.  

6. Integrated Evinced to work across all tests at scale by:  
   - Creating a Playwright fixture (`playwright-e2e-tests/fixtures/evinced-fixture.js`)  
   - Updating the test file to remove direct Evinced code and inject the fixture (`playwright-e2e-tests/tests/evinced_test_fixture.spec.js`)  

## Issues I ran into

1. Credentials were undefined at first. I solved this by importing and using the **dotenv** package to load environment variables and configuring Playwright to run `global.setup.js` before any test to handle authentication.  

2. Playwright couldn’t click the “Next” button because `aria-disabled` was `true`. I fixed it by forcing the click using `.click({ force: true });`.

Dprecated files:
- .env
- .npmrc