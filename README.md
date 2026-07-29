# Bella's Website

## Connect the careers form to Basin

The careers page is in `recruit.html`. It uses Basin so no email password or personal email address is exposed in the website code.

1. Create a Basin account and a new form.
2. Configure the form's notification email to the address that should receive applications.
3. Copy the form ID from the endpoint Basin provides (for example, `1a2b3c4d5e6f` from `https://usebasin.com/f/1a2b3c4d5e6f`).
4. In `recruit.html`, replace `YOUR_BASIN_FORM_ID` with that ID.
5. Keep file uploads enabled for the Basin form. The website accepts one `resume` file in PDF, DOC, or DOCX format and rejects files larger than 10 MB before submission.
6. Submit one test application after the site is deployed and confirm both the notification email and résumé download work.

Basin stores uploaded files against the account's file-storage allowance. Configure spam protection in the Basin dashboard before launch. If you enable reCAPTCHA, hCaptcha, or Turnstile there, update `data-basin-spam-protection="none"` in `recruit.html` to the matching Basin option.
