const api = axios.create({
    baseURL: "https://api.thecatapi.com/v1"
})

api.defaults.headers.common['X-API-KEY'] = 'live_6j9PmfcCaJHnOqx5d1fg0FvjAYlAgL4SG72ACfIQRdbGolMIawAqQuJD3vh7iajJ'


const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=4&breed_ids=beng&api_key=live_6j9PmfcCaJHnOqx5d1fg0FvjAYlAgL4SG72ACfIQRdbGolMIawAqQuJD3vh7iajJ";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}/?api_key=live_6j9PmfcCaJHnOqx5d1fg0FvjAYlAgL4SG72ACfIQRdbGolMIawAqQuJD3vh7iajJ`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'

const btn = document.querySelector('#reload-cats')

btn.addEventListener('click', loadRandomMichis)
document.addEventListener('DOMContentLoaded', loadRandomMichis)

const spanError = document.getElementById('error')

async function loadRandomMichis() {
    try {
        const response = await fetch(API_URL_RANDOM)
        const cats = await response.json()

        if (response.status !== 200) {
            spanError.classList.remove('hidden')
            spanError.innerText = `⚠️ Hubo un error: ${response.status} ${cats.message}`
        } else {
            const toRender = [];
            const randomContainer = document.querySelector('.random-container');
            randomContainer.innerHTML = ""

            cats.forEach(element => {
                const article = document.createElement('article');
                const img = document.createElement('img');
                img.setAttribute('alt', 'Un michi random')
                const button = document.createElement('button');
                button.setAttribute('class', 'btn-save-cat')
                const textBtn = document.createTextNode('Guardar michi de favoritos');

                button.append(textBtn);
                img.src = element.url;

                article.append(img, button);
                toRender.push(article);

                button.onclick = () => {
                    saveFavouriteMichi(element.id);
                    console.log('El id del michi es: ', element.id);
                }
            });
            randomContainer.append(...toRender)
        }
    } catch (err) {
        console.error(err)
        spanError.classList.remove('hidden')
        spanError.innerText = `⚠️ Hubo un error: ${err}`
    }
}

async function loadFavouritesMichis() {
    try {
        const response = await fetch(API_URL_FAVOURITES, {
            method: "GET",
            headers: {
                'X-API-KEY': "live_6j9PmfcCaJHnOqx5d1fg0FvjAYlAgL4SG72ACfIQRdbGolMIawAqQuJD3vh7iajJ"
            }
        })
        const cats = await response.json()

        if (response.status !== 200) {
            spanError.classList.remove('hidden')
            spanError.innerText = `⚠️ Hubo un error: ${response.status} ${cats.message}`
        } else {
            const imgsContainer = document.querySelector('.favourite-container')
            imgsContainer.innerHTML = '';


            cats.forEach(image => {
                const article = document.createElement('article');
                const img = document.createElement('img');
                img.setAttribute('alt', 'Un gato que me gusta')
                const btn = document.createElement('button');
                const btnText = document.createTextNode('Sacar al michi de favoritos');

                btn.onclick = () => deleteFavouriteMichi(image.id);
                img.src = image.image.url
                btn.appendChild(btnText);
                article.append(img, btn);
                imgsContainer.appendChild(article);
            })
        }
    } catch (err) {
        console.error(err)
        spanError.classList.remove('hidden')
        spanError.innerText = `⚠️ Hubo un error: ${err}`
    }
}

const btnSaveCat = document.querySelector('.btn-save-cat')

async function saveFavouriteMichi(id) {
    try {
        const { data, status } = await api.post('/favourites', {
            image_id: id,
        })

        // Consumo de API con fetch
        /*  const rest = await fetch(API_URL_FAVOURITES, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'X-API-KEY': "live_6j9PmfcCaJHnOqx5d1fg0FvjAYlAgL4SG72ACfIQRdbGolMIawAqQuJD3vh7iajJ"
             },
             body: JSON.stringify({
                 'image_id': id,
             }),
         });
 
         const data = await rest.json(); */

        console.log('Save')

        if (status !== 200) {
            spanError.classList.remove('hidden')
            spanError.innerText = `⚠️ Hubo un error: ${status} ${data.message}`
        } else {
            console.log(`Michi guardado en favoritos`)
            loadFavouritesMichis()
        }
    }
    catch (err) {
        console.error(err)
    }
}

async function deleteFavouriteMichi(id) {
    try {
        const rest = await fetch(API_URL_FAVOURITES_DELETE(id), {
            method: 'DELETE',
            headers: {
                'X-API-KEY': "live_6j9PmfcCaJHnOqx5d1fg0FvjAYlAgL4SG72ACfIQRdbGolMIawAqQuJD3vh7iajJ"
            }
        });

        const data = await rest.json();

        if (rest.status !== 200) {
            spanError.classList.remove('hidden')
            spanError.innerText = `⚠️ Hubo un error: ${rest.status} ${data.message}`
        } else {
            console.log(`Michi eliminado de favoritos`)
            loadFavouritesMichis()
        }
    }
    catch (err) {
        console.error(err)
    }
}



const uploadMichi = document.getElementById('uploadMichiPhoto').addEventListener('click', uploadMichiPhoto)


async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);


    console.log(formData.get('file'))
    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': "live_6j9PmfcCaJHnOqx5d1fg0FvjAYlAgL4SG72ACfIQRdbGolMIawAqQuJD3vh7iajJ"
        },
        body: formData,
    })

    const data = await res.json()

    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error: ${res.status} ${data.message}`
        console.log({ data })
    } else {
        console.log('Foto de michi subida');
        console.log({ data })
        saveFavouriteMichi(data.id);
        hiddeAddMichiWindow()
    }


}

const previewEvent = document.getElementById('file').addEventListener('change', function () {
    const file = event.target.files[0];

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (event) {
        const imagePreview = document.getElementById('image-preview');
        console.log(event.target.result)
        imagePreview.setAttribute('src', event.target.result)
    }
})

loadFavouritesMichis();

const newMichi = document.getElementById('btn-upload-michi').addEventListener('click', () => {
    const newMichiWindow = document.querySelector('.background-block')
    newMichiWindow.classList.remove('hidden')
})

const closeNewMichi = document.getElementById('btn-close').addEventListener('click', hiddeAddMichiWindow)

function hiddeAddMichiWindow() {
    const newMichiWindonw = document.querySelector('.background-block');
    newMichiWindonw.classList.add('hidden');
}