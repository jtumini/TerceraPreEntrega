import {User, Product} from './src/dao/factory'
import UserRepository from './src/repositories/user.repository.js'
import ProductRepository from './src/repositories/products.repository'

const table = document.getElementById('productsTable')

const socket = io() 

socket.on('updatedProducts', data => {
    table.innerHTML = 
        `<tr>
            <td><strong>Producto</strong></td>
            <td><strong>Descripción</strong></td>
            <td><strong>Precio</strong></td>
            <td><strong>Código</strong></td>
            <td><strong>Stock</strong></td>
            <td><strong>Categoría</strong></td>
        </tr>`;
        for (product of data) {
            let tr = document.createElement('tr')
            tr.innerHTML=
                        `   <td>${product.title}</td>
                            <td>${product.description}</td>
                            <td>${product.price}</td>
                            <td>${product.code}</td>
                            <td>${product.stock}</td>
                            <td>${product.category}</td>
                        `;
            table.getElementsByTagName('tbody')[0].appendChild(tr);
        }
} )



export const UserService = new UserRepository(new User())
export const ProductService = new ProductRepository(new Product())