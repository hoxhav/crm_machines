// $(document).ready(function () {

// }); //end of document.ready
function calculateBMI(weight, height){
    let bmi = (weight/height/height)*10000;
    if(bmi < 18.5){
        return "POTHRANJENOST";
    } else if(bmi < 24.9){
        return "NORMALNA TT";
    } else if(bmi < 29.9){
        return "POVEĆANA TT";
    } else {
        return "PRETILOST";
    }
}

function hipsRatio(struk, bokovi){
    let gender = "MALE";
    let ratio = struk / bokovi;
    if(gender == "MALE"){
        if(ratio < 0.90){
            return "normalni nalaz"
        } 
        return "patoloski nalaz"
    } else {
        if(ratio < 0.85){
            return "normalni nalaz";
        }
        return "patoloski nalaz";
    }
}


$(document).on('change', '.tezina_id', function() {
	if($('.visina_id').val() != ""){
        let bmi = calculateBMI($(this).val(), $('.visina_id').val())
        $('.itm_id').attr('value', bmi);
    }
});

$(document).on('change', '.visina_id', function() {
	if($('.tezina_id').val() != ""){
        let bmi = calculateBMI($('.tezina_id').val(),$(this).val())
        $('.itm_id').attr('value', bmi);
    }
});

$(document).on('change', '.struk_id', function() {
	if($('.bokovi_id').val() != ""){
        let omjer = hipsRatio($(this).val(), $('.bokovi_id').val())
        $('.omjer_id').attr('value', omjer);
    }
});

$(document).on('change', '.bokovi_id', function() {
	if($('.struk_id').val() != ""){
        let omjer = hipsRatio($('.struk_id').val(), $(this).val())
        $('.omjer_id').attr('value', omjer);
    }
});

// pusenje_select
$(document).on('change', '.pusenje_select', function() {
	if($(this).prop('selectedIndex') == 1){
        $('[for=pusi_select]').show();
        $('.pusi_select').show();
        $('[for=br_nepusenje_id]').hide();
        $('.br_nepusenje_id').hide();
        $('[for=kolicina_id]').show();
        $('.kolicina_id').show(); 
        $('[for=staz_g_id]').show();
        $('.staz_g_id').show(); 
    } else if($(this).prop('selectedIndex') == 2){
        $('[for=pusi_select]').show();
        $('.pusi_select').show();
        $('[for=br_nepusenje_id]').show();
        $('.br_nepusenje_id').show();
        $('[for=kolicina_id]').show();
        $('.kolicina_id').show(); 
        $('[for=staz_g_id]').show();
        $('.staz_g_id').show(); 
    } else if ($(this).prop('selectedIndex') == 3){
        $('[for=pusi_select]').hide();
        $('.pusi_select').hide();
        $('[for=br_nepusenje_id]').hide();
        $('.br_nepusenje_id').hide();
        $('[for=kolicina_id]').hide();
        $('.kolicina_id').hide(); 
        $('[for=staz_g_id]').hide();
        $('.staz_g_id').hide(); 
    }
});

$(document).on('change', '.pusi_select', function() {
    if($(this).prop('selectedIndex') != 1){
        $('[for=kolicina_id]').hide();
        $('.kolicina_id').hide();    
    } else {
        $('[for=kolicina_id]').show();
        $('.kolicina_id').show();      
    }

})

$(document).on('change', '.zustra_akt_id', function(){
    if($(this).attr('value') != ""){
        let activity_value = calculateActivity($(this).attr('value')) + calculateActivity($('.umjerena_akt_id').attr('value'));
        if(activity_value == 2){
            $('.tjelesna_akt_id').attr('value', "Zadovoljavajuca")
        } else {
            $('.tjelesna_akt_id').attr('value', "Nezadovoljavajuca")
        }
    }
})

$(document).on('change', '.klinicki_pr_stopala', function(){
    if($(this).val().includes("Da")){
        $('.Nalaz').show();
    } else {
        $('.Nalaz').hide();
    }
})

$(document).on('change', '.fvc_id', function(){
    $('.datum_gripa_id').hide();
    $('.datum_pneumo_id').hide();
    $('.datum_egzacer_id').hide();
    $('.datum_hospitalizacija_id').hide();
})

$(document).on('change', '.gripa_id', function(){
    if($(this).val().includes("Da")){
        $('.datum_gripa_id').show();
    } else {
        $('.datum_gripa_id').hide();
    }
})

$(document).on('change', '.pneumo_id', function(){
    if($(this).val().includes("Da")){
        $('.datum_pneumo_id').show();
    } else {
        $('.datum_pneumo_id').hide();
    }
})

$(document).on('change', '.egzacer_id', function(){
    if($(this).prop('checked') == true){
        $('.datum_egzacer_id').show();
    } else {
        $('.datum_egzacer_id').hide();
    }
})

$(document).on('change', '.hospitalizacija_id', function(){
    if($(this).prop('checked') == true){
        $('.datum_hospitalizacija_id').show();
    } else {
        $('.datum_hospitalizacija_id').hide();
    }
})

$(document).on('change', '[placeholder="Nedjelja"]', function (params) {
    let week_sum = parseInt($('[placeholder="Ponedjeljak"]').val()) +
                    + parseInt($('[placeholder="Utorak"]').val())
                    + parseInt($('[placeholder="Srijeda"]').val())
                    + parseInt($('[placeholder="Četvrtak"]').val())
                    + parseInt($('[placeholder="Petak"]').val())
                    + parseInt($('[placeholder="Subota"]').val())
                    + parseInt($(this).val());
    $('.tjedno_id').attr('value', week_sum.toString())
})


function calculateActivity(value){
    if(value.includes("Nije odabrano")){
        return 0;
    } else if(value.includes("Da")){
        return 1;
    } else {
        return 0;
    }
}