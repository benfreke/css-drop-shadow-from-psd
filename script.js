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
        'hShadow' : 5,
        'vShadow' : 5,
        'blur' : 1,
        'spread' : 5,
        'rgb' : {
            'red' : 0,
            'green': 0,
            'blue': 0,
            'opacity': 1
        }
    };
    var previewBox = jQuery('#preview');
    var boxShadowTemplate = '\n\
-webkit-box-shadow: %hShadow%px %vShadow%px %blur%px %spread%px (%red%,%green%,%blue%,%opacity%) \n\
box-shadow: %hShadow%px %vShadow%px %blur%px %spread%px (%red%,green%%,%blue%,%opacity%)';
    var finalBoxShadow = '';
        
    // Angle = Degrees!
    // Distance = Hypotenuse
    // Spread = Spread
    // Size = Blur
        
    // box-shadow: h-shadow v-shadow blur spread color;
    // color can be either hex or RGBA

    function calculateBoxShadow() 
    {
        console.log('starting calculateBoxShadow');
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
    }
        
    /**
     * Based on the angle, work out which direction to go
     * Also work out the angle I will be using in my maths
     */
    function getAngleValues() 
    {
            
    }
        
    /**
     * Now I know my angle values, I can update my base values
     */
    function getValues()
    {
            
    }
        
    /**
     * Creates the CSS string needed to generate the drop shadow
     */
    function setShadow()
    {            
        finalBoxShadow = boxShadowTemplate;
        for (key in defaultValues) {
            console.log(defaultValues[key]);
            if (typeof(defaultValues[key]) == 'object') {
                for(newkey in defaultValues[key]) {
                    search = newkey;
                    //console.log(search);
                    finalBoxShadow = finalBoxShadow.replace(/%search%/g, defaultValues[key][newkey]);                        
                }
            } else {            
                search = '%' + key + '%';   
                //console.log(search);
                finalBoxShadow = finalBoxShadow.replace(search, defaultValues[key]);                    
            }
        }
        console.log('my final value');
        console.log(finalBoxShadow);
    }    
    var calculator = jQuery('#calculate');
    calculator.click(function() {
        calculateBoxShadow();
    });
    
});