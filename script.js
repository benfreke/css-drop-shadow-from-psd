jQuery(document).ready(function() {

    // Users input data fields
    var inAngle = jQuery('#in-angle');
    var tmpAngle = 0;
    var realAngle = 0;
    var angleCount = 0;
    var inDistance = jQuery('#in-distance');
    var inSpread = jQuery('#in-spread');
    var inSize = jQuery('#in-size');
    var inHex = jQuery('#in-hex');
    var inOpacity = jQuery('#in-opacity');
    var rounding = jQuery('#rounding'); 
    var output = jQuery('#outputValues');
    
        
    // my default values
    var defaultValues = {
        'hShadow' : 3,
        'vShadow' : 4,
        'blur' : 1,
        'spread' : 2,
        'rgb' : {
            'red' : '00',
            'green': '00',
            'blue': '00',
            'opacity': 1
        }
    };
    var userValues = {};
    var previewBox = jQuery('#preview');
    var boxShadowTemplate = '\n\
-webkit-box-shadow: %hShadow%px %vShadow%px %blur%px %spread%px rgba(%red%,%green%,%blue%,%opacity%); \n\
box-shadow: %hShadow%px %vShadow%px %blur%px %spread%px rgba(%red%,%green%,%blue%,%opacity%);';
    var finalBoxShadow = '';
        
    // Angle = Degrees!
    // Distance = Hypotenuse
    // Spread = Spread
    // Size = Blur
        
    // box-shadow: h-shadow v-shadow blur spread color;
    // color can be either hex or RGBA

    function calculateBoxShadow() 
    {        
        // Reset my values
        resetValues();
        
        // Now update values based on user input
        getValues();
            
        // work out angle variables 
        getAngleValues();            
        
        // Finally update my css
        setShadow();
            
    }
    function resetValues() 
    {
        angleCount = 0;
        userValues = defaultValues;
        realAngle = 0;
        tmpAngle = 0;
    }
    
    /**
     * Get the values from the user
     */
    function getValues()
    {
        // Set the user values 
        tmpAngle = parseFloat(inAngle.val());   
        if (inSpread.val()) {
            userValues.spread = inSpread.val();
        }
        if (inSize.val()) {
            userValues.blur = inSize.val();
        }
        if (inOpacity.val()) {
            userValues.rgb.opacity = inOpacity.val();
        }
        // Colour is tricky
        tmpColour = inHex.val();        
        if (typeof(tmpColour) == 'string') {            
            if (tmpColour.length == 3) {                
                userValues.rgb.red = tmpColour[0] + tmpColour[0];
                userValues.rgb.green = tmpColour[1] + tmpColour[1];
                userValues.rgb.blue = tmpColour[2] + tmpColour[2];
            }
            if (tmpColour.length == 6) {                
                userValues.rgb.red = tmpColour[0] + tmpColour[1];
                userValues.rgb.green = tmpColour[2] + tmpColour[3];
                userValues.rgb.blue = tmpColour[4] + tmpColour[5];
            }
        }
        // Now, set the hex to rgb
        userValues.rgb.red = parseInt(userValues.rgb.red, 16);
        userValues.rgb.green = parseInt(userValues.rgb.green, 16);
        userValues.rgb.blue = parseInt(userValues.rgb.blue, 16);
    }
       
        
    /**
     * I'm given the angle from the PSD. Calculate it for how I want to end up using it
     * At the same time, from this work out which values are required
     * Conceptually, this is easier if I go from 360 to 0 rather than 180 to -180
     * 
     * This assume the hypotenuse is going down and right every time. 
     * Therefore the angle doesn't exactly match what I end up with, and sometimes
     * needs transposing to the opposite angle
     */
    function getAngleValues() 
    {
        // First off, let's handle nonsense values
        // Set the angle to 30 (this equates to 120
        if (isNaN(tmpAngle) || tmpAngle > 180 || tmpAngle < -180 || tmpAngle == 0) {            
            realAngle = 30; 
        } 
        
        // Now that we've got the error checking out of the way, start working this out
        if (realAngle == 0) {
            if (tmpAngle < 0) {
                tmpAngle += 360;
            }
            while (tmpAngle > 90 || tmpAngle < 0) {
                tmpAngle -= 90;
                angleCount++;
            }
            // Easier to conceptualise here than later down
            if (angleCount < 1) {
                realAngle = 90 - tmpAngle;
            } else {
                realAngle = tmpAngle;
            }
        }
        
        // Because I need to conceptualise, I'll pretend the long value is going down right
        vertical = Math.cos((realAngle * (Math.PI/180))) * parseFloat(inDistance.val()); // cos
        horizontal = Math.sin(realAngle * (Math.PI/180)) * parseFloat(inDistance.val()); // sine        
        
        // Round the values
        switch (parseInt(rounding.val())) {
            case 0:
                vertical = Math.round(vertical);
                horizontal = Math.round(horizontal);
                break;
            case 1:
                vertical = Math.ceil(vertical);
                horizontal = Math.ceil(horizontal);
                break;
            case 2:
                vertical = Math.floor(vertical);
                horizontal = Math.floor(horizontal);
                break;
            default:
                // do nothing
                break;
        }
        
        // Now, which ones are positive??
        switch (angleCount) {
            case 0:
                horizontal *= -1;
                break;
            case 1:
                // Nothing, this is default
                break;
            case 2:
                vertical *= -1;
                break;
            case 3:
                vertical *= -1;
                horizontal *= -1;
                break;
        }
        userValues.hShadow = horizontal;
        userValues.vShadow = vertical;
    }      
     
    /**
     * Creates the CSS string needed to generate the drop shadow
     */
    function setShadow()
    {           
        
        finalBoxShadow = boxShadowTemplate;
        for (key in userValues) {            
            if (typeof(userValues[key]) == 'object') {
                for(newkey in userValues[key]) {
                    search = '%' + newkey + '%';                    
                    finalBoxShadow = finalBoxShadow.replace(new RegExp(search, "g"), userValues[key][newkey]);                        
                }
            } else {            
                search = '%' + key + '%';                   
                finalBoxShadow = finalBoxShadow.replace(new RegExp(search, "g"), userValues[key]);                    
            }
        }
        // Now apply it to the box        
        previewBox.attr('style', finalBoxShadow);
        
        // Output it!
        output.html('<pre>' + finalBoxShadow + '</pre>');
    } 
    
    // Finally, go ahead and do it
    var calculator = jQuery('#calculate');
    calculator.click(function() {
        // Check that all the fields are filled in
        // I have covered this (a little), but it would be a good check to make sure they're valid
        // and warn the user
        if (true) {
            calculateBoxShadow();
        }
    });
    
});
