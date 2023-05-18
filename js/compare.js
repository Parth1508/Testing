var selectedScheme = "";
var miscHoldingPersentage = 0.00;
var arrSchemeSectorCodes = [];
var searchSchemeList = [];
var isOpenChart = false;
var firstSchemesSectAlloc = 'Y';
var sSchemeName;
var maxIllustration;
var minIllustration;
var allSeriesIllustrationData = [];
var divChartIndex = [];
var isFirstChart = true;
var isfirstload = true;
var isresetclick = false;
var isFillSchemePerformance = false;
var temparrSchemes = [];

jQuery(document).ready(function () {
    setTimeout("checkClientLogin();", 50);
    jQuery("#btn-overview").click(function () {
        jQuery("#btn-overview").addClass('active');
        jQuery("#btn-holding").removeClass('active');
        jQuery("#btn-Performance").removeClass('active');
        jQuery("#overview").show();
        jQuery("#performance").hide();
        jQuery("#Sector-holding").hide()
    });
    jQuery("#btn-holding").click(function () {
        jQuery("#btn-holding").addClass('active');
        jQuery("#btn-overview").removeClass('active');
        jQuery("#btn-Performance").removeClass('active');
        jQuery("#Sector-holding").show();
        jQuery("#overview").hide();
        jQuery("#performance").hide();
        if (isresetclick == false) {
            miscHoldingPersentage = 0.00;
        }
    });
    jQuery("#btn-Performance").click(function () {
        jQuery("#btn-Performance").addClass('active');
        jQuery("#btn-holding").removeClass('active');
        jQuery("#btn-overview").removeClass('active');
        jQuery("#performance").show();
        jQuery("#Sector-holding").hide();
        jQuery("#overview").hide()
    });
    jQuery('.txtScheme').autocomplete({
        source: function (request, response) {
            if (request.term != '') {
                jQuery.ajax({
                    url: sAppURL + '/FundScreener/getAutoCompSchemes',
                    type: 'POST',
                    async: true,
                    dataType: "json",
                    data: {
                        text: request.term,
                        pageIndex: 'all',
                        pageSize: 'all',
                        type: 'all'
                    },
                    success: function (data) {
                        var jsonObject = jQuery.parseJSON(data);
                        if (typeof (jsonObject.response.data) !== 'undefined' && jsonObject.response.data != null) {
                            var schemes = jsonObject.response.data.schemelist.scheme;
                            response(jQuery.map(schemes, function (item) {
                                return {
                                    label: item.SchemeName,
                                    value: item.SchemeName,
                                    SchemeCode: item.mf_schcode,
                                    SchemePlan: item.investment == 'Direct Plan'?'DIRECT':'NORMAL'
                                }
                            }))
                        }
                    }
                })
            }
        },
        minLength: 3,
        scroll: true,
        select: function (event, ui) {
            arrSchemesFromOutSide = [];
            var schemeDetails = ui.item.SchemeCode;
            selectedScheme = ui.item.SchemeCode;
            var SchemePlan = ui.item.SchemePlan;
            var id = this.id;
            var arrID = [];
            arrID = id.split("_");
            AddSchemeToCompare(arrID[2], selectedScheme, SchemePlan)
        }
    }).focus(function () {
        jQuery(this).autocomplete("search", "");
        jQuery(this).val('');
        jQuery('#ui-id-1').addClass('ui-height')
    }).blur(function () {
        jQuery(this).val('')
    });
    jQuery(".btnAddScheme").click(function () {
        var id = this.id;
        var arrID = [];
        arrID = id.split("_");
        jQuery("#btn-overview").click()
    });
    jQuery(".btn-AddMWScheme").click(function () {
        var id = this.id;
        var index = id.split('_');
        var schemeCode = jQuery("#hdnSchemCode_" + index[1]).val();
        if (schemeCode != null && schemeCode != '') {
            AddSchemeToMW(schemeCode, id)
        }
    });
    jQuery(".btn-InvestScheme").click(function () {
        var cookieClientCode = getCookie('IsLogin');
        if (cookieClientCode != null && cookieClientCode != '') {
            var id = this.id;
            var index = id.split('_');
            var schemeCode = jQuery("#hdnSchemCode_" + index[1]).val();
            var schemePlan = jQuery("#hdnSchemPlan_" + index[1]).val();
            if (jQuery("#hdnDirectFundAccess").val() == "N" && schemePlan.toUpperCase() == "DIRECT") {
                alert("Investment Not allowed!");
                return false;
            }
            if (schemeCode != null) {
                InvestForScheme(schemeCode, schemePlan)
            }
        }

    });
    jQuery(document.body).on('click', '#view-chart', function (e) {
        jQuery("#trChart").show();
        jQuery("#divChartloading").show();
        jQuery("#divChartNavMovement").hide();
        if (isOpenChart == false && arrSchemes.length > 0) {
            if (arrSchemes.length <= 0) {
                alert('Please Select Scheme first')
            } else {
                GetNAVDetails();
            }
        } else {
            jQuery("#trChart").hide();
            jQuery("#divChartloading").hide();
            jQuery("#divChartNavMovement").hide();
            isOpenChart = false
        }
    })
    jQuery(".reset").click(function () {
        isresetclick = true;
        var id = this.id;
        var arrID = [];
        arrID = id.split("_");
        jQuery("#reset_" + arrID[1]).hide();
        resetOverviewDetails(arrID[1]);
        ResetSchemesSectAllocDetails(arrID[1]);
        ResetSchemesPerformanceDetails(arrID[1]);
    });
    if (jQuery("#flag").val() == "") {
        debugger;
        setTimeout("FillTop2PerformingfundforCompare('', '', '', '', '', '');", 50);
    }
    checkMFClient(jQuery("#hdnClientCode").val(), function () { });
});

