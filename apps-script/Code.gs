const GOOGLE_FORM_ID = "1FAIpQLSfxGdUKMT6MYTHRmCaZV7t5FShoq8nzmlgthqkeOiPjK4QJqQ";

function doGet() {
  return HtmlService.createHtmlOutput("Contact form relay is active. Please send messages through the portfolio contact form.");
}

function doPost(e) {
  try {
    const values = e && e.parameter ? e.parameter : {};
    const requiredFields = ["name", "email", "subject", "phone", "message"];

    if (requiredFields.some((field) => !String(values[field] || "").trim())) {
      return respond_(false, "Please complete every field and try again.");
    }

    const form = FormApp.openById(GOOGLE_FORM_ID);
    const fields = [
      ["Name", values.name],
      ["Email", values.email],
      ["Subject", values.subject],
      ["Phone number (With Country code)", values.phone],
      ["Your Message", values.message]
    ];
    const response = form.createResponse();

    fields.forEach(([title, value]) => {
      const item = form.getItems().find((candidate) => candidate.getTitle().trim() === title);
      if (!item) throw new Error('Google Form is missing the question "' + title + '".');
      response.withItemResponse(createItemResponse_(item, String(value).trim()));
    });

    response.submit();
    return respond_(true, "Thanks! Your message has been submitted.");
  } catch (error) {
    console.error(error);
    return respond_(false, "Sorry, your message could not be submitted. Please try again or contact me by email.");
  }
}

function createItemResponse_(item, value) {
  switch (item.getType()) {
    case FormApp.ItemType.TEXT:
      return item.asTextItem().createResponse(value);
    case FormApp.ItemType.PARAGRAPH_TEXT:
      return item.asParagraphTextItem().createResponse(value);
    default:
      throw new Error('The Google Form question "' + item.getTitle() + '" must be a short or paragraph text question.');
  }
}

function respond_(ok, message) {
  const result = JSON.stringify({
    type: "portfolio-form-result",
    ok: ok,
    message: message
  });
  const html = "<!doctype html><html><body><script>window.top.postMessage(" + result + ", '*');</script></body></html>";

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
