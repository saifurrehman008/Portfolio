# Connect the portfolio form to Google Forms

The portfolio keeps its custom contact form. This Apps Script endpoint saves each submission directly to the linked Google Form.

1. Sign in to the Google account that owns the form and open [Google Apps Script](https://script.google.com/home).
2. Create a project and replace the starter code in `Code.gs` with the contents of this folder's `Code.gs` file.
3. Select **Deploy → New deployment**, choose **Web app**, set **Execute as** to **Me**, and set access to **Anyone**.
4. Deploy, authorize the requested Forms access, and copy the web app URL ending in `/exec`.
5. Replace `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` near the top of `script.js` with that URL.

The linked published Google Form currently contains Name, Email, Subject, Phone number (With Country code), and Your Message. Its published version does not currently contain a Question Type question, so the script maps the five questions that are present.
