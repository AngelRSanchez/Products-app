// CLASSES

class Product {
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }   
}

class UI {
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Price</strong>: ${product.price}
                    <strong>Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;

        productList.appendChild(element);
        
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            // Show the message
            this.showMessage('Product deleted successfully', 'info');
        }   
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        // SHOWING IN DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2500);
    }
}

// DOM Events

document.getElementById('product-form')
    .addEventListener('submit', function(e){
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        // Create a Instance of Product class
        const product = new Product(name, price, year);

        // Create a Instance of UI class 
        const ui = new UI();
        
        // Form validation
        if(name === '' || price === '' || year === ''){
             return ui.showMessage('Complete Fields Please!', 'danger');
        }
         
        // add "product instance" to ui
        ui.addProduct(product);

        // reset the form
        ui.resetForm();

        // Show the message
        ui.showMessage('Product added successfully', 'success');
        
        e.preventDefault();
    });

document.getElementById('product-list')
    .addEventListener('click', function(e){
        const ui = new UI();

        // Capturing event
        ui.deleteProduct(e.target);
    });