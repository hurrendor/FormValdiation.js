README.txt

formValidate.js comes into play when the submit input button has been clicked. Fields are checked for any value - if no input, a flag is created. Next check is for invalid characters. If present, a flag appears and the 'error' class is added to that input.

input types:
	text
	e-mail
	number
	checkbox
HTML Necessary:
	div#form-feedback inside the form
	Matching input names
CSS Necessary:
	.error
	#charset, #notFilled, #fillCheck 		(warning message)
	#thanks						(success message)