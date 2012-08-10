jQuery(document).ready(function() {

    // Users input data fields
    var inAngle = jQuery('#in-angle');
    var realAngle = 0;
    var angleCount = 0;
    var inDistance = jQuery('#in-distance');
    var inSpread = jQuery('#in-spread');
    var inSize = jQuery('#in-size');
    var inHex = jQuery('#in-hex');
    var inOpacity = jQuery('#in-opacity');
        
    // my default values
    var defaultValues = {
        'hShadow' : 3,
        'vShadow' : 4,
        'blur' : 1,
        'spread' : 2,
        'rgb' : {
            'red' : 0,
            'green': 0,
            'blue': 0,
            'opacity': 1
        }
    };
    var userValues = {};
    var previewBox = jQuery('#preview');
    var boxShadowTemplate = '\n\
-webkit-box-shadow: %hShadow%px %vShadow%px %blur%px %spread%px rgba(%red%,%green%,%blue%,%opacity%); \n\
box-shadow: %hShadow%px %vShadow%px %blur%px %spread%px rgba(%red%,%green%,%blue%,%opacity%)';
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
            
        // Set my angle variables to their new values
        getAngleValues();
            
        // Now update values based on my angle
        getValues();
            
        // Finally update my css
        setShadow();
            
    }
    function resetValues() 
    {
        angleCount = 0;
        userValues = defaultValues;
    }
        
    /**
     * Based on the angle, work out which direction to go
     * Also work out the angle I will be using in my maths
     */
    function getAngleValues() 
    {
        // Still need to do this
        
        
        // Lets assume 120, which is a nice easy one to work out
        angle = 30;
    }
        
    /**
     * Now I know my angle values, I can update my base values
     */
    function getValues()
    {
        // Set the user values 
        
        // Because I need to conceptualise, I'll pretend the long value is going down right
        vertical = Math.cos((angle * (Math.PI/180))) * parseInt(inDistance.val()); // cos
        horizontal = Math.sin(angle * (Math.PI/180)) * parseInt(inDistance.val()); // sine
        console.log(Math.cos( (angle * (Math.PI/180) ) ) );
        console.log(parseInt(inDistance.val()));
        console.log(vertical);
        
        // Now, which one is hShadow and which is vShadow?
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
                //console.log(search);
                finalBoxShadow = finalBoxShadow.replace(new RegExp(search, "g"), userValues[key]);                    
            }
        }
        // Now apply it to the box        
        previewBox.attr('style', finalBoxShadow);
    }    
    var calculator = jQuery('#calculate');
    calculator.click(function() {
        calculateBoxShadow();
    });
    
});