// Quản lý sản phẩm


let store = new PhoneStore(1, "Phone Store");
let filteredList = null;
let imageDataURL = "";
let isEditing = false; // Biến để theo dõi trạng thái sửa
let editingProductId = null; // Biến để lưu ID sản phẩm đang sửa
let product = new Product("", "", 0, 0, "", "", []);
product.loadBranchFromLocalStorage();

store.loadFromLocalStorage();
function renderProductList() {
    let productList = filteredList ?? store.getListProduct();

    let html = ``;
    for (let i = 0; i < productList.length; i++) {
        let product = productList[i];

        let branchNames = "Chưa có";

        let branches = product.getListBranch();
        if (branches && Array.isArray(branches) && branches.length > 0) {
            branchNames = branches.map(function (branch) {
                return branch.name_branch;
            }).join(", ");
        }
        // console.log(product);
        html +=
            `
        <tr>
            <td>${product.id_product}</td>
            <td>${product.name_product}</td>
            <td>${product.price_product} VND </td>
            <td>${product.quantity_product}</td>
            <td>${branchNames}</td>
            <td><img src="${product.image_product}" alt="${product.name_product}" class="img-fluid" style="max-width: 150px"></td>
            <td style="max-width: 300px;">${product.description_product}</td>
            <td style="height: 30vh" class="d-flex justify-content-center align-items-center">
                <button class="btn btn-danger" onclick="removeProduct('${product.id_product}')">Xóa</button>
                <button class="btn btn-warning" onclick="showUpdateForm('${product.id_product}')">Sửa</button>
            </td>
        `
    }
    document.getElementById("productList").innerHTML = html;
}

// document.getElementById("productImage").addEventListener("change", function () {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();

//         reader.onload = function (e) {
//             imageDataURL = e.target.result; // Lưu dữ liệu hình ảnh dưới dạng Data URL
//             document.getElementById("previewImage").src = imageDataURL;
//             // Bạn có thể lưu `e.target.result` này vào thuộc tính sản phẩm nếu cần
//         };

//         reader.readAsDataURL(file);
//     }
// });

// document.getElementById("productImage").addEventListener("change", function () {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             imageDataURL = e.target.result;
//             document.getElementById("previewImage").src = imageDataURL;
//         };
//         reader.readAsDataURL(file);
//     }
// });

document.getElementById("productImage").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imageDataURL = e.target.result; // Lưu ảnh dạng base64
            document.getElementById("previewImage").src = imageDataURL; // Hiển thị ảnh
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById("addProductBtn").addEventListener("click", function () {
    renderBranchOptions(); // load danh sách thương hiệu
});



document.getElementById("productForm").addEventListener("submit", addProduct);

function addProduct(event) {
    event.preventDefault();

    let id = document.getElementById("productId").value.trim();
    let name = document.getElementById("productName").value.trim();
    let price = Number(document.getElementById("productPrice").value);
    let quantity = Number(document.getElementById("productQuantity").value);
    let description = document.getElementById("productDescription").value;

    if (!id || !name || isNaN(price) || isNaN(quantity) || !imageDataURL || !description) {
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        return;
    }

    // let newProduct = new Product(id, name, price, quantity, imageDataURL, description);
    // let selectedBranchId = document.getElementById("branchSelect").value;
    // let selectedBranch = store.list_branch.find(branch => branch.id_branch === selectedBranchId);
    let selectedBranchId = document.getElementById("branchSelect").value;
    let selectedBranch = null;
    let branchList = product.getListBranch();

    if (branchList && selectedBranchId) {
        selectedBranch = branchList.find(b => b.id_branch === selectedBranchId);
    }
    let newProduct = new Product(id, name, price, quantity, imageDataURL, description, selectedBranch ? [selectedBranch] : []);
    if (isEditing) {
        // Cập nhật sản phẩm
        store.updateProduct(editingProductId, newProduct);
        store.saveToLocalStorage();
        renderProductList();
        renderBranchFilterOptions();
        isEditing = false; // Reset trạng thái sửa
        editingProductId = null; // Reset ID sản phẩm đang sửa
    }
    else {
        store.addProduct(newProduct);
        store.saveToLocalStorage();
        renderProductList();
        renderBranchFilterOptions();
    }

    document.getElementById("productForm").reset();
    document.getElementById("previewImage").src = ""; // Xóa ảnh preview
    // Chuyển focus ra khỏi modal để tránh lỗi accessibility
    const fallbackBtn = document.getElementById("addProductBtn");
    if (fallbackBtn) fallbackBtn.focus();
    // Sau đó đóng modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    if (modal) modal.hide();
}

