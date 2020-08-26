console.log('AJAX - warsztat - (Infinite scroll)');


let endOfThePage = 0;
let preLoading = false;

const showPreloader = () => {
    let preloader = document.getElementById('preloader');
    console.log(`showPreloader()`);
    preloader.style.display = 'block';
    preLoading = true;

}

const hidePreloader = () => {
    let preloader = document.getElementById('preloader');
    console.log(`hidePreloader()`);
    preloader.style.display = 'none';
    preLoading = false;
}



const getData = () => {
    // console.log(`getData`);
    if (!preLoading) {
        showPreloader();

        fetch(`https://akademia108.pl/api/ajax/get-users.php`)
            .then(res => res.json())
            .then(data => {

                let body = document.body;
                let hr = document.createElement('hr');
                body.appendChild(hr);

                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebsite = document.createElement('p');
                    let br = document.createElement('br');

                    pId.innerText = `User ID: ${user.id}`;
                    pName.innerText = `User Name: ${user.name}`;
                    pWebsite.innerText = `User Website: ${user.website}`;

                    let body = document.body;

                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebsite);
                    body.appendChild(br);

                }

                hidePreloader();

                // console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }
}



const scrollToEndOfPage = () => {

    //dokument czyli strona /wysokość
    let d = document.documentElement;
    //pobieramy do zmn. całą wysokość strony
    let scrollHeight = d.scrollHeight;
    //ilość pikseli jaką przescrollowaliśmy od góry strony
    let scrollTop = d.scrollTop;
    // wewnętrzna wysokośc okna przegladarki/ dokumentu
    let clientHeight = d.clientHeight;


    let sumaWysokoscTopIClient = Math.ceil(scrollTop + clientHeight);


    console.log(`scrollHeight: ${scrollHeight}`);
    console.log('sumaWysokoscTopIClient');
    console.log(`scrollTop: ${scrollTop}`);
    console.log(`clientHeight: ${clientHeight}`);
    console.log(`=========================`);


    if (sumaWysokoscTopIClient >= scrollHeight) {

        console.log(`przeskrolowano do konca strony`);


        getData();

    }


}



window.addEventListener('scroll', scrollToEndOfPage);







