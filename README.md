# Bella's Website

## Connect the careers form

The careers page is in `recruit.html`. It uses Formspree so no email password or personal email address is exposed in the website code.

1. Create a Formspree account and a new form.
2. Set the form's notification/linked email to the address that should receive applications.
3. Copy the form ID from the endpoint Formspree provides (for example, `abcdwxyz` from `https://formspree.io/f/abcdwxyz`).
4. In `recruit.html`, replace `YOUR_FORM_ID` with that ID.
5. In the Formspree Workflow settings, require the `resume` file and allow only PDF, DOC, and DOCX files.
6. Submit one test application after the site is deployed and confirm both the notification email and résumé download work.

Résumé uploads require a Formspree plan that includes file uploads. The page limits the selected file to 10 MB, while the service should also be configured with matching server-side validation.