function FillSchemesOverviewDetails() {
    if (arrSchemesFromOutSide != null && arrSchemesFromOutSide.length != 0) {
        var schmecode = arrSchemesFromOutSide[0];
        jQuery(loading);
        var postData = {
            Schemes: arrSchemesFromOutSide
        };
        jQuery.ajax({
            url: sAppURL + "/Compare/FillSchemesOverviewDetails",
            type: 'POST',
            cache: true,
            data: postData,
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] != null && jQuery.parseJSON(data[i]).response.data != null) {
                            var SchemeOverviewDetails;
                            if (jQuery.parseJSON(data[i]).response.data.schemelist.scheme.length > 1) {
                                SchemeOverviewDetails = jQuery.parseJSON(data[i]).response.data.schemelist.scheme[0]
                            } else {
                                SchemeOverviewDetails = jQuery.parseJSON(data[i]).response.data.schemelist.scheme
                            }
                            SetSchemeOverviewDetails(SchemeOverviewDetails, i + 1);
                            jQuery("#btn-overview").click()
                            FillSchemeHolding(1, schmecode);
                        } else {
                            removeLoading()
                        }
                    }
                } else {
                    removeLoading()
                }
            },
            error: function (xhr) { }
        })
    }
}

function SetSchemeOverviewDetails(schemeOverviewDetails, i) {
    var today = new Date();
    var launchDate = new Date(schemeOverviewDetails.launchdate);
    var today = new Date();
    var schemeAge = Math.floor((today - launchDate) / (365.25 * 24 * 60 * 60 * 1000));
    jQuery("#div_Title_" + i).html(schemeOverviewDetails.SchemeName);
    jQuery("#lblExp" + i).html(schemeOverviewDetails.expenseratio);
    jQuery("#tdSchemeAUM_OV_" + i).html(FormatFloatDecimals(schemeOverviewDetails.AUM, 2) + " Cr");
    jQuery("#tdSchemeAge_OV_" + i).html(schemeAge);
    jQuery("#tdSchemeAssetType_OV_" + i).html(schemeOverviewDetails.MainCategory);
    jQuery("#tdSchemeCategory_OV_" + i).html(schemeOverviewDetails.SchemeCategory);
    jQuery("#tdSchemeHorizon_OV_" + i).html(schemeOverviewDetails.horizon);
    jQuery("#tdSchemeNature_OV_" + i).html(schemeOverviewDetails.Nature);
    jQuery("#sapnSchemeRisk_OV_" + i).html(schemeOverviewDetails.riskometervalue);
    jQuery("#tdSchemeNAV_OV_" + i).html(FormatFloatDecimals(schemeOverviewDetails.CurrentNAV, 2));
    jQuery("#td52WHighLow_OV_" + i).html(FormatFloatDecimals(schemeOverviewDetails.FiftyTwoWLow, 2));
    jQuery("#tdBenchmarkindex_OV_" + i).html(schemeOverviewDetails.SchemeBenchMark);
    jQuery("#tdFundManager_OV_" + i).html(schemeOverviewDetails.FundManager);
    jQuery("#tdAMC_OV_" + i).html(schemeOverviewDetails.AMCName);
    jQuery("#tdMinSipAmt_OV_" + i).html(schemeOverviewDetails.SIP_MinInv);
    jQuery("#tdMinLumpsumAmt_OV_" + i).html(schemeOverviewDetails.MinInvestment);
    jQuery("#tdIncrementalSipAmt_OV_" + i).html(schemeOverviewDetails.SIP_IncAmt);
    jQuery("#tdIncrementalAmt_OV_" + i).html(schemeOverviewDetails.IncInv);
    setTimeout(function () {
        if (jQuery.inArray(schemeOverviewDetails.mf_schcode, arrMWSchemes) > -1) {
            jQuery('#btnAddSchemeMW_' + i).addClass('selected')
        }
    }, 1000);
    jQuery("#tdSipDates_OV_" + i).html(schemeOverviewDetails.SIP_Dates);
    var classMorningStar;
    if (schemeOverviewDetails.morningstaroverall != null && schemeOverviewDetails.morningstaroverall != "") {
        classMorningStar = 'morningstaroverall_' + schemeOverviewDetails.morningstaroverall
    } else {
        classMorningStar = ''
    }
    jQuery('#div_RatingStars_' + i).addClass(classMorningStar);
    ShowCompareSchemeDetails(schemeOverviewDetails.mf_schcode, i);
    removeLoading();
    jQuery("#btnInvestScheme_" + i).show();
    jQuery("#btnAddSchemeMW_" + i).show();
    jQuery("#div_Rate_" + i).show();
    jQuery("#reset_" + i).show();
    jQuery("#loginbtninvestment_" + i).show();
    jQuery("#btnAddwatch_" + i).show();

}

function FillSchemePerformance() {
    if (arrSchemesFromOutSide != null && arrSchemesFromOutSide.length != 0) {
        var postData = {
            Schemes: arrSchemesFromOutSide
        };
        jQuery.ajax({
            url: sAppURL + "/Compare/GetSchemesPerformanceDetails",
            type: 'POST',
            cache: false,
            data: postData,
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data != null) {
                    allSeriesIllustrationData = [];
                    for (var i = 0; i < data.length; i++) {
                        if (jQuery.parseJSON(data[i]).response.data != null) {
                            var schemePerformanceDetails = jQuery.parseJSON(data[i]).response.data.schemelist.scheme;
                            SetSchemesPerformanceDetails(schemePerformanceDetails, i + 1);
                            arrSchemes.push(arrSchemesFromOutSide[i]);
                            divChartIndex.push(i + 1)
                            isFillSchemePerformance = true;
                        }
                    }
                    createAllIllustrationCharts(allSeriesIllustrationData)
                }
            },
            error: function (xhr) { }
        })
    }
}

