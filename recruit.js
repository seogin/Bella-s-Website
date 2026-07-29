const applicationForm = document.querySelector("#application-form");
const resumeInput = document.querySelector("#resume");
const submitButton = document.querySelector("#submit-button");
const formStatus = document.querySelector("#form-status");
const maximumResumeSize = 10 * 1024 * 1024;

resumeInput.addEventListener("change", () => {
  const resume = resumeInput.files[0];

  if (resume && resume.size > maximumResumeSize) {
    resumeInput.value = "";
    formStatus.textContent = "Please choose a résumé smaller than 10 MB.";
    formStatus.className = "form-status-error";
  } else {
    formStatus.textContent = "";
    formStatus.className = "";
  }
});

applicationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (applicationForm.action.includes("YOUR_FORM_ID")) {
    formStatus.textContent = "This form still needs its Formspree form ID before it can send applications.";
    formStatus.className = "form-status-error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "SENDING…";
  formStatus.textContent = "";
  formStatus.className = "";

  try {
    const response = await fetch(applicationForm.action, {
      method: "POST",
      body: new FormData(applicationForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      const errorMessage = result.errors?.map((error) => error.message).join(" ");
      throw new Error(errorMessage || "We could not send your application.");
    }

    applicationForm.reset();
    formStatus.textContent = "Thank you. Your application has been sent.";
    formStatus.className = "form-status-success";
  } catch (error) {
    formStatus.textContent = `${error.message} Please try again or contact Beliz directly.`;
    formStatus.className = "form-status-error";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "SUBMIT APPLICATION";
  }
});
