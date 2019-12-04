import "./styles.scss";
import Router from './router/router.js';

const router = new Router();

router.get('/about', function(req){
      console.log(req.path);
      return `<h1>About Page</h1>`
})
router.get('/', function(req){
    console.log(req.path);
    return `<h1>Home Page</h1>`
})
router.get('/contact', function(req){
    console.log(req.path);
    return `<h1>Contact Page</h1>`
})

router.render();

const btns = document.getElementsByClassName('routs')
for (let btn of btns) {
    btn.addEventListener('click', function(e) {
        e.preventDefault()
    
        switch (e.target.name) {
            case 'home':
                router.navigate('/')
                break;
            case 'about':
                router.navigate('/about')
                break;
            case 'contact':
                router.navigate('/contact')
                break;
            default:
                break;
        }
    })
}


window.addEventListener('load', function() {
    console.log('reloading')
})
window.addEventListener('hashchange', function() {
    console.log('hashchange')
})
window.onpopstate = function(event) {
    router.render()
  }





// const routes = [
//     {
//         path: '/',
//         getTemplate: (params) => '<h1>Home</h1>'
//     },
//     {
//         path: '/about',
//         getTemplate: (params) => '<h1>About</h1>'
//     },
//     {
//         path: '/contact',
//         getTemplate: (params) => '<h1>Contact</h1>'
//     },
//     {
//         path: '/products/:productId',
//         getTemplate: (params) => `<h1>Product ${params.productId}</h1>`
//     }
//   ];


// const router = new Router(routes);

// const btns = document.getElementsByClassName('routs')

// for (let btn of btns) {
//     btn.addEventListener('click', function(e) {
//         e.preventDefault()
    
//         switch (e.target.name) {
//             case 'home':
//                 router.loadRoute('')
//                 break;
//             case 'about':
//                 router.loadRoute('about')
//                 break;
//             case 'contact':
//                 router.loadRoute('contact')
//                 break;
//             case 'product1':
//                 router.loadRoute('products', 1)
//                 break;
//             case 'product2':
//                 router.loadRoute('products', 2)
//                 break;
        
//             default:
//                 break;
//         }
//     })
// }