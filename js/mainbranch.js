// Quản lý thương hiệu

// let store = new PhoneStore(1, "Shoppee")
let product = new Product("", "Phone Store", "", "", "", "");
let filteredBranchList = null;
let isEditing = false; // Biến để theo dõi trạng thái sửa
let editingBranchId = null; // Biến để lưu ID thương hiệu đang sửa

product.loadBranchFromLocalStorage();
function renderBranchList() {
    let branchList = filteredBranchList ?? product.getListBranch();

    let html = ``;
    for (let i = 0; i < branchList.length; i++) {
        let branch = branchList[i];
        // console.log(product);
        html +=
            `
        <tr>
            <td>${branch.id_branch}</td>
            <td>${branch.name_branch}</td>
            <td style="height: 8vh;" class="d-flex justify-content-center align-items-center">
                <button class="btn btn-danger" onclick="removeBranch('${branch.id_branch}')">Xóa</button>
                <button class="btn btn-warning" onclick="showUpdateBranchForm('${branch.id_branch}')">Sửa</button>

            </td>
        `
    }
    document.getElementById("branchList").innerHTML = html;
}


document.getElementById("branchForm").addEventListener("submit", addBranch);

function addBranch(event) {
    event.preventDefault();

    let id = document.getElementById("branchId").value.trim();
    let name = document.getElementById("branchName").value.trim();

    if (!id || !name) {
        alert("Vui lòng nhập đầy đủ thông tin thương hiệu!");
        return;
    }

    let newBranch = new Branch(id, name);
    if(isEditing) {
        // Cập nhật sản phẩm
        product.updateBranch(editingBranchId, newBranch);
        product.saveBranchToLocalStorage();
        renderBranchList();
        isEditing = false; // Reset trạng thái sửa
        editingBranchId = null; // Reset ID thương hiệu đang sửa
    }
    else{
        product.addBranch(newBranch);
        product.saveBranchToLocalStorage();
        renderBranchList();
    }

    document.getElementById("branchForm").reset();
    // Chuyển focus ra khỏi modal để tránh lỗi accessibility
    const fallbackBtn = document.getElementById("addBranchBtn");
    if (fallbackBtn) fallbackBtn.focus();
    // Sau đó đóng modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('branchModal'));
    if (modal) modal.hide();
}

function removeBranch(id) {
    let isComfirm = confirm("Bạn có chắc chắn muốn xóa thương hiệu này không?");
    if (isComfirm) {
        product.removeBranch(id);
        product.saveBranchToLocalStorage();
        renderBranchList();
    }
}

function showUpdateBranchForm(id) {
    console.log(product.getListBranch());
    const branch = product.getListBranch().find(branch => branch.id_branch === id);
    if (!branch) {
        alert("thương hiệu này không tồn tại!");
        return;
    }

    // Đổ dữ liệu vào form
    document.getElementById("branchId").value = branch.id_branch;
    document.getElementById("branchName").value = branch.name_branch;
    

    // Cập nhật trạng thái sửa
    isEditing = true;
    editingBranchId = branch.id_branch;
    // imageDataURL = product.image_product; // giữ lại ảnh cũ nếu không chọn ảnh mới

    // Mở modal
    const modal = new bootstrap.Modal(document.getElementById("branchModal"));
    modal.show();
}



// Search sản phẩm
function searchBranch() {
    let searchInputBranch = document.getElementById("searchInputBranch").value.trim();
    if (searchInputBranch === "") {
        filteredBranchList = null; // Hiển thị lại toàn bộ danh sách nếu không có từ khóa tìm kiếm
    } else {
        filteredBranchList = product.getListBranch().filter(branch => 
            branch.name_branch.toLowerCase().includes(searchInputBranch.toLowerCase()) 
        );
    }
    renderBranchList();
}



renderBranchList();