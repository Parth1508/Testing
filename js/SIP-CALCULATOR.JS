$(document).ready(function(){
    var input1_from =(1);
    var input1_to = (40);
    var input2_from =(50000);
    var input2_to = (500000000);
    var input3_from =(5000);
    var input3_to = (100000000);
    var input1_instance;
    var input2_instance;
    var input3_instance;
    $(".js-slider-input1").ionRangeSlider({
        min: input1_from,
        max: input1_to,
        from: 20,
        postfix: " years",
        skin:"big",
        grid:true,
        onStart: function(data) {
            $("#inputYear").prop("value", data.from);
        },
        onChange: function(data) {
            $("#inputYear").prop("value", data.from);
        }
    });
    $(".js-slider-input2").ionRangeSlider({
        min: input2_from,
        max: input2_to,
        from: 50000000,
        step: 100,
        prefix: "₹ ",
        skin:"big",
        grid:true,
        onStart: function(data) {
            $("#inputGoal").prop("value", data.from);
        },
        onChange: function(data) {
            $("#inputGoal").prop("value", data.from);
        }
    });
    $(".js-slider-input3").ionRangeSlider({
        min: input3_from,
        max: input3_to,
        from: 55000000,
        step: 100,
        prefix: "₹ ",
        skin:"big",
        grid:true,
        onStart: function(data) {
            $("#inputSaveGoal").prop("value", data.from);
        },
        onChange: function(data) {
            $("#inputSaveGoal").prop("value", data.from);
        }
    });
    input1_instance = $(".js-slider-input1").data("ionRangeSlider");
    input2_instance = $(".js-slider-input2").data("ionRangeSlider");
    input3_instance = $(".js-slider-input3").data("ionRangeSlider");
    $("#inputYear").on("input", function() {
        var val = $(this).prop("value");
    
        // validate
        if (val < min) {
            val = min;
        } else if (val > max) {
            val = max;
        }
    
        input1_instance.update({
            from: val
        });
    });
    $("#inputGoal").on("input", function() {
        var val = $(this).prop("value");
    
        // validate
        if (val < min) {
            val = min;
        } else if (val > max) {
            val = max;
        }
    
        input1_instance.update({
            from: val
        });
    });
    $("#inputSaveGoal").on("input", function() {
        var val = $(this).prop("value");
    
        // validate
        if (val < min) {
            val = min;
        } else if (val > max) {
            val = max;
        }
    
        input1_instance.update({
            from: val
        });
    });
});