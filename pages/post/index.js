class GetPost {


    static baseUrl = 'https://m2-api-living.herokuapp.com'
    static headers = {
        'Content-Type':"application/json",
    }
    static postId = localStorage.getItem('idPost')

    static async postID(){

        const getPostId = await fetch(`${this.baseUrl}/news/${this.postId}`, {
            method:'GET',
            headers: this.headers
        })

        .then(res => res.json())
        .then(res =>{
            this.renderPost(res)
            HomeRedirect.redirect(res)

        })
        .catch(error => console.log(error))
    }


    static renderPost(data){
    
        const main = document.querySelector('main')
        const sectionPost = document.createElement('section')
        const post = document.createElement('div')
            const divTitle = document.createElement('div')  
                const titulo = document.createElement('h2')
                const desciption = document.createElement('p')
            const imgPost = document.createElement('img')  
            const contentNoticia = document.createElement('p')  

        sectionPost.classList.add('postDiv')    
        post.classList.add('post')
        divTitle.classList.add('div-titulo')

        titulo.innerText = data.title
        desciption.innerText = data.description
        imgPost.src = data.image
        contentNoticia.innerText = data.content

        post.append(divTitle, imgPost, contentNoticia)
        divTitle.append(titulo, desciption)
        sectionPost.appendChild(post)
        main.appendChild(sectionPost)
    }
}



GetPost.postID()

class HomeRedirect {

    static redirect (dados){

        const homeBtn = document.getElementById('home')
        homeBtn.addEventListener('click',(event) =>{
            event.preventDefault()
            localStorage.clear()
            localStorage.setItem('category', dados.id)
            location.assign('../home/index.html')
        })

    }
}