function SetSchemesPerformanceDetails(schemePerformanceDetails, i) {

    ResetSchemesPerformanceDetails(i);
    jQuery("#hdnSchemCode_" + i).val(schemePerformanceDetails.Mf_SchCode);
    if (schemePerformanceDetails.Sch_Name.indexOf('Direct') > 1)
        jQuery("#hdnSchemPlan_" + i).val('DIRECT');
    else
        jQuery("#hdnSchemPlan_" + i).val('NORMAL');
    jQuery("#lbl1yrRt" + i).html(FormatFloatDecimals(schemePerformanceDetails.oneyear, 2));
    var schemeName = schemePerformanceDetails.Sch_Name;
    var seriesIllustrationData = [];
    var obj = {};
    if (schemePerformanceDetails.threemonth != null) {
        jQuery("#td3Months_Preformance_" + i).html(CheckForNullNumber(FormatFloatDecimals(schemePerformanceDetails.threemonth, 2), 'NA') + '%');
    }
    else {
        jQuery("#td3Months_Preformance_" + i).html('NA');
    }
    var columnColor;
    if (schemePerformanceDetails.threemonth == null || schemePerformanceDetails.threemonth < 0) {
        columnColor = "#fc5347"
    } else {
        columnColor = "#A2D33C"
    }
    seriesIllustrationData.push({
        "Category": "3M",
        "CurrentValue": parseFloat(FormatFloatTwoDecimal(schemePerformanceDetails.threemonth, 2)),
        "color": columnColor
    });
    if (isFirstChart == true) {
        maxIllustration = parseFloat(schemePerformanceDetails.threemonth);
        minIllustration = parseFloat(schemePerformanceDetails.threemonth)
    }
    if (maxIllustration < parseFloat(schemePerformanceDetails.threemonth)) {
        maxIllustration = parseFloat(schemePerformanceDetails.threemonth)
    }
    if (parseFloat(schemePerformanceDetails.threemonth) < minIllustration) {
        minIllustration = parseFloat(schemePerformanceDetails.threemonth)
    }
    if (maxIllustration < parseFloat(schemePerformanceDetails.sixmonth)) {
        maxIllustration = parseFloat(schemePerformanceDetails.sixmonth)
    }
    if (parseFloat(schemePerformanceDetails.sixmonth) < minIllustration) {
        minIllustration = parseFloat(schemePerformanceDetails.sixmonth)
    }
    if (maxIllustration < parseFloat(schemePerformanceDetails.oneyear)) {
        maxIllustration = parseFloat(schemePerformanceDetails.oneyear)
    }
    if (parseFloat(schemePerformanceDetails.oneyear) < minIllustration) {
        minIllustration = parseFloat(schemePerformanceDetails.oneyear)
    }
    if (maxIllustration < parseFloat(schemePerformanceDetails.threeyear)) {
        maxIllustration = parseFloat(schemePerformanceDetails.threeyear)
    }
    if (parseFloat(schemePerformanceDetails.threeyear) < minIllustration) {
        minIllustration = parseFloat(schemePerformanceDetails.threeyear)
    }
    if (maxIllustration < parseFloat(schemePerformanceDetails.fiveyear)) {
        maxIllustration = parseFloat(schemePerformanceDetails.fiveyear)
    }
    if (parseFloat(schemePerformanceDetails.fiveyear) < minIllustration) {
        minIllustration = parseFloat(schemePerformanceDetails.fiveyear)
    }
    if (schemePerformanceDetails.sixmonth != null) {
        jQuery("#td6Months_Preformance_" + i).html(CheckForNullNumber(FormatFloatDecimals(schemePerformanceDetails.sixmonth, 2), 'NA') + '%');
    }
    else {
        jQuery("#td6Months_Preformance_" + i).html('NA');
    }
    if (schemePerformanceDetails.sixmonth == null || schemePerformanceDetails.sixmonth < 0) {
        columnColor = "#fc5347"
    } else {
        columnColor = "#A2D33C"
    }
    seriesIllustrationData.push({
        "Category": "6M",
        "CurrentValue": parseFloat(FormatFloatTwoDecimal(schemePerformanceDetails.sixmonth, 2)),
        "color": columnColor
    });
    if (schemePerformanceDetails.oneyear != null) {
        jQuery("#td1Year_Preformance_" + i).html(CheckForNullNumber(FormatFloatDecimals(schemePerformanceDetails.oneyear, 2), 'NA') + '%');
    }
    else {
        jQuery("#td1Year_Preformance_" + i).html('NA');
    }
    if (schemePerformanceDetails.oneyear == null || schemePerformanceDetails.oneyear < 0) {
        columnColor = "#fc5347"
    } else {
        columnColor = "#A2D33C"
    }
    seriesIllustrationData.push({
        "Category": "1Y",
        "CurrentValue": parseFloat(FormatFloatTwoDecimal(schemePerformanceDetails.oneyear, 2)),
        "color": columnColor
    });
    if (schemePerformanceDetails.threeyear != null) {
        jQuery("#td3Year_Preformance_" + i).html(CheckForNullNumber(FormatFloatDecimals(schemePerformanceDetails.threeyear, 2), 'NA') + '%');
    } else {
        jQuery("#td3Year_Preformance_" + i).html('NA');
    }
    if (schemePerformanceDetails.threeyear == null || schemePerformanceDetails.threeyear < 0) {
        columnColor = "#fc5347"
    } else {
        columnColor = "#A2D33C"
    }
    seriesIllustrationData.push({
        "Category": "3Y",
        "CurrentValue": parseFloat(FormatFloatTwoDecimal(schemePerformanceDetails.threeyear, 2)),
        "color": columnColor
    });
    if (schemePerformanceDetails.fiveyear != null) {
        jQuery("#td5Year_Preformance_" + i).html(CheckForNullNumber((FormatFloatDecimals(schemePerformanceDetails.fiveyear, 2)), 'NA') + '%');
    }
    if (schemePerformanceDetails.fiveyear == null || schemePerformanceDetails.fiveyear < 0) {
        columnColor = "#fc5347"
    } else {
        columnColor = "#A2D33C"
    }
    seriesIllustrationData.push({
        "Category": "5Y",
        "CurrentValue": parseFloat(FormatFloatTwoDecimal(schemePerformanceDetails.fiveyear, 2)),
        "color": columnColor
    });
    jQuery("#tdSchemeBeta_Preformance_" + i).html(FormatFloatDecimals(schemePerformanceDetails.Beta, 2));
    jQuery("#tdSchemeSharp_Preformance_" + i).html(FormatFloatDecimals(schemePerformanceDetails.Sharpe, 2));
    jQuery("#tdSchemeAlpha_Preformance_" + i).html(FormatFloatDecimals(schemePerformanceDetails.Alpha, 2));
    jQuery("#tdSchemeVolatility_Preformance_" + i).html(FormatFloatDecimals(schemePerformanceDetails.SD, 2));
    allSeriesIllustrationData.push(seriesIllustrationData);

    isFirstChart = false
}

