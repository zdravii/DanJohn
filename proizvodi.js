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

window.onload = function() {

    // ispisBrojaPorizvoda();

    function ispisMenia(nizMeni) {
        let ispis = '<ul class="navbar-nav">'
        let brojac = 0
        for (let obj of nizMeni) {
            if (brojac == 1) {
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
        
    function ispisDDL(nizDDL,divZaIspis) {
        let ispis =''
        for (let obj of nizDDL) {
            ispis += `<option value="${obj.id}">${obj.naziv}</option>`
        }
        document.getElementById(divZaIspis).innerHTML=ispis;
    }

    ispisBrojaPorizvoda();

    function ispisProizvoda(nizProizvoda) {
        let ispis = '';
        let brojac = 0;
        if (nizProizvoda.length != 0) {
            if (brojac%4==0) {
                ispis += '<div class="row mt-3">'
                for (let obj of nizProizvoda) {
                    if (obj.cena.staraCena!=null) {
                        ispis += `<div class="col-lg-3">
                                        <div class="row">
                                            <img src="${obj.slika}" alt="${obj.naziv}"/>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <p class="bg-danger text-center rounded-pill text-light">-${obj.popust}%<p>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <h4>${obj.naziv}</h4>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <p class="text-decoration-line-through">${obj.cena.staraCena}9,00 RSD</p><p>${obj.cena.novaCena},00 RSD</p>
                                            </div>
                                            <div class="col-6">
                                                <button type="button" data-id=${obj.id} class="btn btn-dark mt-3">Dodaj u korpu</button>
                                            </div>
                                        </div>
                                    </div>`
                    }
                    else{
                        ispis += `<div class="col-lg-3">
                        <div class="row"><img src="${obj.slika}" alt="${obj.naziv}"/></div>
                        <div class="row mt-2"><h4>${obj.naziv}</h4></div>
                        <div class="row mt-2">
                            <div class="col-6">
                                <p>${obj.cena.novaCena},00 RSD</p>
                            </div>
                            <div class="col-6">
                                <button type="button" data-id=${obj.id} class="btn btn-dark">Dodaj u korpu</button>
                            </div>
                        </div>
                    </div>`
                    }
                }
                ispis += '</div>';
                brojac++;
            }
            else{
                for (let obj of nizProizvoda) {
                    if (obj.cena.staraCena!=null) {
                        ispis += `<div class="col-lg-3">
                                <div class="row"><img src="${obj.slika}" alt="${obj.naziv}"/></div>
                                <div class="row mt-2"><h4>${obj.naziv}</h4></div>
                                <div class="row">
                                            <div class="col-6">
                                                <p class="text-decoration-line-through">${obj.cena.staraCena}9,00 RSD</p><p>${obj.cena.novaCena},00 RSD</p>
                                            </div>
                                            <div class="col-6">
                                                <button type="button" data-id=${obj.id} class="btn btn-dark mt-3">Dodaj u korpu</button>
                                            </div>
                                        </div>
                            </div>`
                    }
                    else{
                        ispis += `<div class="col-lg-3">
                        <div class="row"><img src="${obj.slika}" alt="${obj.naziv}"/></div>
                        <div class="row mt-2"><h4>${obj.naziv}</h4></div>
                        <div class="row mt-2">
                            <div class="col-6">
                                <p>${obj.cena.novaCena},00 RSD</p>
                            </div>
                            <div class="col-6">
                                <button type="button" data-id=${obj.id} class="btn btn-dark">Dodaj u korpu</button>
                            </div>
                        </div>
                    </div>`
                    }
                }
                brojac++;
            }
        }
        else{
            ispis += '<div class="row"><div class="col-lg-12><p class="h1">Trenutno nema proizvoda!</p></div></div>';
        }
        document.getElementById("ispisProizvoda").innerHTML = ispis;
        $('.btn').click(dodajUKorpu);
    }

    function dodajUKorpu() {
        let idProizvoda = $(this).data('id');
        // console.log(idProizvoda);
        var proizovdIzKorpe = uzmiItemIzLocalStorage("proizvodIzKorpe")
        if (proizovdIzKorpe) {
            if (daLiJeProizvodVecUKorpi()) {
                uvecajKolicinu();
            }
            else{
                DodajProizvodUKorpu();
                ispisBrojaPorizvoda();
            }
        }
        else {
            dodajPrviProizvodUKorpu();
            ispisBrojaPorizvoda();
        }

        function dodajPrviProizvodUKorpu() {
            let proizvodi = [];
            proizvodi[0] = {
                id : idProizvoda,
                kolicina : 1
            }
            dodajItemULocalStorage("proizvodIzKorpe",proizvodi)
        }

        function daLiJeProizvodVecUKorpi() {
            return proizovdIzKorpe.filter(p=>p.id == idProizvoda).length;
        }

        function uvecajKolicinu() {
            let proizvodiLS = uzmiItemIzLocalStorage("proizvodIzKorpe");
            for (let proizvod of proizvodiLS) {
                if(proizvod.id == idProizvoda){
                    proizvod.kolicina++;
                    break;
                }
            }
            dodajItemULocalStorage("proizvodIzKorpe",proizvodiLS);
        }

        function DodajProizvodUKorpu() {
            let nizLS = uzmiItemIzLocalStorage("proizvodIzKorpe");
            nizLS.push({
                id : idProizvoda,
                kolicina : 1
            });
            dodajItemULocalStorage("proizvodIzKorpe",nizLS);
        }
    }

    function ispisBrojaPorizvoda() {
        let proizovdIzKorpe = uzmiItemIzLocalStorage("proizvodIzKorpe");
        if (proizovdIzKorpe) {
            let text = "";
            if (proizovdIzKorpe.length == 1) {
                text = "proizvod";
            }
            else{
                text = "proizvoda";
            }
            $('#brojProizvoda').html(`<p class="mt-2">(${proizovdIzKorpe.length} ${text})</p>`)
        }
        else{
            $('#brojProizvoda').html('<p class="mt-2">(0 proizvoda)</p>')
        }
    }

    function dodajItemULocalStorage(key,value) {
        localStorage.setItem(key,JSON.stringify(value));
    }

    function uzmiItemIzLocalStorage(item) {
        return JSON.parse(localStorage.getItem(item));
    }

    ajaxPoziv("ddlBoje.json",function(rezultat){
        ispisDDL(rezultat,"ddlFilterBoja");
    })

    ajaxPoziv("ddlKategorije.json",function(rezultat) {
        ispisDDL(rezultat,"ddlFilterKategorija");
    })

    ajaxPoziv("ddlMaterijal.json",function(rezultat) {
        ispisDDL(rezultat,"ddlFilterMaterijal");
    })
    
    ajaxPoziv("proizvodi.json",function(rezultat) {
        ispisProizvoda(rezultat);
    })

    ajaxPoziv("ddlSortiranje.json",function(rezultat) {
        ispisDDL(rezultat,"ddlSortiranje");
    })

    $(document).on("change","#ddlSortiranje",function () {
    
        let uslov = $("#ddlSortiranje").val();

        ajaxPoziv("proizvodi.json",function(rezultat) {
            let proizvodi = rezultat;
            if (uslov == "poNazivuAsc") {
                proizvodi.sort(function (a,b) {
                    if(a.naziv < b.naziv){
                        return -1
                    }
                    else if(a.naziv == b.naziv){
                        return 0;
                    }
                    else{
                        return 1;
                    }
                })
            }
            if (uslov == "poNazivuDesc") {
                proizvodi.sort(function (a,b) {
                    if(a.naziv < b.naziv){
                        return 1;
                    }
                    else if(a.naziv == b.naziv){
                        return 0;
                    }
                    else{
                        return -1;
                    }
                })
            }
            if (uslov == "poCeniAsc") {
                proizvodi.sort(function (a,b) {
                    return a.cena.novaCena - b.cena.novaCena;
                })
            }
            if (uslov == "poCeniDesc") {
                proizvodi.sort(function (a,b) {
                    return b.cena.novaCena - a.cena.novaCena;
                })
            }
            if (uslov == "poPopustuAsc") {
                proizvodi.sort(function (a,b) {
                    return a.popust - b.popust;
                })
            }
            if (uslov == "poPopustuDesc") {
                proizvodi.sort(function (a,b) {
              return b.popust - a.popust;
})
}
     ispisProizvoda(proizvodi);
    })

       

})

    function sortiraj(nizProizvoda, tip) {
        console.log(nizProizvoda);
        let sortiraniNiz = [];
        switch (tip) {
            case 'poCeniAsc':
                sortiraniNiz = nizProizvoda.sort(function (a, b) {
                    return a.cena.novaCena - b.cena.novaCena
                })
                break;
        
            case 'poCeniDesc':
                sortiraniNiz = nizProizvoda.sort(function (a, b) {
                    return b.cena.novaCena - a.cena.novaCena
                })
                break;
            case 'poNazivuAsc':
                sortiraniNiz = nizProizvoda.sort(function (a, b) {
                    return a.naziv - b.naziv
                })
                break;
        
            case 'poNazivuDesc':
                sortiraniNiz = nizProizvoda.sort(function (a, b) {
                    return b.naziv - a.naziv
                })
                break;
            case 'poPopustuAsc':
                sortiraniNiz = nizProizvoda.sort(function (a, b) {
                    return a.popust - b.popust
                })
                break;
        
            case 'poPopustuDesc':
                sortiraniNiz = nizProizvoda.sort(function (a, b) {
                    return b.popust - a.popust
                })
                break;
        }
        return sortiraniNiz;
    }

    $('.ddlFilter,.ddlSortiranje').on("change",function () {
        let idKategorije = parseInt($('#ddlFilterKategorija').val());
        let idMaterijala = parseInt($('#ddlFilterMaterijal').val());
        let idBoje = parseInt($('#ddlFilterBoja').val());
        // let uslov = $("#ddlSortiranje").val();
        ajaxPoziv("proizvodi.json",function(rezultat){
            let filtriraniProizvodi = rezultat;
            filtriraniProizvodi = idKategorije ? filtriraniProizvodi.filter(element => element.idKategorije == idKategorije) : filtriraniProizvodi;
            filtriraniProizvodi = idBoje ? filtriraniProizvodi.filter(element => element.idBoje == idBoje) : filtriraniProizvodi;
            filtriraniProizvodi = idMaterijala ? filtriraniProizvodi.filter(element => element.idMaterijala == idMaterijala) : filtriraniProizvodi;
            // if (uslov != "0") {
            //     filtriraniProizvodi = sortiraj(filtriraniProizvodi,uslov);
            // }

            ispisProizvoda(filtriraniProizvodi);
        })
        
    })
}