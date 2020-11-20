
const CATEGORIES_URL = "http://localhost:3000/categories_URL";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/productpublish";
const CATEGORY_INFO_URL = "http://localhost:3000/category_info_URL";
const PRODUCTS_URL = "http://localhost:3000/products";
const PRODUCT_INFO_URL = "http://localhost:3000/product_info_URL";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/product_info_comments_URL";
const CART_INFO_URL = "http://localhost:3000/cart_info_URL";
const CART_BUY_URL = "http://localhost:3000/cart_buy_URL";
const CART_INFO2_URL = "http://localhost:3000/cart_info2_URL";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(URL){
    var result = {};
    showSpinner();
    return fetch(URL)
    .then(response => {
      if (response.ok) {
        return response.json();
        
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}







