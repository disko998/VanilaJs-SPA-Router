
export default class Router {

    constructor(){
       this.routes = [];
    }

    get(uri, callback){
        // ensure that the parameters are not empty
        if(!uri || !callback) throw new Error('uri or callback must be given');

        // ensure that the parameters have the correct types
        if(typeof uri !== "string") throw new TypeError('typeof uri must be a string');
        if(typeof callback !== "function") throw new TypeError('typeof callback must be a function');

        // throw an error if the route uri already exists to avoid confilicting routes
        this.routes.forEach(route=>{
            if(route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
        })

        // Step 5 - add route to the array of routes
        const route = {
            uri, // in javascript, this is the same as uri: uri, callback: callback, avoids repition
            callback
        }
        this.routes.push(route);
    }

    render(){
        this.routes.some(route => {
            let regEx = new RegExp(`^${route.uri}$`); // i'll explain this conversion to regular expression below
            let path = window.location.pathname;

            if(path.match(regEx)){
                // our route logic is true, return the corresponding callback
                let rootContainer = document.getElementById('root')
                const req = {path}

                rootContainer.innerHTML = route.callback(req)
            }
        })
    }

  navigate(route) {
    window.history.pushState({},'', route);
    this.render()
  }
}


// export default class Router {

//     constructor(routes) {
//       this.routes = routes;
//       this._loadInitialRoute();
//     }
  
//     loadRoute(...urlSegments) {
//         // Attempt to match the URL to a route.
//         const matchedRoute = this._matchUrlToRoute(urlSegments);

//         // Push a history entry with the new URL.
//         // We pass an empty object and an empty string as the historyState
//         // and title arguments, but their values do not really matter here.
//         const url = `/${urlSegments.join('/')}`;
//         history.pushState({}, '', url);
    
//         // Append the template of the matched route to the DOM, 
//         // inside the element with attribute data-router-outlet.
//         const routerOutletElement = document.querySelectorAll('#root')[0];

//         // routerOutletElement.innerHTML = matchedRoute.template;
//         routerOutletElement.innerHTML = matchedRoute.getTemplate(matchedRoute.params)
//     }
  
//     _matchUrlToRoute(urlSegments) {
//         const routeParams = {};
      
//         // Try and match the URL to a route.
//         const matchedRoute = this.routes.find(route => {
      
//           // We assume that the route path always starts with a slash, and so 
//           // the first item in the segments array  will always be an empty
//           // string. Slice the array at index 1 to ignore this empty string.
//           const routePathSegments = route.path.split('/').slice(1);
      
//           // If there are different numbers of segments, then the route does not match the URL.
//           if (routePathSegments.length !== urlSegments.length) {
//             return false;
//           }
      
//           // If each segment in the url matches the corresponding segment in the route path, 
//           // or the route path segment starts with a ':' then the route is matched.
//           const match = routePathSegments.every((routePathSegment, i) => {
//             return routePathSegment === urlSegments[i] || routePathSegment[0] === ':';
//           });
      
//           // If the route matches the URL, pull out any params from the URL.
//           if (match) {
//             routePathSegments.forEach((segment, i) => {
//               if (segment[0] === ':') {
//                 const propName = segment.slice(1);
//                 routeParams[propName] = decodeURIComponent(urlSegments[i]);
//               }
//             });
//           }
//           return match;
//         });

//         return { ...matchedRoute, params: routeParams };
//       }
  
//     _loadInitialRoute() {
//       // Figure out the path segments for the route which should load initially.
//       const pathnameSplit = window.location.pathname.split('/');
//       const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
//       console.log(pathSegments)
  
//       // Load the initial route.
//       this.loadRoute(...pathSegments );
//     }
//   }