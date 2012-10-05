css-drop-shadow-from-psd
========================

This little script allows you to insert values from a PSD drop-shadow, and output CSS for it.

I got sick of guessing what the right values are so I decided to create some javascript to convert it automatically for me. 

Very much inspired by http://css3generator.com/

Known Bugs
==========
- If all values except the angle are 0, the preview doesn't work
- The trailing semi-colon is missing from the output code

Roadmap
=======

- Add a background and foreground colour option to the preview
- Convert the JS to a jQuery plugin
- Add validation to the form inputs (proper JS, not just HTML5 attributes)
- Use a colour picker for the colour input
- Allow the input of RGB colour values