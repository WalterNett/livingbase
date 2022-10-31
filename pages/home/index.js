class Postagens{


    static renderPost (dados){

        const sectioNoticias = document.querySelector('.posts')
        const divNoticias = document.createElement("ul")
        

        dados.forEach(element => {
            const noticias = document.createElement('li')
            noticias.classList.add('noticias-card')
            divNoticias.append(noticias)

           this.criarPost(element, noticias)
        });
        sectioNoticias.appendChild(divNoticias)
    }


    static criarPost(data, pai ){

                const fotoNoticia = document.createElement("img")
                const divInfo = document.createElement('div')
                    const tituloNoticia = document.createElement('h3')
                    const descricaoNoticia = document.createElement('p')
                    const noticiaCompleta = document.createElement('button')


        fotoNoticia.src = data.image  
        divInfo.classList.add('noticia-info')  
        
        tituloNoticia.innerText = data.title
        descricaoNoticia.innerText = data.description
        noticiaCompleta.innerText = 'Acessar conteúdo'
        noticiaCompleta.classList.add('acessar-noticia')



        noticiaCompleta.addEventListener('click', (event) =>{
            event.preventDefault()
            localStorage.setItem('idPost', data.id)
            location.assign('../post/index.html')
        })

        pai.append(fotoNoticia, divInfo)
        divInfo.append(tituloNoticia, descricaoNoticia, noticiaCompleta)
    }

}

class requestPost {

    static baseUrl = 'https://m2-api-living.herokuapp.com'
    static headers = {
        'Content-Type':"application/json",
    }

    static async posts(){

        const getPost = await fetch(`${this.baseUrl}/news`,{
            method:"GET",
            headers: this.headers
        })

        .then(res => res.json())   
        .then(res => {
           Postagens.renderPost(res.news)
           Category.renderPorCategory(res.news)
           Category.renderAll(res.news)
        })
        .catch(err => console.log(err))

    }

}

class Category {


    static renderAll(dados){
        const sectioNoticias = document.querySelector('.posts')
        const btnAll = document.getElementById('todos')
        btnAll.addEventListener('click', (event) =>{
            sectioNoticias.innerHTML =' '
            Postagens.renderPost(dados)
        })
    }


    static renderPorCategory (dados){

        const sectioNoticias = document.querySelector('.posts')
        const buttons = document.querySelectorAll('.button')
        let newArray = []

        buttons.forEach(botoes =>{
            botoes.addEventListener('click', (event) =>{
                let newArray = []
                event.preventDefault()
                sectioNoticias.innerHTML = ''
                dados.forEach(element => {
                    if (botoes.id == element.category){
                        
                        newArray.push(element)    
                        
                    }

                    
                });
                Postagens.renderPost(newArray)
            })
        })
    }


}

function voltarAoTopo (){

    const voltar = document.getElementById('voltar-top')
    voltar.addEventListener('click', (event) =>{
        event.preventDefault()
        window.scrollTo(0,0)
    })
}

requestPost.posts()
voltarAoTopo ()