function createAllIllustrationCharts(allSeriesIllustrationData) {
    var categoryValues = [];
    categoryValues.push("3M");
    categoryValues.push("6M");
    categoryValues.push("1Y");
    categoryValues.push("3Y");
    categoryValues.push("5Y");
    for (var i = 0; i < allSeriesIllustrationData.length; i++) {
        var seriesIllustrationData = [];
        if (allSeriesIllustrationData[i] != null && allSeriesIllustrationData[i].length > 0) {
            seriesIllustrationData = allSeriesIllustrationData[i];
            var index;
            index = divChartIndex[i];
            var divID = "divIllustration_Preformance_" + index;
            if (jQuery("#hdnSchemCode_" + index).val() != "") {
                jQuery("#divIllustration_Preformance_" + index).show();
            }
            else
            {
                jQuery("#divIllustration_Preformance_" + index).hide();
            }
            jQuery(divID).html("");
            CreateIllustrationChart(divID, seriesIllustrationData, categoryValues, maxIllustration, minIllustration)
        }
    }
}

function SetSchemesSectAllocDetails(schemesSectAllocDetails, columIndex, i) {
    miscHoldingPersentage = 0.00;
    ResetSchemesSectAllocDetails(columIndex);
    for (var rowIndex = 0; rowIndex < schemesSectAllocDetails.length; rowIndex++) {
        if (rowIndex < 12) {
            if (firstSchemesSectAlloc == 'Y') {
                setSectors(schemesSectAllocDetails[rowIndex], rowIndex + 1);
                setHoldingPercentage(schemesSectAllocDetails[rowIndex], columIndex, rowIndex + 1)
            } else {
                setHoldingPercentage(schemesSectAllocDetails[rowIndex], columIndex, rowIndex + 1)
            }
        } else {
            if (i == 1) {
                miscHoldingPersentage = parseFloat(miscHoldingPersentage + parseFloat(schemesSectAllocDetails[rowIndex].HoldingPercentage));
                jQuery("#span_Sector_13_" + columIndex).html(FormatFloatDecimals(miscHoldingPersentage, 2) + "%");
                jQuery("#div_Sector_13_" + columIndex).width(parseFloat(miscHoldingPersentage))
            } else {
                setHoldingPercentage(schemesSectAllocDetails[rowIndex], columIndex, rowIndex)
            }
        }
    }
    if (firstSchemesSectAlloc == 'Y') {
        firstSchemesSectAlloc = 'N'
    }
    removeLoading()
}

function setSectors(schemeSector, j) {
    jQuery("#span_Sector_" + j).html(schemeSector.sector);
    arrSchemeSectorCodes.push(schemeSector.sec_code)
}

function setHoldingPercentage(schemeSector, columIndex, rowIndex) {
    for (var k = 1; k <= arrSchemeSectorCodes.length; k++) {
        var indexSectorCode = jQuery.inArray(schemeSector.sec_code, arrSchemeSectorCodes);
        if (indexSectorCode > -1) {
            var rowIndex = parseInt(indexSectorCode) + 1;
            var spanSchemeSectID = "#span_Sector_" + rowIndex + "_" + columIndex;
            var divSchemeSectProgressID = "#div_Sector_" + rowIndex + "_" + columIndex;
            jQuery(spanSchemeSectID).html(FormatFloatDecimals(schemeSector.HoldingPercentage, 2) + "%");
            jQuery(divSchemeSectProgressID).width(parseFloat(schemeSector.HoldingPercentage));
            return
        }
    }
    if (arrSchemeSectorCodes.length <= k) {
        miscHoldingPersentage = parseFloat(miscHoldingPersentage + parseFloat(schemeSector.HoldingPercentage));
        jQuery("#span_Sector_13_" + columIndex).html(FormatFloatDecimals(miscHoldingPersentage, 2) + "%");
        jQuery("#div_Sector_13_" + columIndex).width(parseFloat(miscHoldingPersentage))
    }
}

function SetSchemesAssetAllocDetails(schemesAssetAllocDetails, i) {
    //debugger;
    var assetAllocPieChartData = [];
    var j = 0;
    var otherHoldingPersentage = 0.00;
    jQuery.each(schemesAssetAllocDetails, function () {
        if (j < 5) {
            assetAllocPieChartData.push({
                name: this.AssetType,
                y: parseFloat(FormatFloatTwoDecimal(this.HoldingPercentage, 2))
            })
        } else {
            otherHoldingPersentage = parseFloat(otherHoldingPersentage) + parseFloat(this.HoldingPercentage)
        }
        j = j + 1
    });
    assetAllocPieChartData.push({
        name: "Other",
        y: parseFloat(FormatFloatTwoDecimal(otherHoldingPersentage, 2))
    });
    CreateAssetAllocPieChart(assetAllocPieChartData, i)
}

