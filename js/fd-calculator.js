$(document).ready(function(){
    var input1_from =(6);
    var input1_to = (120);
    var input2_from =(25000);
    var input2_to = (50000000);
    var input3_from =(4);
    var input3_to = (16);
    var input1_instance;
    var input2_instance;
    var input3_instance;



    
    $(".js-slider-input1").ionRangeSlider({
        min: input1_from,
        max: input1_to,
        from: 20,
        postfix: " months",
        skin:"big",
        grid:true,
        onStart: function(data) {
            $("#inputMonth").prop("value", data.from);
        },
        onChange: function(data) {
            $("#inputMonth").prop("value", data.from);
        }
    });
    $(".js-slider-input2").ionRangeSlider({
        min: input2_from,
        max: input2_to,
        from: 600000,
        step: 100,
        prefix: "₹ ",
        skin:"big",
        grid:true,
        onStart: function(data) {
            $("#inputAmount").prop("value", data.from);
        },
        onChange: function(data) {
            $("#inputAmount").prop("value", data.from);

        }
    });
    $(".js-slider-input3").ionRangeSlider({
        min: input3_from,
        max: input3_to,
        from: 5,
        step: 0.1,
        postfix: " %",
        skin:"big",
        grid:true,
        onStart: function(data) {
            $("#inptRtOfIntrst").prop("value", data.from);

        },
        onChange: function(data) {
            $("#inptRtOfIntrst").prop("value", data.from);
        }
    });



    input1_instance = $(".js-slider-input1").data("ionRangeSlider");
    input2_instance = $(".js-slider-input2").data("ionRangeSlider");
    input3_instance = $(".js-slider-input3").data("ionRangeSlider");
    $("#inputMonth").on("change keyup", function() {
        let val = $(this).prop("value");
    
        // validate
        if (val < input1_from) {
            val = input1_from;
        } else if (val > input1_to) {
            val = input1_to;
        }
    
        input1_instance.update({
            from: val
        });
    });
    $("#inputAmount").on("change keyup", function() {
        let val = $(this).prop("value");
        // validate
        if (val < input2_from) {
            val = input2_from;
        } else if (val > input2_to) {
            val = input2_to;
        }
        
        input2_instance.update({
            from: val
        });
    });
    $("#inptRtOfIntrst").on("change keyup", function() {
        let val = $(this).prop("value");
    
        // validate
        if (val < input3_from) {
            val = input3_from;
        } else if (val > input3_to) {
            val = input3_to;
        }
    
        input3_instance.update({
            from: val
        });
    });

   $("#calFD").on("click",function(){
       
       let month = $('#inputMonth').val();
       let roi =$('#inptRtOfIntrst').val();
       let amount = $( "#inputAmount" ).val();
       let gainedInterest;
       console.log(amount)
       gainedInterest= Math.round((amount*roi)/100);
       $('#inputDepAmt').html(amount);
       $('#inputGainIntrst').html(gainedInterest);
    }) 
});
