function ajaxPoziv(nazivFajla,rezultat) {
    $.ajax({
        url : "assets/data/" + nazivFajla,
        type : "GET",
        dataType : "json",
        success : rezultat,
        error : function(xhr,status,error) {
            console.log(error);
        }
    })
}
window.onload = function (){
    function ispisMenia(nizMeni) {
        let ispis = '<ul class="navbar-nav">'
        let brojac = 0
        for (let obj of nizMeni) {
            if (brojac == 2) {
                ispis += `<li class="nav-item">
                <a class="nav-link active" href="${obj.href}">${obj.naziv}</a>
                </li>`
            }
            else{ispis += `<li class="nav-item">
            <a class="nav-link" href="${obj.href}">${obj.naziv}</a>
            </li>`}
            brojac++;
        }
        ispis += '</ul>'
        document.getElementById("navbarNav").innerHTML=ispis;
    }

    ajaxPoziv("meni.json",function(rezultat) {
        ispisMenia(rezultat);
    });
}