function FillSchemesForAutoComplete(Searchtext) {
    jQuery.ajax({
        url: sAppURL + '/FundScreener/getAutoCompSchemes',
        type: 'POST',
        cache: false,
        dataType: "json",
        data: {
            text: Searchtext,
            pageIndex: 'all',
            pageSize: 'all',
            type: 'all'
        },
        success: function (data) {
            if (data != null) {
                var SchemeData = jQuery.parseJSON(data);
                if (typeof (SchemeData.response.data) !== 'undefined' && SchemeData.response.data != null) {
                    var schemes = SchemeData.response.data.schemelist.scheme;
                    jQuery.each(schemes, function (i, scheme) {
                        searchSchemeList.push({
                            Label: scheme.SchemeName,
                            value: scheme.SchemeName,
                            SchemeCode: scheme.mf_schcode
                        })
                    })
                }
                SetAutoComplete()
            }
        },
        error: function (xhr) { }
    })
}

function SetAutoComplete(index) {
    jQuery('#txt_SearchScheme_' + index).autocomplete({
        source: searchSchemeList,
        minLength: 0,
        scroll: true,
        select: function (event, ui) {
            selectedScheme = ui.item.SchemeCode;
            SchemePlan = ui.item.SchemePlan;
            AddSchemeToCompare(index, selectedScheme)
        }
    })
}

function AddSchemeToCompare(index, schmecode) {
    if (schmecode != null) {
        selectedScheme = schmecode;
    }
    isfirstload = true;
    if (selectedScheme != null && selectedScheme != "") {
        if (jQuery.inArray(selectedScheme, arrSchemes) == -1) {
            arrSchemes.push(selectedScheme);
            divChartIndex.push(parseInt(index));
            temparrSchemes.push({ SCCode: schmecode, Index: parseInt(index) });
            setTimeout("FillSingleSchemeOverviewDetails(" + index + "," + schmecode + ");", 100);
            setTimeout("FillSingleSchemePerformance(" + index + "," + schmecode + ");", 100);
            setTimeout("FillSchemeHolding(" + index + "," + schmecode + ");", 100);
            jQuery("#btn-overview").click();
            setTimeout("checkClientLogin();", 50);
            jQuery("#trChart").hide();
            jQuery("#divChartloading").hide();
            jQuery("#divChartNavMovement").hide();

        } else {
            alert("Scheme already present in Comparison Window")
        }
    } else {
        alert("Please Select Scheme")
    }
}

function addElementIntoIllustrateChartData(category, val) {
    obj = {
        Category: category,
        value: FormatFloatDecimals(val, 2)
    };
    illustrationChartData.push(obj)
}

function GetNAVDetails() {
    var postData = {
        Schemes: arrSchemes
    };

    var SeriseData = [];
    var x = '';
    jQuery.ajax({
        url: sAppURL + '/Compare/FillNavPerformance',
        type: 'POST',
        data: postData,
        dataType: "json",
        traditional: true,
        success: function (data) {
            var color = ["#00B0F0", "#AFAFAF", "#FF6600", "#CC99FF", "#4747FF"];
            if (data != null) {
                isOpenChart = true;
                var SchemNames = [];
                var AllDataNAVChartIQ = [];
                for (var i = 0; i < data.length; i++) {
                    var navPerformanceData = jQuery.parseJSON(data[i]);
                    var j = 0;
                    var SchemeNAVData = [];
                    if (navPerformanceData.response.data.schemelist.scheme != null) {
                        var Data = navPerformanceData.response.data.schemelist.scheme;
                        var DataNAVChartIQ = [];
                        for (var z = 0; z < Data.length; z++) {
                            var navDate = new Date(Data[z].navdate);
                            var NAVValuesforChartIQ = {
                                Date: navDate,
                                Close: parseFloat(Data[z].navrs)
                            };
                            DataNAVChartIQ.push(NAVValuesforChartIQ)
                        }
                        AllDataNAVChartIQ.push(DataNAVChartIQ)
                    }
                }
                jQuery("#trChart").show();
                jQuery("#divChartloading").hide();
                jQuery("#divChartNavMovement").show();
                CreateNAVChartIQ(AllDataNAVChartIQ);
                removeLoading()
            }
        },
        error: function (xhr) {
            removeLoading()
        }
    })
};

function AddSchemeToMW(schemeCode, idButAddMW) {
    if (jQuery('#' + idButAddMW).hasClass('selected')) {
        jQuery.ajax({
            url: sAppURL + '/MarketWatch/RemoveMWSchemes',
            type: 'POST',
            cache: false,
            data: {
                schemeCode: schemeCode
            },
            dataType: "json",
            success: function (data) {
                jQuery('#' + idButAddMW).removeClass('selected');
                arrMWSchemes.splice(jQuery.inArray(schemeCode, arrMWSchemes), 1);
                alert("Scheme successfully removed from Market Watch")
            },
            error: function (xhr) { }
        })
    } else {
        jQuery.ajax({
            url: sAppURL + '/MarketWatch/AddSchemetoMarketWatch',
            type: 'POST',
            cache: false,
            data: {
                schemeName: "",
                schemeCode: schemeCode
            },
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    var MarketWatchData = jQuery.parseJSON(data);
                    if (MarketWatchData.SchemeCode != null && MarketWatchData.SchemeCode != '') {
                        jQuery('#' + idButAddMW).addClass('selected');
                        alert("Scheme successfully added in Market Watch");
                        SetCookieRecentlyViewedFundCode(schemeCode);
                        arrMWSchemes.push(schemeCode)
                    } else {
                        alert(MarketWatchData.StatusMsg)
                    }
                }
            },
            error: function (xhr) { }
        })
    }
}

/*function InvestForScheme(schemeCode,schemePlan) {
    setCookie('InvestSchemeCode', schemeCode, 1);
    var url = sAppURL + '/Investment/';
    //====================Check CMOT Scheme Availablablity in BSE===========
    var flag = "LS";
    var schemecodeAvl = "Y";
    InvestForSchemeAvailablablity(url, schemeCode, schemePlan, flag);
    //window.location.href = url
}*/

