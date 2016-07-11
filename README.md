# FormValidation.js
FormValidation.js is lightweight code snippets of form validation created with JavaScript. jQuery(https://code.jquery.com/jquery-2.2.4.min.js) is necessary.

How It Works
formValidate.js comes into play when the submit input button has been clicked. Fields are checked for any value - if no input, a flag is created. Next check is for invalid characters. If present, a flag appears and the 'error' class is added to that input.

## Input type validation available:
	text
	e-mail
	number
	checkbox
## HTML Necessary:
	<div id="form-feedback"></div> - this needs to be placed right after the opening of the form, and is where all messages will show.
