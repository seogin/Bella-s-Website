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

applicationForm.addEventListener("submit", (event) => {
  if (applicationForm.action.includes("YOUR_BASIN_FORM_ID")) {
    event.preventDefault();
    event.stopImmediatePropagation();
    formStatus.textContent = "This form still needs its Basin form ID before it can send applications.";
    formStatus.className = "form-status-error";
  }
}, true);

document.addEventListener("basinjsFormSubmitted", (event) => {
  if (event.detail.form !== applicationForm) {
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "SENDING…";
  formStatus.textContent = "";
  formStatus.className = "";
});

document.addEventListener("basinjsFormSuccess", (event) => {
  if (event.detail.form !== applicationForm) {
    return;
  }

  applicationForm.reset();
  formStatus.textContent = "Thank you. Your application has been sent. Returning to the home page…";
  formStatus.className = "form-status-success";
  submitButton.textContent = "SENT";

  window.setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
});

document.addEventListener("basinjsFormError", (event) => {
  if (event.detail.form !== applicationForm) {
    return;
  }

  const basinError = event.detail.error;
  const errorMessage = typeof basinError === "string"
    ? basinError
    : basinError?.message || "We could not send your application.";
  formStatus.textContent = `${errorMessage} Please try again or contact Beliz directly.`;
  formStatus.className = "form-status-error";
  submitButton.disabled = false;
  submitButton.textContent = "SUBMIT APPLICATION";
});