function hideTitleControls() {
    for (var i = 1; i <= 4; i++) {
        jQuery('#div_Title_' + i).hide();
        jQuery('#div_Rate_' + i).hide();
        jQuery('#div_RatingStars_' + i).hide();
        jQuery('#div_InvestCompareBtn_' + i).hide()
    }
}

function FillSingleSchemeOverviewDetails(index, schemecode) {
    if (index != -1) {
        jQuery(loading);
        var arrIndex = parseInt(index);
        var postData = {
            Schemes: schemecode
        };

        jQuery.ajax({
            url: sAppURL + "/Compare/FillSchemesOverviewDetails",
            type: 'POST',
            cache: false,
            data: postData,
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data != null && data[0] != null) {
                    if (jQuery.parseJSON(data[0]).response.data != null) {
                        var SchemeOverviewDetails;
                        if (jQuery.parseJSON(data[0]).response.data.schemelist.scheme.length > 1) {
                            SchemeOverviewDetails = jQuery.parseJSON(data[0]).response.data.schemelist.scheme[0]
                        } else {
                            SchemeOverviewDetails = jQuery.parseJSON(data[0]).response.data.schemelist.scheme
                        }
                        SetSchemeOverviewDetails(SchemeOverviewDetails, index)
                    } else {
                        removeLoading()
                    }
                } else {
                    removeLoading()
                }
            },
            error: function (xhr) {
                removeLoading()
            }
        })
    }
}

function FillSingleSchemePerformance(index, schemecode) {
    if (index != -1) {

        var arrIndex = parseInt(index);
        var postData = {
            Schemes: schemecode
        };

        jQuery.ajax({
            url: sAppURL + "/Compare/GetSchemesPerformanceDetails",
            type: 'POST',
            cache: false,
            data: postData,
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data != null && data[0] != null) {
                    if (jQuery.parseJSON(data[0]).response.data != null) {
                        var SchemeOverviewDetails;
                        if (jQuery.parseJSON(data[0]).response.data.schemelist.scheme != null) {
                            var schemePerformanceDetails = jQuery.parseJSON(data[0]).response.data.schemelist.scheme;
                            SetSchemesPerformanceDetails(schemePerformanceDetails, index)
                        }
                    } else {
                        removeLoading()
                    }

                    createAllIllustrationCharts(allSeriesIllustrationData)
                }
            },
            error: function (xhr) { }
        })
    }
}

function ShowCompareSchemeDetails(schemeCode, index) {
    jQuery("#div_Addscheme_" + index).hide();
    jQuery("#div_scheme_" + index).show();
    jQuery('#div_Header_' + index).show();
    jQuery('#txt_SearchScheme_' + index).val('')
}

function ResetSchemesSectAllocDetails(columIndex) {
    //debugger;
    jQuery('#span_Sector_1_' + columIndex).html('NA');
    jQuery('#span_Sector_2_' + columIndex).html('NA');
    jQuery('#span_Sector_3_' + columIndex).html('NA');
    jQuery('#span_Sector_4_' + columIndex).html('NA');
    jQuery('#span_Sector_5_' + columIndex).html('NA');
    jQuery('#span_Sector_6_' + columIndex).html('NA');
    jQuery('#span_Sector_7_' + columIndex).html('NA');
    jQuery('#span_Sector_8_' + columIndex).html('NA');
    jQuery('#span_Sector_9_' + columIndex).html('NA');
    jQuery('#span_Sector_10_' + columIndex).html('NA');
    jQuery('#span_Sector_11_' + columIndex).html('NA');
    jQuery('#span_Sector_12_' + columIndex).html('NA');
    jQuery('#span_Sector_13_' + columIndex).html('NA')
}

function ResetSchemesPerformanceDetails(i) {
    jQuery("#td3Months_Preformance_" + i).html('NA');
    jQuery("#td6Months_Preformance_" + i).html('NA');
    jQuery("#td1Year_Preformance_" + i).html('NA');
    jQuery("#td3Year_Preformance_" + i).html('NA');
    jQuery("#td5Year_Preformance_" + i).html('NA');
    jQuery("#tdSchemeBeta_Preformance_" + i).html('NA');
    jQuery("#tdSchemeSharp_Preformance_" + i).html('NA');
    jQuery("#tdSchemeAlpha_Preformance_" + i).html('NA');
    jQuery("#tdSchemeVolatility_Preformance_" + i).html('NA')
}

