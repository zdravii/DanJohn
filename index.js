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
window.onload = function () {
        
    function ispisMenia(nizMeni) {
            let ispis = '<ul class="navbar-nav">'
            let brojac = 0
            for (let obj of nizMeni) {
                if (brojac == 0) {
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

    function ispisPrecica(nizPrecica) {
            let ispis ="";
            for (let precica of nizPrecica) {
                ispis +=`<div class="col-lg-6"><img class="" src="${precica.slika}" alt="${precica.naziv}"/><div class=""><h3>${precica.naslov}</h3><p>${precica.tekst}</p></div></div>`
            }
            document.getElementById("precice").innerHTML = ispis;
    }

    function ispisNovosti(novosti) {
            let ispis = "";
            for (let novost of novosti) {
                ispis += `<div class="row"><h4>${novost.naslov}</h4></div><div class="row"><p>${novost.tekst}</p></div>`
            }
            document.getElementById("novosti").innerHTML=ispis;
    }

    ajaxPoziv("precica.json",function (rezultat) {
            ispisPrecica(rezultat);
    })

    ajaxPoziv("novosti.json",function (rezultat) {
        ispisNovosti(rezultat);
    })

    var swiper = new Swiper(".mySwiper", {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
}


    

    

    