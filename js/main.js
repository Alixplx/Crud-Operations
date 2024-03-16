let ddlcategory = document.getElementById('ddlcategory');
let category = document.getElementById('category');
let product = document.getElementById('product');
let quantity = document.getElementById('quantity');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');


let categoryArry;
let productArr;

let buttonMode = "Create"
let productId

localStorage.Category != null ? categoryArry = JSON.parse(localStorage.Category) : categoryArry = [];
localStorage.Product != null ? productArr = JSON.parse(localStorage.Product) : productArr = [];

// Create Product
function createCategory() {

    let objCategory = {

        category: category.value
    };

    categoryArry.push(objCategory);
    localStorage.setItem('Category', JSON.stringify(categoryArry));
    reset();
    showCategory();
    showTableCategory();
    countCategory();
}

//Reset Category
function reset() {

    category.value = '';
}

//show Data 
function showCategory() {

    let item = '';
    item += `<option value="">Select Category........</option>`

    for (let i = 0; i < categoryArry.length; i++) {

        item += `<option value="${i}">${categoryArry[i].category}</option>`
    }

    ddlcategory.innerHTML = item;
}

// Show Table Category
function showTableCategory() {

    let table = '';

    for (let i = 0; i < categoryArry.length; i++) {

        table += `
        <tr>

            <td>${i}</td>
            <td>${categoryArry[i].category}</td>

            <td>

                <button class="btn btn-danger" onclick="deleteCategory(${i})"> <i class="fas fa-trash"></i></button>
            </td>
        </tr>
        `;
    }

    document.getElementById('bodyCategory').innerHTML = table;
}

// Delete Category
function deleteCategory(id) {

    if (confirm('Are You Want To Delete?') == true) {

        categoryArry.splice(id, 1);
        localStorage.Category = JSON.stringify(categoryArry);
        showTableCategory();
        showCategory();
        countCategory();
    }    
}

// Count Category
function countCategory() {

    document.getElementById('countCategory').innerHTML = `-Total Category (${categoryArry.length})`;
}

// Validation Category
function validationCategory() {

    let valid = true;

    if (category.value == '') {

        alert('Enter A Category Name.....')
        valid = false;

    } else {

        createCategory();
        valid = true;
    }

    return valid;
}

// Get Total
function getTotal() {

    if (price.value != 0) {

        let getTotal = (quantity.value * price.value) - discount.value;
        total.value = getTotal
        total.className.replace = "form-control bg-danger text-white text-center"
        total.className = "form-control bg-success text-white text-center"

    } else {

        total.value = 0
        total.className.replace = "form-control bg-success text-white text-center"
        total.className = "form-control bg-danger text-white text-center"
    }
}

// Create Product
function createProduct() {

    let = createProduct = {

        ddlcategory: ddlcategory.options[ddlcategory.selectedIndex].text,
        product: product.value,
        quantity: quantity.value,
        price: price.value,
        discount: discount.value,
        total: total.value
    }

    if (buttonMode === "Create") {

        productArr.push(createProduct)

    } else {

        productArr[productId] = createProduct
        document.getElementById('create-btn').className.replace = 'btn btn-info w-25'
        document.getElementById('create-btn').className = 'btn btn-success w-25'
    }

    localStorage.setItem("Product", JSON.stringify(productArr))
    resetFields()
    displayTableProduct()
    countProduct()
    getTotal()
}

// Reset Data
function resetFields() {

    ddlcategory.options[ddlcategory.selectedIndex].text = "Select Category........";
    product.value = '';
    quantity.value = 0;
    price.value = 0;
    discount.value = 0;
    total.value = 0;

    document.getElementById('create-btn').className.replace = 'btn btn-info w-25'
    document.getElementById('create-btn').className = 'btn btn-success w-25'
}

// Display Table Product
function displayTableProduct() {

    let tableProduct = '';

    for (let x = 0; x < productArr.length; x++) {

        tableProduct += `
        <tr>
            <td>${x}</td>
            <td>${productArr[x].ddlcategory}</td>
            <td>${productArr[x].product}</td>
            <td>${productArr[x].quantity}</td>
            <td>${productArr[x].price}</td>
            <td>${productArr[x].discount}</td>
            <td>${productArr[x].total}</td>
            <td>
                <button class="btn btn-info" onclick="editProduct(${x})"> 
                    <i class="fas fa-edit"></i>
                </button>

                <button class="btn btn-danger" onclick="deleteProduct(${x})"> 
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }

    document.getElementById('bodyCategory').innerHTML = tableProduct;
}

// Delete Product
function deleteProduct(id) {

    if (confirm('Are You Sure To Delete This Item?') == true) {

        productArr.splice(id, 1)
        localStorage.Product = JSON.stringify(productArr)
        displayTableProduct()
        countProduct()
    }
}

// Edit Product
function editProduct(id) {

    ddlcategory.options[ddlcategory.selectedIndex].text = productArr[id].ddlcategory
    product.value = productArr[id].product
    quantity.value = productArr[id].quantity
    price.value = productArr[id].price
    discount.value = productArr[id].discount
    total.value = productArr[id].total

    buttonMode = "Update"
    productId = id

    document.getElementById('create-btn').className.replace = 'btn btn-success w-25'
    document.getElementById('create-btn').className = 'btn btn-info w-25'
}

// Count Product
function countProduct() {

    document.getElementById('countProduct').innerHTML = `Total Products is (${productArr.length})`
}

// Validation Product
function validationProduct() {

    let labelCategory = document.getElementById('lbCategory')
    let labelProduct = document.getElementById('lbProduct')
    let labelQuantity = document.getElementById('lbquantity')
    let labelPrice = document.getElementById('lbPrice')

    let valid = true

    if (ddlcategory.options[ddlcategory.selectedIndex].text == 'Select Category........') {

        labelCategory.innerHTML = 'Category : * [Required]'
        labelCategory.style.color = 'red'
        valid = false

    } else {

        labelCategory.innerHTML = 'Category : *'
        labelCategory.style.color = 'white'
        valid = false
    }

    if (product.value == '') {

        labelProduct.innerHTML = 'Product Name : * [Required]'
        labelProduct.style.color = 'red'
        valid = false

    } else {

        labelProduct.innerHTML = 'Product Name : *'
        labelProduct.style.color = 'white'
        valid = true
    }

    if (quantity.value == 0) {

        labelQuantity.innerHTML = 'Quantity : * [Required]'
        labelQuantity.style.color = 'red'
        valid = false

    } else {

        labelQuantity.innerHTML = 'Quantity : *'
        labelQuantity.style.color = 'white'
        valid = true
    }

    if (price.value == 0) {

        labelPrice.innerHTML = 'Price : * [Required]'
        labelPrice.style.color = 'red'
        valid = false

    } else {

        labelPrice.innerHTML = 'Price : *'
        labelPrice.style.color = 'white'
        valid = true
    }

    if (ddlcategory.options[ddlcategory.selectedIndex].text != '' && product.value != 0 
        && quantity.value != 0 && price.value != 0) {

        createProduct()
    }

    return valid
}

// Run TableData
$(document).ready(function() {

    showCategory()
    showTableCategory()
    countCategory()
    displayTableProduct()
    countProduct()
    $('#tablPro').DataTable()
});