function CreateIllustrationChart(divID, seriesIllustrationData, categoryValues, maxIllustration, minIllustration) {
    var chart = AmCharts.makeChart(divID, {
        "type": "serial",
        "theme": "light",
        "dataProvider": seriesIllustrationData,
        "valueAxes": [{
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0,
            "minimum": minIllustration,
            "maximum": maxIllustration
        }],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [{
            "balloonText": "[[Category]]: <b>[[CurrentValue]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "fillColorsField": "color",
            "valueField": "CurrentValue"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "Category",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 20
        },
        "export": {
            "enabled": true
        }
    })
}

function CreateAssetAllocPieChart(assetAllocPieChartData, i) {
    jQuery("#div_AssetChart_" + i).show();
    var chart = AmCharts.makeChart("div_AssetChart_" + i, {
        "type": "pie",
        "theme": "light",
        "dataProvider": assetAllocPieChartData,
        "autoMargins": false,
        "marginTop": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "marginRight": 0,
        "labelsEnabled": false,
        "valueField": "y",
        "titleField": "name",
        "balloon": {
            "fixedPosition": true
        },
        "export": {
            "enabled": true
        }
    })
}
var stxx = new STXChart({
    container: $$$('.chartContainer2'),
    layout: {
        "chartType": "line",
        "crosshair": true
    },
});
stxx.chart.xAxis.axisType = "ntb";
stxx.chart.yAxis.goldenRatioYAxis = true;
stxx.chart.yAxis.initialMarginTop = 100;
stxx.chart.color = "#1e5c99";
stxx.chart.legend = {
    x: 0,
    y: 0
};
stxx.layout.crosshair = true;
stxx.tooltip = true;
stxx.calculateYAxisMargins(stxx.chart.panel.yAxis);
stxx.draw();

function CreateNAVChartIQ(AllDataNAVChartIQ) {
    var schemeNamelegend;
    var idSchemeName;
    idSchemeName = '#div_Title_' + divChartIndex[0];
    schemeNamelegend = jQuery(idSchemeName).html();
    stxx.newChart(schemeNamelegend, AllDataNAVChartIQ[0], null, function () {
        stxx.setSpan(5, "year", 30)
    });
    var schemeName1;
    var schemeName2;
    var schemeName3;
    if (AllDataNAVChartIQ.length > 1) {
        idSchemeName = '#div_Title_' + divChartIndex[1];
        schemeNamelegend = jQuery(idSchemeName).html();
        schemeName1 = schemeNamelegend;
        stxx.addSeries(schemeNamelegend, {
            data: AllDataNAVChartIQ[1],
            permanent: true
        });
        var renderer = stxx.setSeriesRenderer(new STX.Renderer.Lines({
            params: {
                name: schemeNamelegend,
                data: AllDataNAVChartIQ[1],
                type: "line",
                yAxis: newAxis('right', "#999")
            },
            callback: function () {
                stxx.chart.legendRenderer(stxx, {
                    chart: stxx.chart,
                    legendColorMap: {
                        schemeName1: {
                            color: "#999",
                            display: schemeName1
                        }
                    },
                    coordinates: {
                        x: 0,
                        y: 0
                    },
                    noBase: false
                })
            }
        }));
        renderer.removeAllSeries().attachSeries(schemeNamelegend, {
            color: "#999",
            data: AllDataNAVChartIQ[1],
            permanent: true
        }).ready()
    }
    if (AllDataNAVChartIQ.length > 2) {
        idSchemeName = '#div_Title_' + divChartIndex[2];
        schemeNamelegend = jQuery(idSchemeName).html();
        schemeName2 = schemeNamelegend;
        stxx.addSeries(schemeNamelegend, {
            data: AllDataNAVChartIQ[2],
            permanent: true
        });
        var renderer1 = stxx.setSeriesRenderer(new STX.Renderer.Lines({
            params: {
                name: schemeNamelegend,
                data: AllDataNAVChartIQ[2],
                type: "line",
                yAxis: newAxis('right', "#0600b2")
            },
            callback: function () {
                stxx.chart.legendRenderer(stxx, {
                    chart: stxx.chart,
                    legendColorMap: {
                        schemeName1: {
                            color: "#999",
                            display: schemeName1
                        },
                        schemeName2: {
                            color: "#0600b2",
                            display: schemeName2
                        }
                    },
                    coordinates: {
                        x: 0,
                        y: 0
                    },
                    noBase: false
                })
            }
        }));
        renderer1.removeAllSeries().attachSeries(schemeNamelegend, {
            color: "#0600b2",
            data: AllDataNAVChartIQ[2],
            permanent: true
        }).ready()
    }
    if (AllDataNAVChartIQ.length > 3) {
        idSchemeName = '#div_Title_' + divChartIndex[3];
        schemeNamelegend = jQuery(idSchemeName).html();
        schemeName3 = schemeNamelegend;
        stxx.addSeries(schemeNamelegend, {
            data: AllDataNAVChartIQ[3],
            permanent: true
        });
        var renderer2 = stxx.setSeriesRenderer(new STX.Renderer.Lines({
            params: {
                name: schemeNamelegend,
                data: AllDataNAVChartIQ[3],
                type: "line",
                yAxis: newAxis('right', "#c2564a")
            },
            callback: function () {
                stxx.chart.legendRenderer(stxx, {
                    chart: stxx.chart,
                    legendColorMap: {
                        schemeName1: {
                            color: "#999",
                            display: schemeName1
                        },
                        schemeName2: {
                            color: "#0600b2",
                            display: schemeName2
                        },
                        schemeName3: {
                            color: "#c2564a",
                            display: schemeName3
                        }
                    },
                    coordinates: {
                        x: 0,
                        y: 0
                    },
                    noBase: false
                })
            }
        }));
        renderer2.removeAllSeries().attachSeries(schemeNamelegend, {
            color: "#c2564a",
            data: AllDataNAVChartIQ[3],
            permanent: true
        }).ready()
    }
    stxx.setSpan(5, "year", 30)
}

function newAxis(rightOrLeft, yAxisColor) {
    var axis = new STXChart.YAxis();
    axis.position = rightOrLeft;
    axis.textStyle = yAxisColor;
    axis.decimalPlaces = 0;
    axis.maxDecimalPlaces = 0;
    axis.initialMarginTop = 50;
    stxx.calculateYAxisMargins(axis);
    return axis
}

function changeRange(newinterval, aThis) {
    jQuery('.aReturns').removeClass('selected');
    jQuery(aThis).addClass('selected');
    stxx.setSpan(newinterval, "year", 30)
}


function FillTop2PerformingfundforCompare(assetType, Category, Horizon, Nature, returnType) {
    if (assetType == '') {
        assetType = 'Equity'
    }
    if (returnType == '') {
        returnType = '[3year]';
        jQuery('#spanSelectedReturns').html('3 Year Returns')
    }
    //jQuery(loading);
    setTimeout("removeLoading();", 500);
    jQuery("input[name=rdbtnNature]:checked").val();
    var sUrl = "";
    //Sql Injection By Ram
    var lastChar = assetType.slice(-1);
    if (lastChar == ',') {
        assetType = assetType.slice(0, -1);

    }
    assetType = assetType.replace(/[^A-Za-z,0-9]/g, "");
    returnType = returnType.replace(/[^A-Za-z,0-9]/g, "");
    //Sql Injection
    sUrl = '/Home/GetTopPerformingFunds';
    jQuery.ajax({
        url: sAppURL + sUrl,
        type: 'POST',
        cache: false,
        data: {
            assetName: assetType,
            Category: 'All',
            Horizon: 'All',
            Nature: 'Growth',
            returnType: returnType,
            top: 2,
            type: 'all'
        },
        dataType: "json",
        success: function (data) {
            if (data != null) {
                var topPerformingFundsData = jQuery.parseJSON(data);
                var topPerformingFunds = topPerformingFundsData.response.data.schemelist.scheme;
                for (i = 0; i < topPerformingFunds.length; i++) {
                    var count = i + 1;
                    value = topPerformingFunds[i];
                    var schmecode = topPerformingFunds[i].mf_schcode;
                    SchemeToCompare(count, schmecode)
                }
            }
        },
        error: function (xhr) {
        }
    })
}

function SchemeToCompare(index, SchemeCode) {
    if (SchemeCode != null && SchemeCode != "") {
        if (jQuery.inArray(SchemeCode, arrSchemes) == -1) {
            arrSchemes.push(SchemeCode);
            temparrSchemes.push({ SCCode: SchemeCode, Index: index });
            divChartIndex.push(parseInt(index));
            jQuery("#reset_" + index).show();
            setTimeout("FillSingleSchemeOverviewDetails(" + index + "," + SchemeCode + ");", 100);
            setTimeout("FillSingleSchemePerformance(" + index + "," + SchemeCode + ");", 100);
            jQuery("#btn-overview").click();
            setTimeout("FillSchemeHolding(" + index + "," + SchemeCode + ");", 100);
            setTimeout("checkClientLogin();", 50);
            jQuery("#trChart").hide();
            jQuery("#divChartloading").hide();
            jQuery("#divChartNavMovement").hide();
            isfirstload = false;

        } else {
            alert("Scheme already present in Comparison Window")
        }
    } else {
        alert("Please Select Scheme")
    }
}

function resetOverviewDetails(i) {
    var selectedschemecode = jQuery("#hdnSchemCode_" + i).val();
    var array = jQuery.inArray(selectedschemecode, arrSchemes);
    var index = arrSchemes.indexOf(selectedschemecode);
    if (index > -1) {
        arrSchemes.splice(index, 1);
        jQuery("#hdnSchemCode_" + i).val('');
    }
    jQuery("txt_SearchScheme_" + i).show();
    jQuery("#td_Title_" + i).show();
    jQuery("#div_SearchScheme_" + i).show();
    jQuery("#div_Addscheme_" + i).show();
    jQuery("#div_scheme_" + i).show();
    jQuery('#div_Header_' + i).show();
    jQuery('#divIllustration_Preformance_' + i).hide();
    jQuery("#div_Title_" + i).html('');
    jQuery("#lblExp" + i).html('NA');
    jQuery("#tdSchemeAUM_OV_" + i).html('NA');
    jQuery("#tdSchemeAge_OV_" + i).html('NA');
    jQuery("#tdSchemeAssetType_OV_" + i).html('NA');
    jQuery("#tdSchemeCategory_OV_" + i).html('NA');
    jQuery("#tdSchemeHorizon_OV_" + i).html('NA');
    jQuery("#tdSchemeNature_OV_" + i).html('NA');
    jQuery("#sapnSchemeRisk_OV_" + i).html('NA');
    jQuery("#tdSchemeNAV_OV_" + i).html('NA');
    jQuery("#td52WHighLow_OV_" + i).html('NA');
    jQuery("#tdBenchmarkindex_OV_" + i).html('NA');
    jQuery("#tdFundManager_OV_" + i).html('NA');
    jQuery("#tdAMC_OV_" + i).html('NA');
    jQuery("#tdMinSipAmt_OV_" + i).html('NA');
    jQuery("#tdMinLumpsumAmt_OV_" + i).html('NA');
    jQuery("#tdIncrementalSipAmt_OV_" + i).html('NA');
    jQuery("#tdIncrementalAmt_OV_" + i).html('NA');
    jQuery('#btnAddSchemeMW_' + i).addClass('NA')
    jQuery("#btnInvestScheme_" + i).hide();
    jQuery("#loginbtninvestment_" + i).hide();
    jQuery("#btnAddwatch_" + i).hide();
    jQuery("#btnAddSchemeMW_" + i).hide();
    jQuery("#div_Rate_" + i).hide();
    jQuery("#tdSipDates_OV_" + i).html('NA');
    var classMorningStar;
    classMorningStar = ''
    jQuery('#div_RatingStars_' + i).html('NA');
    removeLoading();
    jQuery("#div_AssetChart_" + i).hide();
}

function FillSchemeHolding(index, schemecode) {
    if (arrSchemes != null && arrSchemes.length != 0) {
        if (index != -1) {
            debugger;
            var arrIndex = parseInt(index);
            var postData = {
                Schemes: schemecode
            };
        }
        jQuery.ajax({
            url: sAppURL + "/Compare/GetSchemesHoldingDetails",
            type: 'POST',
            cache: false,
            data: postData,
            dataType: "json",
            traditional: true,
            success: function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i][0] != null && jQuery.parseJSON(data[i][0]).response.data != null) {
                            var schemesSectAllocDetails = jQuery.parseJSON(data[i][0]).response.data.schemelist.scheme;
                            SetSchemesSectAllocDetails(schemesSectAllocDetails, index, i + 1)
                        }
                        else {
                            ResetSchemesSectAllocDetails(index);
                            removeLoading();
                        }
                        if (jQuery.parseJSON(data[i][1]).response.data != null) {
                            var schemesAssetAllocDetails = jQuery.parseJSON(data[i][1]).response.data.schemelist.scheme;
                            SetSchemesAssetAllocDetails(schemesAssetAllocDetails, index)
                        }
                    }
                }
            },
            error: function (xhr) { }
        })
    }
}