function removeProduct(id) {
    let isComfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (isComfirm) {
        store.removeProduct(id);
        store.saveToLocalStorage();
        renderProductList();
        renderBranchFilterOptions();
    }
}

function showUpdateForm(id) {
    const product = store.getListProduct().find(p => p.id_product === id);
    if (product.getListBranch().length > 0) {
        document.getElementById("branchSelect").value = product.getListBranch()[0].id_branch;
    }
    if (!product) {
        alert("Sản phẩm không tồn tại!");
        return;
    }

    renderBranchOptions(); // Thêm ở đây để có danh sách trước khi set value

    if (product.getListBranch().length > 0) {
        document.getElementById("branchSelect").value = product.getListBranch()[0].id_branch;
    }
    // Đổ dữ liệu vào form
    document.getElementById("productId").value = product.id_product;
    document.getElementById("productName").value = product.name_product;
    document.getElementById("productPrice").value = product.price_product;
    document.getElementById("productQuantity").value = product.quantity_product;
    document.getElementById("productDescription").value = product.description_product;

    // Hiển thị ảnh preview
    document.getElementById("previewImage").src = product.image_product;

    // Cập nhật trạng thái sửa
    isEditing = true;
    editingProductId = product.id_product;
    imageDataURL = product.image_product; // giữ lại ảnh cũ nếu không chọn ảnh mới

    // Mở modal
    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
}

function renderBranchOptions() {
    const branchSelect = document.getElementById("branchSelect");
    if (!branchSelect) return;

    branchSelect.innerHTML = "<option value=''>-- Chọn thương hiệu --</option>";

    // Tạo instance Product tạm để lấy danh sách thương hiệu
    const tempProduct = new Product();
    tempProduct.loadBranchFromLocalStorage();

    const branchList = tempProduct.getListBranch();

    branchList.forEach(branch => {
        const option = document.createElement("option");
        option.value = branch.id_branch;
        option.textContent = branch.name_branch;
        branchSelect.appendChild(option);
    });
}


function renderBranchFilterOptions() {
    let branchList = product.getListBranch();
    let select = document.getElementById("branchFilter");
    if (!select) return;

    // Xóa các option cũ (giữ lại option đầu tiên)
    select.innerHTML = `<option value="">-- Lọc theo thương hiệu --</option>`;
    for (let branch of branchList) {
        let option = document.createElement("option");
        option.value = branch.id_branch;
        option.textContent = branch.name_branch;
        select.appendChild(option);
    }
}
function filterProductByBranch() {
    let selectedBranchId = document.getElementById("branchFilter").value;
    if (selectedBranchId === "") {
        filteredList = null; // hiển thị tất cả nếu không chọn gì
    } else {
        filteredList = store.getListProduct().filter(product =>
            product.list_branch.some(branch => branch.id_branch === selectedBranchId)
        );
    }
    renderProductList();
}


// Search sản phẩm
function searchProduct() {
    let searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput === "") {
        filteredList = null; // Hiển thị lại toàn bộ danh sách nếu không có từ khóa tìm kiếm
    } else {
        filteredList = store.getListProduct().filter(product =>
            product.name_product.toLowerCase().includes(searchInput.toLowerCase()) ||
            product.id_product.toLowerCase().includes(searchInput.toLowerCase())
        );
    }
    renderProductList();
    renderBranchFilterOptions();
}


renderProductList();
renderBranchFilterOptions();