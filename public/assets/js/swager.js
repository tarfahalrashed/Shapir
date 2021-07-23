const SwaggerClient = require('swagger-client');

// const requestInterceptor = (request) => {
//   console.log(request);
//   return request;
// };

// const responseInterceptor = (response) => {
//     console.log(response);
//     return response;
// };

SwaggerClient({ url: 'https://raw.githubusercontent.com/tarfahalrashed/Shapir/main/public/vimeo_openapi_summary.json', requestInterceptor, responseInterceptor })
  .then(client => client.execute({
      operationId: "search_videos",
      parameters: { query:"Adele", sort:"relevant", filter:"trending"},
      requestInterceptor: (request) => {
        // console.log("HUH2: ",request);
        return request;
      },
      responseInterceptor: (response) => {
        // console.log("HUH: ",response);
        return response;
    }
  }));